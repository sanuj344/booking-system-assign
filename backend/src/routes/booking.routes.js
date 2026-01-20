import express from "express";

const router = express.Router();

// temporary test route
router.get("/health", (req, res) => {
  res.json({ status: "Booking service is running" });
});

export default router;
