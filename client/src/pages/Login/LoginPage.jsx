import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreenLogo } from '../../components/Icons';

export default function LoginPage(){
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(''); // เพิ่ม State สำหรับเก็บ Error จาก Backend

  const navigate = useNavigate();

  async function handleSubmit(){
    const newErrors = {};
    if(!username) newErrors.username = true;
    if(!password) newErrors.password = true;

    setErrors(newErrors);
    setLoginError(''); // เคลียร์ Error เดิมก่อนเริ่มยิง API

    if(Object.keys(newErrors).length > 0) return;

    try {
      // ยิง API ไปที่ Endpoint /api/signin
      // (ถ้าคุณไม่ได้ใช้ Port 6700 ให้แก้ตรงนี้ให้ตรงกับ Backend ของคุณ หรือใช้ API_BASE ที่คุณมี)
      const response = await fetch('http://localhost:6700/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // ส่งตัวแปร usorem ไปให้ตรงกับที่ Backend ต้องการ
        body: JSON.stringify({ usorem: username, password: password }) 
      });

      const result = await response.json();

      // เช็กจาก HTTP Status และค่า success จากฟังก์ชัน handleResponse ของคุณ
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      // ถ้าสำเร็จ เก็บ Token ที่ได้จาก Backend ลง localStorage
      // สังเกตว่าต้องดึงจาก result.data.token เพราะคุณส่งข้อมูลแนบมาใน parameter data
      if (result.data && result.data.token) {
        localStorage.setItem('token', result.data.token);
        
        // ถ้าอยากเก็บข้อมูล User ไว้ใช้หน้าอื่นด้วย ก็สามารถเก็บเพิ่มได้
        localStorage.setItem('user', JSON.stringify(result.data.user)); 
      }

      // นำทางไปยังหน้า home
      navigate('/home');

    } catch (error) {
      // นำข้อความแจ้งเตือน (เช่น "One of those was wrong. Guess which?") มาแสดง
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
          <label className="auth-label">Username / Email <span className="required">*</span></label>
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