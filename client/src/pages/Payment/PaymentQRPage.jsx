import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Cart/CartContext.jsx'; // 💡 อย่าลืมเช็ก Path ให้ตรง
import { QR } from '../../components/Icons.jsx';
import './Payment.css';

export default function PaymentQRPage(){
  const navigate = useNavigate();
  const { totalPrice, clearCart } = useCart(); // ดึงราคาจริงมาใช้งาน

  // --- ลอจิกจับเวลา ซิงค์กับตะกร้า ---
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // 1. ดึงเวลาหมดอายุที่ถูกเซฟไว้ตอนเพิ่มของลงตะกร้าชิ้นแรก
    const expireTimeStr = localStorage.getItem('cartExpireTime');
    
    if(!expireTimeStr){
      setTimeLeft(0);
      return;
    }

    const expireTime = Number(expireTimeStr);

    // ฟังก์ชันคำนวณเวลาที่เหลือ (วินาที)
    const calculateTimeLeft = () => {
      const now = Date.now();
      const diff = Math.floor((expireTime - now) / 1000);
      return diff > 0 ? diff : 0;
    };

    // 2. เซ็ตเวลาเริ่มต้นทันทีที่เปิดหน้า
    setTimeLeft(calculateTimeLeft());

    // 3. ให้นับถอยหลังทุกๆ 1 วินาที
    const timerId = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // ถ้าเวลาหมด ให้หยุดการทำงานของ timer
      if(remaining <= 0){
        clearInterval(timerId);
        // 💡 ออปชันเสริม: ถ้าเวลาหมดจะให้ทำอะไรต่อ เช่น clearCart() หรือเด้งกลับหน้า Home ก็ใส่ตรงนี้ได้เลยครับ
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // ฟังก์ชันเมื่อกดปุ่ม Done
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