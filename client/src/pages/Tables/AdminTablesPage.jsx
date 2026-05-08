<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Add, Edit, Delete } from '../../components/Icons.jsx';
import { mockTables } from "../../api/mockData.js";
import { TABLE_CONFIGS, INITIAL_DATA } from '../../utils.js';

function GenericTable({ title, config, onRowClick, onEditClick, onAddClick }) {
  const [rows, setRows]     = useState(INITIAL_DATA[title] ?? []);
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    setRows(INITIAL_DATA[title] ?? []);
    setSearch(''); setPage(1);
  }, [title]);

  const totalPages = Math.ceil(rows.length / perPage) || 1;
  const paginated  = rows.slice((page - 1) * perPage, page * perPage);

  // Add api here
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await fetch(`/api/${title.toLowerCase()}/${id}`, { method: 'DELETE' });
      setRows(rows.filter(r => r.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed. Please try again.');
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
          {paginated.length > 0 ? paginated.map(row => (
            <tr
              key={row.id}
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
                      onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}
                      title="Delete"
                    />
                  </div>
                </td>
              )}
            </tr>
          )) : (
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
            <option value="8">8</option>
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

export default function AdminTablesPage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [tables, setTables] = useState(null);

  useEffect(() => {
    if (id) {
      const found = mockTables.find(t => t.id === Number(id));
      if (found) setTables(found);
    }
  }, [id]);

  if (!tables) return <div>Loading...</div>;

  const config = TABLE_CONFIGS[tables.title];
  if (!config)  return <div>ไม่รองรับตาราง "{tables.title}"</div>;

  const resolvedConfig = !config.clickable
    ? { ...config, editable: true }
    : config;

  const titleLower = tables.title.toLowerCase();

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
        config={resolvedConfig}
        onRowClick={
          config.clickable
            ? (row) => navigate(`/tables/${titleLower}/${row.id}`)
            : undefined
        }
        onEditClick={
          resolvedConfig.editable
            ? (row) => navigate(`/tables/${titleLower}/edit/${row.id}`)
            : undefined
        }
        onAddClick={
          resolvedConfig.editable
            ? () => navigate(`/tables/${titleLower}/add`)
            : undefined
        }
      />
    </div>
  );
}
=======
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, GreenLogo } from '../../components/Icons.jsx';

const initialMockUsers = [
  { id: '1008', name: 'Khanatip Nokhuthot', email: 'khanatip.nokh@tae.ac.th', phone: '0670701008' },
  { id: '1012', name: 'Chawin Chinpraditsuk', email: 'chawin.chin@tae.ac.th', phone: '0670501012' },
  { id: '1026', name: 'Norawit Mahaprom', email: 'norawit.maha@tae.ac.th', phone: '0670701026' },
  { id: '1080', name: 'Chetsada Kiatkamonwong', email: 'chetsada.kiat@tae.ac.th', phone: '0670501080' },
  { id: '1087', name: 'Supichaya Limwatanasamut', email: 'supichaya.limw@tae.ac.th', phone: '0670701087' },
];

const initialMockEvents = [
  { id: '5223', title: 'Four Woman Up', artist: 'Pimchaya', agentEmail: 'chromosomelab@chro.ac.th' },
  { id: '5228', title: 'Youngampere', artist: 'Supattra', agentEmail: 'allreadylife@gmail.com' },
];

const AdminTablesPage = () => {
  const [showManageable, setShowManageable] = useState(false);

  const [events, setEvents] = useState(initialMockEvents);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const [usersPage, setUsersPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  const navigate = useNavigate();

  // Event Handlers
  const handleAddEvent = () => {
    const newId = Math.floor(Math.random() * 9000 + 1000).toString();
    const newEvent = { id: newId, title: '', artist: '', agentEmail: '' };
    setEvents([newEvent, ...events]);
    setEditingEventId(newId);
    setEditFormData(newEvent);
    setIsEditMode(true);
  };

  const startEdit = (event) => {
    setEditingEventId(event.id);
    setEditFormData(event);
  };

  const cancelEdit = () => {
    setEditingEventId(null);
  };

  const saveEdit = () => {
    setEvents(events.map(e => e.id === editingEventId ? editFormData : e));
    setEditingEventId(null);
  };

  const handleDeleteEvent = (id) => {
    if(window.confirm('Are you sure you want to delete this event?')){
      setEvents(events.filter(e => e.id !== id));
      if(editingEventId === id){
        setEditingEventId(null);
      }
    }
  };

  const handleFormChange = (e, field) => {
    setEditFormData({ ...editFormData, [field]: e.target.value });
  };

  return (
    <div className="admin-tables-page">
      <div className="page-header">
        <h1 className="page-title">Tables</h1>
        
        <div className="header-actions">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showManageable}
              onChange={(e) => setShowManageable(e.target.checked)}
            />
            <span className="checkmark"></span>
            show only manageable tables
          </label>
          
          <div className="search-pill global-search">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search users, events..." 
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      {!showManageable && (
        <div className="table-card">
          <div className="card-header">
            <h2 className="card-title">Users</h2>
            <div className="search-pill table-search">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search id, name, email..." 
              />
            </div>
          </div>

          <table className="admin-table user-table-clickable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                <tr 
                  key={user.id} 
                  onClick={() => navigate(`/admin/tables/users/${user.id}`)}
                  className="clickable-row"
                >
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>No users found.</td></tr>
              )}
            </tbody>
          </table>

          <div className="card-footer">
            <div className="pagination-controls">
              <span className="pagination-text">Records per page</span>
              <select 
                className="records-dropdown" 
                value={usersPerPage}
                onChange={(e) => {
                  setUsersPerPage(Number(e.target.value));
                  setUsersPage(1);
                }}
              >
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span className="pagination-text page-info">Page{usersPage} of {Math.ceil(filteredUsers.length / usersPerPage) || 1}</span>
              <div className="pagination-buttons">
                <button className="page-btn" onClick={() => setUsersPage(1)}><ChevronsLeft size={16} /></button>
                <button className="page-btn" onClick={() => setUsersPage(Math.max(1, usersPage - 1))}><ChevronLeft size={16} /></button>
                <button className="page-btn" onClick={() => setUsersPage(usersPage + 1)}><ChevronRight size={16} /></button>
                <button className="page-btn" onClick={() => setUsersPage(Math.ceil(filteredUsers.length / usersPerPage) || 1)}><ChevronsRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Events Table */}
      <div className="table-card mt-6">
        <div className="card-header">
          <h2 className="card-title">Events</h2>
          <div className="search-pill table-search mr-auto">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search id, title, artist..." 
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
            />
          </div>
          
          <div className="card-actions">
            <button 
              className={`action-btn outline-btn ${isEditMode ? 'active-edit' : ''}`}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? 'Done' : 'Edit'}
            </button>
            <button className="action-btn add-btn" onClick={handleAddEvent}>
              <GreenLogo size={16} className="add-icon" />
              Add
            </button>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Agent Email</th>
              {isEditMode && <th style={{width: '90px'}}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? filteredEvents.map((event) => {
              const isEditing = editingEventId === event.id;
              return (
                <tr key={event.id} style={{ backgroundColor: isEditing ? 'rgba(89, 107, 55, 0.05)' : 'transparent' }}>
                  <td>{event.id}</td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editFormData.title} 
                        onChange={(e) => handleFormChange(e, 'title')}
                        style={inlineInputStyle}
                      />
                    ) : event.title}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editFormData.artist} 
                        onChange={(e) => handleFormChange(e, 'artist')}
                        style={inlineInputStyle}
                      />
                    ) : event.artist}
                  </td>
                  <td>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={editFormData.agentEmail} 
                        onChange={(e) => handleFormChange(e, 'agentEmail')}
                        style={inlineInputStyle}
                      />
                    ) : event.agentEmail}
                  </td>
                  {isEditMode && (
                    <td>
                      {isEditing ? (
                        <div style={{display: 'flex', gap: '8px'}}>
                          <GreenLogo size={18} color="green" cursor="pointer" onClick={saveEdit} />
                          <GreenLogo size={18} color="red" cursor="pointer" onClick={cancelEdit} />
                        </div>
                      ) : (
                        <div style={{display: 'flex', gap: '12px'}}>
                          <GreenLogo size={16} color="#737373" cursor="pointer" onClick={() => startEdit(event)} title="Edit" />
                          <GreenLogo size={16} color="#ff4d4f" cursor="pointer" onClick={() => handleDeleteEvent(event.id)} title="Delete" />
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              );
            }) : (
              <tr><td colSpan={isEditMode ? 5 : 4} style={{textAlign: 'center', padding: '20px'}}>No events found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const inlineInputStyle = {
  width: '100%',
  padding: '6px 8px',
  borderRadius: '4px',
  border: '1px solid #a3a3a3',
  background: '#fff',
  fontSize: '0.9rem'
};

export default AdminTablesPage;
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
