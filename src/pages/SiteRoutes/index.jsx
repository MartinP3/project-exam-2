import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Home";
import { LoginPage } from "../Login";
import { RegisterPage } from "../Register";
import { ErrorPage } from "../Error";
import { VenuePage } from "../Venue";
import { AddVenuePage } from "../AddVenue";
import { BookVenuePage } from "../BookVenue";
import { EditBookingPage } from "../EditBooking";
import { EditVenuePage } from "../EditVenue";
import { SingleProfile } from "../../components/profile/Profile";
import { EditProfile } from "../../components/profile/EditProfile";
import { ManageVenuesPage } from "../ManageVenues";
import { ManageBookingPage } from "../ManageBooking";

export function SiteRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
      />
      <Route
        path="/profile/:id"
        element={<SingleProfile />}
      />
      <Route
        path="/profile/edit/:id"
        element={<EditProfile />}
      />
      <Route
        path="/venue/:id"
        element={<VenuePage />}
      />
      <Route
        path="/venue/add"
        element={<AddVenuePage />}
      />
      <Route
        path="/venue/edit/:id"
        element={<EditVenuePage />}
      />
      <Route
        path="/manage/venues"
        element={<ManageVenuesPage />}
      />
      <Route
        path="/manage/bookings/:id"
        element={<ManageBookingPage />}
      />
      <Route
        path="/booking/:id"
        element={<BookVenuePage />}
      />
      <Route
        path="/booking/edit/:id"
        element={<EditBookingPage />}
      />
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}
