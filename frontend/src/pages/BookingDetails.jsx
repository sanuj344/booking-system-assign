import { useState } from "react";
import API from "../api/bookingApi";
import "./booking.css";

export default function BookingDetails() {
  const [bookingId, setBookingId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooking = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(`/${bookingId}`);
      setData(res.data);
    } catch (err) {
      setError("Booking not found");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Booking Details</h1>

      <div className="card booking-search">
        <input
          placeholder="Enter Booking ID"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <button onClick={fetchBooking}>Fetch</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="card booking-info">
          <div className="booking-header">
            <h3>Booking Status</h3>
            <span className={`status ${data.booking.status.toLowerCase()}`}>
              {data.booking.status}
            </span>
          </div>

          <h4>Event Timeline</h4>
          <ul className="timeline">
            {data.events.map((event) => (
              <li key={event._id}>
                <span className="dot" />
                <div>
                  <strong>
                    {event.fromStatus || "START"} → {event.toStatus}
                  </strong>
                  <p>{event.actor}</p>
                  <small>
                    {new Date(event.createdAt).toLocaleString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
