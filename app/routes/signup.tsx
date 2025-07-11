import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import AuthButton from '~/components/auth/AuthButton';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Custom colored icons
  const GoogleIcon = () => (
    <img 
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsPSIjNDI4NUY0IiBkPSJNMjIuNTYgMTIuMjVjMC0uNzgtLjA3LTEuNTMtLjItMi4yNUgxMnY0LjI2aDUuOTJjLS4yNiAxLjM3LTEuMDQgMi41My0yLjIxIDMuMzF2Mi43N2gzLjU3YzIuMDgtMS45MiAzLjI4LTQuNzQgMy4yOC04LjA5eiIvPgogIDxwYXRoIGZpbGw9IiMzNEE4NTMiIGQ9Ik0xMiAyM2MyLjk3IDAgNS40Ni0uOTggNy4yOC0yLjY2bC0zLjU3LTIuNzdjLS45OC42Ni0yLjIzIDEuMDYtMy43MSAxLjA2LTIuODYgMC01LjI5LTEuOTMtNi4xNi00LjUzSDIuMTh2Mi44NEM0IDIwLjUzIDcuNyAyMyAxMiAyM3oiLz4KICA8cGF0aCBmaWxsPSIjRkJCQzA1IiBkPSJNNS44NCAxNC4wOWMtLjIyLS42Ni0uMzUtMS4zNi0uMzUtMi4wOXMuMTMtMS40My4zNS0yLjA5VjcuMDdIMi4xOEMxLjQzIDguNTUgMSAxMC4yMiAxIDEyczQuMyAzLjQ1IDEuMTggNC45M2wyLjg1LTIuMjIuODEtLjYyeiIvPgogIDxwYXRoIGZpbGw9IiNFQTQzMzUiIGQ9Ik0xMiA1LjM4YzEuNjIgMCAzLjA2LjU2IDQuMjEgMS42NGwzLjE1LTMuMTVDMTcuNDUgMi4wOSAxNC45NyAxIDEyIDEgNy43IDEgNCAzLjQ3IDIuMTggNy4wN2wzLjY2IDIuODRjLjg3LTIuNiAzLjMtNC41MyA2LjE2LTQuNTN6Ii8+Cjwvc3ZnPg=="
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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.signUp(email, password);
      console.log('Sign up successful:', response);
      
      // Navigate to verify email page with the user's email
      navigate("/dashboard")
    //  navigate(`/verify-email?email=${encodeURIComponent(email)}`);
      
    } catch (error: any) {
      setError(error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (signUpMethod: () => Promise<any>) => {
    setLoading(true);
    setError('');
    try {
      const response = await signUpMethod();
      if (response.success && response.user) {
        // Since this sets localStorage, the auth context will pick it up
        window.location.reload();
      }
    } catch (error: any) {
      setError(error.message || 'Sign up failed');
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
          Create your Account
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
          onClick={() => handleSocialSignUp(authService.loginWithGoogle)}
          disabled={loading}
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
          onClick={() => handleSocialSignUp(authService.loginWithSingPass)}
          disabled={loading}
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
          onClick={() => handleSocialSignUp(authService.loginWithCorPass)}
          disabled={loading}
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

      {/* Sign Up Form */}
      <Box component="form" onSubmit={handleSignUp}>
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
          </Box>
          
          <AuthButton loading={loading} hasInputs={email.trim() !== '' && password.trim() !== ''}>
            Create Account
          </AuthButton>
        </Stack>
      </Box>

      {/* Navigation Link */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Already have an Account?{' '}
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
            Sign In here
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default SignUp;
