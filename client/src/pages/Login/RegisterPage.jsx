import { useState, useRef, useEffect } from 'react';
import CalendarPicker from '../../components/CalendarPicker';

export default function RegisterPage({ calendarUrl }) {
  const [username, setUsername]   = useState('');
  const [password, setPassword]   = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [dob, setDob] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [gender, setGender] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handler = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target))
        setShowCalendar(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSubmit() {
    const newErrors = {};
    if (!username) newErrors.username = true;
    if (!password) newErrors.password = true;
    if (!firstName) newErrors.firstName = true;
    if (!lastName)  newErrors.lastName  = true;
    if (!email)     newErrors.email     = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  }

  function formatDateTH(d) {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  }

  function handleGenderChange(e) {
    setGender(e.target.value);
  }

  return (
    <div className="auth-page">
      {/* 🟢 แก้โลโก้ให้เป็น Text แบบเดียวกับหน้าอื่นๆ เพื่อความสม่ำเสมอ */}
      <div className="auth-logo">taeketmaster<sup>®</sup></div>

      <div className="auth-box wide">
        <h2 className="auth-title">Sign Up</h2>

        <div className="auth-grid">
          {/* ช่อง Username */}
          <div className="auth-field">
            <label className="auth-label">Username <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="cool_username" value={username}
              onChange={(e) => setUsername(e.target.value)} 
              style={errors.username ? { border: '1.5px solid #FF0000' } : {}}/>
          </div>

          {/* ช่อง Password */}
          <div className="auth-field">
            <label className="auth-label">Password <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input type={showPassword ? "text" : "password"} className="auth-input" placeholder="strong_pA55word" value={password}
              onChange={(e) => setPassword(e.target.value)} 
              style={errors.password ? { border: '1.5px solid #FF0000' } : {}}
              />
              <span 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {/* 🟢 เปลี่ยนลูกกะตาเป็นแบบ SVG มินิมอลเหมือนหน้าอื่นๆ */}
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                )}
              </span>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">First name <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="Khanatip" value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              style={errors.firstName ? { border: '1.5px solid #FF0000' } : {}}/>
          </div>

          <div className="auth-field">
            <label className="auth-label">Last name <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="Nokkhunthot" value={lastName}
              onChange={(e) => setLastName(e.target.value)} 
              style={errors.lastName ? { border: '1.5px solid #FF0000' } : {}}/>
          </div>

          <div className="auth-field">
            <label className="auth-label">Email <span className="required">*</span></label>
            <input type="email" className="auth-input" placeholder="example@mail.taeket.ac.th" value={email}
              onChange={(e) => setEmail(e.target.value)} 
              style={errors.email ? { border: '1.5px solid #FF0000' } : {}}/>
          </div>

          <div className="auth-field">
            <label className="auth-label">Phone number</label>
            <input type="tel" className="auth-input" placeholder="xxxxxxxxx" />
          </div>

          {/* ช่อง Date of Birth */}
          <div className="auth-field">
            <label className="auth-label">Date of Birth</label>
            <div ref={calendarRef} style={{ position: 'relative', width: '100%' }}>
              <div className="auth-input" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowCalendar((v) => !v)}>
                <span style={{ flex: 1, color: dob ? '#1E1E1E' : '#9CA3AF' }}>
                  {dob ? formatDateTH(dob) : "DD/MM/YYYY"}
                </span>
                <img src={calendarUrl} width="16" height="16" alt="calendar icon" />
              </div>

              {showCalendar && (
                <div style={{ position: 'absolute', zIndex: 10, top: '100%', left: 0 }}>
                  <CalendarPicker
                    value={dob}
                    onChange={setDob}
                    onClose={() => setShowCalendar(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* ช่อง Gender */}
          <div className="auth-field">
            <label className="auth-label">Gender</label>
            <div className="auth-radio-group">
              <label className="auth-radio-label"><input type="radio" name="gender" value="male" onChange={handleGenderChange} /> male</label>
              <label className="auth-radio-label"><input type="radio" name="gender" value="female" onChange={handleGenderChange} /> female</label>
              <label className="auth-radio-label"><input type="radio" name="gender" value="other" onChange={handleGenderChange} /> other</label>

              {gender === 'other' && (
                  <input
                      type="text"
                      className="auth-input"
                      style={{ width: '80px', padding: '0.2rem 0.5rem', marginLeft: '0.5rem', height: '28px' }}
                  />
              )}
            </div>
          </div>
        </div>

        {/* 🟢 ปุ่ม Create Account แบบแคปซูลตรงกลางตาม Figma */}
        <button className="auth-btn" style={{ width: '220px', margin: '2rem auto 0 auto' }} onClick={handleSubmit}>
          Create Account
        </button>
      </div>
    </div>
  );
}