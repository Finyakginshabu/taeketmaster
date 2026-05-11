import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { TABLE_CONFIGS, mockTables } from '../../utils.js';
import {
  getArtistById, updateArtist,
  getGenreById, updateGenre,
  getAgentById, updateAgent,
  getVenueById, updateVenue,
  API_MAP
} from '../../api/tables.api.js';

export default function AdminEditPage (){
  const navigate = useNavigate();
  const { tableTitle, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  // ดึง config ของตารางนั้นๆ เพื่อรู้ว่ามี field อะไรบ้าง
  const configKey = Object.keys(TABLE_CONFIGS).find(
    k => k.toLowerCase() === tableTitle?.toLowerCase()
    );
    const config = configKey ? TABLE_CONFIGS[configKey] : null;
  
  const editableColumns = useMemo(() => 
    config?.columns.filter(col => !col.key.includes('id')) ?? [],
    [config]
  );

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEntry = API_MAP[configKey];
        if (!apiEntry) {
          setFetching(false);
          return;
        }
        
        const row = await apiEntry.getById(id);
        if (row) {
          const initial = {};
          editableColumns.forEach(col => { initial[col.key] = row[col.key] ?? ''; });
          setFormData(initial);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    
    if (configKey && id) {
      fetchData();
    }
  }, [id, configKey, editableColumns]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => navigate(-1);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const apiEntry = API_MAP[configKey];
      if (!apiEntry) {
        setError(`Cannot update ${configKey}`);
        return;
      }
      
      // Call the appropriate update function with the form data
      // Artists and Genres only need the name, others need the object
      if (configKey === 'Artists') {
        await apiEntry.update(id, formData.artist_name);
      } else if (configKey === 'Genres') {
        await apiEntry.update(id, formData.genre_name);
      } else {
        // Agents, Venues need the full object
        await apiEntry.update(id, formData);
      }

      // Navigate to the table page using the correct ID from mockTables
      const tableId = mockTables.find(t => t.title === configKey)?.id || 1;
      navigate(`/tables/${tableId}`);
    } catch (err) {
      setError(err.message || 'Failed to update record');
      setLoading(false);
    }
  };

  if(!config) return <div>ไม่รองรับตาราง "{tableTitle}"</div>;
  
  if(fetching) return <div>Loading...</div>;

  return (
    <div className="admin-add-event-page">
      <div className="breadcrumbs">
        <Link to="/tables" className="breadcrumb-link">Tables</Link>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-link" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          {tableTitle}
        </span>
        <span className="breadcrumb-separator"> {'>'} </span>
        <span className="breadcrumb-current">Edit</span>
      </div>

      <div className="form-card">
        <h2 className="form-title">Edit {tableTitle}</h2>
        <hr className="title-divider" />

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <form onSubmit={handleSave} className="event-form">
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
                  disabled={loading}
                  required
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading || fetching}>Cancel</button>
            <button type="submit" className="btn-add" disabled={loading || fetching}>{fetching ? 'Loading...' : loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};