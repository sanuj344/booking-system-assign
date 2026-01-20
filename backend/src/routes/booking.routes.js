import express from "express";
import {
  createBooking,
  assignProvider,
  acceptBooking,
  rejectBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "Booking service is running" });
});

// Customer
router.post("/", createBooking);

// System / Provider flows
router.post("/:bookingId/assign", assignProvider);
router.post("/:bookingId/accept", acceptBooking);
router.post("/:bookingId/reject", rejectBooking);

export default router;
