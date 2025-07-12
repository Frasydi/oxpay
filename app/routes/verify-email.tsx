import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
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
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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
      if (value && index < 5) {
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

    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.verifyEmail(email, otpCode);
      console.log('Email verification successful:', response);
      // Navigate to 2FA activation page after successful verification
      navigate('/dashboard');
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
    <Box sx={{
      flex: 1,
      // minHeight : "100vh"
    }}>

      <Box sx={{
        flex: 1,
        justifySelf: "center",
        alignSelf: "center",
        maxWidth: 500, width: '100%', py: 2
      }}>

        {/* eader with back button and progress */}
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


        </Box>

        <Box sx={{ textAlign: 'left', mb: 4 }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#1f2937',
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '2.2rem'
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
            <Box sx={{ textAlign: 'center', my: 10 }}>
              <Typography variant="body2" sx={{ color: '#382F41' }}>
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

            <Box sx={{ height: '1rem' }} />

            {/* Verify Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                py: 1,
                mt : "5rem",
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default VerifyEmail;
