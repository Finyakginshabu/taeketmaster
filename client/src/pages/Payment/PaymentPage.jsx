import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext.jsx';
import './Payment.css';

export default function PaymentPage(){
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();

  const [user, setUser] = useState({ firstName: '', lastName: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if(savedUser){
      try {
        const parsedData = JSON.parse(savedUser);
        setUser(parsedData);
      } catch (error){
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  const customerFullName = user.firstName 
    ? `${user.firstName} ${user.lastName || ''}`.trim() 
    : '';

  const groupedItems = Object.values(
    items.reduce((acc, item) => {
      const key = `${item.event_title}-${item.show_at}-${item.zone_name}`;
      
      if(!acc[key]){
        acc[key] = {
          event_title: item.event_title,
          show_at: item.show_at,
          zone_name: item.zone_name,
          price: item.price,
          amount: 0,
          seats: []
        };
      }
      
      acc[key].amount += 1;
      acc[key].seats.push(item.seat_number);
      return acc;
    }, {})
  );

  const formatShowtime = (dateString) => {
    if(!dateString || dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    if(isNaN(date)) return dateString;
    
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  };

  const currentBookingDate = formatShowtime(new Date().toISOString());
  const generateBookingId = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  };

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Promptpay');

  const paymentOptions = [
    { value: 'promptpay', label: 'Promptpay' },
    { value: 'credit_debit', label: 'Credit/Debit' },
    { value: 'mobile_banking', label: 'Mobile Banking' }
  ];

  const handleSelectPayment = (label) => {
    setSelectedPayment(label);
    setIsPaymentOpen(false);
  };

  return (
    <div className="payment-page-container">
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="payment-title" style={{ marginBottom: '24px', textAlign: 'left' }}>Confirm Booking</h2>
        
        <div className="payment-card">
          <div className="payment-details-grid">
            <div>
              <div style={{ marginBottom: '20px' }}><strong>Customer Name:</strong> {customerFullName}</div> 
              <div>
                <strong>Event: </strong> 
                {items.length > 0 ? items[0].event_title : ''}
              </div>
            </div>
            <div className="payment-details-right">
              <div style={{ marginBottom: '20px' }}><strong>Booking Date:</strong> {currentBookingDate}</div>
              <div><strong>Booking ID:</strong> {generateBookingId()}</div>
            </div>
          </div>

          <div className="payment-table-container">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Showtime</th>
                  <th>Zone</th>
                  <th>Net Price</th>
                  <th>Amount</th>
                  <th>Seat no.</th>
                </tr>
              </thead>
              <tbody>
                {groupedItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '20px 0', color: '#888' }}>
                      No tickets in cart.
                    </td>
                  </tr>
                ) : (
                  groupedItems.map((group, index) => (
                    <tr key={index}>
                      <td>{group.event_title}</td>
                      <td>{formatShowtime(group.show_at)}</td>
                      <td>{group.zone_name}</td>
                      <td>{group.price.toLocaleString()}</td>
                      <td>{group.amount}</td>
                      <td>{group.seats.join(', ')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <div>
              <div className="payment-method-label">Payment Method</div>
              <div className="payment-dropdown-container">
                <button 
                  type="button"
                  className="payment-dropdown-btn" 
                  onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                >
                  <span>{selectedPayment}</span>
                  <svg className={`dropdown-icon ${isPaymentOpen ? 'open' : ''}`} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L7 7L13 1" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {isPaymentOpen && (
                  <div className="payment-dropdown-menu">
                    {paymentOptions.map(option => (
                      <button 
                        key={option.value} 
                        type="button"
                        className="payment-dropdown-item" 
                        onClick={() => handleSelectPayment(option.label)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="payment-summary-container">
              <div className="payment-total-price">
                <strong>Total Price: {totalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} THB</strong>
                <p style={{ fontSize: 16, marginTop: '8px' }}>Thank you for your purchase.</p>
                <p style={{ color: 'red', fontSize: 16 }}>Please pay within 15 minutes</p>
              </div>

              <div className="payment-actions">
                <button 
                  onClick={() => navigate(-1)}
                  className="payment-btn payment-btn-back"
                >
                  Back
                </button>
                <button 
                  onClick={() => navigate('/payment')}
                  className="payment-btn payment-btn-confirm"
                  disabled={items.length === 0}
                  style={{ cursor: items.length === 0 ? 'not-allowed' : 'pointer', opacity: items.length === 0 ? 0.5 : 1 }}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}