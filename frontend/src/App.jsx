import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import CreateBooking from "./pages/createBooking";
import BookingDetails from "./pages/BookingDetails";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
      <nav className="tabs">
  <NavLink to="/" end className="tab">
    Create
  </NavLink>
  <NavLink to="/booking" className="tab">
    Booking
  </NavLink>
  <NavLink to="/admin" className="tab">
    Admin
  </NavLink>
</nav>

        <Routes>
          <Route path="/" element={<CreateBooking />} />
          <Route path="/booking" element={<BookingDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
