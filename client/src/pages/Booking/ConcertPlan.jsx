import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils.js';
import { mockEvents } from "../../api/mockData.js";
import './ConcertPlan.css';

export default function ConcertPlan() {
  const { id: event_id } = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [event, setEvent] = useState(null);

  // จัดการการคลิกนอก Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ดึงข้อมูล Event
  useEffect(() => {
    const found = mockEvents.find(e => String(e.event_id) === String(event_id)); 
    if (found) {
      setEvent(found);
      const dates = found.showDate || found.showdate || [];
      if (dates.length > 0) setSelectedShowtime(dates[0]);
    } else {
      console.warn("ไม่พบข้อมูลคอนเสิร์ตจาก ID นี้");
    }
  }, [event_id]);

  if (!event) return null;
  const showDatesList = event.showDate || event.showdate || [selectedShowtime];

  const handleSelectShowtime = (option) => {
    setSelectedShowtime(option);
    setIsOpen(false);
  };

  const handleCheckAllAvailableSeats = () => {
    alert(`ระบบกำลังคำนวณที่นั่งว่างสำหรับรอบ: ${selectedShowtime}`);
  };

  // ฟังก์ชันสำหรับเปลี่ยนหน้าไปเลือกที่นั่ง พร้อมส่ง showtime ไปด้วย
  const handleZoneClick = (zoneName) => {
    navigate(`/event-booking/${event_id}/zone/${zoneName}`, { 
      state: { selectedShowtime } 
    });
  };

  return (
    <div className="zone-selection-root">
      <h1 className="zone-main-title">{event.title}</h1>
      
      <div className="zone-content-wrapper">
        <div className="zone-map-container">
          <div className="stage-area">
            <div className="screen-left">SCREEN</div>
            <div className="stage-main">STAGE</div>
            <div className="screen-right">SCREEN</div>
          </div>

          <div className="zones-grid">
            {(event.zones || ['A1', 'A2', 'B1', 'B2']).map((zoneName) => (
              <button 
                key={zoneName} 
                // ดึงชื่อโซนมาแปลงเป็นตัวเล็กเพื่อไปผูกกับคลาสใน CSS (เช่น zone-a1)
                className={`zone-btn zone-${zoneName.toLowerCase()}`} 
                onClick={() => handleZoneClick(zoneName)}
              >
                {zoneName}
              </button>
            ))}
          </div>

          <div className="foh-area">
            <div className="foh-box">FOH</div>
          </div>
        </div>

        <div className="zone-sidebar">
          <h2 className="sidebar-title">Showtime</h2>
          
          <div className="showtime-dropdown-container" ref={ref}>
            <button className="showtime-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
              <span>{formatDateTime(selectedShowtime, true)}</span>
              <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isOpen && (
              <div className="showtime-dropdown-menu">
                {showDatesList.map(option => (
                  <button key={option} className="showtime-dropdown-item" onClick={() => handleSelectShowtime(option)}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="seat-available-btn" onClick={handleCheckAllAvailableSeats}>
            Seat Available
          </button>

          <div className="pricing-card">
            <div className="pricing-image-placeholder">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <div className="pricing-legend">
              <div className="legend-title">PRICING</div>
              <div className="legend-item">
                <div className="color-box color-a"></div><span>5,900 THB</span>
              </div>
              <div className="legend-item">
                <div className="color-box color-b"></div><span>3,500 THB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}