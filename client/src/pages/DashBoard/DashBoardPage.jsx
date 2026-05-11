import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Label } from 'recharts';
import { useAuth } from '../Login/AuthContext';
import { monthNamesFull } from '../../utils.js';
import { getTodayTicketSold, getTopSellingArtists, getTopTicketSpenders,
        getMonthlyRevenue, getQuaterRevenue, getPopularEvent, getTopSpender, } from '../../api/dashboard.api.js';

export default function Dashboard(){
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const [stats,           setStats]           = useState(null);
  const [topArtists,      setTopArtists]      = useState([]);
  const [topSpenders,     setTopSpenders]     = useState([]);
  const [monthlyRevenue,  setMonthlyRevenue]  = useState([]);
  const [quarterRevenue,  setQuarterRevenue]  = useState([]);
  const [popularEvents,   setPopularEvents]   = useState([]);
  const [allTimeSpenders, setAllTimeSpenders] = useState([]);
  const [isLoading,       setIsLoading]       = useState(true);
  const [error,           setError]           = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      return;
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          todayData,
          artistsData,
          spendersData,
          monthlyData,
          quarterData,
          popularData,
          allTimeData,
        ] = await Promise.all([
          getTodayTicketSold(),
          getTopSellingArtists(),
          getTopTicketSpenders(),
          getMonthlyRevenue(),
          getQuaterRevenue(),
          getPopularEvent(),
          getTopSpender(),
        ]);

        // 1. Stats ของวันนี้ (เก็บ object ไว้เหมือนเดิม ไปดึงค่าตอน Render)
        setStats(todayData);

        // 2. Top Artists: แปลงจาก Array of Objects ให้เหลือแค่ Array ของชื่อศิลปิน
        setTopArtists(artistsData.map(a => a.artist_name));

        // 3. Top Spenders (Quarter): แมป key ให้ตรงกับที่ตารางเรียกใช้
        setTopSpenders(spendersData.map(s => ({
          rank: s.rank,
          name: s.name,
          tickets: s.total_tickets
        })));

        // 4. Monthly Revenue: แปลง Object { jan: 100, feb: 200 } เป็น Array ให้ Recharts
        const formattedMonthly = Object.entries(monthlyData.monthly_revenue || {}).map(([month, rev]) => ({
          month: month,
          revenue: Number(rev)
        }));
        setMonthlyRevenue(formattedMonthly);

        // 5. Quarter Revenue: แปลง Object เป็น Array ให้ Recharts
        const formattedQuarter = Object.entries(quarterData.quater_revenue || {}).map(([quarter, rev]) => ({
          quarter: quarter,
          revenue: Number(rev)
        }));
        setQuarterRevenue(formattedQuarter);

        // 6. Popular Events: แปลง Object เป็น Array ให้ตาราง
        const formattedPopular = Object.entries(popularData.popular_events || {}).map(([eventName, seats], index) => ({
          rank: index + 1,
          name: eventName,
          remainingSeats: Number(seats)
        }));
        setPopularEvents(formattedPopular);

        // 7. All Time Spenders: แปลง Object เป็น Array ให้ตาราง
        const formattedAllTime = Object.entries(allTimeData.top_spenders || {}).map(([name, spent], index) => ({
          rank: index + 1,
          name: name,
          totalSpent: Number(spent)
        }));
        setAllTimeSpenders(formattedAllTime);
        setError(null);

      } catch (err){
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAdmin()) {
      fetchAll();
    }
  }, [isAdmin]);

  if(isLoading) return <div className="dashboard-loading">Loading Dashboard...</div>;
  if(error)     return <div className="dashboard-loading">err: {error}</div>;

  const peakMonth   = monthlyRevenue.reduce((max, cur) => cur.revenue > max.revenue ? cur : max, monthlyRevenue[0] ?? {});
  const lowestMonth = monthlyRevenue.reduce((min, cur) => cur.revenue < min.revenue ? cur : min, monthlyRevenue[0] ?? {});

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>

      <div className="dashboard-grid">

        <div className="span-1x2" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="dash-card" style={{ flex: 1 }}>
            <h3 className="card-title">Today's Tickets Sold</h3>
            <div className="stat-content">
              <span className="stat-number">
                {(() => {
                  const num = stats?.today?.total_tickets_sold || 0;
                  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm';
                  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
                  return num;
                })()}
              </span>
              <div className="stat-growth green">
                {stats?.difference_percent?.ticket_percent > 0 ? '+' : ''}
                {stats?.difference_percent?.ticket_percent || 0}%
                <br /><small>vs avg last 7 days</small>
              </div>
            </div>
          </div>

          <div className="dash-card" style={{ flex: 1 }}>
            <h3 className="card-title">Today's Revenue</h3>
            <div className="stat-content">
              {/* ดึงรายได้ */}
              <span className="stat-number">
                ฿{(() => {
                  const num = stats?.today?.total_revenue || 0;
                  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'm';
                  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
                  return num.toLocaleString();
                })()}
              </span>
              {/* ดึง % revenue_percent */}
              <div className="stat-growth green">
                {stats?.difference_percent?.revenue_percent > 0 ? '+' : ''}
                {stats?.difference_percent?.revenue_percent || 0}%
                <br /><small>vs avg last 7 days</small>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-card span-1x2">
          <h3 className="card-title center">Top Selling Artist</h3>
          <div className="artist-list">
            {topArtists.map((artist, idx) => (
              <h4 key={idx} className={idx === 0 ? 'top-1' : ''}>{artist}</h4>
            ))}
          </div>
        </div>

        <div className="dash-card span-2x2">
          <h3 className="card-title center">Top Ticket Spenders (Quarterly)</h3>
          <table className="spenders-table">
            <thead>
              <tr><th>Rank</th><th>Name</th><th>Total Tickets</th></tr>
            </thead>
            <tbody>
              {topSpenders.map((user) => (
                <tr key={user.rank}>
                  <td>{user.rank}</td>
                  <td>{user.name}</td>
                  <td>{user.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-card span-2x2 chart-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title center">Monthly Revenue</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '15px', marginTop: '10px' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '20px', color: 'var(--text-main)' }}>Peak Month: </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--green-on-white)' }}>
                {monthNamesFull[peakMonth.month] || peakMonth.month}
              </span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '20px', color: 'var(--text-main)' }}>Lowest Month: </span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                {monthNamesFull[lowestMonth.month] || lowestMonth.month}
              </span>
            </div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '15px 20px 10px 0', borderRadius: '8px', border: '1px solid #e5e7eb', width: '97%' }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `${v / 1000}k`} dx={-5} />
                <Tooltip formatter={(v) => [`฿${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="linear" dataKey="revenue" stroke="#D6E7B6" strokeWidth={2.5} dot={{ r: 4, fill: '#D6E7B6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card span-2x2" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title center" style={{ marginBottom: '16px' }}>Quarterly Revenue</h3>
          <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '15px 20px 20px 0', borderRadius: '8px', border: '1px solid #e5e7eb', width: '97%' }}>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={quarterRevenue} margin={{ top: 15, right: 10, left: 15, bottom: 20 }}>
                <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: '#333' }}>
                  <Label value="Quarter" offset={-15} position="insideBottom" style={{ fontSize: 13, fill: '#333' }} />
                </XAxis>
                <YAxis tick={{ fontSize: 12, fill: '#333' }}>
                  <Label value="Revenue" angle={-90} position="insideLeft" style={{ fontSize: 13, fill: '#333', textAnchor: 'middle' }} />
                </YAxis>
                <Tooltip formatter={(v) => [`฿${v.toLocaleString()}`, 'Revenue']} cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="revenue" fill="#D6E7B6" barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card span-2x2">
          <h3 className="card-title center">Most Popular Events</h3>
          <table className="spenders-table">
            <thead>
              <tr><th>Rank</th><th>Concert Title</th><th>Remaining Seats</th></tr>
            </thead>
            <tbody>
              {popularEvents.map((event) => (
                <tr key={event.rank}>
                  <td>{event.rank}</td>
                  <td>{event.name}</td>
                  <td>{event.remainingSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-card span-2x2">
          <h3 className="card-title center">Top Spender (All-time)</h3>
          <table className="spenders-table">
            <thead>
              <tr><th>Rank</th><th>Name</th><th>Total Spent</th></tr>
            </thead>
            <tbody>
              {allTimeSpenders.map((user) => (
                <tr key={user.rank}>
                  <td>{user.rank}</td>
                  <td>{user.name}</td>
                  <td>{user.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}