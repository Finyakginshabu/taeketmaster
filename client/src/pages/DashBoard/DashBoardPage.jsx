import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comparison } from '../../components/Icons';
import { mockData } from '../../api/mockData.js';

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
        
        {/* กล่องขนาด 1x1 (320x180) */}
        <div className="dash-card span-1x1">
          <h3 className="card-title">Today's Booking</h3>
          <div className="stat-content">
            <span className="stat-number">{dashboardData.stats.todayBooking}</span>
            <div className="stat-growth green">
              {dashboardData.stats.todayBookingGrowth} <br/><small>bookings</small>
            </div>
          </div>
        </div>

        {/* กล่องขนาด 1x1 */}
        <div className="dash-card span-1x1">
          <h3 className="card-title">Today's Payment</h3>
          <div className="stat-content">
            <span className="stat-number">{dashboardData.stats.todayPayment}</span>
            <div className="stat-growth green">
              {dashboardData.stats.todayPaymentGrowth} <br/><small>THB</small>
            </div>
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

        {/* กล่องขนาด 1x1 */}
        <div className="dash-card span-1x1">
          <h3 className="card-title center">Top payment</h3>
          <div className="payment-method-content">
            <span className="card-icon">💳</span>
            <span className="method-name">{dashboardData.stats.topPaymentMethod}</span>
          </div>
        </div>

        {/* กล่องขนาด 1x1 */}
        <div className="dash-card span-1x1">
          <h3 className="card-title center">Top Selling Artist</h3>
          <div className="artist-list">
            {dashboardData.stats.topArtists.map((artist, idx) => (
              <h4 key={idx} className={idx === 0 ? 'top-1' : ''}>{artist}</h4>
            ))}
          </div>
        </div>

        {/* กล่องขนาด 3x2 (กว้าง 3 ส่วน สูง 2 ส่วน สำหรับกราฟ) */}
        <div className="dash-card span-3x2 chart-container">
          <h3 className="card-title center">Monthly Ticket Bookings</h3>
          <div className="chart-placeholder">
            {/* TODO: นำ Component กราฟมาใส่ตรงนี้ พร้อมส่ง props dashboardData.monthlyBookings ไปให้ */}
            <p className="placeholder-text">Line Chart Component Here</p>
          </div>
        </div>

        {/* กล่องขนาด 2x2 สำหรับกราฟ Bar chart */}
        <div className="dash-card span-2x2 chart-container">
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