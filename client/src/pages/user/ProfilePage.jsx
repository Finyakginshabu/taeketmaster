import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
//import './Profile.css';

const TABS = ['ข้อมูลส่วนตัว', 'ที่อยู่', 'เปลี่ยนรหัสผ่าน'];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    gender: user?.gender || '',
    date_of_birth: user?.date_of_birth || '',
  });
  const [addresses, setAddresses] = useState([
    { address_id: 1, house_no: '123', street_name: 'สุขุมวิท', sub_district: 'คลองเตย', district: 'คลองเตย', province: 'กรุงเทพมหานคร', postal_code: '10110' }
  ]);
  const [passForm, setPassForm] = useState({ current: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ house_no: '', street_name: '', sub_district: '', district: '', province: '', postal_code: '' });

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // TODO: await api.put('/users/me', profile)
      await new Promise(r => setTimeout(r, 600));
      updateUser(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!passForm.current) errs.current = 'กรุณากรอกรหัสผ่านปัจจุบัน';
    if (passForm.password.length < 8) errs.password = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
    if (passForm.password !== passForm.confirm) errs.confirm = 'รหัสผ่านไม่ตรงกัน';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    try {
      await new Promise(r => setTimeout(r, 600));
      setPassForm({ current: '', password: '', confirm: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  const handleAddAddress = () => {
    const errs = {};
    if (!newAddress.house_no) errs.house_no = 'จำเป็น';
    if (!newAddress.sub_district) errs.sub_district = 'จำเป็น';
    if (!newAddress.district) errs.district = 'จำเป็น';
    if (!newAddress.province) errs.province = 'จำเป็น';
    if (!/^\d{5}$/.test(newAddress.postal_code)) errs.postal_code = 'ต้องเป็นตัวเลข 5 หลัก';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setAddresses(p => [...p, { ...newAddress, address_id: Date.now() }]);
    setNewAddress({ house_no: '', street_name: '', sub_district: '', district: '', province: '', postal_code: '' });
    setShowAddressForm(false);
    setErrors({});
  };

  const setP = (field) => (e) => { setProfile(p => ({ ...p, [field]: e.target.value })); };
  const setPass = (field) => (e) => { setPassForm(p => ({ ...p, [field]: e.target.value })); setErrors(p => ({ ...p, [field]: '' })); };
  const setNA = (field) => (e) => { setNewAddress(p => ({ ...p, [field]: e.target.value })); setErrors(p => ({ ...p, [field]: '' })); };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-avatar-lg">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
            <h2 className="profile-name">{user?.first_name} {user?.last_name}</h2>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-role-badge">{user?.role === 'admin' ? '👑 Admin' : '🎟 User'}</div>

            <nav className="profile-nav">
              {TABS.map((t, i) => (
                <button key={i} className={`profile-nav-item ${tab === i ? 'active' : ''}`} onClick={() => { setTab(i); setErrors({}); setSaved(false); }}>
                  {t}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="profile-content card">
            {saved && <div className="auth-success" style={{ marginBottom: 20 }}>✅ บันทึกข้อมูลสำเร็จ</div>}

            {tab === 0 && (
              <form onSubmit={handleProfileSave}>
                <h2 className="section-title">ข้อมูลส่วนตัว</h2>
                <div className="grid-2">
                  <div className="field"><label>ชื่อ</label><input type="text" value={profile.first_name} onChange={setP('first_name')} /></div>
                  <div className="field"><label>นามสกุล</label><input type="text" value={profile.last_name} onChange={setP('last_name')} /></div>
                </div>
                <div className="grid-2" style={{ marginTop: 16 }}>
                  <div className="field">
                    <label>เพศ</label>
                    <select value={profile.gender} onChange={setP('gender')}>
                      <option value="">เลือกเพศ</option>
                      <option value="male">ชาย</option>
                      <option value="female">หญิง</option>
                      <option value="other">อื่นๆ</option>
                    </select>
                  </div>
                  <div className="field"><label>วันเกิด</label><input type="date" value={profile.date_of_birth} onChange={setP('date_of_birth')} /></div>
                </div>
                <div className="field" style={{ marginTop: 16 }}>
                  <label>อีเมล</label><input type="email" value={profile.email} onChange={setP('email')} />
                </div>
                <div className="field" style={{ marginTop: 16 }}>
                  <label>เบอร์โทรศัพท์</label><input type="tel" value={profile.phone} onChange={setP('phone')} />
                </div>
                <div style={{ marginTop: 24 }}>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? <span className="spinner" /> : 'บันทึกข้อมูล'}
                  </button>
                </div>
              </form>
            )}

            {tab === 1 && (
              <div>
                <div className="section-header">
                  <h2 className="section-title">ที่อยู่ของฉัน</h2>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowAddressForm(p => !p)}>
                    {showAddressForm ? 'ยกเลิก' : '+ เพิ่มที่อยู่'}
                  </button>
                </div>

                {addresses.map(addr => (
                  <div key={addr.address_id} className="address-card">
                    <p className="address-line">{addr.house_no} {addr.street_name}</p>
                    <p className="address-line">{addr.sub_district} {addr.district} {addr.province} {addr.postal_code}</p>
                    <button className="btn btn-danger btn-sm" style={{ marginTop: 10 }}
                      onClick={() => setAddresses(p => p.filter(a => a.address_id !== addr.address_id))}>
                      ลบ
                    </button>
                  </div>
                ))}

                {showAddressForm && (
                  <div className="address-form-card">
                    <h3 style={{ fontSize: '0.95rem', marginBottom: 16, color: 'var(--text-secondary)' }}>เพิ่มที่อยู่ใหม่</h3>
                    <div className="grid-2">
                      <div className="field"><label>บ้านเลขที่ *</label><input type="text" value={newAddress.house_no} onChange={setNA('house_no')} className={errors.house_no ? 'error' : ''} />{errors.house_no && <span className="field-error">{errors.house_no}</span>}</div>
                      <div className="field"><label>ชื่อถนน</label><input type="text" value={newAddress.street_name} onChange={setNA('street_name')} /></div>
                    </div>
                    <div className="grid-2" style={{ marginTop: 12 }}>
                      <div className="field"><label>แขวง/ตำบล *</label><input type="text" value={newAddress.sub_district} onChange={setNA('sub_district')} className={errors.sub_district ? 'error' : ''} />{errors.sub_district && <span className="field-error">{errors.sub_district}</span>}</div>
                      <div className="field"><label>เขต/อำเภอ *</label><input type="text" value={newAddress.district} onChange={setNA('district')} className={errors.district ? 'error' : ''} />{errors.district && <span className="field-error">{errors.district}</span>}</div>
                    </div>
                    <div className="grid-2" style={{ marginTop: 12 }}>
                      <div className="field"><label>จังหวัด *</label><input type="text" value={newAddress.province} onChange={setNA('province')} className={errors.province ? 'error' : ''} />{errors.province && <span className="field-error">{errors.province}</span>}</div>
                      <div className="field"><label>รหัสไปรษณีย์ *</label><input type="text" maxLength={5} value={newAddress.postal_code} onChange={setNA('postal_code')} className={errors.postal_code ? 'error' : ''} />{errors.postal_code && <span className="field-error">{errors.postal_code}</span>}</div>
                    </div>
                    <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={handleAddAddress}>บันทึกที่อยู่</button>
                  </div>
                )}
              </div>
            )}

            {tab === 2 && (
              <form onSubmit={handlePasswordSave}>
                <h2 className="section-title">เปลี่ยนรหัสผ่าน</h2>
                <div className="field">
                  <label>รหัสผ่านปัจจุบัน</label>
                  <input type="password" value={passForm.current} onChange={setPass('current')} className={errors.current ? 'error' : ''} />
                  {errors.current && <span className="field-error">{errors.current}</span>}
                </div>
                <div className="field" style={{ marginTop: 16 }}>
                  <label>รหัสผ่านใหม่</label>
                  <input type="password" value={passForm.password} onChange={setPass('password')} className={errors.password ? 'error' : ''} />
                  {errors.password && <span className="field-error">{errors.password}</span>}
                </div>
                <div className="field" style={{ marginTop: 16 }}>
                  <label>ยืนยันรหัสผ่านใหม่</label>
                  <input type="password" value={passForm.confirm} onChange={setPass('confirm')} className={errors.confirm ? 'error' : ''} />
                  {errors.confirm && <span className="field-error">{errors.confirm}</span>}
                </div>
                <div style={{ marginTop: 24 }}>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? <span className="spinner" /> : 'เปลี่ยนรหัสผ่าน'}
                  </button>
                </div>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
