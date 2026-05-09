import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from "../../api/mockData.js";
import { useCart } from '../../context/CartContext';
import './ConcertPlan.css';

export default function ConcertPlan({ whiteLogoUrl, homeUrl, cartUrl, userUrl, mapUrl, calendarUrl, searchUrl, downUrl }) {
  const { id, zoneId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const ref = useRef(null);

  // States สำหรับ Event และ Showtime (จากโค้ดแรก)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [event, setEvent] = useState(null);

  // States สำหรับระบบที่นั่ง (จากโค้ดที่สอง)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  const [seats, setSeats] = useState(() => {
    const initial = {};
    rows.forEach(r => {
      cols.forEach(c => {
        const seatId = `${r}${c}`;
        if (['A18', 'A19', 'A20', 'B18', 'B19', 'C18', 'C19', 'D20', 'E19', 'G18'].includes(seatId)) {
          initial[seatId] = 2; // Sold out
        } else if (['D7', 'D8', 'D10', 'E14'].includes(seatId)) {
          initial[seatId] = 2; // Sold out
        } else {
          initial[seatId] = 0; // Available
        }
      });
    });
    return initial;
  });

  // จัดการการคลิกนอก Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ดึงข้อมูล Event
  useEffect(() => {
    const found = mockEvents.find(e => e.id === Number(id));
    if (found) {
      setEvent(found);
      // รองรับทั้ง camelCase และ lowercase เผื่อ mockData ใช้ชื่อต่างกัน
      const dates = found.showDate || found.showdate || [];
      if (dates.length > 0) setSelectedShowtime(dates[0]);
    }
  }, [id]);

  const handleSelectShowtime = (option) => {
    setSelectedShowtime(option);
    setIsOpen(false);
  };

  const handleSeatClick = (seatId) => {
    setSeats(prev => {
      const current = prev[seatId];
      if (current === 2) return prev; // ข้ามถ้าที่นั่ง Sold out
      
      return {
        ...prev,
        [seatId]: current === 0 ? 1 : 0
      };
    });
  };

  // คำนวณราคาและการเลือกที่นั่ง
  const selectedSeats = Object.keys(seats).filter(seatId => seats[seatId] === 1);
  const currentZone = zoneId || 'A1';
  const pricePerSeat = currentZone.startsWith('A') ? 5900 : 3500;
  const totalPrice = selectedSeats.length * pricePerSeat;

  // เพิ่มลงตระกร้าและไปหน้า Cart
  const handleReserve = () => {
    selectedSeats.forEach(seatId => {
      addItem({
        showtime_id: 1,
        event_title: event?.title || "Concert",
        venue_name: event?.venue_name || "Impact Arena",
        show_at: selectedShowtime,
        seat_id: `${currentZone}-${seatId}`,
        seat_number: seatId,
        zone_name: currentZone,
        price: pricePerSeat
      });
    });
    navigate('/cart');
  };

  if (!event) return null;

  const showDatesList = event.showDate || event.showdate || [selectedShowtime];

  return (
    <>
      <div className="sbp-root" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F4F5F0', paddingBottom: '40px' }}>
        
        <div className="sbp-title-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <div className="concert-title" style={{ fontSize: '28px', fontWeight: 'bold' }}>{event.title}</div>
          <h1 className="sbp-title" style={{ marginTop: '10px' }}>
            Zone {currentZone} - Select Your Seat
          </h1>
        </div>

        <div className="sbp-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', width: '100%', maxWidth: '1100px', margin: '20px auto 0 auto' }}>
          
          {/* ส่วนซ้าย: ผังที่นั่ง (Seat Grid) */}
          <div className="sbp-grid-container">
            <div className="sbp-legend">
              <div className="sbp-legend-item">
                <div className="sbp-legend-dot selected"></div>
                <span className="sbp-legend-text">Selected</span>
              </div>
              <div className="sbp-legend-item">
                <div className="sbp-legend-dot available"></div>
                <span className="sbp-legend-text">Available</span>
              </div>
              <div className="sbp-legend-item">
                <div className="sbp-legend-dot soldout">
                  <span className="sbp-legend-x">×</span>
                </div>
                <span className="sbp-legend-text">Sold Out</span>
              </div>
            </div>

            <div className="sbp-grid">
              <div className="sbp-row-labels">
                {rows.map(r => (
                  <div key={`label-${r}`} className="sbp-row-label">{r}</div>
                ))}
              </div>

              <div className="sbp-seats-area">
                <div className="sbp-col-labels">
                  {cols.map(c => (
                    <div key={`col-${c}`} className="sbp-col-label">{c}</div>
                  ))}
                </div>

                <div className="sbp-seats-matrix">
                  {rows.map(r => (
                    <div key={`row-${r}`} className="sbp-seat-row">
                      {cols.map(c => {
                        const seatId = `${r}${c}`;
                        const status = seats[seatId];
                        
                        let btnClass = 'sbp-seat available';
                        let content = null;

                        if (status === 1) {
                          btnClass = 'sbp-seat selected';
                        } else if (status === 2) {
                          btnClass = 'sbp-seat soldout';
                          content = <span className="sbp-seat-x">×</span>;
                        }

                        return (
                          <button 
                            key={seatId}
                            onClick={() => handleSeatClick(seatId)}
                            className={btnClass}
                            disabled={status === 2}
                          >
                            {content}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนขวา: รายละเอียดการจอง (Booking Detail) */}
          <div className="sbp-detail" style={{ minWidth: '300px' }}>
            <h2 className="sbp-detail-title">Booking Detail</h2>

            <div className="sbp-detail-info">
              
              {/* เปลี่ยน Showtime เป็น Dropdown ให้เลือกได้แบบโค้ดแรก */}
              <div className="sbp-detail-row" style={{ position: 'relative', alignItems: 'center' }}>
                <span className="sbp-detail-label">Showtime</span>
                <div ref={ref} style={{ position: 'relative' }}>
                  <button 
                    className={`showtime-selected ${isOpen ? "open" : ""}`}
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ background: '#fff', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  >
                    <span>{selectedShowtime}</span>
                    <img src={downUrl} alt="down arrow" className={`showtime-arrow ${isOpen ? "rotated" : ""}`} style={{ width: '12px' }}/>
                  </button>

                  {isOpen && (
                    <div className="showtime-list" style={{ position: 'absolute', top: '100%', right: 0, background: 'white', border: '1px solid #ccc', zIndex: 10, width: 'max-content', borderRadius: '4px', marginTop: '5px' }}>
                      {showDatesList.filter(s => s !== selectedShowtime).map(option => (
                        <button 
                          key={option} 
                          className="showtime-option" 
                          onClick={() => handleSelectShowtime(option)}
                          style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #eee' }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="sbp-detail-row">
                <span className="sbp-detail-label">Zone</span>
                <span className="sbp-detail-value">{currentZone}</span>
              </div>
              <div className="sbp-detail-row">
                <span className="sbp-detail-label">Price</span>
                <span className="sbp-detail-value">{pricePerSeat.toLocaleString()} THB</span>
              </div>
              <div className="sbp-detail-row">
                <span className="sbp-detail-label">Amount</span>
                <span className="sbp-detail-value">{selectedSeats.length}</span>
              </div>
              <div className="sbp-detail-row">
                <span className="sbp-detail-label">Seat No.</span>
                <span className="sbp-detail-value highlight">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                </span>
              </div>
            </div>

            <div className="sbp-detail-total">
              <span className="sbp-total-label">Total Price</span>
              <span className="sbp-total-value">{totalPrice.toLocaleString()} THB</span>
            </div>

            <div className="sbp-detail-actions">
              <button onClick={() => navigate(-1)} className="sbp-btn back">
                Back
              </button>
              <button 
                className="sbp-btn reserve"
                disabled={selectedSeats.length === 0}
                onClick={handleReserve}
                style={{ cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer' }}
              >
                Reserve
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}