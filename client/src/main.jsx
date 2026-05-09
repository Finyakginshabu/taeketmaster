import React, { StrictMode } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams, NavLink } from 'react-router-dom';

// UserPage
import LoginPage from './pages/Login/LoginPage.jsx'; 
import RegisterPage from './pages/Login/RegisterPage.jsx';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage.jsx';
import OtpPage from './pages/Login/OtpPage.jsx';
import ResetPasswordPage from './pages/Login/ResetPasswordPage.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import EventPage from './pages/Event/EventPage.jsx';
import ConcertPlan from './pages/Booking/ConcertPlan.jsx';
import NavBar from './components/NavBar.jsx';

// AdminPage
import DashBoardPage from './pages/DashBoard/DashBoardPage.jsx';
import AllTablePage from './pages/Tables/AllTablesPage.jsx';
import TablePage from './pages/Tables/AdminTablesPage.jsx';
import UserDetailPage from './pages/Tables/AdminUserDetailsPage.jsx';
import AdminAddPage from './pages/Tables/AdminAddPage.jsx';
import AdminEditPage from './pages/Tables/AdminEditPage.jsx';
import AccountPage from './pages/Account/AccountPage.jsx';
import ComparisonPage from './pages/Comparison/ComparisonPage.jsx';

import './index.css';

// image URL
import { GreenLogo, HomeGreen, HomeWhite, Table, TableGreen, Report, User, UserGreen, LogOut, Comparison, ChevronDown } from './components/Icons.jsx';

function SubMenu({ icon, label, children, basePath }) {
  const location = window.location.pathname;
  const isActive = location.startsWith(basePath);
  const [isOpen, setIsOpen] = React.useState(isActive);

  return (
    <div className={`nav-group ${isOpen ? 'open' : ''}`}>
      <button 
        type="button" 
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="nav-icon-box">{icon}</span>
        <span style={{ flex: 1 }}>{label}</span>
        <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className="nav-submenu" style={{ display: isOpen ? 'block' : 'none' }}>
        {children}
      </div>
    </div>
  );
}

function Sidebar() {

  const getNavClass = ({ isActive }) => isActive ? "nav-item active" : "nav-item";
  const getSubLinkClass = ({ isActive }) => isActive ? "nav-subitem active" : "nav-subitem";

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
          <SubMenu 
            basePath="/reports"
            icon={<Report width={24} />}
            label="Reports">
            <NavLink to="/reports/todays-booking" className={getSubLinkClass}>
              Today's Booking
            </NavLink>
            <NavLink to="/reports/todays-revenue" className={getSubLinkClass}>
              Today's Revenue
            </NavLink>
            <NavLink to="/reports/customer-sales" className={getSubLinkClass}>
              Customer Buying
            </NavLink>
            <NavLink to="/reports/receipt-list" className={getSubLinkClass}>
              Receipt List
            </NavLink>
            <NavLink to="/reports/invoice-receipt" className={getSubLinkClass}>
              Invoice &amp; Receipt
            </NavLink>
          </SubMenu>
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
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/account-setting" element={<NavBar><AccountPage /></NavBar>} />
        <Route path="/home" element={<NavBar><HomePage /></NavBar>} />
        <Route path="/event/:id" element={<NavBar><EventPage /></NavBar>} />
        <Route path="/event-booking/:id" element={<NavBar><ConcertPlan /></NavBar>} />
        <Route path="/event-booking/:id/zone/:zoneId" element={<NavBar><ConcertPlan /></NavBar>} />
        
        <Route path="/dashboard" element={<Layout><DashBoardPage /></Layout>} />
        <Route path="/tables" element={<Layout><AllTablePage /></Layout>} />
        <Route path="/tables/:id" element={<Layout><TablePage /></Layout>} />
        <Route path="/tables/user/:id" element={<Layout><UserDetailPage /></Layout>} />
        <Route path="/tables/:tableTitle/add" element={<Layout><AdminAddPage /></Layout>} />
        <Route path="/tables/:tableTitle/edit/:id" element={<Layout><AdminEditPage /></Layout>} />
        <Route path="/account" element={<Layout><AccountPage /></Layout>} />
        <Route path="/comparison" element={<Layout><ComparisonPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
