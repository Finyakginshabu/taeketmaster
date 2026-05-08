import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
<<<<<<< HEAD

// 1. สร้าง Zod Schema: บังคับรหัส 8 ตัว และเช็คว่า 2 ช่องพิมพ์ตรงกันไหม
const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง",
  path: ["confirmPassword"], 
});

export default function ResetPasswordPage() {
=======
import { GreenLogo } from '../../components/Icons';

// 1. สร้าง Zod Schema: บังคับรหัส 8 ตัว และเช็คว่า 2 ช่องพิมพ์ตรงกันไหม
const resetPasswordSchema = z.object({
  password: z.string().min(8, { message: "At least 8 characters required" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Please make sure your passwords match",
  path: ["confirmPassword"], 
});

export default function ResetPasswordPage(){
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 2. เรียกใช้ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  // 3. ฟังก์ชันทำงานเมื่อกดปุ่ม "บันทึกรหัสผ่านใหม่"
  const onSubmit = (data) => {
    console.log("ส่งรหัสผ่านใหม่ไปอัปเดตที่ Backend:", data);
<<<<<<< HEAD
    alert("เปลี่ยนรหัสผ่านสำเร็จ! กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่");
    navigate('/login');
=======
    alert("Change password complete! please sign in with your new password");
    navigate('/signin');
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
  };

  return (
    <div className="auth-page">
<<<<<<< HEAD
      {/* 🟢 แก้โลโก้ให้ตรงกับหน้าอื่น */}
      <div className="auth-logo">taeketmaster<sup>®</sup></div>

      <div className="auth-box">
        <h2 className="auth-title">ตั้งรหัสผ่านใหม่</h2>

        {/* 🟢 เปลี่ยนสีตัวหนังสือเป็นสีดำเข้มตาม Figma */}
        <p style={{ fontSize: '0.8rem', color: '#1E1E1E', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรุณาตั้งรหัสผ่านใหม่ของคุณ <br/> (ความยาวอย่างน้อย 8 ตัวอักษร)
=======
      <GreenLogo className="sign-up-logo" />

      <div className="auth-box">
        <h2 className="auth-title">New Password</h2>

        <p className="auth-description">
          Enter your new password <br/> (Password must be at least 8 characters)
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          
<<<<<<< HEAD
          {/* ช่องรหัสผ่านใหม่ */}
          <div className="auth-field">
            <label className="auth-label">รหัสผ่านใหม่ <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              {/* 🟢 เอา placeholder="••••••••" ออก */}
=======
          <div className="auth-field">
            <label className="auth-label">New password <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
              <input 
                type={showPassword ? "text" : "password"} 
                className="auth-input" 
                {...register('password')}
                style={errors.password ? { border: '1.5px solid #FF0000' } : {}}
              />
              <span 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
<<<<<<< HEAD
                {/* 🟢 เปลี่ยนสีไอคอนให้เป็นสีดำเข้ม */}
=======

>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                )}
              </span>
            </div>
            {errors.password && <p style={{ color: '#FF0000', fontSize: '0.75rem', marginTop: '4px' }}>{errors.password.message}</p>}
          </div>

<<<<<<< HEAD
          {/* ช่องยืนยันรหัสผ่านใหม่ */}
          <div className="auth-field" style={{ marginTop: '16px' }}>
            <label className="auth-label">ยืนยันรหัสผ่านใหม่ <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
              {/* 🟢 เอา placeholder="••••••••" ออก */}
=======
          <div className="auth-field" style={{ marginTop: '16px' }}>
            <label className="auth-label">Confirm new password <span className="required">*</span></label>
            <div style={{ position: 'relative', width: '100%' }}>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                className="auth-input" 
                {...register('confirmPassword')}
                style={errors.confirmPassword ? { border: '1.5px solid #FF0000' } : {}}
              />
              <span 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
<<<<<<< HEAD
                {/* 🟢 เปลี่ยนสีไอคอนให้เป็นสีดำเข้ม */}
                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
=======

                {showConfirmPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
                )}
              </span>
            </div>
            {errors.confirmPassword && <p style={{ color: '#FF0000', fontSize: '0.75rem', marginTop: '4px' }}>{errors.confirmPassword.message}</p>}
          </div>

<<<<<<< HEAD
          {/* 🟢 ลดระยะห่าง margin-top ให้กล่องดูเล็กลง */}
          <button type="submit" className="auth-btn" style={{ marginTop: '16px' }}>บันทึกรหัสผ่านใหม่</button>
        </form>

        <div className="auth-links" style={{ marginTop: '16px' }}>
          <Link to="/login">← ยกเลิกและกลับไปหน้าเข้าสู่ระบบ</Link>
=======
          <button type="submit" className="auth-btn" style={{ marginTop: '2rem' }}>Save</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', marginBottom: '0' }}>
          <Link to="/signin">← Back to sign in</Link>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
        </div>
      </div>
    </div>
  );
}