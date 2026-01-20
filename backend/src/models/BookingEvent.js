import mongoose from "mongoose";

const bookingEventSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    fromStatus: {
      type: String,
      default: null,
    },

    toStatus: {
      type: String,
      required: true,
    },

    actor: {
      type: String,
      enum: ["CUSTOMER", "PROVIDER", "ADMIN", "SYSTEM"],
      required: true,
    },

    reason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const BookingEvent = mongoose.model("BookingEvent", bookingEventSchema);
export default BookingEvent;
