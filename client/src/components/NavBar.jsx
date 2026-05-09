import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { WhiteLogo, HomeWhite, Cart, User, MapPin, Calendar, Search } from './Icons.jsx';
import { useCart } from '../pages/Cart/CartContext.jsx'; // 1. ดึง useCart มาใช้

export default function NavBar({ user, children }) { // เอา cartStartTime ออกเพราะเราจะจัดการในนี้เลย
    const { items } = useCart(); // 2. ดึง items จาก Context
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // 3. ถ้าไม่มีของในตะกร้า ให้เคลียร์เวลาออก
        if (!items || items.length === 0) {
            setTimeLeft(null);
            localStorage.removeItem('cartExpireTime'); // ลบเวลาที่จำไว้ออก
            return;
        }

        // 4. ถ้ามีของในตะกร้า เช็คว่าตั้งเวลาไว้หรือยัง
        let expireTime = localStorage.getItem('cartExpireTime');
        
        if (!expireTime) {
            // ถ้ายังไม่มี (เพิ่งหยิบชิ้นแรก) ให้บวกไป 15 นาทีจากตอนนี้
            expireTime = new Date().getTime() + 15 * 60 * 1000;
            localStorage.setItem('cartExpireTime', expireTime);
        }

        // เริ่มจับเวลา
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expireTime - now;

            if (distance <= 0) {
                clearInterval(interval);
                setTimeLeft("00:00");
                // หมายเหตุ: หากต้องการให้เคลียร์ตะกร้าอัตโนมัติเมื่อหมดเวลา สามารถเรียก clearCart() ตรงนี้ได้
            } else {
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [items]); // ทำงานใหม่เมื่อจำนวนของในตะกร้า (items) เปลี่ยนไป
    
    return(
        <div className="layout-container">
            <div className="nav-bar">
                <WhiteLogo className="logo-user" />
            
                <div className="nav-bar-content">
                    <div className="back-to-home">
                        <HomeWhite className="nav-bar-icon" />
                        <Link to="/home" className="home">Home</Link>
                    </div>

                    <div className="search-bar">
                        <SearchBar />
                    </div>
                    <div className="cart-login">
                        {/* แสดง active-timer เฉพาะตอนที่มี timeLeft */}
                        <Link to="/cart" className={`cart-link ${timeLeft ? 'active-timer' : ''}`}>
                            <Cart />
                            {timeLeft && <span className="cart-timer">{timeLeft}</span>}
                        </Link>
            
                        <div className="user-log-in">
                            <User className="nav-bar-icon" />
                            {user ? ( <Link to="/account-setting" className="sign-in">{user.username}</Link>) 
                            : (<Link to="/signin" className="sign-in">Sign In</Link>)}
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