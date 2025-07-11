import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Sms, Lock, ArrowLeft2, TickCircle, ScanBarcode } from 'iconsax-react';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

interface Activate2FAProps {
  email?: string;
}

const Activate2FA: React.FC<Activate2FAProps> = ({ email: propEmail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(propEmail || "user@example.com");
  const [selectedMethod, setSelectedMethod] = useState('sms');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handleActivate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock API call for 2FA activation
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, method: selectedMethod });
        }, 1500);
      });
      
      console.log('2FA activation successful:', response);
      
      // Navigate based on selected method
      if (selectedMethod === 'sms') {
        navigate('/verify-email?email=' + encodeURIComponent(email));
      } else {
        // Navigate to MFA activation page
        navigate('/activate-mfa?email=' + encodeURIComponent(email));
      }
    } catch (error: any) {
      setError(error.message || '2FA activation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to verify email page
    navigate('/verify-email?email=' + encodeURIComponent(email));
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
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginRight: '8px',
              marginLeft: '4px'
            }}>
              <TickCircle color="#10b981" variant="Bold" size="20" />
            </Box>
            <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 500, marginRight: '12px' }}>
              Verify Email
            </Typography>
            <Box sx={{ 
              height: '2px', 
              backgroundColor: '#d1d5db', 
              flex: 1, 
              mx: 2 
            }} />
            <Lock color="#8b5cf6" variant="Bold" size="20" style={{ marginRight: '12px' }} />
            <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
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
          2FA Activation
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Choose your preferred two-factor authentication method
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* 2FA Method Selection Form */}
      <Box component="form" onSubmit={handleActivate}>
        <Stack spacing={3}>
          {/* Method Selection */}
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedMethod}
              onChange={handleMethodChange}
              sx={{ gap: 2 }}
            >
              {/* SMS/Email Option */}
              <Card sx={{ 
                p: 1.5,
                border: selectedMethod === 'sms' ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
                backgroundColor: selectedMethod === 'sms' ? '#A74DE614' : 'transparent',
                borderRadius: '14px',
                boxShadow: 'none',
                cursor: 'pointer',
                width: '100%',
                minHeight: '60px',
                '&:hover': {
                  borderColor: '#8b5cf6'
                }
              }}>
                <FormControlLabel
                  value="sms"
                  control={
                    <Radio 
                      sx={{
                        color: '#d1d5db',
                        '&.Mui-checked': {
                          color: '#8b5cf6',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, ml: 1 }}>
                      <Sms color="#8b5cf6" variant="Bold" size="24" style={{ marginRight: '12px' }} />
                      <Typography variant="body1" sx={{ color: '#1f2937' }}>
                        2FA (Email Verification) (Default option)
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    margin: 0, 
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      flex: 1
                    }
                  }}
                />
              </Card>

              {/* App Authentication Option */}
              <Card sx={{ 
                p: 1.5,
                border: selectedMethod === 'app' ? '2px solid #8b5cf6' : '1px solid #e5e7eb',
                backgroundColor: selectedMethod === 'app' ? '#A74DE614' : 'transparent',
                borderRadius: '14px',
                boxShadow: 'none',
                cursor: 'pointer',
                width: '100%',
                minHeight: '60px',
                '&:hover': {
                  borderColor: '#8b5cf6'
                }
              }}>
                <FormControlLabel
                  value="app"
                  control={
                    <Radio 
                      sx={{
                        color: '#d1d5db',
                        '&.Mui-checked': {
                          color: '#8b5cf6',
                        },
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, ml: 1 }}>
                      <ScanBarcode color="#8b5cf6" variant="Bold" size="24" style={{ marginRight: '12px' }} />
                      <Typography variant="body1" sx={{ color: '#1f2937' }}>
                        MFA (App Authentication)
                      </Typography>
                    </Box>
                  }
                  sx={{ 
                    margin: 0, 
                    width: '100%',
                    '& .MuiFormControlLabel-label': {
                      flex: 1
                    }
                  }}
                />
              </Card>
            </RadioGroup>
          </FormControl>
          
          {/* Continue and Skip Buttons */}
          <Stack spacing={2}>
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
                fontFamily: '"Open Sans", sans-serif',
                '&:hover': {
                  bgcolor: '#7c3aed'
                },
                '&:disabled': {
                  bgcolor: '#e5e7eb'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate('/')}
              sx={{
                py: 1,
                borderRadius: '25px',
                border: '2px solid #8b5cf6',
                color: '#8b5cf6',
                bgcolor: 'transparent',
                fontWeight: 'bold',
                textTransform: 'none',
                fontFamily: '"Open Sans", sans-serif',
                '&:hover': {
                  border: '2px solid #7c3aed',
                  color: '#7c3aed',
                  bgcolor: 'transparent'
                }
              }}
            >
              Skip
            </Button>
          </Stack>
        </Stack>
      </Box>
    </AuthLayout>
  );
};

export default Activate2FA;
