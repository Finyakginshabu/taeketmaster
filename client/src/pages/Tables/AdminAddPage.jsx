import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TABLE_CONFIGS, mockTables } from '../../utils.js';
import { API_CREATE_MAP } from '../../api/tables.api.js';

export default function AdminAddPage(){
  const navigate    = useNavigate();
  const { tableTitle } = useParams(); 

  const configKey = Object.keys(TABLE_CONFIGS).find(
    k => k.toLowerCase() === tableTitle?.toLowerCase()
  );
  const config         = configKey ? TABLE_CONFIGS[configKey] : null;
  const editableColumns = config?.columns.filter(col => !col.key.includes('id')) ?? [];

  const [formData, setFormData] = useState(
    () => Object.fromEntries(editableColumns.map(col => [col.key, '']))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const createFn = API_CREATE_MAP[configKey];
      if (!createFn) {
        throw new Error(`Cannot add to ${configKey}`);
      }

      if (configKey === 'Artists') {
        await createFn(formData.artist_name);
      } else if (configKey === 'Genres') {
        await createFn(formData.genre_name);
      } else {
        await createFn(formData);
      }

      
      const tableId = mockTables.find(t => t.title === configKey)?.id || 1;
      navigate(`/tables/${tableId}`);
    } catch (err) {
      setError(err.message || 'Failed to add record');
      setLoading(false);
    }
  };

  if(!config) return <div>ไม่รองรับตาราง "{tableTitle}"</div>;

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

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

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
            <button type="button" className="btn-cancel" onClick={() => navigate(-1)} disabled={loading}>Cancel</button>
            <button type="submit" className="btn-add" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}