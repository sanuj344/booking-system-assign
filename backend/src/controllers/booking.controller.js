import Booking from "../models/Booking.js";
import BookingEvent from "../models/BookingEvent.js";
import { BOOKING_STATUS } from "../constants/bookingStatus.js";
import { providers } from "../utils/providers.js";
import { isValidTransition } from "../utils/stateValidator.js";

/**
 * CREATE BOOKING (Customer)
 */
export const createBooking = async (req, res) => {
  try {
    const { customerId, serviceType, address } = req.body;

    if (!customerId || !serviceType || !address) {
      return res.status(400).json({
        message: "customerId, serviceType and address are required",
      });
    }

    const booking = await Booking.create({
      customerId,
      serviceType,
      address,
      status: BOOKING_STATUS.PENDING,
    });

    await BookingEvent.create({
      bookingId: booking._id,
      fromStatus: null,
      toStatus: BOOKING_STATUS.PENDING,
      actor: "CUSTOMER",
      reason: "Booking created",
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * ASSIGN PROVIDER (System)
 */
export const assignProvider = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!isValidTransition(booking.status, BOOKING_STATUS.ASSIGNED)) {
      return res.status(400).json({
        message: `Cannot assign provider when booking is ${booking.status}`,
      });
    }

    const provider = providers[booking.retryCount];

    if (!provider) {
      const prevStatus = booking.status;
      booking.status = BOOKING_STATUS.FAILED;
      await booking.save();

      await BookingEvent.create({
        bookingId: booking._id,
        fromStatus: prevStatus,
        toStatus: BOOKING_STATUS.FAILED,
        actor: "SYSTEM",
        reason: "No providers available",
      });

      return res.status(400).json({ message: "No providers available" });
    }

    const prevStatus = booking.status;
    booking.providerId = provider.id;
    booking.status = BOOKING_STATUS.ASSIGNED;
    await booking.save();

    await BookingEvent.create({
      bookingId: booking._id,
      fromStatus: prevStatus,
      toStatus: BOOKING_STATUS.ASSIGNED,
      actor: "SYSTEM",
      reason: `Assigned provider ${provider.id}`,
    });

    return res.json({ message: "Provider assigned", booking });
  } catch (error) {
    console.error("Assign provider error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * PROVIDER ACCEPT BOOKING
 */
export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!isValidTransition(booking.status, BOOKING_STATUS.IN_PROGRESS)) {
      return res.status(400).json({
        message: `Cannot accept booking in ${booking.status} state`,
      });
    }

    const prevStatus = booking.status;
    booking.status = BOOKING_STATUS.IN_PROGRESS;
    await booking.save();

    await BookingEvent.create({
      bookingId: booking._id,
      fromStatus: prevStatus,
      toStatus: BOOKING_STATUS.IN_PROGRESS,
      actor: "PROVIDER",
      reason: "Provider accepted booking",
    });

    return res.json({ message: "Booking accepted", booking });
  } catch (error) {
    console.error("Accept booking error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * PROVIDER REJECT BOOKING (Retry)
 */
export const rejectBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status !== BOOKING_STATUS.ASSIGNED) {
      return res.status(400).json({
        message: `Cannot reject booking in ${booking.status} state`,
      });
    }

    const prevProvider = booking.providerId;

    booking.retryCount += 1;
    booking.providerId = null;
    booking.status = BOOKING_STATUS.PENDING;
    await booking.save();

    await BookingEvent.create({
      bookingId: booking._id,
      fromStatus: BOOKING_STATUS.ASSIGNED,
      toStatus: BOOKING_STATUS.PENDING,
      actor: "PROVIDER",
      reason: `Provider ${prevProvider} rejected booking`,
    });

    return res.json({
      message: "Booking rejected, retrying assignment",
      booking,
    });
  } catch (error) {
    console.error("Reject booking error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
