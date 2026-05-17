import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext.jsx'; 
import { QR } from '../../components/Icons.jsx';
import './Payment.css';

export default function PaymentQRPage(){
  const navigate = useNavigate();
  const { totalPrice, clearCart } = useCart(); 

  
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    
    const expireTimeStr = localStorage.getItem('cartExpireTime');
    
    if(!expireTimeStr){
      setTimeLeft(0);
      return;
    }

    const expireTime = Number(expireTimeStr);

    
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = Math.floor((expireTime - now) / 1000);
      return diff > 0 ? diff : 0;
    };

    
    setTimeLeft(calculateTimeLeft());

    
    const timerId = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      
      if(remaining <= 0){
        clearInterval(timerId);
        
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  
  const handleDone = () => {
    clearCart(); 
    navigate('/home'); 
  };

  return (
    <div className="payment-qr-container">
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
            <h2 className="payment-qr-title">Payment</h2>
            <div className="payment-qr-card">
            
                <div className="payment-qr-instruction">
                    Please scan the QR code using <br/>mobile app within 15 minutes
                </div>

                <QR/>

                <div className="payment-qr-price">
                Total Price: {totalPrice ? totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }) : '0.00'} THB
                </div>

                <div className="payment-qr-timer">
                Remaining Time: {timeString}
                </div>

                <div className="payment-qr-instruction">
                    The transaction is being processed.<br/>Please do not close or refresh the page
                </div>

                <button 
                className="payment-qr-btn"
                onClick={handleDone}
                >
                Done
                </button>
            </div>
        </div>
    </div>
  );
}