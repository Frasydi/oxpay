import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Typography, 
  Stack, 
  Alert,
  Card,
  IconButton,
  Button,
  CircularProgress,
  TextField
} from '@mui/material';
import { ArrowLeft2 } from 'iconsax-react';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

interface OTPMFAProps {
  email?: string;
}

const OTPMFA: React.FC<OTPMFAProps> = ({ email: propEmail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(propEmail || "user@example.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
    if (value.length > 1) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpCode = otpValues.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      setLoading(false);
      return;
    }

    try {
      // Mock API call for OTP verification
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otpCode === '123456') {
            resolve({ success: true });
          } else {
            reject(new Error('Invalid verification code'));
          }
        }, 1500);
      });
      
      console.log('OTP verification successful:', response);
      
      // Navigate to dashboard after successful verification
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to activate MFA page
    navigate('/activate-mfa?email=' + encodeURIComponent(email));
  };

  return (
    <AuthLayout>
      {/* Header with back button */}
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
          fontSize: '1.5rem'
        }}>
          Multi Factor Authentication (MFA)
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Please enter the code from your MFA authenticator.
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* OTP Input Form */}
      <Box component="form" onSubmit={handleVerify}>
        <Stack spacing={3}>
          {/* OTP Input Fields */}
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            justifyContent: 'center'
          }}>
            {otpValues.map((value, index) => (
              <TextField
                key={index}
                inputRef={(el) => inputRefs.current[index] = el}
                value={value}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    padding: '16px 12px'
                  }
                }}
                sx={{
                  width: '56px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#e5e7eb',
                      borderWidth: '1px'
                    },
                    '&:hover fieldset': {
                      borderColor: '#8b5cf6'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b5cf6',
                      borderWidth: '2px'
                    }
                  }
                }}
              />
            ))}
          </Box>
          
          {/* Verify Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading || otpValues.some(value => !value)}
            sx={{
              py: 1,
              borderRadius: '25px',
              bgcolor: '#8b5cf6',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              fontFamily: '"Open Sans", sans-serif',
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

export default OTPMFA;
