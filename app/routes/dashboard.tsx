import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
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
      <Box sx={{
        p: { xs: 0.5, sm: 3 },
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <Box sx={{
          maxWidth: { xs: '100%', sm: '1200px' },
          mx: 'auto',
          width: '100%',
          px: { xs: 0.5, sm: 0 },
          boxSizing: 'border-box'
        }}>
          {/* Welcome Section */}
          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Typography variant="h3" sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              mb: { xs: 1, sm: 2 }
            }}>
              Welcome {user?.email?.split('@')[0]}!
            </Typography>
            <Typography variant="body1" sx={{
              color: '#6b7280',
              fontSize: { xs: '1rem', sm: '1.125rem' }
            }}>
              Get started with Productboard by completing the following tasks.
            </Typography>
          </Box>

          {/* Progress Card */}
          <Card sx={{
            px: { xs: 1, sm: 2 },
            py : 2,
            // mb: { xs: 3, sm: 4 },
            borderRadius: '1rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            bgcolor: 'white',
            border: '1px solid #f3f4f6',
            width: '100%'
          }}>
            {/* Progress Icons and Connecting Line */}
            <Box sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: { xs: 3, sm: 4 },
              px : "5vw",
              // px: { xs: 1, sm: 2 },
              py : 0
            }}>
              {/* Connecting Line */}
              <Box sx={{
                position: 'absolute',
                top: { xs: '19px', sm: '25px' }, // Half of icon height to align with icon centers
                left: { xs: '5vw', sm: '5vw' }, // Half of icon width to center line with first icon
                right: { xs: '5vw', sm: '8vw' }, // Half of icon width to center line with last icon
                height: '15px',
                bgcolor: '#e5e7eb',
                zIndex: 0,
                
              }} />

              {progressSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = step.status === 'success';
                const isCurrent = step.status === 'current';

                return (
                  <Box key={step.name} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {/* Icon Circle */}
                    <Box sx={{
                      width: { xs: '48px', sm: '64px' },
                      height: { xs: '48px', sm: '64px' },
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? "#F5EAFD" :  '#F7F7F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      border: isCurrent ? '3px solid #8b5cf6' : 'none',
                      ...(isCurrent && {
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%': {
                            transform: 'scale(1)',
                            boxShadow: `0 0 0 0 rgba(139, 92, 246, 0.4)`
                          },
                          '50%': {
                            transform: 'scale(1.05)',
                            boxShadow: `0 0 0 8px rgba(139, 92, 246, 0.1)`
                          },
                          '100%': {
                            transform: 'scale(1)',
                            boxShadow: `0 0 0 0 rgba(139, 92, 246, 0)`
                          }
                        }
                      })
                    }}>
                      {isCompleted ? (
                        <svg 
                          width="24" 
                          height="24" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_45_15827)">
                            <path 
                              d="M22.9526 9.4726L21.8826 8.40122C21.6562 8.17598 21.5323 7.87566 21.5323 7.55747V6.04156C21.5323 4.07041 19.9285 2.46632 17.9577 2.46632H16.4421C16.1287 2.46632 15.8213 2.3388 15.5996 2.11714L14.5284 1.04576C13.1343 -0.348586 10.868 -0.348586 9.47394 1.04576L8.40036 2.11714C8.17873 2.3388 7.87131 2.46632 7.55794 2.46632H6.0423C4.07149 2.46632 2.46768 4.07041 2.46768 6.04156V7.55747C2.46768 7.87566 2.34376 8.17598 2.11856 8.40122L1.04736 9.47141C0.371761 10.1471 0 11.0457 0 12.0003C0 12.9549 0.372952 13.8535 1.04736 14.528L2.11737 15.5994C2.34376 15.8246 2.46768 16.1249 2.46768 16.4431V17.959C2.46768 19.9302 4.07149 21.5343 6.0423 21.5343H7.55794C7.87131 21.5343 8.17873 21.6618 8.40036 21.8835L9.47155 22.956C10.1686 23.652 11.0837 24 11.9988 24C12.9139 24 13.829 23.652 14.5261 22.9548L15.5973 21.8835C15.8213 21.6618 16.1287 21.5343 16.4421 21.5343H17.9577C19.9285 21.5343 21.5323 19.9302 21.5323 17.959V16.4431C21.5323 16.1249 21.6562 15.8246 21.8826 15.5994L22.9526 14.5292C23.627 13.8535 24 12.9561 24 12.0003C24 11.0445 23.6282 10.1471 22.9526 9.4726ZM17.4275 10.6083L10.2782 15.3753C10.0769 15.51 9.8457 15.5755 9.61692 15.5755C9.3095 15.5755 9.00447 15.4564 8.7745 15.2264L6.39142 12.8429C5.92553 12.3769 5.92553 11.6237 6.39142 11.1577C6.85731 10.6918 7.61037 10.6918 8.07626 11.1577L9.76825 12.85L16.1049 8.62527C16.6542 8.2594 17.3929 8.40718 17.7575 8.95538C18.1233 9.50359 17.9756 10.2437 17.4275 10.6083Z" 
                              fill="#7E01D7"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_45_15827">
                              <rect width="24" height="24" fill="white"/>
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <IconComponent 
                          size={30} 
                          color={isCurrent ? '#8b5cf6' : '#9ca3af'}
                        />
                      )}
                    </Box>

                    {/* Step Name and Button */}
                    <Box sx={{
                      mt: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}>
                      <Typography sx={{
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 600,
                        color: isCompleted ? '#374151' : isCurrent ? '#8b5cf6' : '#9ca3af',
                        textAlign: 'center',
                        maxWidth: { xs: '80px', sm: '100px' }
                      }}>
                        {step.name}
                      </Typography>
                      
                      {/* Small Button */}
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          if (step.onPress && isCurrent) {
                            step.onPress();
                          }
                        }}
                        disabled={!isCurrent && !isCompleted}
                        sx={{
                          width: { xs: '48px', sm: '64px' }, // Same as icon width
                          // height: { xs: '20px', sm: '24px' },
                          // minHeight: { xs: '20px', sm: '24px' },
                          py: ".2rem",
                          px: 0.5,
                          borderRadius: '10px',
                          backgroundColor: isCompleted ? '#E6FBE9' : '#EEEEEE',
                          color: isCompleted ? '#16a34a' : '#6b7280',
                          textTransform: 'none',
                          fontWeight: 600,
                          fontSize: { xs: '0.5rem', sm: '0.6rem' },
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: isCompleted ? '#E6FBE9' : '#EEEEEE',
                            opacity: 0.8,
                            boxShadow: 'none'
                          },
                          '&:disabled': {
                            backgroundColor: isCompleted ? '#E6FBE9' : '#EEEEEE',
                            color: isCompleted ? '#16a34a' : '#6b7280',
                            opacity: 0.7
                          }
                        }}
                      >
                        {isCompleted ? 'Done' : index === 1 ? 'Verify' : index === 2 ? 'KYC' : 'Start'}
                      </Button>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Card>

        
        </Box>
      </Box>
  );
};

export default Dashboard;
