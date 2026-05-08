import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import UserLayout from './components/layout/UserLayout';

// อัปเดต Path เป็นโฟลเดอร์ Login ทั้งหมด
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Login/RegisterPage';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage';
import OtpPage from './pages/Login/OtpPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';

import HomePage from './pages/user/HomePage';
import ConcertDetailPage from './pages/user/ConcertDetailPage';
import CartPage from './pages/user/CartPage';
import PaymentPage from './pages/user/PaymentPage';
import ProfilePage from './pages/user/ProfilePage';
import SeatBookingPage from './pages/user/SeatBookingPage';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import Comparison from './pages/admin/Comparison';
import Tables from './pages/admin/Tables';
import EventForm from './pages/admin/EventForm';

import './styles/global.css';
import './styles/components.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* ---------- Admin Area ---------- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard/comparison" replace />} />
          <Route path="dashboard" element={<Navigate to="comparison" replace />} />
          <Route path="dashboard/comparison" element={<Comparison />} />
          <Route path="tables/events/add" element={<EventForm />} />
          <Route path="tables/events/edit" element={<EventForm />} />
          <Route path="tables" element={<Tables />} />
          <Route path="reports" element={<div style={{ color: '#1E1E1E' }}>Reports page — coming soon</div>} />
          <Route path="account" element={<div style={{ color: '#1E1E1E' }}>Account page — coming soon</div>} />
        </Route>

        {/* ---------- User Area ---------- */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </>
  );
}

function UserRoutes() {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/concerts/:id" element={<ConcertDetailPage />} />
        <Route path="/seat-booking/:zoneId" element={<SeatBookingPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Protected */}
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}