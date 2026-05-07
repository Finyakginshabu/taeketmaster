import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// UserPage
import LoginPage from './pages/Login/LoginPage'; 
import RegisterPage from './pages/Login/RegisterPage';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage';
import OtpPage from './pages/Login/OtpPage';
import ResetPasswordPage from './pages/Login/ResetPasswordPage';
import HomePage from './pages/Home/HomePage';
import EventPage from './pages/Event/EventPage';
import ConcertPlan from './pages/Booking/ConcertPlan';

// AdminPage
import DashBoardPage from './pages/DashBoard/DashBoardPage.jsx';
import AllTablePage from './pages/Tables/AllTablesPage.jsx';
import TablePage from './pages/Tables/AdminTablesPage.jsx';
import UserDetailPage from './pages/Tables/AdminUserDetailsPage.jsx';
import AccountPage from './pages/Account/AccountPage.jsx';
import ComparisonPage from './pages/Comparison/ComparisonPage.jsx';

import './index.css';

// image URL
import { GreenLogo, HomeGreen, HomeWhite, Table, TableGreen, Report, User, UserGreen, LogOut, Comparison } from './components/Icons.jsx';

function Sidebar() {

  const getNavClass = ({ isActive }) => isActive ? "nav-item active" : "nav-item";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <GreenLogo />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={getNavClass}>
        {({ isActive }) => (
          <>
            <span className="nav-icon-box">
              {isActive ? <HomeGreen width={24} /> : <HomeWhite width={24} />}
            </span>
            <span className="nav-label">DashBoard</span>
          </>
        )}
        </NavLink>

        <NavLink to="/tables" className={getNavClass}>
        {({ isActive }) => (
          <>
          <span className="nav-icon-box">
            {isActive ? <TableGreen width={24} /> : <Table width={24} /> }
          </span>
          <span className="nav-label">Tables</span>
          </>
        )}
        </NavLink>

        <div className="nav-group">
        <NavLink to="/reports" className={getNavClass}>
          <span className="nav-icon-box">
            <Report width={24} />
          </span>
          <span className="nav-label">Reports</span>
        </NavLink>
        <hr className="nav-separator" />
      </div>

        <NavLink to="/account" className={getNavClass}>
        {({ isActive }) => (
          <>
          <span className="nav-icon-box">
            {isActive ? <UserGreen width={24} /> : <User width={24} /> }
          </span>
          <span className="nav-label">Account</span>
          </>
        )}
        </NavLink>

        <NavLink to="/signin" className={({ isActive }) => isActive ? "nav-item active logout" : "nav-item logout"}>
          <span className="nav-icon-box logout-icon-box">
            <LogOut width={24} />
          </span>
          <span className="nav-label logout-icon-box">Log out</span>
        </NavLink>
      </nav>
    </aside>
  );
}

function Layout({ children }) {
  return( 
      <div className="app-layout">
        <Sidebar />
        <main className="main-wrapper">
          {children}
        </main>
      </div>
      );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/event-booking/:id" element={<ConcertPlan />} />
        
        <Route path="/dashboard" element={<Layout><DashBoardPage /></Layout>} />
        <Route path="/tables" element={<Layout><AllTablePage /></Layout>} />
        <Route path="/tables/:id" element={<Layout><TablePage /></Layout>} />
        <Route path="/tables/user/:id" element={<Layout><UserDetailPage /></Layout>} />
        <Route path="/account" element={<Layout><AccountPage /></Layout>} />
        <Route path="/comparison" element={<Layout><ComparisonPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);