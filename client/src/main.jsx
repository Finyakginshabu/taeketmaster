import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';
import './index.css';

const greenLogoUrl = "./src/assets/LogoGreen.svg";
const calendarUrl = "./src/assets/Calendar.svg";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage greenLogoUrl={greenLogoUrl} />} />
        <Route path="/register" element={<RegisterPage greenLogoUrl={greenLogoUrl} calendarUrl={calendarUrl}/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);