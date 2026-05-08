import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '../../components/Icons.jsx';
import { INITIAL_DATA, MOCK_BOOKINGS } from '../../utils.js';

// ── Status badge style ───────────────────────────────────────────────────────
// const STATUS_STYLE = {
//   Confirmed: { background: 'rgba(89,107,55,0.12)', color: '#3d5a1e', border: '1px solid rgba(89,107,55,0.3)' },
//   Cancelled: { background: 'rgba(220,53,69,0.1)',  color: '#b91c1c', border: '1px solid rgba(220,53,69,0.3)' },
//   Pending:   { background: 'rgba(202,138,4,0.1)',  color: '#92400e', border: '1px solid rgba(202,138,4,0.3)' },
// };

const USER_FIELDS = [
  { key: 'id',    label: 'ID' },
  { key: ['houseNo', 'streetName'], label: 'Address Line 1' },
  { key: 'name',  label: 'Name' },
  { key: ['subDistrict', 'district'], label: 'Address Line 2' },
  { key: 'email', label: 'Email' },
  { key: 'province', label: 'Address Line 3' },
  { key: 'phone', label: 'Phone' },
  { key: 'postalCode', label: 'Postal Code' }
];

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useMemo(() => INITIAL_DATA.User.find(u => u.id === id), [id]);
  const bookings = MOCK_BOOKINGS[id] ?? [];

  const [page, setPage]       = useState(1);
  const [perPage, setPerPage] = useState(5);
  const totalPages = Math.ceil(bookings.length / perPage) || 1;
  const paginated  = bookings.slice((page - 1) * perPage, page * perPage);

  if (!user) {
    return (
      <div className="admin-table">
        <p>ไม่พบข้อมูล User ID: {id}</p>
      </div>
    );
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
        <span className="breadcrumb-current">{user.name}</span>
      </div>

      <div className="user-table-card">

        <dl className="fieldGrid">
          <span style={{fontSize: '26px', fontWeight: 'bold'}}>Basic Information</span>
          <span style={{fontSize: '26px', fontWeight: 'bold'}}>Address</span>
          {USER_FIELDS.map(({ key, label }) => {
            let displayValue;

            if (Array.isArray(key)) {
              const values = key.map(k => user[k]).filter(Boolean);
              displayValue = values.length > 0 ? values.join(' ') : '—';
            } else {
              displayValue = user[key] || '—';
            }

            const reactKey = Array.isArray(key) ? key.join('-') : key;

            return (
              <div key={reactKey} className="fieldItem">
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
              <th>Date</th>
              <th>Ticket</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Venue</th>
              <th>Seat</th>
              <th>Price</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map(b => (
              <tr key={b.id}>
                <td>{b.date}</td>
                <td>{b.ticket}</td>
                <td>{b.title}</td>
                <td>{b.artist}</td>
                <td>{b.venue}</td>
                <td>{b.seat}</td>
                <td>{b.price}</td>
                {/* Payment Status (optional) เผื่อไว้ก่อน
                <td>
                  <span style={{ ...styles.badge, ...STATUS_STYLE[b.status] }}>
                    {b.status}
                  </span>
                </td> */}
                <td>{b.amount}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '28px', color: '#737373' }}>
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