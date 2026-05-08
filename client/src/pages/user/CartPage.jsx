import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X } from 'lucide-react';
import './CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, totalPrice, ticketAmount } = useCart();

  // If cart is empty, use mock data for the UI mockup as requested
  const displayItems = items.length > 0 ? items : [
    {
      seat_id: 'mock-1',
      showtime_id: 'mock-show',
      event_title: 'Bodyslim The experience 1st Tour',
      show_at: '2067-06-27T18:00:00',
      zone_name: 'A2',
      price: 5900,
      seat_number: 'C03'
    }
  ];

  const displayTotal = items.length > 0 ? totalPrice : 5900;
  const displayAmount = items.length > 0 ? ticketAmount : 1;

  return (
    <div className="cartpage-wrapper">
      <div className="cartpage-card">
        
        {/* Header */}
        <div className="cartpage-header">
          <h2>Ticket Cart</h2>
          <div className="cartpage-timer">
            Tickets reserved! Please complete order within 14:34
          </div>
        </div>
        
        <hr className="cartpage-divider" />

        {/* Table */}
        <div className="cartpage-table-container">
          <table className="cartpage-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Showtime</th>
                <th>Zone</th>
                <th>Net Price</th>
                <th>Amount</th>
                <th>Seat no.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayItems.map((item) => (
                <tr key={`${item.showtime_id}-${item.seat_id}`}>
                  <td>{item.event_title}</td>
                  <td>{new Date(item.show_at).toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '')}</td>
                  <td>{item.zone_name}</td>
                  <td>{item.price.toLocaleString()}</td>
                  <td>1</td>
                  <td>{item.seat_number}</td>
                  <td>
                    <button 
                      className="cartpage-remove-btn"
                      onClick={() => items.length > 0 && removeItem(item.seat_id, item.showtime_id)}
                    >
                      <X size={18} color="#EF4444" strokeWidth={3} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="cartpage-divider" />

        {/* Summary */}
        <div className="cartpage-summary">
          <div className="cartpage-summary-row">
            <span>Ticket Amount:</span>
            <span>{displayAmount}</span>
          </div>
          <div className="cartpage-summary-row total">
            <span>Total Amount:</span>
            <span>{displayTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="cartpage-actions">
          <button className="cartpage-btn back" onClick={() => navigate(-1)}>Back</button>
          <div className="cartpage-actions-right">
            <button className="cartpage-btn find-more" onClick={() => navigate('/')}>Find More Events</button>
            <button className="cartpage-btn checkout" onClick={() => navigate('/payment')}>Checkout</button>
          </div>
        </div>

      </div>
    </div>
  );
}
