import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const navigate = useNavigate();

  // 15 minutes countdown
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: '32px',
      minHeight: '100vh',
      padding: '40px 20px',
      backgroundColor: '#F4F5F0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Left Column (Payment Details) */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#EAEBDB',
        borderRadius: '16px',
        padding: '32px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '8px', fontSize: '28px', color: '#1E1E1E' }}>Confirm Booking</h2>
        <div style={{ fontSize: '14px', color: '#EF4444', fontWeight: 'bold', marginBottom: '24px' }}>
          Please complete payment within {timeString}
        </div>
        
        {/* Grid Details */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '32px',
          color: '#1E1E1E',
          lineHeight: '1.6'
        }}>
          <div>
            <div><strong>Customer Name:</strong> TaeInwZa</div>
            <div><strong>Event:</strong> Bodyslim The experience 1st Tour</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div><strong>Booking Date:</strong> Fri 1 May 2067 23:32</div>
            <div><strong>Booking ID:</strong> 206705012332</div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #D1D5DB', marginBottom: '24px' }} />

        {/* Ticket Details Flex Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontWeight: '500',
          marginBottom: '24px',
          color: '#1E1E1E',
          fontSize: '15px'
        }}>
          <div>Sat 27 Jun 2067 18:00</div>
          <div>Zone A2</div>
          <div>5,900</div>
          <div>Amount 1</div>
          <div>Seat no. C03</div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #D1D5DB', marginBottom: '32px' }} />

        {/* Bottom Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          color: '#1E1E1E'
        }}>
          {/* Left: Payment Method & QR Placeholder */}
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Payment Method</div>
            <select style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              width: '240px',
              fontSize: '14px',
              backgroundColor: 'white',
              outline: 'none',
              marginBottom: '16px'
            }}>
              <option value="pingpay">Pingpay</option>
              <option value="finza">Finza</option>
              <option value="mobile_banking">Mobile Banking</option>
            </select>

            <div style={{
              width: '180px',
              height: '180px',
              border: '2px dashed #9CA3AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: '#6B7280',
              fontWeight: '500'
            }}>
              Mock QR Code
            </div>
          </div>

          {/* Right: Total Price & Buttons */}
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ fontSize: '18px', marginBottom: '32px', marginTop: 'auto' }}>
              <strong>Total Price: 5,900</strong>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '100px' }}>
              <button 
                onClick={() => navigate('/cart')}
                style={{
                  backgroundColor: 'white',
                  color: '#1E1E1E',
                  border: '1px solid #D1D5DB',
                  borderRadius: '30px',
                  padding: '10px 24px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '15px'
                }}
              >
                Back to Cart
              </button>
              <button 
                onClick={() => navigate('/success')}
                style={{
                  backgroundColor: '#6B7E54',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  padding: '10px 32px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '15px'
                }}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column (Invoice Preview Card) */}
      <div style={{
        width: '300px',
        backgroundColor: '#FFFFFF',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        fontSize: '0.8rem',
        borderRadius: '8px',
        color: '#1E1E1E',
        boxSizing: 'border-box'
      }}>
        <h3 style={{ color: '#2563EB', marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>
          InvoiceDoc v2
        </h3>
        
        <div style={{ marginBottom: '24px', lineHeight: '1.5' }}>
          <strong>Customer:</strong> TaeInwZa<br/>
          <strong>Address:</strong> 123 Mock Street, BKK 10110<br/>
          <strong>Order Date:</strong> 01 May 2067
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>Product</th>
              <th style={{ textAlign: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>Qty</th>
              <th style={{ textAlign: 'right', borderBottom: '1px solid #E5E7EB', paddingBottom: '8px' }}>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ paddingTop: '8px', paddingBottom: '8px' }}>Bodyslim The experience 1st Tour</td>
              <td style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>1x</td>
              <td style={{ textAlign: 'right', paddingTop: '8px', paddingBottom: '8px' }}>5,900</td>
            </tr>
          </tbody>
        </table>

        <div style={{ borderTop: '2px dashed #D1D5DB', paddingTop: '16px', textAlign: 'right' }}>
          <strong>Total Amount: 5,900 THB</strong>
        </div>
      </div>
      
    </div>
  );
}
