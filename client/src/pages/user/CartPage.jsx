import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';


function formatDate(dt) {
  return new Date(dt).toLocaleString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function CartPage() {
  const { items, removeItem, totalPrice, ticketAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const grouped = items.reduce((acc, item) => {
    const key = `${item.showtime_id}`;
    if (!acc[key]) acc[key] = { showtime_id: item.showtime_id, event_title: item.event_title, venue_name: item.venue_name, show_at: item.show_at, tickets: [] };
    acc[key].tickets.push(item);
    return acc;
  }, {});

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    navigate('/payment');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🎟</div>
            <h2>ตะกร้าของคุณว่างเปล่า</h2>
            <p>เลือกตั๋วคอนเสิร์ตที่คุณชื่นชอบและเพิ่มเข้าตะกร้า</p>
            <Link to="/" className="btn btn-primary btn-lg">ดูคอนเสิร์ตทั้งหมด</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">ตะกร้าของฉัน</h1>
          <button className="btn btn-ghost btn-sm" onClick={clearCart}>ล้างตะกร้า</button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {Object.values(grouped).map(group => (
              <div key={group.showtime_id} className="cart-group card">
                <div className="cart-group-header">
                  <div>
                    <h3 className="group-event">{group.event_title}</h3>
                    <p className="group-meta">📅 {formatDate(group.show_at)}</p>
                    <p className="group-meta">📍 {group.venue_name}</p>
                  </div>
                </div>
                <div className="divider" />
                <div className="ticket-list">
                  {group.tickets.map(ticket => (
                    <div key={`${ticket.seat_id}-${ticket.showtime_id}`} className="ticket-row">
                      <div className="ticket-icon">🎟</div>
                      <div className="ticket-detail">
                        <span className="ticket-seat">ที่นั่ง {ticket.seat_number}</span>
                        <span className="ticket-zone">{ticket.zone_name}</span>
                      </div>
                      <span className="ticket-price">฿{ticket.price.toLocaleString()}</span>
                      <button className="remove-btn" onClick={() => removeItem(ticket.seat_id, ticket.showtime_id)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary card">
            <h3 className="summary-title">สรุปคำสั่งซื้อ</h3>
            <div className="summary-row">
              <span>จำนวนตั๋ว</span>
              <span>{ticketAmount} ใบ</span>
            </div>
            <div className="summary-row">
              <span>ราคารวม</span>
              <span>฿{totalPrice.toLocaleString()}</span>
            </div>
            <div className="divider" style={{ margin: '16px 0' }} />
            <div className="summary-total">
              <span>ยอดชำระทั้งหมด</span>
              <span className="total-amount">฿{totalPrice.toLocaleString()}</span>
            </div>
            <button className="btn btn-primary btn-full btn-lg" style={{ marginTop: 20 }} onClick={handleCheckout}>
              ดำเนินการชำระเงิน →
            </button>
            {!user && (
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
                ต้องเข้าสู่ระบบก่อนชำระเงิน
              </p>
            )}
            <Link to="/" className="btn btn-ghost btn-full" style={{ marginTop: 8, textAlign: 'center' }}>
              ← เลือกตั๋วเพิ่ม
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
