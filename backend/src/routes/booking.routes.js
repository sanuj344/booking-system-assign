import express from "express";
import {
  createBooking,
  assignProvider,
  acceptBooking,
  rejectBooking,
  completeBooking,
  cancelBooking,
  markNoShow,
  adminOverride,
} from "../controllers/booking.controller.js";

const router = express.Router();

// Health
router.get("/health", (req, res) => {
  res.json({ status: "Booking service is running" });
});

// Customer
router.post("/", createBooking);
router.post("/:bookingId/cancel", cancelBooking);

// Provider / System
router.post("/:bookingId/assign", assignProvider);
router.post("/:bookingId/accept", acceptBooking);
router.post("/:bookingId/reject", rejectBooking);
router.post("/:bookingId/complete", completeBooking);

// Failure
router.post("/:bookingId/no-show", markNoShow);

// Admin
router.post("/:bookingId/override", adminOverride);

export default router;
