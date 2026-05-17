import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { GreenLogo } from '../../components/Icons';
import { API_BASE } from '../../api/http.js';


const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email" })
                    .email({ message: "Please enter your correct email" }),
});

export default function ForgotPasswordPage(){
  const navigate = useNavigate();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  
  const onSubmit = async (data) => {
    
    
    
    
    
    
      
    
      
      navigate('/otp', { state: { email: data.email } }); 
    
    
    
  };

  return (
    <div className="auth-page">
      <GreenLogo className="sign-up-logo" />

      <div className="auth-box">
        <h2 className="auth-title">Forgot password</h2>

        <p className="auth-description">
          Enter your registered email <br/> We will send an OTP to verify your identity
        </p>

        {}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-field">
            <label className="auth-label">Email<span className="required">*</span></label>
            {}
            <input 
              type="email" 
              className={`auth-input ${errors.email ? 'input-error' : ''}`} 
              placeholder="" 
              {...register('email')}
            />
            {}
            {errors.email && <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email.message}</p>}
          </div>

          {}
          <button type="submit" className="auth-btn" style={{ width: '60%', marginTop: '2rem' }}>Next</button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', marginBottom: '0' }}>
          <Link to="/signin">← Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}