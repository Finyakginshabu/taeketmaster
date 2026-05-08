import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OtpPage() {
  const navigate = useNavigate();
  // สร้าง State สำหรับเก็บค่า OTP ทั้ง 6 ช่อง
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  // ใช้ useRef เพื่อควบคุมการโฟกัสของแต่ละกล่อง
  const inputRefs = useRef([]);

  // ฟังก์ชันจัดการตอนพิมพ์ตัวเลข
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); 
    
    // กำหนด Master OTP ไว้ที่นี่
    const MASTER_OTP = "676767"; 

    if (otpValue === MASTER_OTP || otpValue === "000000") {
       setError("");
       navigate('/reset-password');
    } else {
       setError("OTP code incorrect! (hint: 676767)");
    }
  };

  return (
    <div className="auth-page">
      {/* แก้โลโก้ให้ตรงกับหน้าอื่น */}
      <div className="auth-logo">taeketmaster<sup>®</sup></div>

      <div className="auth-box">
        <h2 className="auth-title">ยืนยันรหัส OTP</h2>

        <p style={{ fontSize: '0.8rem', color: '#1E1E1E', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรุณากรอกรหัส 6 หลัก <br/> ที่เราได้ส่งไปยังอีเมลของคุณ
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field" style={{ alignItems: 'center' }}>
            <label className="auth-label" style={{ width: '100%', textAlign: 'left' }}>รหัส OTP <span className="required">*</span></label>
            
            {/* โซนกล่อง 6 กล่องที่ปรับขนาดแล้ว */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
              {otp.map((data, index) => {
                return (
                  <input
                    className="auth-input"
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    ref={ref => inputRefs.current[index] = ref}
                    style={{ 
                      width: '40px', 
                      height: '48px', 
                      textAlign: 'center', 
                      fontSize: '1.25rem', 
                      fontWeight: 'bold',
                      padding: '0', 
                      borderRadius: '10px',
                      border: '1px solid transparent',
                      backgroundColor: '#E8EED9', // สีเขียวอ่อนแบบช่อง Input หน้าอื่น
                      color: '#1E1E1E',
                      boxSizing: 'border-box'
                    }}
                  />
                )
              })}
            </div>
            {error && <p style={{ color: '#FF0000', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center', width: '100%' }}>{error}</p>}
          </div>

          <button type="submit" className="auth-btn" style={{ width: '100%', marginTop: '1.5rem' }}>ยืนยันรหัส</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem' }}>
          <Link to="/forgot-password">← ขอรับรหัส OTP อีกครั้ง</Link>
        </div>
      </div>
    </div>
  );
}