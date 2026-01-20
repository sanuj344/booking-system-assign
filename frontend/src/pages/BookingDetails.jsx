import { useState } from "react";
import API from "../api/bookingApi";

export default function BookingDetails() {
  const [bookingId, setBookingId] = useState("");
  const [data, setData] = useState(null);

  const fetchBooking = async () => {
    const res = await API.get(`/${bookingId}`);
    setData(res.data);
  };

  return (
    <div>
      <h2>Booking Details</h2>

      <input placeholder="Enter Booking ID" onChange={(e) => setBookingId(e.target.value)} />
      <button onClick={fetchBooking}>Fetch</button>

      {data && (
        <>
          <h3>Status: {data.booking.status}</h3>

          <h4>Event History</h4>
          <ul>
            {data.events.map((e) => (
              <li key={e._id}>
                {e.fromStatus || "START"} → {e.toStatus} ({e.actor})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
