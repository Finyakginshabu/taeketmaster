<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
import React, { use } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage'; 
import RegisterPage from './pages/Login/RegisterPage';
import HomePage from './pages/Home/HomePage';
import './index.css';

// image URL
const greenLogoUrl = "./src/assets/LogoGreen.svg";
const calendarUrl = "./src/assets/Calendar.svg";
const whiteLogoUrl = "./src/assets/LogoWhite.svg";
const homeUrl = "./src/assets/Home.svg";
const posterUrl = "./src/assets/Poster.png";
const cartUrl = "./src/assets/ShoppingCart.svg";
const userUrl = "./src/assets/User.svg";
const mapUrl = "./src/assets/MapPin.svg";
const searchUrl = "./src/assets/Search.svg";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage whiteLogoUrl={whiteLogoUrl} homeUrl={homeUrl} 
                                  posterUrl={posterUrl} cartUrl={cartUrl} 
                                  userUrl={userUrl} mapUrl={mapUrl}
                                  calendarUrl={calendarUrl} searchUrl={searchUrl}/>} />
        <Route path="/signin" element={<LoginPage greenLogoUrl={greenLogoUrl} />} />
        <Route path="/signup" element={<RegisterPage greenLogoUrl={greenLogoUrl} calendarUrl={calendarUrl}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> d311f7231df374fc8c18590ff7ae31488aa1d656
