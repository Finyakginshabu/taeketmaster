import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SeatBookingPage.css';

export default function SeatBookingPage() {
  const { zoneId } = useParams();
  const navigate = useNavigate();

  // Mock data for seats (10 rows, 20 columns)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  // Initialize a mock seat map
  // 0: Available, 1: Selected, 2: Sold Out
  const [seats, setSeats] = useState(() => {
    const initial = {};
    rows.forEach(r => {
      cols.forEach(c => {
        const seatId = `${r}${c}`;
        // Make some random seats sold out
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

  const handleSeatClick = (seatId) => {
    setSeats(prev => {
      const current = prev[seatId];
      if (current === 2) return prev; // Cannot click sold out
      
      // Toggle between 0 (Available) and 1 (Selected)
      return {
        ...prev,
        [seatId]: current === 0 ? 1 : 0
      };
    });
  };

  const selectedSeats = Object.keys(seats).filter(id => seats[id] === 1);
  const pricePerSeat = zoneId?.startsWith('A') ? 5900 : 3500;
  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div className="sbp-root" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F4F5F0' }}>
      <div className="sbp-title-container">
        <h1 className="sbp-title">
          Zone {zoneId || 'A1'} - Select Your Seat
        </h1>
      </div>

      <div className="sbp-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '40px', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Left: Seat Grid */}
        <div className="sbp-grid-container">
          
          {/* Legend */}
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

          {/* Grid Container */}
          <div className="sbp-grid">
            {/* Row Labels */}
            <div className="sbp-row-labels">
              {rows.map(r => (
                <div key={`label-${r}`} className="sbp-row-label">
                  {r}
                </div>
              ))}
            </div>

            {/* Seats */}
            <div className="sbp-seats-area">
              {/* Column Labels */}
              <div className="sbp-col-labels">
                {cols.map(c => (
                  <div key={`col-${c}`} className="sbp-col-label">
                    {c}
                  </div>
                ))}
              </div>

              {/* Matrix */}
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

        {/* Right: Booking Detail */}
        <div className="sbp-detail">
          <h2 className="sbp-detail-title">
            Booking Detail
          </h2>

          <div className="sbp-detail-info">
            <div className="sbp-detail-row">
              <span className="sbp-detail-label">Showtime</span>
              <span className="sbp-detail-value wide">Sat 27 Jun 2067 18:00</span>
            </div>
            <div className="sbp-detail-row">
              <span className="sbp-detail-label">Zone</span>
              <span className="sbp-detail-value">{zoneId || 'A1'}</span>
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
            <button 
              onClick={() => navigate(-1)}
              className="sbp-btn back"
            >
              Back
            </button>
            <button 
              className="sbp-btn reserve"
              disabled={selectedSeats.length === 0}
              onClick={() => navigate('/admin/dashboard')}
              style={{ cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer' }}
            >
              Reserve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
