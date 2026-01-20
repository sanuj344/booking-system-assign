import { useState } from "react";
import API from "../api/bookingApi";
import "./admin.css";

const STATUS_OPTIONS = [
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
  "FAILED",
];

export default function AdminPanel() {
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const overrideStatus = async () => {
    if (!bookingId || !status) {
      setError("Booking ID and status are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await API.post(`/${bookingId}/override`, {
        status,
        reason: "Manual admin override",
      });

      setMessage("Booking status overridden successfully");
    } catch (err) {
      setError("Failed to override booking status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Admin Panel</h1>

      <p style={{ color: "#6b7280", marginBottom: "10px" }}>
        Admin overrides should be used only in exceptional cases.
      </p>

      <div className="card admin-card">
        <div className="admin-row">
          <div>
            <label>Booking ID</label>
            <input
              placeholder="Enter Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
            />
          </div>

          <div>
            <label>New Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button onClick={overrideStatus} disabled={loading}>
            {loading ? "Updating..." : "Override"}
          </button>
        </div>
      </div>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </>
  );
}
