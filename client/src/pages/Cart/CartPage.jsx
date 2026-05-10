import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { EditCart, DeleteCart } from '../../components/Icons.jsx';
import './Cart.css';

export default function CartPage() {
  const navigate = useNavigate();
  const { id: event_id } = useParams();
  const { items, removeItem, totalPrice, ticketAmount } = useCart();

  const [timeString, setTimeString] = useState('15:00');

  useEffect(() => {
    if (items.length === 0) {
      setTimeString('');
      return;
    }

    const timerId = setInterval(() => {
      const expireTime = localStorage.getItem('cartExpireTime');
      if (!expireTime) return;

      const distance = Number(expireTime) - Date.now();

      if (distance <= 0) {
        setTimeString('00:00');
      } else {
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeString(
          `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [items]);

  const fmtDate = (iso) =>
    new Date(iso)
      .toLocaleString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', '');

  return (
    <div className="cartpage-wrapper">
      <div>
        <div className="cartpage-header">
          <h2>Ticket Cart</h2>
          {items.length > 0 && timeString && (
            <div className="cartpage-timer">
              Tickets reserved! Please complete order within&nbsp;<strong>{timeString}</strong>
            </div>
          )}
        </div>
      <div className="cartpage-card">
        {/* ── Table ─────────────────────────────────────────────────────────── */}
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
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="cartpage-empty">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={`${item.showtime_id}-${item.seat_id}`}>
                    <td>{item.event_title}</td>
                    <td>{fmtDate(item.show_at)}</td>
                    <td>{item.zone_name}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>1</td>
                    <td>{item.seat_number}</td>
                    <td>
                      <div className="cartpage-action-cell">
                        <button
                          className="cartpage-edit-btn"
                          onClick={() => navigate(`/event-booking/${event_id}/zone/${item.zone_name}`)}
                          title="Edit seat"
                        >
                          <EditCart />
                        </button>
                        <button
                          className="cartpage-remove-btn"
                          onClick={() => removeItem(item.seat_id, item.showtime_id)}
                          title="Remove item"
                        >
                          <DeleteCart />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <hr className="cartpage-divider" />

        {/* ── Summary ───────────────────────────────────────────────────────── */}
        <div className="cartpage-summary">
          <div className="cartpage-summary-row">
            <span>Ticket Amount</span>
            <span>{ticketAmount}</span>
          </div>
          <div className="cartpage-summary-row total">
            <span>Total Amount</span>
            <span>
              {totalPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* ── Footer Actions ─────────────────────────────────────────────────── */}
        <div className="cartpage-actions">
          <button
            className="cartpage-btn back"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <div className="cartpage-actions-right">
            <button
              className="cartpage-btn find-more"
              onClick={() => navigate('/home')}
            >
              Find More Events
            </button>
            <button
              className="cartpage-btn checkout"
              onClick={() => navigate('/confirm-booking')}
            >
              Checkout
            </button>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
}