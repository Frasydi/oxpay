import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Divider, 
  Stack, 
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '~/contexts/AuthContext';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import AuthButton from '~/components/auth/AuthButton';

const Login = () => {
  const { login, socialLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Custom colored icons
  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 4 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  const SingPassIcon = () => (
    <img 
      src="https://play-lh.googleusercontent.com/_36uCO9TEZoRI6UlkiEIYky4gQn4ucFK0yhAHGJEe_OqdmdZWkuk9qXsMZZOoeRo9hI" 
      alt="SingPass" 
      width="18" 
      height="18"
      style={{ borderRadius: '3px' }}
    />
  );

  const CorPassIcon = () => (
    <img 
      src="/corpass.png" 
      alt="CorPass" 
      width="18" 
      height="18"
      style={{ borderRadius: '3px' }}
    />
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      // The login function from AuthContext will handle the redirect
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (loginMethod: () => Promise<any>) => {
    setLoading(true);
    setError('');
    try {
      await socialLogin(loginMethod);
      // The socialLogin function from AuthContext will handle the redirect
    } catch (error: any) {
      setError(error.message || 'Login failed');
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
          Sign In to your account
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Social Login Buttons */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => handleSocialLogin(authService.loginWithGoogle)}
          sx={{
            py: 1,
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
          Continue with Google
        </Button>
        
        <Button
          variant="outlined"
          fullWidth
          startIcon={<SingPassIcon />}
          onClick={() => handleSocialLogin(authService.loginWithSingPass)}
          sx={{
            py: 1,
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
          Continue with SingPass
        </Button>
        
        <Button
          variant="outlined"
          fullWidth
          startIcon={<CorPassIcon />}
          onClick={() => handleSocialLogin(authService.loginWithCorPass)}
          sx={{
            py: 1,
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
          Continue with CorPass
        </Button>
      </Stack>

      {/* Divider */}
      <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="body2" sx={{ px: 2, color: '#666' }}>
          OR
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      {/* Login Form */}
      <Box component="form" onSubmit={handleLogin}>
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
          
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
              Password
            </Typography>
            <TextField
              fullWidth
              placeholder="*******"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              variant="outlined"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 6,
                  '& input': {
                    padding: '12px 14px'
                  }
                }
              }}
            />
            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link 
                href="#" 
                sx={{ 
                  color: '#666', 
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Box>
          
          <AuthButton loading={loading} hasInputs={email.trim() !== '' && password.trim() !== ''}>
            Login
          </AuthButton>
        </Stack>
      </Box>

      {/* Navigation Link */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
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

export default Login;
