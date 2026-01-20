import { useState } from "react";
import API from "../api/bookingApi";

export default function AdminPanel() {
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState("");

  const overrideStatus = async () => {
    await API.post(`/${bookingId}/override`, {
      status,
      reason: "Manual admin override",
    });
    alert("Status updated");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <input placeholder="Booking ID" onChange={(e) => setBookingId(e.target.value)} />
      <input placeholder="New Status" onChange={(e) => setStatus(e.target.value)} />

      <button onClick={overrideStatus}>Override</button>
    </div>
  );
}
