import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '../../components/Icons.jsx';
import { getUserById, getUserBookings } from '../../api/tables.api.js';








const USER_FIELDS = [
  { key: 'user_id',    label: 'ID' },
  { key: 'first_name',  label: 'First Name' },
  { key: 'last_name',  label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'username', label: 'Username' },
  { key: 'role', label: 'Role' },
  { key: 'registered_at', label: 'Registered Date' }
];

export default function AdminUserDetailPage(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage]       = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = Math.ceil(bookings.length / perPage) || 1;
  const paginated  = bookings.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    async function fetchUserData(){
      try {
        setLoading(true);
        setError(null);
        
        const userData = await getUserById(id);
        setUser(userData);
        
        try {
          const bookingsData = await getUserBookings(id);
          setBookings(bookingsData);
        } catch (err) {
          console.log('No bookings found for user:', err.message);
          setBookings([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to load user data');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    }

    if(id){
      fetchUserData();
    }
  }, [id]);

  if(loading){
    return (
      <div className="admin-table">
        <p>Loading user data...</p>
      </div>
    );
  }

  if(error){
    return (
      <div className="admin-table">
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }

  if(!user){
    return (
      <div className="admin-table">
        <p>ไม่พบข้อมูล User ID: {id}</p>
      </div>
    );
  }

  function formatDate(dateString){
    if(!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  return (
    <div className="admin-table">

      <div className="breadcrumbs">
        <Link to="/tables" className="breadcrumb-link">Tables</Link>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-link"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(-1)}>
          User
        </span>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-current">{user.first_name} {user.last_name}</span>
      </div>

      <div className="user-table-card">

        <dl className="fieldGrid">
          <span style={{fontSize: '26px', fontWeight: 'bold', gridColumn: '1'}}>User Information</span>
          {USER_FIELDS.map(({ key, label }) => {
            let displayValue = user[key] || '—';
            
            if(key === 'registered_at'){
              displayValue = formatDate(user[key]);
            }

            return (
              <div key={key} className="fieldItem">
                <dt className="fieldLabel">{label}</dt>
                <dd className="fieldValue">{displayValue}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className="user-table-card" style={{ marginTop: '24px' }}>
        <div className="card-header" style={{ marginBottom: '4px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>Booking History</h2>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map(b => (
              <tr key={b.booking_id}>
                <td>{b.booking_id}</td>
                <td>{formatDate(b.booked_at)}</td>
                <td>{b.total_price}</td>
                {




}
              </tr>
            )) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '28px', color: '#737373' }}>
                  No booking records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="card-footer">
          <div className="pagination-controls">
            <span className="pagination-text">Records per page</span>
            <select
              className="records-dropdown"
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
            >
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="10">10</option>
            </select>
            <span className="pagination-text page-info">
              Page {page} of {totalPages}
            </span>
            <div className="pagination-buttons">
              <button className="page-btn" onClick={() => setPage(1)}                                    disabled={page === 1}>          <ChevronsLeft  size={16} /></button>
              <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}             disabled={page === 1}>          <ChevronLeft   size={16} /></button>
              <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}    disabled={page === totalPages}><ChevronRight  size={16} /></button>
              <button className="page-btn" onClick={() => setPage(totalPages)}                           disabled={page === totalPages}><ChevronsRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
