import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* UserPage */
import LoginPage from './pages/Login/LoginPage'; 
import RegisterPage from './pages/Login/RegisterPage';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage';
import OtpPage from './pages/Login/OtpPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';
import HomePage from './pages/Home/HomePage';
import EventPage from './pages/Event/EventPage';
import ConcertPlan from './pages/Booking/ConcertPlan';

/* AdminPage */
import DashBoardPage from './pages/DashBoard/DashBoardPage.jsx';
import TablePage from './pages/Tables/AdminTablesPage.jsx';
import './index.css';

// image URL
import { GreenLogo, HomeGreen, Table, Report, User, LogOut } from './components/Icons.jsx';

function Sidebar() {

  const getNavClass = ({ isActive }) => isActive ? "nav-item active" : "nav-item";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <GreenLogo />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={getNavClass}>
          <span className="nav-icon-box">
            <HomeGreen size={20} />
          </span>
          <span className="nav-label">DashBoard</span>
        </NavLink>

        <NavLink to="/tables" className={getNavClass}>
          <span className="nav-icon-box">
            <Table size={20} />
          </span>
          <span className="nav-label">Tables</span>
        </NavLink>

        <div className="nav-group">
        <NavLink to="/reports" className={getNavClass}>
          <span className="nav-icon-box">
            <Report size={20} />
          </span>
          <span className="nav-label">Reports</span>
        </NavLink>
        <hr className="nav-separator" />
      </div>

        <NavLink to="/account" className={getNavClass}>
          <span className="nav-icon-box">
            <User size={20} />
          </span>
          <span className="nav-label">Account</span>
        </NavLink>

        <NavLink to="/signin" className={({ isActive }) => isActive ? "nav-item active logout" : "nav-item logout"}>
          <span className="nav-icon-box logout-icon-box">
            <LogOut size={20} />
          </span>
          <span className="nav-label logout-icon-box">Log out</span>
        </NavLink>
      </nav>
    </aside>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/event-booking/:id" element={<ConcertPlan />} />
        
        <Route path="/dashboard" element={<Sidebar><DashBoardPage /></Sidebar>} />
        <Route path="/tables" element={<Sidebar><TablePage /></Sidebar>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);