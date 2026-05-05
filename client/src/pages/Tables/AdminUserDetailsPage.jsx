import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import '../../styles/admin/AdminUserDetailsPage.css';
import '../../styles/admin/AdminTablesPage.css'; // For shared table and pagination styles

// Mock Data
const mockUserDetails = {
  '1008': {
    id: '1008',
    name: 'Khanatip Nokhuthot',
    email: 'khanatip.nokh@tae.ac.th',
    phone: '0670701008',
    address: { line1: '126 Pracha Uthit Rd.', line2: 'Bang Mod, Thung Khru', line3: 'Bangkok', country: 'Thailand' },
    history: [
      { id: 1, date: '28-04-2025', ticket: '8001070760', title: 'Four Woman Up Live', artist: 'Four Woman Up', venue: 'Suphachalasai Stadium', seat: 'C28', price: '3800.00' },
      { id: 2, date: '21-11-2022', ticket: '3377210176', title: 'Bodyslim Fest', artist: 'Bodyslim', venue: 'Rajamangala National Stadium', seat: 'A21', price: '3900.00' }
    ]
  },
  '1012': {
    id: '1012',
    name: 'Chawin Chinpraditsuk',
    email: 'chawin.chin@tae.ac.th',
    phone: '0670501012',
    address: { line1: '45 Sukhumvit 101', line2: 'Phra Khanong', line3: 'Bangkok', country: 'Thailand' },
    history: [
      { id: 1, date: '15-08-2024', ticket: '9002102911', title: 'Rock the Night', artist: 'Slot Machine', venue: 'Impact Arena', seat: 'B12', price: '2500.00' }
    ]
  },
  '1026': {
    id: '1026',
    name: 'Norawit Mahaprom',
    email: 'norawit.maha@tae.ac.th',
    phone: '0670701026',
    address: { line1: '88/1 Chiang Mai Road', line2: 'Muang', line3: 'Chiang Mai', country: 'Thailand' },
    history: [
      { id: 1, date: '10-01-2025', ticket: '1029381029', title: 'Indie Vibes', artist: 'Phum Viphurit', venue: 'Thunder Dome', seat: 'VIP1', price: '4500.00' },
      { id: 2, date: '05-09-2024', ticket: '1092837465', title: 'Hip Hop Night', artist: 'MILLI', venue: 'Moonstar Studio', seat: 'S01', price: '2000.00' }
    ]
  },
  '1080': {
    id: '1080',
    name: 'Chetsada Kiatkamonwong',
    email: 'chetsada.kiat@tae.ac.th',
    phone: '0670501080',
    address: { line1: '99 Silom Road', line2: 'Bang Rak', line3: 'Bangkok', country: 'Thailand' },
    history: []
  },
  '1087': {
    id: '1087',
    name: 'Supichaya Limwatanasamut',
    email: 'supichaya.limw@tae.ac.th',
    phone: '0670701087',
    address: { line1: '12 Ladprao 112', line2: 'Wang Thonglang', line3: 'Bangkok', country: 'Thailand' },
    history: [
      { id: 1, date: '22-12-2024', ticket: '4091827364', title: 'Pop Fever', artist: 'Youngampere', venue: 'Lido Connect', seat: 'F15', price: '1500.00' }
    ]
  }
};

const AdminUserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Fallback to 1008 if not found to demonstrate the UI
  const user = mockUserDetails[id] || mockUserDetails['1008'];

  return (
    <div className="admin-user-details-page">
      <div className="breadcrumbs">
        <Link to="/admin/tables" className="breadcrumb-link">Tables</Link>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-link" onClick={() => navigate('/admin/tables')}>Users</span>
        <span className="breadcrumb-separator">&gt;</span>
        <span className="breadcrumb-current">Users Details</span>
      </div>

      <div className="table-card info-card">
        <div className="info-grid">
          <div className="info-section">
            <h3 className="section-title">Basic Information</h3>
            
            <div className="info-field">
              <span className="info-label">ID</span>
              <span className="info-value">{user.id}</span>
            </div>
            
            <div className="info-field">
              <span className="info-label">Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            
            <div className="info-field">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            
            <div className="info-field">
              <span className="info-label">Phone</span>
              <span className="info-value">{user.phone}</span>
            </div>
          </div>
          
          <div className="info-section">
            <h3 className="section-title">Address</h3>
            
            <div className="info-field">
              <span className="info-label">Address Line 1</span>
              <span className="info-value">{user.address.line1}</span>
            </div>
            
            <div className="info-field">
              <span className="info-label">Address Line 2</span>
              <span className="info-value">{user.address.line2}</span>
            </div>
            
            <div className="info-field">
              <span className="info-label">Address Line 3</span>
              <span className="info-value">{user.address.line3}</span>
            </div>
            
            <div className="info-field">
              <span className="info-label">Country</span>
              <span className="info-value">{user.address.country}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="table-card history-card mt-6">
        <h3 className="section-title">History</h3>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticket</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Venue</th>
              <th>Seat</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {user.history.map((row) => (
              <tr key={row.id}>
                <td>{row.date}</td>
                <td>{row.ticket}</td>
                <td>{row.title}</td>
                <td>{row.artist}</td>
                <td>{row.venue}</td>
                <td>{row.seat}</td>
                <td>{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="card-footer">
          <div className="pagination-controls">
            <span className="pagination-text">Records per page</span>
            <select className="records-dropdown" defaultValue="2">
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
            
            <span className="pagination-text page-info">Page 1 of 1</span>
            
            <div className="pagination-buttons">
              <button className="page-btn"><ChevronsLeft size={16} /></button>
              <button className="page-btn"><ChevronLeft size={16} /></button>
              <button className="page-btn"><ChevronRight size={16} /></button>
              <button className="page-btn"><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailsPage;
