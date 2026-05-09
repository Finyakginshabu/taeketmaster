import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreenLogo } from '../../components/Icons';

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
    
    if (otpValue.length !== 6) {
      setError("Please complete the 6-digit OTP");
      return;
    }
    
    setError("");
    console.log("ส่งรหัส OTP ไปตรวจสอบที่ Backend:", otpValue);
    navigate('/reset-password');
  };

  return (
    <div className="auth-page">
      {/* แก้โลโก้ให้ตรงกับหน้าอื่น */}
      <GreenLogo className="sign-up-logo" />

      <div className="auth-box">
        <h2 className="auth-title">Verify Code</h2>

        <p className="auth-description">
          Please enter the 6-digit OTP <br/> we sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field" style={{ alignItems: 'center' }}>
            
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
                      backgroundColor: '#E8EED9',
                      color: '#1E1E1E',
                      boxSizing: 'border-box'
                    }}
                  />
                )
              })}
            </div>
            <p className="error-message">{error || "OTP is 676767"}</p>
          </div>

          <button type="submit" className="auth-btn" style={{ width: '60%', marginTop: '1.5rem' }}>Confirm</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', marginBottom: '0' }}>
          <Link to="/forgot-password">← Didn't receive code? Resend</Link>
        </div>
      </div>
    </div>
  );
}