import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const navigate = useNavigate();

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
      
      {/* Left Column (Payment Card) */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: '#EAEBDB',
        borderRadius: '16px',
        padding: '32px',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '24px', fontSize: '28px', color: '#1E1E1E' }}>Payment</h2>
        
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
          alignItems: 'flex-end',
          color: '#1E1E1E'
        }}>
          {/* Left: Payment Method */}
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Payment Method</div>
            <select style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              width: '240px',
              fontSize: '14px',
              backgroundColor: 'white',
              outline: 'none'
            }}>
              <option value="pingpay">Pingpay</option>
              <option value="finza">Finza</option>
              <option value="masternam">MasterNam</option>
              <option value="jerrypal">JerryPal</option>
              <option value="online_banking">Online Banking</option>
            </select>
          </div>

          {/* Right: Total Price & Subtitles */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>
              <strong>Total Price: 5,900</strong>
            </div>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>
              Thank you for your purchase.
            </div>
            <div style={{ fontSize: '14px', color: '#EF4444', fontWeight: 'bold', marginBottom: '16px' }}>
              Please pay within 15 minutes
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
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
                Back
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
                Pay
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
          <strong>Tax ID:</strong> 1234567890123
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
              <td style={{ paddingTop: '8px', paddingBottom: '8px' }}>P002 - Product B</td>
              <td style={{ textAlign: 'center', paddingTop: '8px', paddingBottom: '8px' }}>1 PCS</td>
              <td style={{ textAlign: 'right', paddingTop: '8px', paddingBottom: '8px' }}>5,900</td>
            </tr>
          </tbody>
        </table>

        <div style={{ borderTop: '1px dashed #D1D5DB', paddingTop: '16px', textAlign: 'right' }}>
          <strong>Total: 5,900 THB</strong>
        </div>
      </div>
      
    </div>
  );
}
