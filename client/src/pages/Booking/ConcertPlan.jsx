import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils.js';
import { getEventDetailTwo, getZoneLayout } from '../../api/eventDetails.api.js';
import './ConcertPlan.css';

// find color bwtween 2 super green
const interpolateColor = (color1, color2, factor) => {
  const c1 = parseInt(color1, 16);
  const c2 = parseInt(color2, 16);
  
  const r1 = (c1 >> 16) & 0xff;
  const g1 = (c1 >> 8) & 0xff;
  const b1 = c1 & 0xff;
  
  const r2 = (c2 >> 16) & 0xff;
  const g2 = (c2 >> 8) & 0xff;
  const b2 = c2 & 0xff;
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase()}`;
};

const getPriceColors = (uniquePrices) => {
  const highestColor = 'ABC875';
  const lowestColor = '596B37';
  
  if(uniquePrices.length === 1){
    return [highestColor];
  }
  
  if(uniquePrices.length === 2){
    return [highestColor, lowestColor];
  }
  
  const colors = [highestColor];
  for (let i = 1; i < uniquePrices.length - 1; i++){
    const factor = i / (uniquePrices.length - 1);
    colors.push(interpolateColor(highestColor, lowestColor, factor));
  }
  colors.push(lowestColor);
  
  return colors;
};

export default function ConcertPlan(){
  const { id: event_id } = useParams();
  const navigate = useNavigate();
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [event, setEvent] = useState(null);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        const eventData = await getEventDetailTwo(event_id);
        setEvent(eventData);
        if(eventData.showtimes && eventData.showtimes.length > 0){
          setSelectedShowtime(eventData.showtimes[0]);
        }
        
        const zoneData = await getZoneLayout({ id: event_id });
        setZones(zoneData || []);
      } catch (err){
        console.error("Error fetching event data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventData();
  }, [event_id]);

  if(loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading event...</div>;
  if(error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
  if(!event) return <div style={{ padding: '40px', textAlign: 'center' }}>Event not found</div>;
  
  const showDatesList = event.showtimes || [];
  const ticketPrices = event.ticket_prices || {};
  const uniquePrices = [...new Set(Object.values(ticketPrices))].sort((a, b) => b - a);
  const priceColors = getPriceColors(uniquePrices);

  const handleSelectShowtime = (option) => {
    setSelectedShowtime(option);
    setIsOpen(false);
  };

  const handleCheckAllAvailableSeats = () => {
    if(selectedShowtime){
      alert(`Fetching available seats for: ${selectedShowtime.show_at}`);
    }
  };

  const handleZoneClick = (zoneId) => {
    const showtimeId = selectedShowtime?.showtime_id;
    navigate(`/event-booking/${event_id}/zone/${zoneId}${showtimeId ? `?showtime=${showtimeId}` : ''}`, { 
      state: { selectedShowtime, zones } 
    });
  };

  return (
    <div className="zone-selection-root">
      <h1 className="zone-main-title">{event.title}</h1>
      <div className="zone-content-wrapper">
        <div className="zone-map-container">
          {zones.map((zone) => (
            <img
              key={zone.zone_id}
              src={`http://localhost:6700/api${zone.img_path}`}
              alt={zone.zone_name}
              className="zone-svg"
              style={{
                position: 'absolute',
                left: `${zone.x_pos}px`,
                top: `${zone.y_pos}px`,
                cursor: 'pointer'
              }}
              onClick={() => handleZoneClick(zone.zone_id)}
              title={zone.zone_name}
            />
          ))}
        </div>
        <div className="zone-sidebar">
          <h2 className="sidebar-title">Showtime</h2>
          
          <div className="showtime-dropdown-container" ref={ref}>
            <button className="showtime-dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
              <span>{selectedShowtime ? selectedShowtime.show_at : 'Select showtime'}</span>
              <svg className={`dropdown-icon ${isOpen ? 'open' : ''}`} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isOpen && (
              <div className="showtime-dropdown-menu">
                {showDatesList.map(st => (
                  <button key={st.showtime_id} className="showtime-dropdown-item" onClick={() => handleSelectShowtime(st)}>
                    {st.show_at}
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
              {uniquePrices.map((price, index) => (
                <div key={price} className="legend-item">
                  <div className="color-box" style={{ backgroundColor: `#${priceColors[index]}` }}></div><span>{price.toLocaleString('en-TH')} THB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}