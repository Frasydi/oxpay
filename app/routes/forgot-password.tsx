import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '~/contexts/AuthContext';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import AuthButton from '~/components/auth/AuthButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Call your forgot password service here
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          mb: 1, 
          color: '#1f2937',
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: '1.25rem'
        }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ 
          color: '#6b7280',
          fontFamily: '"Open Sans", sans-serif',
          mt: 1
        }}>
          Enter your email address and we'll send you a link to reset your password
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Password reset email sent! Please check your inbox and follow the instructions.
        </Alert>
      )}

      {/* Forgot Password Form */}
      <Box component="form" onSubmit={handleForgotPassword}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              variant="outlined"
              required
              disabled={success}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 6,
                  '& input': {
                    padding: '12px 14px'
                  }
                }
              }}
            />
          </Box>
          
          {!success && (
            <AuthButton loading={loading} hasInputs={email.trim() !== ''}>
              Send Reset Link
            </AuthButton>
          )}

          {success && (
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setSuccess(false);
                setEmail('');
                setError('');
              }}
              sx={{
                py: 1.5,
                borderRadius: 6,
                borderColor: '#DBDBE1',
                borderWidth: '0.82px',
                color: '#374151',
                bgcolor: 'white',
                textTransform: 'none',
                fontFamily: '"Open Sans", sans-serif',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#DBDBE1',
                  bgcolor: '#f9fafb'
                }
              }}
            >
              Send Another Email
            </Button>
          )}
        </Stack>
      </Box>

      {/* Navigation Links */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Remember your password?{' '}
          <Link 
            href="/login" 
            sx={{ 
              color: '#9333ea', 
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Back to Login
          </Link>
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Don't have an Account?{' '}
          <Link 
            href="/signup" 
            sx={{ 
              color: '#9333ea', 
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Sign Up here
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default ForgotPassword;
