import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../Home';
import { LoginPage } from '../Login';
import { RegisterPage } from '../Register';
import { ErrorPage } from '../Error';

export function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}