import Booking from "../models/Booking.js";
import BookingEvent from "../models/BookingEvent.js";
import { BOOKING_STATUS } from "../constants/bookingStatus.js";

/**
 * Create a new booking (Customer)
 */
export const createBooking = async (req, res) => {
  try {
    const { customerId, serviceType, address } = req.body;

    // Basic validation
    if (!customerId || !serviceType || !address) {
      return res.status(400).json({
        message: "customerId, serviceType and address are required",
      });
    }

    // Create booking
    const booking = await Booking.create({
      customerId,
      serviceType,
      address,
      status: BOOKING_STATUS.PENDING,
    });

    // Log event (observability)
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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
