import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '../../components/Icons.jsx';
import CalendarPicker from '../../components/CalendarPicker.jsx';

// สมมติว่า User ที่ทำการ Login อยู่คือ ID: '1008' 
// (ตอนใช้งานจริง ให้ดึงจาก Context, Redux หรือ localStorage)
const LOGGED_IN_USER_ID = '1008';

export default function AccountSettingsPage() {
  // สร้าง State สำหรับเก็บค่าเดิมจาก DB เพื่อไว้ใช้ตอนกด Reset
  const [saved, setSaved] = useState({});

  // Live form state
  const [username,     setUsername]     = useState('');
  const [email,        setEmail]        = useState('');
  const [firstname,    setFirstname]    = useState('');
  const [lastname,     setLastname]     = useState('');
  const [phone,        setPhone]        = useState('');
  const [dob,          setDob]          = useState('');
  const [gender,       setGender]       = useState('');
  const [genderOther,  setGenderOther]  = useState('');
  const [houseNo,      setHouseNo]      = useState('');
  const [streetName,   setStreetName]   = useState('');
  const [subDistrict,  setSubDistrict]  = useState('');
  const [district,     setDistrict]     = useState('');
  const [province,     setProvince]     = useState('');
  const [postalCode,   setPostalCode]   = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [saving, setSaving] = useState(false);

  function formatDateTH(d) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  }

  // ดึงข้อมูล User ตอนเปิดหน้าเว็บ
  useEffect(() => {
    const user = INITIAL_DATA.User.find(u => u.id === LOGGED_IN_USER_ID);
    if (user) {
      // ใน Mock data เก่า ชื่อ-นามสกุล รวมกันใน "name" ต้องทำการแยกก่อน
      const [fname, ...lnameArr] = (user.name || '').split(' ');
      const lname = lnameArr.join(' ');

      const userData = {
        username: user.username || '',
        email: user.email || '',
        firstname: fname || '',
        lastname: lname || '',
        phone: user.phone || '',
        dob: user.dob || '',
        gender: user.gender || 'other',
        genderOther: user.genderOther || '',
        houseNo: user.houseNo || '',
        streetName: user.streetName || '',
        subDistrict: user.subDistrict || '',
        district: user.district || '',
        province: user.province || '',
        postalCode: user.postalCode || ''
      };

      setSaved(userData);
      loadProfileToForm(userData);
    }
  }, []);

  // ฟังก์ชันนำข้อมูลเข้าฟอร์ม
  const loadProfileToForm = (data) => {
    setUsername(data.username);
    setEmail(data.email);
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPhone(data.phone);
    setDob(data.dob);
    setGender(data.gender);
    setGenderOther(data.genderOther);
    setHouseNo(data.houseNo);
    setStreetName(data.streetName);
    setSubDistrict(data.subDistrict);
    setDistrict(data.district);
    setProvince(data.province);
    setPostalCode(data.postalCode);
  };

  // Reset กลับไปเป็นค่าล่าสุดที่ดึงมาจาก DB
  function handleReset() {
    loadProfileToForm(saved);
  }

  // Save ทับข้อมูลของ User คนเดิม
  async function handleSave() {
    setSaving(true);
    try {
      await new Promise(r => setTimeout(r, 800)); // จำลองดีเลย์ตอนส่ง API
      
      const newSaved = { 
        username, email, firstname, lastname, phone, dob, gender, genderOther, 
        houseNo, streetName, subDistrict, district, province, postalCode 
      };

      // หาตำแหน่งของ User คนนี้ใน Array
      const userIndex = INITIAL_DATA.User.findIndex(u => u.id === LOGGED_IN_USER_ID);
      
      if (userIndex !== -1) {
        // อัปเดตข้อมูลกลับไปที่ Mock Data
        // แปลง firstname + lastname กลับไปเป็น key "name" เพื่อให้รองรับตาราง User แบบเดิม
        INITIAL_DATA.User[userIndex] = { 
          ...INITIAL_DATA.User[userIndex], 
          ...newSaved,
          name: `${firstname} ${lastname}`.trim() 
        };
      }

      setSaved(newSaved); // อัปเดตค่าตั้งต้นเผื่อกดยกเลิก
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="account-settings-wrapper">
      <div className="acct-card-container">
        
        {/* Avatar & Title Overlapping the Card */}
        <div className="acct-avatar">
          <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
             <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h1 className="acct-title">Account Settings</h1>

        <div className="acct-form-grid">
          
          {/* Row 1: Empty left (for avatar), Username right */}
          <div></div>
          <div className="auth-field">
            <label className="auth-label">Username</label>
            <input
              type="text" className="auth-input"
              value={username} onChange={e => setUsername(e.target.value)}
            />
          </div>

          {/* Row 2 */}
          <div className="auth-field">
            <label className="auth-label">First name</label>
            <input
              type="text" className="auth-input"
              value={firstname} onChange={e => setFirstname(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label">Last name</label>
            <input
              type="text" className="auth-input"
              value={lastname} onChange={e => setLastname(e.target.value)}
            />
          </div>

            {/* Row 3 */}
            <div className="auth-field">
                <label className="auth-label">Email</label>
                <input
                type="email" className="auth-input grey-bg"
                value={email} readOnly
                />
            </div>
            <div className="auth-field">
                <label className="auth-label">Phone number</label>
                <input
                type="tel" className="auth-input"
                value={phone} onChange={e => setPhone(e.target.value)}
                />
            </div>

            <div className="auth-field">
                <label className="auth-label">Birthday</label>
                <div ref={calendarRef} style={{ position: 'relative', width: '100%' }}>
                    <div className="auth-input" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                        onClick={() => setShowCalendar(!showCalendar)}>
                    <span style={{ flex: 1, color: dob ? 'inherit' : '#A0B08C' }}>
                        {/* แสดงข้อมูลเก่าเป็น Default ถ้ามีค่าใน dob */}
                        {dob ? formatDateTH(new Date(dob)) : "DD/MM/YYYY"}
                    </span>
                    {/* เรียกใช้ Component ไอคอนปฏิทินของคุณ */}
                    <Calendar width="16" height="16" /> 
                    </div>

                    {showCalendar && (
                    <CalendarPicker
                        value={dob}
                        onChange={(newDate) => {
                        setDob(newDate);
                        setShowCalendar(false);
                        }}
                        onClose={() => setShowCalendar(false)}
                    />
                    )}
                </div>
            </div>

            <div className="auth-field">
                <label className="auth-label">Gender</label>
                <div className="auth-radio-group">
                    {['male', 'female', 'other'].map(v => (
                    <label key={v}>
                        <input
                        type="radio" name="gender" value={v}
                        checked={gender === v}
                        onChange={() => setGender(v)}
                        /> {v}
                    </label>
                    ))}

                    {gender === 'other' && (
                    <input
                        type="text"
                        className="auth-input"
                        style={{ width: '90px', padding: '0.4rem 0.6rem', marginLeft: '5px' }}
                        value={genderOther}
                        onChange={e => setGenderOther(e.target.value)}
                        placeholder=""
                    />
                    )}
                </div>
            </div>

            <div className="address-section">
                <label className="auth-label" style={{ fontSize: '1rem', color: '#1A2700', marginBottom: '10px', display: 'block' }}>Address</label>
                
                <div className="address-row">
                <div className="auth-field" style={{ flex: '1' }}>
                    <label className="auth-label">House number</label>
                    <input
                    type="text" className="auth-input"
                    value={houseNo} onChange={e => setHouseNo(e.target.value)}
                    />
                </div>
                <div className="auth-field" style={{ flex: '2.5' }}>
                    <label className="auth-label">Street name</label>
                    <input
                    type="text" className="auth-input"
                    value={streetName} onChange={e => setStreetName(e.target.value)}
                    />
                </div>
                <div className="auth-field" style={{ flex: '2.5' }}>
                    <label className="auth-label">Sub-district</label>
                    <input
                    type="text" className="auth-input"
                    value={subDistrict} onChange={e => setSubDistrict(e.target.value)}
                    />
                </div>
                </div>

            <div className="address-row" style={{ marginBottom: '0' }}>
              <div className="auth-field" style={{ flex: '2' }}>
                <label className="auth-label">District</label>
                <input
                  type="text" className="auth-input"
                  value={district} onChange={e => setDistrict(e.target.value)}
                />
              </div>
              <div className="auth-field" style={{ flex: '2' }}>
                <label className="auth-label">Province</label>
                <input
                  type="text" className="auth-input"
                  value={province} onChange={e => setProvince(e.target.value)}
                />
              </div>
              <div className="auth-field" style={{ flex: '1.5' }}>
                <label className="auth-label">Postal_code</label>
                <input
                  type="text" className="auth-input"
                  value={postalCode} onChange={e => setPostalCode(e.target.value)}
                />
              </div>
            </div>
          </div>

        </div>{/* /acct-form-grid */}
      </div>

      {/* Buttons Output Outside the Card */}
      <div className="acct-action-bar">
        <button className="acct-btn-reset" onClick={handleReset} type="button">
          Reset
        </button>
        <button
          className="acct-btn-save"
          onClick={handleSave}
          disabled={saving}
          type="button"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

    </div>
  );
}