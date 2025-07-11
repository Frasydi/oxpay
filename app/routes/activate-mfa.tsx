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
import Collapse from '@mui/material/Collapse';
import { Sms, Lock, ArrowLeft2, Barcode, TickCircle, Book1, ArrowDown2 } from 'iconsax-react';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';

interface ActivateMFAProps {
  email?: string;
}

const ActivateMFA: React.FC<ActivateMFAProps> = ({ email: propEmail }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(propEmail || "user@example.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tutorialOpen, setTutorialOpen] = useState(false);

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

  const handleActivate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock API call for MFA activation
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1500);
      });
      
      console.log('MFA activation successful:', response);
      
      // Navigate to OTP MFA verification page
      navigate('/otp-mfa?email=' + encodeURIComponent(email));
    } catch (error: any) {
      setError(error.message || 'MFA activation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Navigate back to activate 2FA page
    navigate('/activate-2fa?email=' + encodeURIComponent(email));
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
          Multi Factor Authentication (MFA)
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280' }}>
          Scan the barcode with your MFA authenticator.
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* MFA Setup Content */}
      <Box component="form" onSubmit={handleActivate}>
        <Stack spacing={3}>
          {/* Collapsible Tutorial Section */}
          <Card sx={{ 
            border: '1px solid #e5e7eb',
            borderRadius: '14px',
            boxShadow: 'none',
            overflow: 'hidden'
          }}>
            <Box 
              sx={{ 
                p: 2, 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                '&:hover': {
                  backgroundColor: '#f9fafb'
                }
              }}
              onClick={() => setTutorialOpen(!tutorialOpen)}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Book1 color="#A74DE6" variant="Bold" size="20" style={{ marginRight: '12px' }} />
                <Typography variant="body1" sx={{ color: '#1f2937', fontWeight: 500 }}>
                  See Tutorial
                </Typography>
              </Box>
              <ArrowDown2 
                color="#6b7280" 
                variant="Linear" 
                size="20" 
                style={{ 
                  transform: tutorialOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out'
                }} 
              />
            </Box>
            <Collapse in={tutorialOpen}>
              <Box sx={{ p: 2, pt: 0 }}>
                <Stack spacing={3}>
                  {/* Tutorial Title */}
                  <Typography variant="h6" sx={{ 
                    color: '#1f2937', 
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}>
                    Mobile app authenticator setup
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Use a mobile app like Google Authenticator to generate verification codes.
                  </Typography>

                  {/* Step 1 */}
                  <Box>
                    <Typography variant="body1" sx={{ 
                      color: '#1f2937', 
                      fontWeight: 600,
                      mb: 1
                    }}>
                      1. Download App
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Use a mobile app like Google Authenticator to generate verification codes.
                    </Typography>
                  </Box>

                  {/* Step 2 */}
                  <Box>
                    <Typography variant="body1" sx={{ 
                      color: '#1f2937', 
                      fontWeight: 600,
                      mb: 1
                    }}>
                      2. Scan QR Code
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                      Scan the QR Code using the App.
                    </Typography>

                    {/* QR Code with Animation */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      position: 'relative',
                      mt: 2
                    }}>
                      <Box sx={{
                        position: 'relative',
                        display: 'inline-block',
                        p: 2,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '15px',
                          left: '10px',
                          right: '10px',
                          height: '2px',
                          background: '#A74DE6',
                          boxShadow: '0 0 8px rgba(167, 77, 230, 0.8)',
                          animation: 'scanLine 4s ease-in-out infinite',
                          borderRadius: '1px',
                          zIndex: 2
                        },
                        '@keyframes scanLine': {
                          '0%': {
                            transform: 'translateY(0px)'
                          },
                          '50%': {
                            transform: 'translateY(150px)'
                          },
                          '100%': {
                            transform: 'translateY(0px)'
                          }
                        }
                      }}>
                        <img 
                          src="/example qr.png" 
                          alt="QR Code" 
                          style={{ 
                            width: '150px', 
                            height: '150px',
                            borderRadius: '8px',
                            position: 'relative',
                            zIndex: 0
                          }} 
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Step 3 */}
                  <Box>
                    <Typography variant="body1" sx={{ 
                      color: '#1f2937', 
                      fontWeight: 600,
                      mb: 1
                    }}>
                      3. Finish Setup
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Enter the verification code generated by your app.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Collapse>
          </Card>
          
          {/* Next Button */}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
          </Button>
        </Stack>
      </Box>
    </AuthLayout>
  );
};

export default ActivateMFA;
