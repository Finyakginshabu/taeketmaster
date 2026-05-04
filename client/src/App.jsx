import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
// 👇 เพิ่ม 2 บรรทัดนี้ตรงนี้ครับ 👇
import OtpPage from './pages/auth/OtpPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

import HomePage from './pages/user/HomePage';
import ConcertDetailPage from './pages/user/ConcertDetailPage';
import CartPage from './pages/user/CartPage';
import PaymentPage from './pages/user/PaymentPage';
import ProfilePage from './pages/user/ProfilePage';

import './styles/global.css';
import './styles/components.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* 👇 เพิ่ม 2 บรรทัดนี้ตรงนี้ครับ 👇 */}
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/concerts/:id" element={<ConcertDetailPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Protected */}
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
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