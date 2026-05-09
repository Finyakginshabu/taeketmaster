import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { X, Edit2 } from 'lucide-react';
import './CartPage.css';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, totalPrice, ticketAmount } = useCart();
  
  // สร้าง State สำหรับเก็บข้อความเวลา
  const [timeString, setTimeString] = useState("15:00");

  // อ่านเวลาเดียวกันกับ NavBar
  useEffect(() => {
    if (items.length === 0) {
        setTimeString("");
        return;
    }

    const timerId = setInterval(() => {
      const expireTime = localStorage.getItem('cartExpireTime');
      if (!expireTime) return;

      const distance = expireTime - new Date().getTime();
      
      if (distance <= 0) {
        setTimeString("00:00");
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeString(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [items]);

  // If cart is empty, use mock data for the UI mockup as requested
  const [mockItems, setMockItems] = useState([
    {
      seat_id: 'mock-1',
      showtime_id: 'mock-show',
      event_title: 'Bodyslim The experience 1st Tour',
      show_at: '2067-06-27T18:00:00',
      zone_name: 'A2',
      price: 5900,
      seat_number: 'C03'
    }
  ]);

  const displayItems = items.length > 0 ? items : mockItems;
  const displayTotal = items.length > 0 ? totalPrice : mockItems.reduce((sum, item) => sum + item.price, 0);
  const displayAmount = items.length > 0 ? ticketAmount : mockItems.length;

  const handleRemove = (seat_id, showtime_id) => {
    if (items.length > 0) {
      removeItem(seat_id, showtime_id);
    } else {
      setMockItems(prev => prev.filter(item => !(item.seat_id === seat_id && item.showtime_id === showtime_id)));
    }
  };

  return (
    <div className="cartpage-wrapper">
      <div className="cartpage-card">
        
        {/* Header */}
        <div className="cartpage-header">
          <h2>Ticket Cart</h2>
          {/* แสดงเวลาเฉพาะตอนที่มีของ */}
          {items.length > 0 && (
            <div className="cartpage-timer">
              Time remaining to pay: {timeString}
            </div>
          )}
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
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
                      <button 
                        className="cartpage-edit-btn"
                        onClick={() => navigate('/seat-booking')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#4B5563', fontSize: '13px', padding: 0 }}
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                      <button 
                        className="cartpage-remove-btn"
                        onClick={() => handleRemove(item.seat_id, item.showtime_id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                      >
                        <p style={{size: 18, color: "#EF4444", strokeWidth: 3}}> x </p>
                      </button>
                    </div>
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
          <button className="cartpage-btn back" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Back</button>
          <div className="cartpage-actions-right">
            <button className="cartpage-btn find-more" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Find More Events</button>
            <button className="cartpage-btn checkout" style={{ cursor: 'pointer' }} onClick={() => navigate('/payment')}>Checkout</button>
          </div>
        </div>

      </div>
    </div>
  );
}