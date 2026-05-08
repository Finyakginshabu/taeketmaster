import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD

// 1. สร้าง Zod Schema กำหนดกฎของข้อมูล
const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "กรุณากรอกอีเมล" }).email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
});

export default function ForgotPasswordPage() {
=======
import { GreenLogo } from '../../components/Icons';

// 1. สร้าง Zod Schema กำหนดกฎของข้อมูล
const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" })
                    .email({ message: "Please enter your correct email" }),
});

export default function ForgotPasswordPage(){
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
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
<<<<<<< HEAD
      <h1 className="auth-logo">taeketmaster®</h1>

      <div className="auth-box">
        <h2 className="auth-title">ลืมรหัสผ่าน</h2>

        <p style={{ fontSize: '0.8rem', color: '#4A5D23', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          กรอกอีเมลที่ลงทะเบียนไว้ <br/> เราจะส่ง OTP ให้คุณ
=======
      <GreenLogo className="sign-up-logo" />

      <div className="auth-box">
        <h2 className="auth-title">Forgot password</h2>

        <p className="auth-description">
          Enter your registered email <br/> We will send an OTP to verify your identity
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
        </p>

        {/* 4. ครอบฟอร์มทั้งหมดด้วยแท็ก <form> และเรียกใช้ handleSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-field">
<<<<<<< HEAD
            <label className="auth-label">อีเมล (Email) <span className="required">*</span></label>
=======
            <label className="auth-label">Email<span className="required">*</span></label>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
            {/* ผูก input ตัวนี้เข้ากับตัวแปร email ของ Zod */}
            <input 
              type="email" 
              className={`auth-input ${errors.email ? 'input-error' : ''}`} 
<<<<<<< HEAD
              placeholder="example@mail.taeket.ac.th" 
=======
              placeholder="" 
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
              {...register('email')}
            />
            {/* แสดงข้อความ Error สีแดง ถ้าผู้ใช้กรอกผิดกฎ */}
            {errors.email && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
          </div>

          {/* ปุ่มสีเขียวตุ่นเต็มกล่อง ต้องเปลี่ยน type เป็น submit */}
<<<<<<< HEAD
          <button type="submit" className="auth-btn" style={{ width: '100%', marginTop: '1rem' }}>ส่ง OTP</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem' }}>
          <Link to="/login">← กลับไปหน้าเข้าสู่ระบบ</Link>
=======
          <button type="submit" className="auth-btn" style={{ width: '60%', marginTop: '2rem' }}>Next</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', marginBottom: '0' }}>
          <Link to="/signin">← Back to sign in</Link>
>>>>>>> abe4b13af3510960eb53516038e923370c0abc5b
        </div>
      </div>
    </div>
  );
}