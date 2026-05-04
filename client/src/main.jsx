import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login/LoginPage'; 
import RegisterPage from './pages/Login/RegisterPage';
import HomePage from './pages/Home/HomePage';
import EventPage from './pages/Event/EventPage';
import ConcertPlan from './pages/Booking/ConcertPlan';
import './index.css';

// image URL
import greenLogoUrl from "./assets/LogoGreen.svg";
import calendarUrl from "./assets/Calendar.svg";
import whiteLogoUrl from "./assets/LogoWhite.svg";
import homeUrl from "./assets/Home.svg";
import posterUrl from "./assets/Poster.png";
import cartUrl from "./assets/ShoppingCart.svg";
import userUrl from "./assets/User.svg";
import mapUrl from "./assets/MapPin.svg";
import searchUrl from "./assets/Search.svg";
import priceUrl from "./assets/Price.svg";
import saleUrl from "./assets/Sale.svg";
import downUrl from "./assets/ChevronDown.svg";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage whiteLogoUrl={whiteLogoUrl} homeUrl={homeUrl} 
                                  cartUrl={cartUrl} userUrl={userUrl} mapUrl={mapUrl}
                                  calendarUrl={calendarUrl} searchUrl={searchUrl}/>} />
        <Route path="/signin" element={<LoginPage greenLogoUrl={greenLogoUrl} />} />
        <Route path="/signup" element={<RegisterPage greenLogoUrl={greenLogoUrl} calendarUrl={calendarUrl}/>} />
        <Route path="/event/:id" element={<EventPage whiteLogoUrl={whiteLogoUrl} homeUrl={homeUrl} 
                                  cartUrl={cartUrl} userUrl={userUrl} mapUrl={mapUrl}
                                  calendarUrl={calendarUrl} searchUrl={searchUrl}
                                  priceUrl={priceUrl} saleUrl={saleUrl}/>} />
        <Route path="/event-booking/:id" element={<ConcertPlan whiteLogoUrl={whiteLogoUrl} homeUrl={homeUrl}
                                  cartUrl={cartUrl} userUrl={userUrl} mapUrl={mapUrl}
                                  calendarUrl={calendarUrl} searchUrl={searchUrl} downUrl={downUrl}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);