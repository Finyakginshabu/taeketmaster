import { useState } from 'react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <h1 className="auth-logo">taeketmaster®</h1>

      <div className="auth-box wide">
        <h2 className="auth-title">Sign Up</h2>

        <div className="auth-grid">
          <div className="auth-field">
            <label className="auth-label">Username <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="cool_username" />
          </div>
          <div className="auth-field">
            <label className="auth-label">Password <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="auth-input" 
                placeholder="strong_pA55word" 
              />
              {/* ไอคอนลูกตา SVG */}
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
          </div>

          <div className="auth-field">
            <label className="auth-label">First name <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="Khanatip" />
          </div>
          <div className="auth-field">
            <label className="auth-label">Last name <span className="required">*</span></label>
            <input type="text" className="auth-input" placeholder="Nokkhunthot" />
          </div>

          <div className="auth-field">
            <label className="auth-label">Email <span className="required">*</span></label>
            <input type="email" className="auth-input" placeholder="example@mail.taeket.ac.th" />
          </div>
          <div className="auth-field">
            <label className="auth-label">Phone number</label>
            <input type="tel" className="auth-input" placeholder="xxxxxxxxxx" />
          </div>

          <div className="auth-field">
            <label className="auth-label">Date of Birth</label>
            <input type="date" className="auth-input" style={{ color: '#A0B08C' }} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Gender</label>
            <div className="auth-radio-group">
              <label><input type="radio" name="gender" value="male" /> male</label>
              <label><input type="radio" name="gender" value="female" /> female</label>
              <label><input type="radio" name="gender" value="other" /> other</label>
              <input type="text" className="auth-input" style={{ width: '70px', padding: '0.3rem', marginLeft: '0.2rem' }} />
            </div>
          </div>
        </div>

        <button className="auth-btn" style={{ marginTop: '1.5rem' }}>Create Account</button>
      </div>
    </div>
  );
}