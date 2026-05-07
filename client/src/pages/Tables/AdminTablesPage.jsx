import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, GreenLogo } from '../../components/Icons.jsx';
import { mockTables } from "../../api/mockData.js";
import { TABLE_CONFIGS, INITIAL_DATA } from '../../api/tablesConfig.js';

function GenericTable({ title, config, onRowClick }) {
  const [rows, setRows]             = useState(INITIAL_DATA[title] ?? []);
  const [search, setSearch]         = useState('');
  const [page, setPage]             = useState(1);
  const [perPage, setPerPage]       = useState(5);
  const [editingId, setEditingId]   = useState(null);
  const [editForm, setEditForm]     = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
 
  useEffect(() => {
    setRows(INITIAL_DATA[title] ?? []);
    setSearch(''); setPage(1); setEditingId(null); setIsEditMode(false);
  }, [title]);
 
  // Add search logic from backend here
  // const filtered = useMemo(() => {
  //   const q = search.toLowerCase();
  //   return rows.filter(row =>
  //     config.searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(q))
  //   );
  // }, [rows, search, config.searchKeys]);
 
  const totalPages = Math.ceil(rows.length / perPage) || 1;
  const paginated  = rows.slice((page - 1) * perPage, page * perPage);
  // will change after add search logic from backend
  // const totalPages = Math.ceil(filtered.length / perPage) || 1;
  // const paginated  = filtered.slice((page - 1) * perPage, page * perPage);
 
  const handleAdd = () => {
    const newId  = Math.floor(Math.random() * 9000 + 1000).toString();
    const newRow = { id: newId, ...(config.newRowTemplate ?? {}) };
    setRows([newRow, ...rows]);
    setEditingId(newId); setEditForm(newRow); setIsEditMode(true);
  };
 
  const handleSave = () => {
    setRows(rows.map(r => r.id === editingId ? editForm : r));
    setEditingId(null);
  };
 
  const handleCancel = () => {
    const isNew    = rows.find(r => r.id === editingId);
    const allEmpty = isNew && config.newRowTemplate &&
      Object.keys(config.newRowTemplate).every(k => !editForm[k]);
    if (allEmpty) setRows(rows.filter(r => r.id !== editingId));
    setEditingId(null);
  };
 
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRows(rows.filter(r => r.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };
 
  return (
    <div className="table-card">
      <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>{title}</h2>
        <div className="search-pill">
          <Search width={20} className="search-icon" />
          <input type="text" placeholder={`Search ${config.searchKeys.join(', ')}...`}
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        </div>
        {config.editable && (
          <div className="card-actions">
            <button
              className={`action-btn outline-btn ${isEditMode ? 'active-edit' : ''}`}
              onClick={() => { setIsEditMode(!isEditMode); setEditingId(null); }}
            >
              {isEditMode ? 'Done' : 'Edit'}
            </button>
            <button className="action-btn add-btn" onClick={handleAdd}>
              <GreenLogo size={16} className="add-icon" /> Add
            </button>
          </div>
        )}
      </div>
 
      <table className="admin-table">
        <thead>
          <tr>
            {config.columns.map(col => <th key={col.key}>{col.label}</th>)}
            {isEditMode && <th style={{ width: '90px' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginated.length > 0 ? paginated.map(row => {
            const isEditing = editingId === row.id;
            return (
              <tr
                key={row.id}
                onClick={!isEditMode && config.clickable && onRowClick ? () => onRowClick(row) : undefined}
                className={config.clickable && !isEditMode ? 'clickable-row' : ''}
                style={{ backgroundColor: isEditing ? 'rgba(89, 107, 55, 0.05)' : 'transparent' }}
              >
                {config.columns.map(col => (
                  <td key={col.key}>
                    {isEditing && col.key !== 'id' ? (
                      <input type="text" value={editForm[col.key] ?? ''}
                        onChange={(e) => setEditForm({ ...editForm, [col.key]: e.target.value })}
                        className="inlineInputStyle" />) : row[col.key]}
                  </td>
                ))}
                {isEditMode && (
                  <td>
                    {isEditing ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <GreenLogo size={18} color="green" cursor="pointer" onClick={handleSave}   title="Save"   />
                        <GreenLogo size={18} color="red"   cursor="pointer" onClick={handleCancel} title="Cancel" />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <GreenLogo size={16} color="#737373" cursor="pointer" onClick={() => { setEditingId(row.id); setEditForm(row); }} title="Edit"   />
                        <GreenLogo size={16} color="#ff4d4f" cursor="pointer" onClick={() => handleDelete(row.id)}                    title="Delete" />
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={config.columns.length + (isEditMode ? 1 : 0)}
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
            <button className="page-btn" onClick={() => setPage(1)}                                   disabled={page === 1}>          <ChevronsLeft  size={16} /></button>
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}            disabled={page === 1}>          <ChevronLeft   size={16} /></button>
            <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}   disabled={page === totalPages}><ChevronRight  size={16} /></button>
            <button className="page-btn" onClick={() => setPage(totalPages)}                          disabled={page === totalPages}><ChevronsRight size={16} /></button>
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
        config={config}
        onRowClick={
          config.clickable
            // path: /tables/user/1008  (lowercase ไม่มี s, ตรงกับ Route pattern)
            ? (row) => navigate(`/tables/${tables.title.toLowerCase()}/${row.id}`)
            : undefined
        }
      />
    </div>
  );
}