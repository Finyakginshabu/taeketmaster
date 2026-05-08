import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Label } from 'recharts';
import { Comparison } from '../../components/Icons';
import { monthNamesFull } from '../../utils.js';
import { mockData, monthlyRevenueData, quarterlySalesData } from '../../api/mockData.js';

export default function Dashboard() {
  //store query data here
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    topSpenders: [],
    monthlyBookings: null,
    quarterlySales: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // const response = await fetch('/api/dashboard-summary');
        // const data = await response.json();

        setDashboardData(mockData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) return <div className="dashboard-loading">Loading Dashboard...</div>;

  const peakMonth = monthlyRevenueData.reduce((max, current) => (current.revenue > max.revenue ? current : max), monthlyRevenueData[0]);
  const lowestMonth = monthlyRevenueData.reduce((min, current) => (current.revenue < min.revenue ? current : min), monthlyRevenueData[0]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <Link to="/comparison" className="comparison-btn">
          <Comparison width={24}/> Comparison
        </Link>
      </div>

      <div className="dashboard-grid">

        <div className="span-1x2" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="dash-card" style={{ flex: 1 }}>
            <h3 className="card-title">Today's Tickets Sold</h3>
            <div className="stat-content">
              <span className="stat-number">{dashboardData.stats.todayBooking}</span>
              <div className="stat-growth green"> {dashboardData.stats.todayBookingGrowth} <br/><small>tickets sold</small></div>
            </div>
          </div>

          <div className="dash-card" style={{ flex: 1 }}>
            <h3 className="card-title">Today's Revenue</h3>
            <div className="stat-content">
              <span className="stat-number">{dashboardData.stats.todayPayment}</span>
              <div className="stat-growth green"> {dashboardData.stats.todayPaymentGrowth} <br/><small>THB</small></div>
            </div>
          </div>
        </div>

        <div className="dash-card span-1x2">
          <h3 className="card-title center">Top Selling Artist</h3>
          <div className="artist-list">
            {dashboardData.stats.topArtists.map((artist, idx) => (
              <h4 key={idx} className={idx === 0 ? 'top-1' : ''}>{artist}</h4>
            ))}
          </div>
        </div>

        <div className="dash-card span-2x2">
          <h3 className="card-title center">Top Ticket Spenders (Quarterly)</h3>
          <table className="spenders-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total Tickets</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topSpenders.map((user) => (
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
          
          {/* ย้าย Peak/Lowest มาเรียงแนวนอนไว้ด้านบนกราฟ */}
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

          {/* กราฟเส้น (จะกว้างเต็มกล่องพอดี) */}
          <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '15px 20px 10px 0', borderRadius: '8px', border: '1px solid #e5e7eb', width: '97%' }}>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(value) => `${value / 1000}k`} dx={-5} />
                <Tooltip formatter={(value) => [`฿${value.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="linear" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card span-2x2" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title center" style={{ marginBottom: '16px' }}>Quarterly Revenue</h3>

          <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '15px 20px 20px 0', borderRadius: '8px', border: '1px solid #e5e7eb', width: '97%' }}>
              <ResponsiveContainer width="100%" height={280}>
                {/* ... โค้ด <BarChart> ตัวเดิมของคุณใส่ตรงนี้ได้เลย ... */}
                <BarChart data={quarterlySalesData} margin={{ top: 15, right: 10, left: 15, bottom: 20 }}>
                  <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: '#333' }}>
                    <Label value="Quarter" offset={-15} position="insideBottom" style={{ fontSize: 13, fill: '#333' }} />
                  </XAxis>
                  <YAxis tick={{ fontSize: 12, fill: '#333' }}>
                    <Label value="Revenue" angle={-90} position="insideLeft" style={{ fontSize: 13, fill: '#333', textAnchor: 'middle' }} />
                  </YAxis>
                  <Tooltip formatter={(value) => [`฿${value.toLocaleString()}`, "Revenue"]} cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="revenue" fill="#6366f1" barSize={45} />
                </BarChart>
              </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card span-2x2">
          <h3 className="card-title center">Most Popular Events</h3>
          <table className="spenders-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Concert Title</th>
                <th>Remaining Seats</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topSpenders.map((user) => (
                <tr key={user.rank}>
                  <td>{user.rank}</td>
                  <td>{user.name}</td>
                  <td>{user.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dash-card span-2x2">
          <h3 className="card-title center">Top Spender (All-time)</h3>
          <table className="spenders-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Total spent</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.topSpenders.map((user) => (
                <tr key={user.rank}>
                  <td>{user.rank}</td>
                  <td>{user.name}</td>
                  <td>{user.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}