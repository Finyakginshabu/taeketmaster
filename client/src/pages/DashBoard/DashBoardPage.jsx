import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Comparison } from '../../components/Icons';
import { mockData, monthlyRevenueData } from '../../api/mockData.js';

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

      {/* Grid Container ที่กำหนดขนาด Base size ไว้ */}
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

        {/* กล่องขนาด 2x2 (กว้าง 2 เท่า สูง 2 เท่า ของ Base size) */}
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

        {/* กล่องขนาด 3x2 (กว้าง 3 ส่วน สูง 2 ส่วน สำหรับกราฟ) */}
        <div className="dash-card span-3x2 chart-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title center">Monthly Revenue</h3>
          
          {/* เพิ่มกล่องคลุมตรงนี้ เพื่อแบ่งซ้าย-ขวา */}
          <div style={{ display: 'flex', flex: 1, gap: '20px', alignItems: 'center', marginTop: '10px' }}>
            
            {/* ฝั่งซ้าย: ข้อความสถิติ */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '200px', gap: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>Peak Month</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--user-core-green)' }}>
                  {peakMonth.month === 'May' ? 'May' : peakMonth.month} 
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>Lowest Month</h4>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}> {/* สีฟ้า */}
                  {lowestMonth.month === 'Sep' ? 'September' : lowestMonth.month}
                </div>
              </div>
            </div>

            {/* ฝั่งขวา: Line Chart */}
            <div style={{ flex: 1, height: '80%', minHeight: '280px', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '15px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }} 
                    dy={10}
                  />
                  
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                    dx={-10}
                  />
                  
                  <Tooltip 
                    formatter={(value) => [`฿${value.toLocaleString()}`, "Revenue"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  
                  <Line 
                    type="linear" 
                    dataKey="revenue" 
                    stroke="#6366f1" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>
        </div>

        {/* กล่องขนาด 2x2 สำหรับกราฟ Bar chart */}
        <div className="dash-card span-1x2 chart-container">
          <h3 className="card-title center">Quarterly Sales</h3>
          <div className="chart-placeholder">
             {/* TODO: นำ Component กราฟแท่งมาใส่ตรงนี้ พร้อมส่ง props dashboardData.quarterlySales ไปให้ */}
             <p className="placeholder-text">Bar Chart Component Here</p>
          </div>
        </div>

      </div>
    </div>
  );
}