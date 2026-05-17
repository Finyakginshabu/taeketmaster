import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Add, Edit, Delete } from '../../components/Icons.jsx';
import { TABLE_CONFIGS, mockTables } from '../../utils.js';
import {
  getArtists, deleteArtist,
  getGenres, deleteGenre,
  getAgents, deleteAgent,
  getVenues, deleteVenue,
  getUsers,
  getBookings,
  getPayments,
  getTickets,
} from '../../api/tables.api.js';

// Map table title -> { fetch, del, idKey }
const API_MAP = {
  Artists:  { fetch: getArtists,  del: deleteArtist,  idKey: 'artist_id'  },
  Genres:   { fetch: getGenres,   del: deleteGenre,   idKey: 'genre_id'   },
  Agents:   { fetch: getAgents,   del: deleteAgent,   idKey: 'agent_id'   },
  Venues:   { fetch: getVenues,   del: deleteVenue,   idKey: 'venue_id'   },
  Users:    { fetch: getUsers,    del: null,           idKey: 'user_id'    },
  Bookings: { fetch: getBookings, del: null,           idKey: 'booking_id' },
  Payments: { fetch: getPayments, del: null,           idKey: 'payment_id' },
  Tickets:  { fetch: getTickets,  del: null,           idKey: 'ticket_id'  },
};

function GenericTable({ title, config, onRowClick, onEditClick, onAddClick, idKey }){
  const [rows, setRows]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    setSearch(''); setPage(1);
    const apiEntry = API_MAP[title];
    if(apiEntry){
      setLoading(true);
      apiEntry.fetch()
        .then(data => setRows(data || []))
        .catch(err => { console.error(`Failed to fetch ${title}:`, err); setRows([]); })
        .finally(() => setLoading(false));
    } else {
      setRows([]);
      setLoading(false);
    }
  }, [title]);

  const filtered = rows.filter(row =>
    config.searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(search.toLowerCase()))
  );
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated  = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async (id) => {
    if(!window.confirm('Delete for sure, huh?')) return;
    const apiEntry = API_MAP[title];
    if(!apiEntry?.del) return;
    try {
      await apiEntry.del(id);
      const idKey = apiEntry.idKey;
      setRows(rows.filter(r => r[idKey] !== id));
    } catch (err){
      console.error('Delete failed:', err);
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="table-card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h2 className="card-title" style={{ margin: 0 }}>{title}</h2>
          <div className="search-pill">
            <Search width={20} className="search-icon" />
            <input type="text" placeholder={`Search ${config.searchKeys.join(', ')}...`}
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
        </div>

        {config.editable && (
          <Add width={100} onClick={onAddClick} />
        )}
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            {config.columns.map(col => <th key={col.key}>{col.label}</th>)}
            {config.editable && <th style={{ width: '90px' }} />}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={config.columns.length + (config.editable ? 1 : 0)} style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
          ) : paginated.length > 0 ? paginated.map(row => {
            const rowId = row[idKey] ?? row.id;
            return (
            <tr
              key={rowId}
              onClick={config.clickable && onRowClick ? () => onRowClick(row) : undefined}
              className={config.clickable ? 'clickable-row' : ''}
            >
              {config.columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              {config.editable && (
                <td>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Edit
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => { e.stopPropagation(); onEditClick(row); }}
                      title="Edit"
                    />
                    <Delete
                      style={{ cursor: 'pointer' }}
                      onClick={(e) => { e.stopPropagation(); handleDelete(rowId); }}
                      title="Delete"
                    />
                  </div>
                </td>
              )}
            </tr>
            );
          }) : (
            <tr>
              <td colSpan={config.columns.length + (config.editable ? 1 : 0)}
                  style={{ textAlign: 'center', padding: '20px' }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="card-footer">
        <div className="pagination-controls">
          <span className="pagination-text">Records per page</span>
          <select className="records-dropdown" value={perPage}
            onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="500">All</option>
          </select>
          <span className="pagination-text page-info">
            Page {page} of {totalPages}
          </span>
          <div className="pagination-buttons">
            <button className="page-btn" onClick={() => setPage(1)}                                  disabled={page === 1}>         <ChevronsLeft  size={16} /></button>
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}           disabled={page === 1}>         <ChevronLeft   size={16} /></button>
            <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}  disabled={page === totalPages}><ChevronRight  size={16} /></button>
            <button className="page-btn" onClick={() => setPage(totalPages)}                         disabled={page === totalPages}><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminTablesPage(){
  const { id }   = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState(null);

  useEffect(() => {
    if(id){
      const found = mockTables.find(t => t.id === Number(id));
      if(found) setTables(found);
    }
  }, [id]);

  if(!tables) return <div>Loading...</div>;

  const config = TABLE_CONFIGS[tables.title];
  if(!config)  return <div>ไม่รองรับตาราง "{tables.title}"</div>;

  const resolvedConfig = !config.clickable
    ? { ...config, editable: true }
    : config;

  const titleLower = tables.title.toLowerCase();
  const isManageable = tables.isManageable;

  return (
    <div className="admin-tables-page">
      <div className="breadcrumbs">
        <Link to="/tables" className="breadcrumb-link">Tables</Link>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-current">{tables.title}</span>
      </div>

      <GenericTable
        key={tables.title}
        title={tables.title}
        config={{ ...resolvedConfig, editable: resolvedConfig.editable && isManageable }}
        idKey={config?.idKey || API_MAP[tables.title]?.idKey || 'id'}
        onRowClick={
          config.clickable
            ? (row) => navigate(`/tables/${titleLower}/${row[config?.idKey || 'id']}`)
            : undefined
        }
        onEditClick={
          isManageable
            ? (row) => navigate(`/tables/${titleLower}/edit/${row[config?.idKey || 'id']}`)
            : undefined
        }
        onAddClick={
          isManageable
            ? () => navigate(`/tables/${titleLower}/add`)
            : undefined
        }
      />
    </div>
  );
}
