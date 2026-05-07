import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const blank = { title: '', agentPhone: '', artist: '', agentEmail: '', description: '' };
const mock = {
  title: 'Four Woman Up',
  agentPhone: '0670505223',
  artist: 'Pimchaya',
  agentEmail: 'chromosomelab@chro.a...',
  description: 'Four Woman Up, superman giant eat pizza every day for fun and go to toilet and sleep.',
};

export default function EventForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isEdit = pathname.includes('/edit');
  const [form, setForm] = useState(isEdit ? mock : blank);

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => { e.preventDefault(); alert(JSON.stringify(form, null, 2)); };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
      <form onSubmit={submit} style={{
        backgroundColor: '#EAEBDB', // 🟢 สีพื้นหลังการ์ดเป็นสีครีม-เขียวอ่อน ตาม Figma
        borderRadius: '16px', // ขอบมนสวยงาม
        padding: '32px',
        width: '100%',
        maxWidth: '700px', // ล็อกความกว้างไม่ให้ยืดเกินไป
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}>

        {/* ส่วนหัว Add Event */}
        <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: '#1E1E1E', textAlign: 'left' }}>
          {isEdit ? 'Edit Event' : 'Add Event'}
        </h2>
        {/* เส้นคั่น */}
        <hr style={{ border: 'none', borderTop: '1px solid #C4C8B8', marginBottom: '24px' }} />

        {/* โครงสร้าง Grid 2 คอลัมน์ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px', color: '#1E1E1E' }}>Title</label>
            <input name="title" value={form.title} onChange={set} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px', color: '#1E1E1E' }}>Agent Phone</label>
            <input name="agentPhone" value={form.agentPhone} onChange={set} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px', color: '#1E1E1E' }}>Artist</label>
            <input name="artist" value={form.artist} onChange={set} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px', color: '#1E1E1E' }}>Agent Email</label>
            <input name="agentEmail" value={form.agentEmail} onChange={set} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', boxSizing: 'border-box' }} />
          </div>

          {/* ช่อง Description กินพื้นที่ 2 คอลัมน์ */}
          <div style={{ gridColumn: 'span 2', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '8px', color: '#1E1E1E' }}>Description</label>
            <textarea name="description" rows={5} value={form.description} onChange={set} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
          </div>

        </div>

        {/* ปุ่มด้านล่าง */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
          <button type="button" onClick={() => navigate('/admin/tables')} style={{ padding: '10px 32px', backgroundColor: '#FFFFFF', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Cancel</button>
          <button type="submit" style={{ padding: '10px 40px', backgroundColor: '#6B7E54', color: '#FFFFFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>{isEdit ? 'Edit' : 'Add'}</button>
        </div>

      </form>
    </div>
  );
}