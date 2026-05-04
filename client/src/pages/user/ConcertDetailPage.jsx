import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// ข้อมูลจำลองให้ตรงกับหน้ารายละเอียด
const MOCK_CONCERTS = {
  1: {
    title: 'BEDROOM SESSIONS LIVE',
    artist: 'Phum Viphurit',
    date: 'Sunday, 20 July 2025',
    time: '19:00 - 22:00',
    venue: 'Thunder Dome, Muang Thong Thani',
    description: 'Experience the cozy vibes of Phum Viphurit in an intimate live session. Featuring all your favorite hits from Manchild and Bangkok Balter Club.',
    image: 'linear-gradient(135deg, #e8ff47, #2dd4bf)',
    zones: [
      { id: 'A', name: 'Zone A (Standing)', price: 4500, remaining: 12 },
      { id: 'B', name: 'Zone B (Seating)', price: 3500, remaining: 45 },
      { id: 'C', name: 'Zone C (Seating)', price: 1500, remaining: 0 }
    ]
  }
};

export default function ConcertDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const concert = MOCK_CONCERTS[id] || MOCK_CONCERTS[1];

  const handleAddToCart = (zone) => {
    addItem({
      id: `${id}-${zone.id}`,
      title: concert.title,
      zone: zone.name,
      price: zone.price,
      image: concert.image
    });
    alert(`เพิ่ม ${zone.name} ลงตะกร้าแล้ว!`);
  };

  return (
    <div className="page-container">
      {/* 1. Banner Section */}
      <div className="card" style={{ 
        height: '350px', 
        background: concert.image, 
        display: 'flex', 
        alignItems: 'flex-end', 
        padding: '2rem',
        marginBottom: '2rem' 
      }}>
        <h1 style={{ color: 'white', fontSize: '3rem', textShadow: '3px 3px 0px var(--primary-dark)' }}>
          {concert.title}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
        
        {/* 2. Left Column: Details */}
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ borderBottom: '3px solid var(--primary-dark)', paddingBottom: '0.5rem' }}>About</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{concert.description}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Artist</label>
              <div style={{ fontWeight: '800' }}>🎤 {concert.artist}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <div style={{ fontWeight: '800' }}>📍 {concert.venue}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <div style={{ fontWeight: '800' }}>📅 {concert.date}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <div style={{ fontWeight: '800' }}>⏰ {concert.time}</div>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Ticket Selection */}
        <div className="form-container" style={{ margin: '0', maxWidth: '100%' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Select Tickets</h2>
          
          {concert.zones.map(zone => (
            <div key={zone.id} className="card" style={{ 
              padding: '1rem', 
              marginBottom: '1rem', 
              background: zone.remaining === 0 ? '#eee' : 'var(--bg-cream)',
              opacity: zone.remaining === 0 ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '800' }}>{zone.name}</div>
                  <div style={{ fontSize: '0.9rem', color: zone.remaining < 15 ? 'red' : 'inherit' }}>
                    {zone.remaining === 0 ? 'SOLD OUT' : `Remaining: ${zone.remaining}`}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    ฿{zone.price.toLocaleString()}
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{ width: 'auto', padding: '0.5rem 1rem' }}
                    disabled={zone.remaining === 0}
                    onClick={() => handleAddToCart(zone)}
                  >
                    {zone.remaining === 0 ? 'หมด' : 'เลือก'}
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button 
            className="btn btn-primary" 
            style={{ marginTop: '1rem', background: 'var(--primary-dark)' }}
            onClick={() => navigate('/cart')}
          >
            ไปที่ตะกร้าสินค้า
          </button>
        </div>

      </div>
    </div>
  );
}