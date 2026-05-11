import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AdminEditPage () {
  const navigate = useNavigate();
  const { tableTitle, id } = useParams();

  // ดึง config ของตารางนั้นๆ เพื่อรู้ว่ามี field อะไรบ้าง
  const configKey = Object.keys(TABLE_CONFIGS).find(
    k => k.toLowerCase() === tableTitle?.toLowerCase()
    );
    const config = configKey ? TABLE_CONFIGS[configKey] : null;
  const editableColumns = config?.columns.filter(col => col.key !== 'id') ?? [];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // หา key ของตารางใน INITIAL_DATA (case อาจต่างกัน เช่น 'event' vs 'Event')
    const dataKey = Object.keys(INITIAL_DATA).find(
      k => k.toLowerCase() === tableTitle?.toLowerCase()
    );
    const row = INITIAL_DATA[dataKey]?.find(r => String(r.id) === String(id));

    if (row) {
      // สร้าง formData จาก editable columns เท่านั้น
      const initial = {};
      editableColumns.forEach(col => { initial[col.key] = row[col.key] ?? ''; });
      setFormData(initial);
    }
  }, [tableTitle, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => navigate(-1);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: เชื่อม API จริง
    // await fetch(`/api/${tableTitle}/${id}`, { method: 'PUT', body: JSON.stringify(formData) });
    navigate(-1);
  };

  if (!config) return <div>ไม่รองรับตาราง "{tableTitle}"</div>;

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
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn-add">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};