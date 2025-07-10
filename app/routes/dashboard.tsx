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

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);

  // Progress data
  const progressSteps = [
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
      status: 'current' // current progress
    },
    {
      name: 'KYC check',
      buttonText: 'Verify',
      icon: SecurityUser,
      status: 'upcoming' // upcoming
    },
    {
      name: 'Start transaction',
      buttonText: 'Get started',
      icon: MoneyChange,
      status: 'upcoming' // upcoming
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 3, 
            mb: 4 
          }}>
            {progressSteps.map((step, index) => {
              const colors = getCardColors(step.status);
              const IconComponent = step.icon;
              
              return (
                <Card key={step.name} sx={{ 
                  px: 4,
                  py: 2,
                  minHeight: '140px',
                  border: `2px solid ${colors.borderColor}`,
                  borderRadius: '14px',
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
                        boxShadow: `0 0 0 8px rgba(139, 92, 246, 0.1)`
                      },
                      '100%': {
                        transform: 'scale(1)',
                        boxShadow: `0 0 0 0 rgba(139, 92, 246, 0)`
                      }
                    }
                  }),
                  '&:hover': {
                    transform: 'translateY(-2px)',
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
                      mb: 2
                    }}>
                      <Box sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: colors.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size="28" color={colors.iconColor} />
                      </Box>
                      
                      <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: step.status === 'success' ? '2px solid #374151' : '2px solid #e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {step.status === 'success' && (
                          <Box sx={{
                            width: 14,
                            height: 14,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 4L3.5 6.5L9 1.5"
                                stroke="#374151"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Box>
                        )}
                      </Box>
                    </Box>

                    {/* Progress info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: colors.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2
                      }}>
                        <Typography sx={{ 
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: colors.textColor
                        }}>
                          {index + 1}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600,
                        color: '#1f2937',
                        fontSize: '0.875rem'
                      }}>
                        {step.name}
                      </Typography>
                    </Box>

                    {/* Action button */}
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={step.status === 'success' ? (
                        <Box sx={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: '1.5px solid white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'transparent'
                        }}>
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1.5"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Box>
                      ) : null}
                      sx={{
                        py: 0.5,
                        borderRadius: '20px',
                        backgroundColor: colors.buttonBgColor || colors.bgColor,
                        color: colors.buttonTextColor || colors.textColor,
                        textTransform: 'none',
                        fontWeight: 600,
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
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 4 
                  }}>
                    {/* First Row - In Store and Virtual Payment Terminals */}
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                      gap: 4 
                    }}>
                      {/* In Store Payment Terminal Card */}
                      <Card sx={{ 
                        p: 4,
                        borderRadius: '14px',
                        bgcolor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          color: '#1f2937',
                          mb: 2,
                          fontSize: '1.5rem',
                          textAlign: 'left'
                        }}>
                          In Store Payment Terminal
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: '#6b7280',
                          fontSize: '1rem',
                          mb: 3,
                          lineHeight: 1.6,
                          textAlign: 'left'
                        }}>
                          Download now from the App Store or Google Play and simplify your financial life.
                        </Typography>
                        <Box>



                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: '#8b5cf6',
                            color: 'white',
                            borderRadius: '25px',
                            py: 1,
                            px: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: 'none',
                            '&:hover': {
                              backgroundColor: '#7c3aed',
                              boxShadow: 'none'
                            }
                          }}
                        >
                          Contact Sales
                        </Button>
                        
                      </Card>

                      {/* Virtual Payment Terminal Card */}
                      <Card sx={{ 
                        p: 4,
                        borderRadius: '14px',
                        bgcolor: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)'
                        }
                      }}>
                        <Typography variant="h5" sx={{ 
                          fontWeight: 'bold', 
                          color: '#1f2937',
                          mb: 2,
                          fontSize: '1.5rem',
                          textAlign: 'left'
                        }}>
                          Virtual Payment Terminal
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: '#6b7280',
                          fontSize: '1rem',
                          mb: 3,
                          lineHeight: 1.6,
                          textAlign: 'left'
                        }}>
                          Download now from the App Store or Google Play and simplify your financial life.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                          <Box
                            component="img"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Get it on Google Play"
                            sx={{
                              height: 40,
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8
                              }
                            }}
                          />
                          <Box
                            component="img"
                            src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                            alt="Download on App Store"
                            sx={{
                              height: 40,
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8
                              }
                            }}
                          />
                        </Box>
                      </Card>
                    </Box>

                    {/* Store 1 - Odd Layout (Image + Text) */}
                    <Card sx={{ 
                      p: 4,
                      borderRadius: '14px',
                      bgcolor: 'white',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 4,
                        flexDirection: { xs: 'column', md: 'row' }
                      }}>
                        {/* Image */}
                        <Box sx={{ 
                          minWidth: { xs: '100%', md: '300px' },
                          maxWidth: { xs: '100%', md: '300px' },
                          height: '300px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          bgcolor: '#f8fafc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Box
                            component="img"
                            src="/store1.png"
                            alt="Oxpay Merchant App"
                            sx={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                        
                        {/* Text Content */}
                        <Box sx={{ flex: 1, textAlign: 'left' }}>
                          <Typography variant="h5" sx={{ 
                            fontWeight: 'bold', 
                            color: '#1f2937',
                            mb: 2,
                            fontSize: '1.5rem'
                          }}>
                            Oxpay Merchant App – Power in Your Pocket
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            color: '#6b7280',
                            fontSize: '1rem',
                            mb: 3,
                            lineHeight: 1.6
                          }}>
                            All-in-one payments. Zero complications. From in-store terminals to your mobile device, the Oxpay app lets you:
                            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2, mb: 2 }}>
                              {[
                                'Accept payments',
                                'Issue refunds', 
                                'Send receipts',
                                'Create payment links',
                                'Track every transaction in real-time'
                              ].map((feature, index) => (
                                <Box component="li" key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Box sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    border: '2px solid #10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 2,
                                    flexShrink: 0
                                  }}>
                                    <svg
                                      width="10"
                                      height="8"
                                      viewBox="0 0 10 8"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1 4L3.5 6.5L9 1.5"
                                        stroke="#10b981"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Box>
                                  <Typography sx={{ color: '#6b7280', fontSize: '1rem' }}>
                                    {feature}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                            Everything you need to manage payments, now in your pocket. Download and transform your business today!
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#8b5cf6',
                              color: 'white',
                              borderRadius: '25px',
                              py: 1,
                              px: 3,
                              textTransform: 'none',
                              fontWeight: 600,
                              boxShadow: 'none',
                              '&:hover': {
                                backgroundColor: '#7c3aed',
                                boxShadow: 'none'
                              }
                            }}
                          >
                            Download App
                          </Button>
                        </Box>
                      </Box>
                    </Card>

                    {/* Store 2 - Even Layout (Text + Image) */}
                    <Card sx={{ 
                      p: 4,
                      borderRadius: '14px',
                      bgcolor: 'white',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 4,
                        flexDirection: { xs: 'column', md: 'row' }
                      }}>
                        {/* Text Content */}
                        <Box sx={{ flex: 1, textAlign: 'left', order: { xs: 2, md: 1 } }}>
                          <Typography variant="h5" sx={{ 
                            fontWeight: 'bold', 
                            color: '#1f2937',
                            mb: 2,
                            fontSize: '1.5rem'
                          }}>
                            Create Payment Links
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            color: '#6b7280',
                            fontSize: '1rem',
                            mb: 3,
                            lineHeight: 1.6
                          }}>
                            Send. Click. Paid. It's that simple. Generate secure payment URLs with just a few taps, no coding required.
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#8b5cf6',
                              color: 'white',
                              borderRadius: '25px',
                              py: 1,
                              px: 3,
                              textTransform: 'none',
                              fontWeight: 600,
                              boxShadow: 'none',
                              '&:hover': {
                                backgroundColor: '#7c3aed',
                                boxShadow: 'none'
                              }
                            }}
                          >
                            Get Started
                          </Button>
                        </Box>
                        
                        {/* Image */}
                        <Box sx={{ 
                          minWidth: { xs: '100%', md: '300px' },
                          maxWidth: { xs: '100%', md: '300px' },
                          height: '300px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          bgcolor: '#f8fafc',
                          order: { xs: 1, md: 2 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Box
                            component="img"
                            src="/store2.png"
                            alt="Create Payment Links"
                            sx={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                      </Box>
                    </Card>

                    {/* Store 3 - Odd Layout (Image + Text) */}
                    <Card sx={{ 
                      p: 4,
                      borderRadius: '14px',
                      bgcolor: 'white',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 4,
                        flexDirection: { xs: 'column', md: 'row' }
                      }}>
                        {/* Image */}
                        <Box sx={{ 
                          minWidth: { xs: '100%', md: '300px' },
                          maxWidth: { xs: '100%', md: '300px' },
                          height: '300px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          bgcolor: '#f8fafc',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Box
                            component="img"
                            src="/store3.png"
                            alt="Send Receipt via Email"
                            sx={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              width: 'auto',
                              height: 'auto',
                              objectFit: 'contain'
                            }}
                          />
                        </Box>
                        
                        {/* Text Content */}
                        <Box sx={{ flex: 1, textAlign: 'left' }}>
                          <Typography variant="h5" sx={{ 
                            fontWeight: 'bold', 
                            color: '#1f2937',
                            mb: 2,
                            fontSize: '1.5rem'
                          }}>
                            Send Receipt via Email
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            color: '#6b7280',
                            fontSize: '1rem',
                            mb: 3,
                            lineHeight: 1.6
                          }}>
                            Go Green. Save on paper. Stay connected. Automatically email receipts to customers or internal teams in seconds. Add multiple recipients, CC support, and share receipts without wasting paper.
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#8b5cf6',
                              color: 'white',
                              borderRadius: '25px',
                              py: 1,
                              px: 3,
                              textTransform: 'none',
                              fontWeight: 600,
                              boxShadow: 'none',
                              '&:hover': {
                                backgroundColor: '#7c3aed',
                                boxShadow: 'none'
                              }
                            }}
                          >
                            Learn More
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Box>
                </Box>
              </Fade>

              {/* Web Integrations Tab Content */}
              <Fade in={selectedTab === 1} timeout={500}>
                <Box sx={{ display: selectedTab === 1 ? 'block' : 'none' }}>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    gap: 4 
                  }}>
                    {/* Payment Gateway API Card */}
                    <Card sx={{ 
                      p: 4,
                      borderRadius: '14px',
                      bgcolor: 'white',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 'bold', 
                        color: '#1f2937',
                        mb: 2,
                        fontSize: '1.5rem',
                        textAlign: 'left'
                      }}>
                        Payment Gateway API
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#6b7280',
                        fontSize: '1rem',
                        mb: 3,
                        lineHeight: 1.6,
                        textAlign: 'left'
                      }}>
                        Integrate secure payment processing directly into your website or application with our robust API.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          borderRadius: '25px',
                          py: 1,
                          px: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: 'none',
                          alignSelf: 'flex-start',
                          '&:hover': {
                            backgroundColor: '#7c3aed',
                            boxShadow: 'none'
                          }
                        }}
                      >
                        View Documentation
                      </Button>
                    </Card>

                    {/* E-commerce Plugins Card */}
                    <Card sx={{ 
                      p: 4,
                      borderRadius: '14px',
                      bgcolor: 'white',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      '&:hover': {
                        transform: 'translateY(-2px)'
                      }
                    }}>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 'bold', 
                        color: '#1f2937',
                        mb: 2,
                        fontSize: '1.5rem',
                        textAlign: 'left'
                      }}>
                        E-commerce Plugins
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: '#6b7280',
                        fontSize: '1rem',
                        mb: 3,
                        lineHeight: 1.6,
                        textAlign: 'left'
                      }}>
                        Ready-to-use plugins for popular e-commerce platforms like Shopify, WooCommerce, and Magento.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          borderRadius: '25px',
                          py: 1,
                          px: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          boxShadow: 'none',
                          alignSelf: 'flex-start',
                          '&:hover': {
                            backgroundColor: '#7c3aed',
                            boxShadow: 'none'
                          }
                        }}
                      >
                        Browse Plugins
                      </Button>
                    </Card>
                  </Box>
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
