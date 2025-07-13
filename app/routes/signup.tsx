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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { allCountries } from 'country-telephone-data';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import AuthButton from '~/components/auth/AuthButton';
import { useNavigate } from 'react-router';
import { useAuth } from '~/contexts/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(allCountries.find((c: any) => c.iso2 === 'sg') || allCountries[0]);
  const [countryMenuAnchor, setCountryMenuAnchor] = useState<null | HTMLElement>(null);
  const { register } = useAuth()

  // Get country flag URL from country code
  const getFlagUrl = (iso2: string) =>
    `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setCountryMenuAnchor(null);
  };

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
      const response = await register(email, password);
      console.log('Sign up successful:', response);

      // Navigate to verify email page with the user's email
      // navigate("/dashboard")
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);

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
    <Box sx={{
      flex: 1,

    }}>

      <Box sx={{
        flex: 1,
        justifySelf: "center",
        alignSelf: "center",
        maxWidth: 500, width: '100%', py: 2
      }}>


        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#1f2937',
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '1.6rem'

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
            Continue with singpass
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
            Continue with corpass
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
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#382F41' }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your full name"
                type="text"
                value={fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                variant="outlined"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 6,
                    '& input': {
                      padding: '.5rem 1.2rem'
                    }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#382F41' }}>
                Contact Number
              </Typography>
              <TextField
                fullWidth
                placeholder={`+${selectedCountry.dialCode}`}
                type="tel"
                value={contactNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContactNumber(e.target.value)}
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button
                        onClick={(e) => setCountryMenuAnchor(e.currentTarget)}
                        sx={{
                          minWidth: 'auto',
                          p: 0.5,
                          borderRadius: 1,
                          color: '#374151',
                          '&:hover': {
                            bgcolor: '#f3f4f6'
                          },
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          
                        }}
                      >
                        <img 
                          src={getFlagUrl(selectedCountry.iso2)} 
                          alt={selectedCountry.name}
                          style={{
                            width: '15px',
                            height: '10px',
                            borderRadius: '2px',
                            objectFit: 'cover'
                          }}
                        />
                      
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s ease',
                            transform: countryMenuAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        >
                          ▾
                        </Box>
                      </Button>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 6,
                    '& input': {
                      padding: '.5rem 0rem'
                    }
                  }
                }}
              />
              <Menu
                anchorEl={countryMenuAnchor}
                open={Boolean(countryMenuAnchor)}
                onClose={() => setCountryMenuAnchor(null)}
                PaperProps={{
                  sx: {
                    maxHeight: 300,
                    width: 250,
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }
                }}
              >
                {allCountries.map((country: any) => (
                  <MenuItem
                    key={`${country.iso2}-${country.dialCode}`}
                    onClick={() => handleCountrySelect(country)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 1,
                      px: 2,
                      '&:hover': {
                        bgcolor: '#f3f4f6'
                      },
                      bgcolor: selectedCountry.dialCode === country.dialCode && selectedCountry.iso2 === country.iso2 ? '#f0f9ff' : 'transparent'
                    }}
                  >
                    <img 
                      src={getFlagUrl(country.iso2)} 
                      alt={country.name}
                      style={{
                        width: '24px',
                        height: '18px',
                        borderRadius: '2px',
                        objectFit: 'cover'
                      }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {country.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6b7280' }}>
                        +{country.dialCode}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#382F41' }}>
                Email <span style={{ color: '#FC4545' }}>*</span>
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
                      padding: '.5rem 1.2rem'
                    }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#382F41' }}>
                Password <span style={{ color: '#FC4545' }}>*</span>
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
                      padding: '.5rem 1.2rem'
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ mt: 1 }}></Box>

            <AuthButton loading={loading} hasInputs={fullName.trim() !== '' && contactNumber.trim() !== '' && email.trim() !== '' && password.trim() !== ''}>
              Create Account
            </AuthButton>
          </Stack>
        </Box>

        {/* Navigation Link */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Already have an Account?{' '}
            <a
              // href="/login" 
              onClick={() => {
                navigate('/login');
              }}
              style={{
                color: '#9333ea',
                textDecoration: 'none',
                fontWeight: 'bold',
                cursor: "pointer"
              }}
            >
              Login
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>

  );
};

export default SignUp;
