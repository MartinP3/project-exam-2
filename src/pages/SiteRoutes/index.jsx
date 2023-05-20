import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Home';
import { LoginPage } from '../Login';
import { RegisterPage } from '../Register';
import { ErrorPage } from '../Error';
import { VenuePage } from '../Venue';
import { AddVenuePage } from '../AddVenue';
import { BookVenuePage } from '../BookVenue';

export function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/venue/:id" element={<VenuePage />} />
      <Route path="/venue/add" element={<AddVenuePage />} />
      <Route path="/venue/booking/:id" element={<BookVenuePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}