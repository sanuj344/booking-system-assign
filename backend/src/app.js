import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);

export default app;
