import express from "express";
import { createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "Booking service is running" });
});

// Create booking (customer)
router.post("/", createBooking);

export default router;
