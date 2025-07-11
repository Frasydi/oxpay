import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Avatar,
  Divider,
  Fade
} from '@mui/material';
import { Logout, UserEdit, Shield, TickCircle, User, Sms, SecurityUser, MoneyChange } from 'iconsax-react';
import { useAuth } from '~/contexts/AuthContext';
import DashboardLayout from '~/components/dashboard/DashboardLayout';
import PillTabs from '~/components/dashboard/PillTabs';
import StorePaymentsTab from '~/components/dashboard/StorePaymentsTab';
import WebIntegrationsTab from '~/components/dashboard/WebIntegrationsTab';
import { useNavigate } from 'react-router';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  // Progress data
  const progressSteps : {
    name: string;
    buttonText: string;
    icon: React.ElementType;
    status: 'success' | 'current' | 'upcoming';
    onPress? : () => void;
  }[] = [
    {
      name: 'Sign up',
      buttonText: 'Sign Up',
      icon: User,
      status: 'success' // completed
    },
    {
      name: 'Verify email',
      buttonText: 'Proceed to activate',
      icon: Sms,
      status: 'current', // current progress
      onPress : () => {
        navigate('/verify-email'); // Navigate to email verification page
      }
    },
    {
      name: 'KYC check',
      buttonText: 'Verify',
      icon: SecurityUser,
      status: 'upcoming', // upcoming,
      onPress : () => {
        navigate('/kyc-check'); // Navigate to KYC check page
      }
    },
    {
      name: 'Start transaction',
      buttonText: 'Get started',
      icon: MoneyChange,
      status: 'upcoming', // upcoming
      onPress : () => {
        navigate('/start-transaction'); // Navigate to start transaction page
      }
    }
  ];

  const getCardColors = (status: string) => {
    switch (status) {
      case 'success':
        return {
          bgColor: '#374151',
          textColor: 'white',
          iconBg: '#f8fafc',
          iconColor: '#374151',
          borderColor: '#374151',
          buttonBgColor: '#374151',
          buttonTextColor: 'white'
        };
      case 'current':
        return {
          bgColor: '#8b5cf6',
          textColor: 'white',
          iconBg: '#f8fafc',
          iconColor: '#8b5cf6',
          borderColor: '#8b5cf6',
          buttonBgColor: '#8b5cf6',
          buttonTextColor: 'white'
        };
      case 'upcoming':
      default:
        return {
          bgColor: '#e5e7eb',
          textColor: '#374151',
          iconBg: '#f8fafc',
          iconColor: '#9ca3af',
          borderColor: '#e5e7eb',
          buttonBgColor: '#B4B2B5',
          buttonTextColor: 'white'
        };
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DashboardLayout>
      <Box sx={{
        p: 3
      }}>
        <Box sx={{
          maxWidth: '1200px',
          mx: 'auto'
        }}>
          {/* Welcome Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '2.5rem',
              mb: 2
            }}>
              Welcome {user?.email?.split('@')[0]}!
            </Typography>
            <Typography variant="body1" sx={{
              color: '#6b7280',
              fontSize: '1.125rem'
            }}>
              Get started with Productboard by completing the following tasks.
            </Typography>
          </Box>

          {/* Progress Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: '2%',
            mb: 4
          }}>
            {progressSteps.map((step, index) => {
              const colors = getCardColors(step.status);
              const IconComponent = step.icon;

              return (
                <Card key={step.name} sx={{
                  px: '4%',
                  py: '3%',
                  minHeight: '8.75rem',
                  border: `0.125rem solid ${colors.borderColor}`,
                  borderRadius: '0.875rem',
                  boxShadow: 'none',
                  bgcolor: 'white',
                  transition: 'all 0.3s ease',
                  // Add animation for current status
                  ...(step.status === 'current' && {
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(1)',
                        boxShadow: `0 0 0 0 rgba(139, 92, 246, 0.4)`
                      },
                      '50%': {
                        transform: 'scale(1.02)',
                        boxShadow: `0 0 0 0.5rem rgba(139, 92, 246, 0.1)`
                      },
                      '100%': {
                        transform: 'scale(1)',
                        boxShadow: `0 0 0 0 rgba(139, 92, 246, 0)`
                      }
                    }
                  }),
                  '&:hover': {
                    transform: 'translateY(-0.125rem)',
                    borderColor: colors.borderColor,
                    opacity: 0.8,
                    // Pause animation on hover for current status
                    ...(step.status === 'current' && {
                      animationPlayState: 'paused'
                    })
                  }
                }}>
                  {/* Header with icon and status */}
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: '1rem'
                  }}>
                    <Box sx={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                      backgroundColor: colors.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent size="1.25rem" color={colors.iconColor} />
                    </Box>

                    <Box sx={{
                      width: '1rem',
                      height: '1rem',
                      borderRadius: '50%',
                      border: step.status === 'success' ? `0.0625rem solid #374151` : `0.0625rem solid #e5e7eb`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {step.status === 'success' && (
                        <Box sx={{
                          width: '0.75rem',
                          height: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <svg
                            width="6"
                            height="5"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1.5"
                              stroke="#374151"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Progress info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: '0.75rem' }}>
                    <Box sx={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '50%',
                      backgroundColor: colors.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: '0.5rem'
                    }}>
                      <Typography sx={{
                        fontSize: '0.625rem',
                        fontWeight: 600,
                        color: colors.textColor
                      }}>
                        {index + 1}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{
                      fontWeight: 600,
                      color: '#1f2937',
                      fontSize: '0.75rem'
                    }}>
                      {step.name}
                    </Typography>
                  </Box>

                  {/* Action button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      if (step.onPress && step.status === 'current') {
                        step.onPress();
                      } 
                    }}
                    startIcon={step.status === 'success' ? (
                      <Box sx={{
                        width: '0.875rem',
                        height: '0.875rem',
                        borderRadius: '50%',
                        border: '0.0625rem solid white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                      }}>
                        <svg
                          width="6"
                          height="5"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4L3.5 6.5L9 1.5"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    ) : null}
                    sx={{
                      py: '0.25rem',
                      px: '0.75rem',
                      borderRadius: '1rem',
                      backgroundColor: colors.buttonBgColor || colors.bgColor,
                      color: colors.buttonTextColor || colors.textColor,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: colors.buttonBgColor || colors.bgColor,
                        opacity: 0.9,
                        boxShadow: 'none'
                      }
                    }}
                  >
                    {step.status === 'success' ? 'Succeeded' : step.buttonText}
                  </Button>
                </Card>
              );
            })}
          </Box>

          {/* Explore Products Section */}
          <Box sx={{ mb: 4, mt: 12, textAlign: 'center' }}>
            <Typography variant="h4" sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '1.75rem',
              mb: 2
            }}>
              Explore our products!
            </Typography>
            <Typography variant="body1" sx={{
              color: '#6b7280',
              fontSize: '1rem',
              mb: 4,
              width: '100%'
            }}>
              Discover flexible payment solutions tailored for your business—whether in-store, online, or on the go.
            </Typography>

            {/* Pill-shaped Connected Tabs */}
            <PillTabs
              tabs={[
                { label: 'Store payments', value: 'store-payments' },
                { label: 'Web integrations', value: 'web-integrations' }
              ]}
              defaultSelected={selectedTab}
              onTabChange={(index, tab) => setSelectedTab(index)}
            />

            {/* Tab Content */}
            <Box sx={{ mt: 6 }}>
              {/* Store Payments Tab Content */}
              <Fade in={selectedTab === 0} timeout={500}>
                <Box sx={{ display: selectedTab === 0 ? 'block' : 'none' }}>
                  <StorePaymentsTab />
                </Box>
              </Fade>

              {/* Web Integrations Tab Content */}
              <Fade in={selectedTab === 1} timeout={500}>
                <Box sx={{ display: selectedTab === 1 ? 'block' : 'none' }}>
                  <WebIntegrationsTab />
                </Box>
              </Fade>
            </Box>
          </Box>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
