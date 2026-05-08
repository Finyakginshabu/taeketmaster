import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import './ConcertDetailPage.css';

export default function ConcertDetailPage() {
  const navigate = useNavigate();

  // Mock data
  const showtimes = [
    { id: 1, label: 'Sat 27 Jun 2067 18:00' },
    { id: 2, label: 'Sun 28 Jun 2067 10:00' }
  ];
  const [selectedShowtime, setSelectedShowtime] = useState(showtimes[0].id);
  const [showAvailableModal, setShowAvailableModal] = useState(false);

  const handleZoneClick = (zoneId) => {
    navigate(`/seat-booking/${zoneId}`);
  };

  return (
    <div className="cdp-root">
      {/* Title */}
      <div className="cdp-title-container">
        <h1 className="cdp-title">Bodyslim The experience 1st Tour</h1>
      </div>

      {/* Main Content Layout */}
      <div className="cdp-content">
        
        {/* Left: Concert Map (Fixed 732x732) */}
        <div className="cdp-map">
          {/* STAGE */}
          <div className="cdp-stage">STAGE</div>

          {/* Zones Row 1 (A1, A2) */}
          <div className="cdp-zones-row">
            <button onClick={() => handleZoneClick('A1')} className="cdp-zone-btn cdp-zone-a cdp-zone-a1">A1</button>
            <button onClick={() => handleZoneClick('A2')} className="cdp-zone-btn cdp-zone-a cdp-zone-a2">A2</button>
          </div>

          {/* Zones Row 2 (B1, B2) */}
          <div className="cdp-zones-row">
            <button onClick={() => handleZoneClick('B1')} className="cdp-zone-btn cdp-zone-b">B1</button>
            <button onClick={() => handleZoneClick('B2')} className="cdp-zone-btn cdp-zone-b">B2</button>
          </div>

          {/* FOH */}
          <div className="cdp-foh">FOH</div>
        </div>

        {/* Right: Controls & Pricing */}
        <div className="cdp-controls">
          
          <h3 className="cdp-controls-title">Showtime</h3>
          
          {/* Showtime Selectors */}
          <div className="cdp-showtimes">
            {showtimes.map(st => (
              <button 
                key={st.id}
                onClick={() => setSelectedShowtime(st.id)}
                className={`cdp-showtime-btn ${selectedShowtime === st.id ? 'active' : 'inactive'}`}
              >
                <span>{st.label}</span>
                <ChevronDown size={16} />
              </button>
            ))}
          </div>

          {/* Seat Available Button & Modal */}
          <div className="cdp-seat-available-wrapper">
            <button 
              onClick={() => setShowAvailableModal(!showAvailableModal)}
              className="cdp-seat-available-btn"
            >
              Seat Available
            </button>

            {showAvailableModal && (
              <div className="cdp-modal">
                <div className="cdp-modal-header">
                  <h4>Zone A1 - Available Seats</h4>
                  <button onClick={() => setShowAvailableModal(false)} className="cdp-modal-close">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="cdp-modal-list">
                  <div className="cdp-modal-row">
                    <span>Row A:</span><span>A3, A4, A7, A12, A19</span>
                  </div>
                  <div className="cdp-modal-row">
                    <span>Row B:</span><span>B1, B2, B15</span>
                  </div>
                  <div className="cdp-modal-row highlight">
                    <span>Row C:</span><span>C5, C10, C18</span>
                  </div>
                  <div className="cdp-modal-row">
                    <span>Row D:</span><span>D9, D14, D20</span>
                  </div>
                </div>

                <div className="cdp-modal-actions">
                  <button onClick={() => setShowAvailableModal(false)} className="cdp-modal-btn close">Close</button>
                  <button onClick={() => handleZoneClick('A1')} className="cdp-modal-btn view">View Map</button>
                </div>
                <div className="cdp-modal-arrow"></div>
              </div>
            )}
          </div>

          {/* Pricing Card */}
          <div className="cdp-pricing">
            <div className="cdp-pricing-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>

            <div className="cdp-pricing-title">PRICING</div>

            <div className="cdp-pricing-legends">
              <div className="cdp-pricing-legend">
                <div className="cdp-pricing-color orange"></div>
                <span className="cdp-pricing-text">5,900 THB</span>
              </div>
              <div className="cdp-pricing-legend">
                <div className="cdp-pricing-color brown"></div>
                <span className="cdp-pricing-text">3,500 THB</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}