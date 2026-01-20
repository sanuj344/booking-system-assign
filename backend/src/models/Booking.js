import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    providerId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ASSIGNED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
        "FAILED",
      ],
      default: "PENDING",
    },

    cancellationReason: {
      type: String,
      default: null,
    },

    retryCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
