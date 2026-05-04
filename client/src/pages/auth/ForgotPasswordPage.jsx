import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      {/* โลโก้ */}
      <h1 className="auth-logo">taeketmaster®</h1>

      {/* กล่องสีเขียวอ่อนนุ่มๆ แบบเดียวกับหน้า Login */}
      <div className="auth-box">
        <h2 className="auth-title">ลืมรหัสผ่าน</h2>

        <p style={{ fontSize: '0.8rem', color: '#4A5D23', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรอกอีเมลที่ลงทะเบียนไว้ <br/> เราจะส่ง OTP ให้คุณ
        </p>

        <div className="auth-field">
          <label className="auth-label">อีเมล (Email) <span className="required">*</span></label>
          <input type="email" className="auth-input" placeholder="example@mail.taeket.ac.th" />
        </div>

        {/* ปุ่มสีเขียวตุ่นเต็มกล่อง */}
        <button className="auth-btn" style={{ width: '100%', marginTop: '1rem' }}>ส่ง OTP</button>

        <div className="auth-links" style={{ marginTop: '1.5rem' }}>
          <Link to="/login">← กลับไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
}