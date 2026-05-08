import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import { WhiteLogo, HomeWhite, Cart, User, MapPin, Calendar, Search } from './Icons.jsx';

export default function NavBar({ user = { username: "Sign in" }, cartStartTime}){

    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        if(!cartStartTime){
            setTimeLeft(null);
            return;
        }

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = (cartStartTime + 15 * 60 * 1000) - now;

            if(distance <= 0){
                clearInterval(interval);
                setTimeLeft("00:00");
            } else {
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [cartStartTime]);
    
    return(
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
                    <Link to="/cart" className={`cart-link ${timeLeft ? 'active-timer' : ''}`}>
                        <Cart />
                        {timeLeft && <span className="cart-timer">{timeLeft}</span>}
                    </Link>
        
                    <div className="user-log-in">
                        <User className="nav-bar-icon" />
                        {user ? ( <Link to="/profile" className="sign-in">{user.username}</Link>) 
                        : (<Link to="/signin" className="sign-in">Sign In</Link>)}
                    </div>
                </div>
                
            </div>
        </div>
    );
}