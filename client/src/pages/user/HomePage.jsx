import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Mock data
const MOCK_CONCERTS = [
  { event_id: 1, title: 'BEDROOM SESSIONS LIVE', artist_name: 'Phum Viphurit', genre: 'Indie Pop', event_status: 'active', min_price: 1500, max_price: 4500, showtimes: [{ show_datetime: '2025-07-20T19:00:00', venue_name: 'Thunder Dome' }] },
  { event_id: 2, title: 'AFTERHOURS', artist_name: 'Slot Machine', genre: 'Rock', event_status: 'active', min_price: 1200, max_price: 3500, showtimes: [{ show_datetime: '2025-08-10T18:30:00', venue_name: 'Impact Arena' }] },
  { event_id: 3, title: 'NIGHT FREQUENCY', artist_name: 'MILLI', genre: 'Hip-Hop', event_status: 'active', min_price: 800, max_price: 2800, showtimes: [{ show_datetime: '2025-09-05T19:30:00', venue_name: 'Moonstar Studio' }] },
];

const GRADIENT_COLORS = ['#e8ff47,#2dd4bf', '#f97316,#ec4899', '#818cf8,#3b82f6'];

function formatDate(dt) {
  if (!dt) return "";
  return new Date(dt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function HomePage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return MOCK_CONCERTS.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) || 
      c.artist_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="page-container">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>ค้นหาคอนเสิร์ต</h1>
        <input 
          type="text" 
          placeholder="ค้นหาศิลปินหรือชื่องาน..." 
          className="form-input"
          style={{ maxWidth: '500px' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {filtered.map((concert, idx) => (
          <Link to={`/concerts/${concert.event_id}`} key={concert.event_id} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ height: '200px', background: `linear-gradient(135deg, ${GRADIENT_COLORS[idx % 3]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <h2 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', textAlign: 'center' }}>{concert.title}</h2>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p style={{ color: 'var(--primary-green)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{concert.genre}</p>
              <h3 style={{ marginBottom: '0.5rem' }}>🎤 {concert.artist_name}</h3>
              {/* เพิ่มตัวเช็คความปลอดภัยด้วย ?. เพื่อไม่ให้หน้าเว็บขาว */}
              <p>📅 {formatDate(concert.showtimes?.[0]?.show_datetime)}</p>
              <p>📍 {concert.showtimes?.[0]?.venue_name}</p>
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>฿{concert.min_price.toLocaleString()}</span>
                <button className="btn btn-primary" style={{ width: 'auto' }}>จองตั๋ว</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}