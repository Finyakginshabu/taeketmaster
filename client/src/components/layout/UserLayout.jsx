import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, MapPin, Calendar, Search, ShoppingCart, User } from 'lucide-react';
import './UserLayout.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function UserLayout() {
  const { ticketAmount } = useCart();
  const { user } = useAuth();

  return (
    <div className="user-layout">
      <nav className="user-navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            taeketmaster<sup>®</sup>
          </Link>
          <Link to="/" className="navbar-home-link">
            <Home size={18} /> Home
          </Link>
        </div>

        <div className="navbar-middle">
          <div className="search-bar">
            <div className="search-section">
              <MapPin size={16} /> Province
            </div>
            <div className="search-divider"></div>
            <div className="search-section">
              <Calendar size={16} /> Dates
            </div>
            <div className="search-divider"></div>
            <div className="search-input-wrapper">
              <Search size={16} color="#999" />
              <input type="text" placeholder="Search Artist, Event..." className="search-input" />
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={20} />
            {ticketAmount > 0 && <span className="cart-badge">{ticketAmount}</span>}
          </Link>
          <Link to={user ? "/profile" : "/login"} className="user-link">
            <User size={20} /> {user ? 'Account' : 'Sign In'}
          </Link>
        </div>
      </nav>

      <main className="user-main-content">
        <Outlet />
      </main>
    </div>
  );
}
