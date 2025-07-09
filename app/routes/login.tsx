import React, { useState } from 'react';
import { useNavigate } from 'react-router';
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
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import AuthButton from '~/components/auth/AuthButton';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Custom colored icons
  const GoogleIcon = () => (
    <img 
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMjIuNTYgMTIuMjVjMC0uNzgtLjA3LTEuNTMtLjItMi4yNUgxMnY0LjI2aDUuOTJjLS4yNiAxLjM3LTEuMDQgMi41My0yLjIxIDMuMzF2Mi43N2gzLjU3YzIuMDgtMS45MiAzLjI4LTQuNzQgMy4yOC04LjA5eiIvPgogIDxwYXRoIGZpbGw9IiMzNEE4NTMiIGQ9Ik0xMiAyM2MyLjk3IDAgNS40Ni0uOTggNy4yOC0yLjY2bC0zLjU3LTIuNzdjLS45OC42Ni0yLjIzIDEuMDYtMy43MSAxLjA2LTIuODYgMC01LjI5LTEuOTMtNi4xNi00LjUzSDIuMTh2Mi44NEM0IDIwLjUzIDcuNyAyMyAxMiAyM3oiLz4KICA8cGF0aCBmaWxsPSIjRkJCQzA1IiBkPSJNNS44NCAxNC4wOWMtLjIyLS42Ni0uMzUtMS4zNi0uMzUtMi4wOXMuMTMtMS40My4zNS0yLjA5VjcuMDdIMi4xOEMxLjQzIDguNTUgMSAxMC4yMiAxIDEyczQuMyAzLjQ1IDEuMTggNC45M2wyLjg1LTIuMjIuODEtLjYyeiIvPgogIDxwYXRoIGZpbGw9IiNFQTQzMzUiIGQ9Ik0xMiA1LjM4YzEuNjIgMCAzLjA6LjU2IDQuMjEgMS42NGwzLjE1LTMuMTVDMTcuNDUgMi4wOSAxNC45NyAxIDEyIDEgNy43IDEgNCAzLjQ3IDIuMTggNy4wN2wzLjY2IDIuODRjLjg3LTIuNiAzLjMtNC41MyA2LjE2LTQuNTN6Ii8+Cjwvc3ZnPg=="
      alt="Google" 
      width="18" 
      height="18"
      style={{ borderRadius: '3px' }}
    />
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
      const response = await authService.login(email, password);
      console.log('Login successful:', response);
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await authService.loginWithGoogle();
      console.log('Google login successful:', response);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSingPassLogin = async () => {
    setLoading(true);
    try {
      const response = await authService.loginWithSingPass();
      console.log('SingPass login successful:', response);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'SingPass login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCorPassLogin = async () => {
    setLoading(true);
    try {
      const response = await authService.loginWithCorPass();
      console.log('CorPass login successful:', response);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || 'CorPass login failed');
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
          onClick={handleGoogleLogin}
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
          onClick={handleSingPassLogin}
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
          onClick={handleCorPassLogin}
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
          
          <AuthButton loading={loading}>
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

const ProtectedLogin = () => {
  return (
    <ProtectedRoute requireAuth={false}>
      <Login />
    </ProtectedRoute>
  );
};

export default ProtectedLogin;
