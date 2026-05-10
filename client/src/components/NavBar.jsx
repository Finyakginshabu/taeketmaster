import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar.jsx';
import { useAuth } from '../pages/Login/AuthContext.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';  // เพิ่ม useLocation
import { WhiteLogo, HomeWhite, Cart, User, LogOut, History } from './Icons.jsx';
import { useCart } from '../pages/Cart/CartContext.jsx';

export default function NavBar({ children }) {
    const user = { username: "TestUser" };
    const { items } = useCart();
    const [timeLeft, setTimeLeft] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();  // รู้ว่าอยู่หน้าไหน

    // ---- filter state ----
    const [filters, setFilters] = useState({
        province: "",
        startDate: null,
        endDate: null,
        search: "",
    });

    // ทุกครั้งที่ filter เปลี่ยน → อัปเดต URL query params
    // หน้า Home อ่าน useSearchParams() แล้วยิง API เอง
    useEffect(() => {
        // อัปเดต URL เฉพาะตอนอยู่หน้า /home
        if (!location.pathname.startsWith("/home")) return;

        const params = new URLSearchParams();
        if (filters.province)  params.set("province",  filters.province);
        if (filters.startDate) params.set("startDate", filters.startDate);  // "2026-07-02"
        if (filters.endDate)   params.set("endDate",   filters.endDate);    // "2026-07-05"
        if (filters.search)    params.set("search",    filters.search);

        navigate(`/home?${params.toString()}`, { replace: true });
    }, [filters]);

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowDropdown(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (!items || items.length === 0) {
            setTimeLeft(null);
            localStorage.removeItem('cartExpireTime');
            return;
        }
        let expireTime = localStorage.getItem('cartExpireTime');
        if (!expireTime) {
            expireTime = new Date().getTime() + 15 * 60 * 1000;
            localStorage.setItem('cartExpireTime', expireTime);
        }
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expireTime - now;
            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft("00:00");
            } else {
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [items]);

    const handleLogout = () => {
        setShowDropdown(false);
        navigate('/signin');
    };

    return (
        <div className="layout-container">
            <div className="nav-bar">
                <WhiteLogo className="logo-user" />
                <div className="nav-bar-content">
                    <div className="back-to-home">
                        <HomeWhite className="nav-bar-icon" />
                        <Link to="/home" className="home">Home</Link>
                    </div>
                    <div className="search-bar">
                        <SearchBar
                            onProvince={(p) => setFilters(f => ({ ...f, province: p }))}
                            onDate={({ start, end }) => setFilters(f => ({ ...f, startDate: start, endDate: end }))}
                            onSearch={(s) => setFilters(f => ({ ...f, search: s }))}
                        />
                    </div>
                    <div className="cart-login">
                        <Link to="/cart" className={`cart-link ${timeLeft ? 'active-timer' : ''}`}>
                            <Cart />
                            {timeLeft && <span className="cart-timer">{timeLeft}</span>}
                        </Link>

                        <div className="user-log-in">
                            <User className="nav-bar-icon" />
                            {user ? (
                                <div className="user-dropdown-wrap" ref={dropdownRef}>
                                    <button
                                        className="user-dropdown-btn"
                                        onClick={() => setShowDropdown((v) => !v)}
                                    >
                                        {user.username}
                                        <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▾</span>
                                    </button>

                                    {showDropdown && (
                                        <div className="user-dropdown-menu">
                                            <Link to="/account-setting" className="dropdown-item"
                                                onClick={() => setShowDropdown(false)}>
                                                <User className="dropdown-icon" /> Account
                                            </Link>
                                            <Link to="/my-tickets" className="dropdown-item"
                                                onClick={() => setShowDropdown(false)}>
                                                <History className="dropdown-icon" /> My Tickets
                                            </Link>
                                            <button className="dropdown-item dropdown-logout"
                                                onClick={handleLogout}>
                                                <LogOut className="dropdown-icon" /> Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/signin" className="sign-in">Sign In</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}