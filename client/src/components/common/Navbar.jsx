import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { ticketAmount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ONE<span>PING</span>
        </Link>
        
        <div className="navbar-menu">
          <div className="nav-actions">
            <Link to="/admin" className="nav-link">Admin</Link>
            <Link to="/cart" className="cart-icon">
              🛒 ตะกร้า
              {ticketAmount > 0 && <span className="cart-badge">{ticketAmount}</span>}
            </Link>
            
            {user ? (
              <div className="user-dropdown">
                <button className="user-btn">
                  👤 {user.first_name || user.username} ▼
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">ข้อมูลส่วนตัว</Link>
                  <Link to="/admin">Admin Panel</Link>
                  <button onClick={logout}>ออกจากระบบ</button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login">เข้าสู่ระบบ</Link>
                <Link to="/register" className="btn-register">สมัครสมาชิก</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}