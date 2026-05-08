import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const mockConcerts = [
  { id: 1, title: "Four Woman Up", date: "06 May 2067", status: "Coming Soon" },
  { id: 2, title: "Bodyslim Tour", date: "27 Jun 2067", status: "Buy Now" },
  { id: 3, title: "Tattoo Grayscale", date: "03 Dec 2067", status: "Sold out" },
  { id: 4, title: "Reality Lizard", date: "04 Dec 2067", status: "Buy Now" },
  { id: 5, title: "Adult Angel", date: "25 Dec 2067", status: "Buy Now" },
  { id: 6, title: "Placeholder 6", date: "TBA", status: "Coming Soon" },
  { id: 7, title: "Placeholder 7", date: "TBA", status: "Coming Soon" },
];

export default function HomePage() {
  return (
    <div className="homepage-root">
      <div className="homepage-container">
        
        {/* Filters */}
        <div className="homepage-filters">
          <button className="filter-btn">Hide Sold out</button>
          <button className="filter-btn">Hide Coming Soon</button>
        </div>

        {/* Event Grid */}
        <div className="event-grid">
          {mockConcerts.map((concert) => (
            <div key={concert.id} className="event-card">
              <div className="event-image-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div className="event-card-body">
                <h3 className="event-title">{concert.title}</h3>
                <p className="event-date">{concert.date}</p>
                
                {concert.status === 'Buy Now' && (
                  <Link to={`/concerts/${concert.id}`} className="event-btn buy-now">Buy Now</Link>
                )}
                {concert.status === 'Coming Soon' && (
                  <button className="event-btn coming-soon" disabled>Coming Soon</button>
                )}
                {concert.status === 'Sold out' && (
                  <button className="event-btn sold-out" disabled>Sold out</button>
                )}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}