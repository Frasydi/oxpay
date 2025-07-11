import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Typography, 
  TextField, 
  Stack, 
  Alert,
  Card,
  IconButton,
  Button,
  CircularProgress,
  Link
} from '@mui/material';
import { Sms, TickCircle, ArrowLeft2, Lock } from 'iconsax-react';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

interface VerifyEmailProps {
  email?: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email: propEmail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(propEmail || "user@example.com");
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  // Get email from URL parameters if not provided as prop
  useEffect(() => {
    if (!propEmail) {
      const urlParams = new URLSearchParams(window.location.search);
      const emailFromUrl = urlParams.get('email');
      if (emailFromUrl) {
        setEmail(emailFromUrl);
      }
    }
  }, [propEmail]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpCode = otp.join('');
    
    if (otpCode.length !== 4) {
      setError('Please enter the complete 4-digit code');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.verifyEmail(email, otpCode);
      console.log('Email verification successful:', response);
      // Navigate to 2FA activation page after successful verification
      navigate('/activate-2fa?email=' + encodeURIComponent(email));
    } catch (error: any) {
      setError(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    try {
      await authService.resendVerificationCode(email);
      alert('Verification code sent!');
    } catch (error: any) {
      setError(error.message || 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to signup page
    navigate('/signup');
  };

  return (
    <AuthLayout>
      {/* Header with back button and progress */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'stretch', gap: 2 }}>
        {/* Back button card */}
        <Card sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 1, 
          boxShadow: 'none',
          border: '1px solid #e5e7eb',
          borderRadius: "14px",
          width: 'fit-content'
        }}>
          <IconButton 
            onClick={handleGoBack}
          >
            <ArrowLeft2 size="20" color='black' variant="Linear" />
          </IconButton>
        </Card>

        {/* Progress card */}
        <Card sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 1, 
          boxShadow: 'none',
          border: '1px solid #e5e7eb',
          borderRadius: "14px",
          flex: 1
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Sms color="#8b5cf6" variant="Bold" size="20" style={{ marginRight: '12px', marginLeft: '4px' }} />
            <Box sx={{ 
              height: '2px', 
              backgroundColor: '#8b5cf6', 
              flex: 1, 
              mx: 2 
            }} />
            <Lock color="#d1d5db" variant="Bold" size="20" style={{ marginRight: '12px' }} />
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              2FA Activation
            </Typography>
          </Box>
        </Card>
      </Box>

      <Box sx={{ textAlign: 'left', mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          mb: 1, 
          color: '#1f2937',
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '1.5rem'
        }}>
          Check your email
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          We sent a code to <strong>{email}</strong>
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* OTP Form */}
      <Box component="form" onSubmit={handleVerify}>
        <Stack spacing={3}>
          {/* OTP Input */}
          <Box>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#374151', textAlign: 'center' }}>
              Enter verification code
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              justifyContent: 'center',
              mb: 3
            }}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  inputProps={{
                    maxLength: 1,
                    style: { 
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 'bold'
                    }
                  }}
                  sx={{
                    width: '56px',
                    height: '56px',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      height: '56px',
                      '& input': {
                        padding: 0
                      }
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Resend Code */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Didn't get a code?{' '}
              <Link 
                onClick={handleResendCode}
                sx={{ 
                  color: '#9333ea', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  cursor: resendLoading ? 'not-allowed' : 'pointer',
                  opacity: resendLoading ? 0.6 : 1,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                {resendLoading ? 'Sending...' : 'Resend Code'}
              </Link>
            </Typography>
          </Box>
          
          {/* Verify Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1,
              borderRadius: '25px',
              bgcolor: '#8b5cf6',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#7c3aed'
              },
              '&:disabled': {
                bgcolor: '#e5e7eb'
              }
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
};

export default VerifyEmail;
