import { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD

export default function LoginPage() {
=======
import { GreenLogo } from '../../components/Icons';

export default function LoginPage(){
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

<<<<<<< HEAD
  function handleSubmit() {
    const newErrors = {};
    if (!username) newErrors.username = true;
    if (!password) newErrors.password = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
=======
  function handleSubmit(){
    const newErrors = {};
    if(!username) newErrors.username = true;
    if(!password) newErrors.password = true;

    setErrors(newErrors);
    if(Object.keys(newErrors).length > 0) return;
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
  }

  return (
    <div className="auth-page">
<<<<<<< HEAD
      <div className="auth-logo">taeketmaster<sup>®</sup></div>
=======
      <GreenLogo className="sign-up-logo" />
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b

      <div className="auth-box">
        <h2 className="auth-title">Sign In</h2>

        <div className="auth-field">
          <label className="auth-label">Username <span className="required">*</span></label>
          <input type="text" className="auth-input" placeholder="" value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={errors.username ? { border: '1.5px solid #FF0000' } : {}}/>
        </div>

        <div className="auth-field">
          <label className="auth-label">Password <span className="required">*</span></label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? "text" : "password"} className="auth-input" placeholder="" 
              value={password} onChange={(e) => setPassword(e.target.value)}
              style={errors.password ? { border: '1.5px solid #FF0000' } : {}}/>
            <span 
              onClick={() => setShowPassword(!showPassword)}
<<<<<<< HEAD
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {/* 🟢 เปลี่ยนลูกตาจาก Emoji เป็น SVG แบบเดียวกับหน้า Reset Password */}
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              )}
            </span>
          </div>
          <div style={{ width: '100%', marginTop: '8px', textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: '#1E1E1E', textDecoration: 'none' }}>Forgot your password?</Link>
=======
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
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
          <div style={{ width: '100%', marginTop: '0' }}>
            <Link to="/forgot-password" style={{ fontSize: '12px', color: '#4A5D23', textDecoration: 'none' }}>Forgot your password?</Link>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
          </div>
        </div>

        <button className="auth-btn" onClick={handleSubmit}>SIGN IN</button>

<<<<<<< HEAD
        <div className="auth-links" style={{ marginTop: '16px' }}>
          <Link to="/register">Create new account</Link>
=======
        <div className="auth-links">
          <Link to="/signup">Create new account</Link>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
        </div>
      </div>
    </div>
  );
}