import { Link } from 'react-router-dom';

export default function OtpPage() {
  return (
    <div className="auth-page">
      <h1 className="auth-logo">taeketmaster®</h1>

      <div className="auth-box">
        <h2 className="auth-title">ยืนยันรหัส OTP</h2>

        <p style={{ fontSize: '0.8rem', color: '#4A5D23', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรุณากรอกรหัส 6 หลัก <br/> ที่เราได้ส่งไปยังอีเมลของคุณ
        </p>

        <div className="auth-field">
          <label className="auth-label">รหัส OTP <span className="required">*</span></label>
          {/* ช่องกรอก OTP ปรับตัวหนังสือให้ใหญ่และห่างกัน จะได้ดูเหมือนกรอกรหัส */}
          <input 
            type="text" 
            className="auth-input" 
            placeholder="123456" 
            maxLength="6"
            style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }} 
          />
        </div>

        <button className="auth-btn" style={{ width: '100%', marginTop: '1rem' }}>ยืนยันรหัส</button>

        <div className="auth-links" style={{ marginTop: '1.5rem' }}>
          <Link to="/forgot-password">← ขอรับรหัส OTP อีกครั้ง</Link>
        </div>
      </div>
    </div>
  );
}