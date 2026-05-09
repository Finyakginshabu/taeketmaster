import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { GreenLogo } from '../../components/Icons';
import { API_BASE } from '../../api/http.js';

// 1. สร้าง Zod Schema กำหนดกฎของข้อมูล
const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" })
                    .email({ message: "Please enter your correct email" }),
});

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  // 2. เรียกใช้ React Hook Form คู่กับ Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // 3. ฟังก์ชันที่จะทำงานเมื่อกดปุ่ม "ส่ง OTP"
  const onSubmit = async (data) => {
    // try {
    //   const response = await fetch(`${API_BASE}/api/forgot-password`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: data.email })
    //   });
      
    //   if (!response.ok) throw new Error("ส่งอีเมลไม่สำเร็จ");
      
      navigate('/otp', { state: { email: data.email } }); 
    // } catch (err) {
    //   alert(err.message);
    // }
  };

  return (
    <div className="auth-page">
      <GreenLogo className="sign-up-logo" />

      <div className="auth-box">
        <h2 className="auth-title">Forgot password</h2>

        <p className="auth-description">
          Enter your registered email <br/> We will send an OTP to verify your identity
        </p>

        {/* 4. ครอบฟอร์มทั้งหมดด้วยแท็ก <form> และเรียกใช้ handleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-field">
            <label className="auth-label">Email<span className="required">*</span></label>
            {/* ผูก input ตัวนี้เข้ากับตัวแปร email ของ Zod */}
            <input 
              type="email" 
              className={`auth-input ${errors.email ? 'input-error' : ''}`} 
              placeholder="" 
              {...register('email')}
            />
            {/* แสดงข้อความ Error สีแดง ถ้าผู้ใช้กรอกผิดกฎ */}
            {errors.email && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
          </div>

          {/* ปุ่มสีเขียวตุ่นเต็มกล่อง ต้องเปลี่ยน type เป็น submit */}
          <button type="submit" className="auth-btn" style={{ width: '60%', marginTop: '2rem' }}>Next</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', marginBottom: '0' }}>
          <Link to="/signin">← Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}