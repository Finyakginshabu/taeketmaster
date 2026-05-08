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