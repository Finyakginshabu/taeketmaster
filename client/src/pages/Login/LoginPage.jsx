import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import { GreenLogo } from '../../components/Icons';
import { signIn } from '../../api/auth.api.js';

export default function LoginPage(){
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [usorem, setusorem] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(){
    const newErrors = {};
    if(!usorem) newErrors.usorem = true;
    if(!password) newErrors.password = true;

    setErrors(newErrors);
    setLoginError('');

    if(Object.keys(newErrors).length > 0) return;

    try {
      const data = await signIn({ usorem: usorem, password });

      if(data && data.token){
        localStorage.setItem('token', data.token);
        
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // ⚠️ อย่าลืมเปลี่ยน data.user.firstName ให้ตรงกับชื่อ Field จริงๆ ที่ Backend ส่งมานะครับ
        const userDataToSave = {
          firstName: data.user.firstName || data.user.fname || usorem, // ถ้าไม่มีชื่อจริง ให้ใช้ usorem แทนไปก่อน
          lastName: data.user.lastName || data.user.lname || ''
        };
        localStorage.setItem('userData', JSON.stringify(userDataToSave));

        login(data.user);
        navigate('/home');
      }
    } catch (error){
      setLoginError(error.message);
    }
  }

  return (
    <div className="auth-page">
      <GreenLogo className="sign-up-logo" />

      <div className="auth-box">
        <h2 className="auth-title">Sign In</h2>

        {/* --- ส่วนแสดงข้อความ Error จาก Backend --- */}
        {loginError && (
          <div style={{ color: '#FF0000', fontSize: '14px', marginBottom: '15px', textAlign: 'center', backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '5px' }}>
            {loginError}
          </div>
        )}

        <div className="auth-field">
          <label className="auth-label">Username/Email <span className="required">*</span></label>
          <input type="text" className="auth-input" placeholder="" value={usorem}
              onChange={(e) => setusorem(e.target.value)}
              style={errors.usorem ? { border: '1.5px solid #FF0000' } : {}}/>
        </div>

        <div className="auth-field">
          <label className="auth-label">Password <span className="required">*</span></label>
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? "text" : "password"} className="auth-input" placeholder="" 
              value={password} onChange={(e) => setPassword(e.target.value)}
              style={errors.password ? { border: '1.5px solid #FF0000' } : {}}/>
            <span 
              onClick={() => setShowPassword(!showPassword)}
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
          </div>
        </div>

        <button className="auth-btn" onClick={handleSubmit}>SIGN IN</button>

        <div className="auth-links">
          <Link to="/signup">Create new account</Link>
        </div>
      </div>
    </div>
  );
}