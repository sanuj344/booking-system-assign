import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateBooking from "./pages/createBooking";
import BookingDetails from "./pages/BookingDetails";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Create</Link> |{" "}
        <Link to="/booking">Booking</Link> |{" "}
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CreateBooking />} />
        <Route path="/booking" element={<BookingDetails />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}
