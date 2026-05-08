import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TABLE_CONFIGS } from '../../utils.js';

export default function AdminAddPage() {
  const navigate    = useNavigate();
  const { tableTitle } = useParams(); // /tables/:tableTitle/add

  const configKey = Object.keys(TABLE_CONFIGS).find(
    k => k.toLowerCase() === tableTitle?.toLowerCase()
  );
  const config         = configKey ? TABLE_CONFIGS[configKey] : null;
  const editableColumns = config?.columns.filter(col => col.key !== 'id') ?? [];

  const [formData, setFormData] = useState(
    () => Object.fromEntries(editableColumns.map(col => [col.key, '']))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    // TODO: เชื่อม API จริง
    // await fetch(`/api/${tableTitle}`, { method: 'POST', body: JSON.stringify(formData) });
    navigate(-1);
  };

  if (!config) return <div>ไม่รองรับตาราง "{tableTitle}"</div>;

  return (
    <div className="admin-add-event-page">
      <div className="breadcrumbs">
        <Link to="/tables" className="breadcrumb-link">Tables</Link>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-link" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          {configKey}
        </span>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-current">Add</span>
      </div>

      <div className="form-card">
        <h2 className="form-title">Add {configKey}</h2>
        <hr className="title-divider" />

        <form onSubmit={handleAdd} className="event-form">
          <div className="form-grid">
            {editableColumns.map(col => (
              <div key={col.key} className="form-group">
                <label htmlFor={col.key}>{col.label}</label>
                <input
                  type="text"
                  id={col.key}
                  name={col.key}
                  value={formData[col.key] ?? ''}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-add">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}