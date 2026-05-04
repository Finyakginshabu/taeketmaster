import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
//import './PaymentPage.css';

const PAYMENT_METHODS = [
  { id: 'promptpay', label: 'PromptPay', icon: '📱', desc: 'ชำระด้วย QR Code PromptPay' },
  { id: 'mobile_banking', label: 'Mobile Banking', icon: '🏦', desc: 'โอนผ่านแอปธนาคาร' },
  { id: 'credit_card', label: 'บัตรเครดิต / เดบิต', icon: '💳', desc: 'Visa, Mastercard, JCB' },
];

const DEADLINE_SECONDS = 15 * 60; // 15 minutes

function formatDate(dt) {
  return new Date(dt).toLocaleString('th-TH', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export default function PaymentPage() {
  const { items, totalPrice, ticketAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [method, setMethod] = useState('');
  const [timeLeft, setTimeLeft] = useState(DEADLINE_SECONDS);
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (success) return;
    if (timeLeft <= 0) { navigate('/cart'); return; }
    const t = setTimeout(() => setTimeLeft(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, success, navigate]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const urgent = timeLeft <= 120;

  const handlePay = async () => {
    if (!method) return;
    setPaying(true);
    try {
      // TODO: await api.post('/bookings', { items, payment_method: method })
      await new Promise(r => setTimeout(r, 1500));
      setSuccess(true);
      clearCart();
    } finally { setPaying(false); }
  };

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  if (success) {
    return (
      <div className="payment-page">
        <div className="container">
          <div className="success-card card animate-fadeUp">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">ชำระเงินสำเร็จ!</h2>
            <p className="success-sub">ขอบคุณที่จองตั๋วกับ OnePing ตั๋วของคุณพร้อมแล้ว</p>
            <div className="success-detail">
              <p>ระบบจะส่งรายละเอียดไปยังอีเมลของคุณ</p>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>กลับหน้าหลัก</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="container">
        <h1 className="payment-heading">ชำระเงิน</h1>

        {/* Timer */}
        <div className={`timer-bar ${urgent ? 'urgent' : ''}`}>
          <span className="timer-label">⏱ เวลาชำระเงินที่เหลือ</span>
          <span className="timer-clock">{mm}:{ss}</span>
          {urgent && <span className="timer-warn">ใกล้หมดเวลา!</span>}
        </div>

        <div className="payment-layout">
          {/* Left: method + summary */}
          <div className="payment-left">
            {/* Order summary */}
            <div className="card pay-section">
              <h3 className="pay-section-title">รายการตั๋ว</h3>
              {items.map(item => (
                <div key={`${item.seat_id}-${item.showtime_id}`} className="pay-ticket-row">
                  <div className="pay-ticket-info">
                    <p className="pay-event">{item.event_title}</p>
                    <p className="pay-meta">📅 {formatDate(item.show_at)} · 📍 {item.venue_name}</p>
                    <p className="pay-meta">💺 {item.seat_number} — {item.zone_name}</p>
                  </div>
                  <span className="pay-price">฿{item.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="divider" style={{ margin: '16px 0' }} />
              <div className="pay-total-row">
                <span>รวม {ticketAmount} ใบ</span>
                <span className="pay-grand-total">฿{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="card pay-section">
              <h3 className="pay-section-title">ช่องทางการชำระเงิน</h3>
              <div className="method-list">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id} className={`method-option ${method === m.id ? 'active' : ''}`}>
                    <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} />
                    <span className="method-icon">{m.icon}</span>
                    <div className="method-text">
                      <span className="method-label">{m.label}</span>
                      <span className="method-desc">{m.desc}</span>
                    </div>
                    <span className="method-check">{method === m.id ? '✅' : ''}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: confirm */}
          <div className="payment-right">
            <div className="card confirm-card">
              <h3 className="pay-section-title">ยืนยันการชำระ</h3>
              <div className="confirm-amount">
                <span className="confirm-label">ยอดชำระ</span>
                <span className="confirm-value">฿{totalPrice.toLocaleString()}</span>
              </div>
              {method && (
                <div className="confirm-method">
                  <span>ช่องทาง:</span>
                  <span>{PAYMENT_METHODS.find(m => m.id === method)?.label}</span>
                </div>
              )}

              <button
                className="btn btn-primary btn-full btn-lg"
                style={{ marginTop: 20 }}
                disabled={!method || paying}
                onClick={handlePay}
              >
                {paying ? <span className="spinner" /> : `ชำระ ฿${totalPrice.toLocaleString()}`}
              </button>

              {!method && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
                  กรุณาเลือกช่องทางการชำระเงิน
                </p>
              )}

              <p className="confirm-note">
                🔒 การชำระเงินของคุณปลอดภัย ข้อมูลถูกเข้ารหัสทุกครั้ง
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
