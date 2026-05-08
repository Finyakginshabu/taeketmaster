import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Home, MapPin, Calendar, Search, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { ticketAmount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full" style={{ backgroundColor: '#556B2F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-white text-2xl font-bold italic tracking-tighter">taeketmaster<sup className="text-sm font-normal">®</sup></span>
          </Link>

          {/* Home Link */}
          <Link to="/" className="hidden md:flex items-center text-white hover:text-gray-200 ml-8 font-medium">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:flex items-center bg-white rounded-md overflow-hidden h-9">
            <button className="flex items-center px-3 text-gray-600 hover:bg-gray-100 border-r border-gray-200 text-sm font-medium h-full">
              <MapPin className="w-4 h-4 mr-1 text-gray-500" />
              Province
            </button>
            <button className="flex items-center px-3 text-gray-600 hover:bg-gray-100 border-r border-gray-200 text-sm font-medium h-full">
              <Calendar className="w-4 h-4 mr-1 text-gray-500" />
              Dates
            </button>
            <div className="flex-1 flex items-center px-3 h-full">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search Artist, Event..." 
                className="w-full h-full text-sm outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative text-white hover:text-gray-200">
              <ShoppingCart className="w-5 h-5" />
              {ticketAmount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {ticketAmount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-200 font-medium text-sm">
                  <User className="w-4 h-4 mr-1" />
                  {user.first_name || user.username}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-white hover:text-gray-200 font-medium text-sm">
                <User className="w-4 h-4 mr-1" />
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}