import { useState } from "react";
import API from "../api/bookingApi";
import "./form.css";

export default function CreateBooking() {
  const [form, setForm] = useState({
    customerId: "",
    serviceType: "",
    address: "",
  });

  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setBookingId("");

      const res = await API.post("/", form);
      setBookingId(res.data.booking._id);
    } catch (err) {
      setError("Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Create Booking</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="form-row">
          <div>
            <label>Customer ID</label>
            <input
              name="customerId"
              placeholder="Customer ID"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Service Type</label>
            <input
              name="serviceType"
              placeholder="Service Type"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Address</label>
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />
          </div>

          <button disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>

      {bookingId && <p className="success">Booking ID: {bookingId}</p>}
      {error && <p className="error">{error}</p>}
    </>
  );
}
