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
    // ดักไว้ให้พิมพ์ได้แค่ตัวเลข
    if (isNaN(element.value)) return false;

    // อัปเดตค่าใน Array
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // เลื่อนโฟกัสไปกล่องถัดไปอัตโนมัติ ถ้าพิมพ์แล้วและยังไม่ถึงกล่องสุดท้าย
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // ฟังก์ชันจัดการตอนกดปุ่มลบ (Backspace)
  const handleKeyDown = (e, index) => {
    // ถากด Backspace แล้วกล่องนั้นว่างเปล่า ให้เด้งกลับไปโฟกัสกล่องก่อนหน้า
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // ฟังก์ชันตอนกดปุ่มยืนยัน
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); // นำเลขทั้ง 6 กล่องมาต่อกัน
    
    if (otpValue.length !== 6) {
      setError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }
    
    setError("");
    console.log("ส่งรหัส OTP ไปตรวจสอบที่ Backend:", otpValue);
    
    // TODO: ตรงนี้เพื่อน Backend จะมาเขียน API เช็คความถูกต้อง
    // ตอนนี้ให้จำลองว่าถูกต้อง แล้วเปลี่ยนหน้าไปตั้งรหัสผ่านใหม่
    navigate('/reset-password');
  };

  return (
    <div className="auth-page">
      <h1 className="auth-logo">taeketmaster®</h1>

      <div className="auth-box">
        <h2 className="auth-title">ยืนยันรหัส OTP</h2>

        <p style={{ fontSize: '0.8rem', color: '#4A5D23', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรุณากรอกรหัส 6 หลัก <br/> ที่เราได้ส่งไปยังอีเมลของคุณ
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field" style={{ alignItems: 'center' }}>
            <label className="auth-label" style={{ width: '100%', textAlign: 'left' }}>รหัส OTP <span className="required">*</span></label>
            
        {/* โซนกล่อง 6 กล่อง */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '100%', marginTop: '0.5rem' }}>
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
                      width: '48px', 
                      height: '55px', 
                      textAlign: 'center', 
                      fontSize: '1.5rem', 
                      fontWeight: 'bold',
                      padding: '0', 
                      borderRadius: '8px',
                      // ล็อกขนาดขอบให้เท่ากันทุกด้าน ป้องกันสไตล์ตีกัน
                      border: '1px solid #C5D1A5',
                      boxSizing: 'border-box'
                    }}
                  />
                )
              })}
            </div>
            {/* แสดง Error ถ้ากรอกไม่ครบ */}
            {error && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center', width: '100%' }}>{error}</p>}
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