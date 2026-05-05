import { useState, useRef, useEffect } from 'react';
import CalendarPicker from '../../components/CalendarPicker';

export default function RegisterPage({greenLogoUrl, calendarUrl}){
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
      if(calendarRef.current && !calendarRef.current.contains(e.target))
        setShowCalendar(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleSubmit(){
    const newErrors = {};
    if(!username) newErrors.username = true;
    if(!password) newErrors.password = true;
    if(!firstName) newErrors.firstName = true;
    if(!lastName)  newErrors.lastName  = true;
    if(!email)     newErrors.email     = true;

    setErrors(newErrors);
    if(Object.keys(newErrors).length > 0) return;
  }

  function formatDateTH(d){
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    return `${dd}/${mm}/${d.getFullYear()}`;
  }

  function handleGenderChange(e){
    setGender(e.target.value);
  }

  return (
    <div className="auth-page">
      <img className="sign-up-logo" src={greenLogoUrl}/>

      <div className="auth-box wide">
        <h2 className="auth-title">Sign Up</h2>

        <div className="auth-grid">
          <div className="auth-field">
            <label className="auth-label">Username <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="cool_username" value={username}
              onChange={(e) => setUsername(e.target.value)} 
              style={errors.username ? { border: '1.5px solid #FF0000' } : {}}/>
          </div>

          <div className="auth-field">
            <label className="auth-label">Password <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input type={showPassword ? "text" : "password"} className="auth-input" placeholder="strong_pA55word" value={password}
              onChange={(e) => setPassword(e.target.value)} 
              style={errors.password ? { border: '1.5px solid #FF0000' } : {}}
              />

              <span 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5D23" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A5D23" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
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
            <input type="tel" className="auth-input" placeholder="xxxxxxxxxx" />
          </div>

         <div className="auth-field">
          <label className="auth-label">Date of Birth</label>
          <div ref={calendarRef} style={{ position: 'relative', width: '100%' }}>
            <div className="auth-input" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ flex: 1, color: dob ? 'inherit' : '#A0B08C' }}>
                {dob ? formatDateTH(dob) : "DD/MM/YYYY"}
              </span>
              <img
                src={calendarUrl}
                width="16" height="16"
                onClick={() => setShowCalendar((v) => !v)}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {showCalendar && (
              <CalendarPicker
                value={dob}
                onChange={setDob}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>
        </div>

          <div className="auth-field">
            <label className="auth-label">Gender</label>
            <div className="auth-radio-group">
              <label><input type="radio" name="gender" value="male"   onChange={handleGenderChange} /> male</label>
              <label><input type="radio" name="gender" value="female" onChange={handleGenderChange} /> female</label>
              <label><input type="radio" name="gender" value="other"  onChange={handleGenderChange} /> other</label>

              {gender === 'other' && (
                  <input
                      type="text"
                      className="auth-input"
                      placeholder=""
                      style={{ width: '70px', padding: '0.3rem', marginLeft: '0.2rem' }}
                  />
              )}
          </div>
          </div>
        </div>

        <button className="auth-btn" style={{ marginTop: '1.5rem' }}
          onClick={handleSubmit}>Create Account</button>
      </div>
    </div>
  );
}