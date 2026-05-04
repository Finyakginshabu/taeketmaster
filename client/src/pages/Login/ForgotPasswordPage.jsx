import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';

// 1. สร้าง Zod Schema กำหนดกฎของข้อมูล
const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "กรุณากรอกอีเมล" }).email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
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
  const onSubmit = (data) => {
    console.log("ส่งข้อมูลไปขอ OTP:", data);
    // TODO: ตรงนี้เดี๋ยวให้เพื่อนมาเขียนโค้ดเรียก API ส่งอีเมลจริงๆ

    // จำลองว่าส่งสำเร็จ แล้วสั่งเปลี่ยนหน้าไปที่หน้า OTP
    navigate('/otp'); 
  };

  return (
    <div className="auth-page">
      <h1 className="auth-logo">taeketmaster®</h1>

      <div className="auth-box">
        <h2 className="auth-title">ลืมรหัสผ่าน</h2>

        <p style={{ fontSize: '0.8rem', color: '#4A5D23', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรอกอีเมลที่ลงทะเบียนไว้ <br/> เราจะส่ง OTP ให้คุณ
        </p>

        {/* 4. ครอบฟอร์มทั้งหมดด้วยแท็ก <form> และเรียกใช้ handleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-field">
            <label className="auth-label">อีเมล (Email) <span className="required">*</span></label>
            {/* ผูก input ตัวนี้เข้ากับตัวแปร email ของ Zod */}
            <input 
              type="email" 
              className={`auth-input ${errors.email ? 'input-error' : ''}`} 
              placeholder="example@mail.taeket.ac.th" 
              {...register('email')}
            />
            {/* แสดงข้อความ Error สีแดง ถ้าผู้ใช้กรอกผิดกฎ */}
            {errors.email && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
          </div>

          {/* ปุ่มสีเขียวตุ่นเต็มกล่อง ต้องเปลี่ยน type เป็น submit */}
          <button type="submit" className="auth-btn" style={{ width: '100%', marginTop: '1rem' }}>ส่ง OTP</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem' }}>
          <Link to="/login">← กลับไปหน้าเข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
}