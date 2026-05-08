import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Home, MapPin, Calendar, Search, ShoppingCart, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { ticketAmount } = useCart();

  return (
    <nav className="navbar-root">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          taeketmaster<sup>®</sup>
        </Link>

        {/* Home Link */}
        <Link to="/" className="navbar-home">
          <Home /> Home
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <button className="navbar-search-btn">
            <MapPin /> Province
          </button>
          <button className="navbar-search-btn">
            <Calendar /> Dates
          </button>
          <div className="navbar-search-input-wrapper">
            <Search />
            <input type="text" placeholder="Search Artist, Event..." className="navbar-search-input" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="navbar-actions">
          <Link to="/cart" className="navbar-cart">
            <ShoppingCart />
            {ticketAmount > 0 && <span className="navbar-cart-badge">{ticketAmount}</span>}
          </Link>

          {user ? (
            <div className="navbar-dropdown-wrapper">
              <button className="navbar-user">
                <User /> {user.first_name || user.username}
              </button>
              <div className="navbar-dropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/admin">Admin Panel</Link>
                <button onClick={logout}>Sign Out</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="navbar-user">
              <User /> Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}