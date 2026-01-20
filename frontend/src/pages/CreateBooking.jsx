import { useState } from "react";
import API from "../api/bookingApi";

export default function CreateBooking() {
  const [form, setForm] = useState({
    customerId: "",
    serviceType: "",
    address: "",
  });

  const [bookingId, setBookingId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/", form);
    setBookingId(res.data.booking._id);
  };

  return (
    <div>
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Customer ID" onChange={(e) => setForm({ ...form, customerId: e.target.value })} />
        <input placeholder="Service Type" onChange={(e) => setForm({ ...form, serviceType: e.target.value })} />
        <input placeholder="Address" onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <button type="submit">Create</button>
      </form>

      {bookingId && <p>Booking ID: {bookingId}</p>}
    </div>
  );
}
