import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const StorePaymentsTab: React.FC = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* First Row - In Store and Virtual Payment Terminals */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(auto-fit, minmax(300px, 1fr))'
        },
        gap: { xs: 2, sm: 4 },
        width: '100%'
      }}>
        {/* In Store Payment Terminal Card */}
        <Card sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: '14px',
          bgcolor: 'white',
          transition: 'all 0.3s ease',
          minHeight: { xs: '180px', sm: '200px' },
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
          '&:hover': {
            transform: 'translateY(-2px)'
          }
        }}>
          <Typography variant="h5" sx={{
            fontWeight: 'bold',
            color: '#1f2937',
            mb: 2,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: 'left'
          }}>
            In Store Payment Terminal
          </Typography>
          <Typography variant="body1" sx={{
            color: '#6b7280',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            mb: 3,
            lineHeight: 1.6,
            textAlign: 'left'
          }}>
            Download now from the App Store or Google Play and simplify your financial life.
          </Typography>
          <Box sx={{
            display: "flex",
            justifyContent: "flex-start"
          }}>
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
          </Box>
        </Card>

        {/* Virtual Payment Terminal Card */}
        <Card sx={{
          p: 4,
          borderRadius: '14px',
          bgcolor: 'white',
          transition: 'all 0.3s ease',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
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

      <Box sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Store 1 - Odd Layout (Image + Text) */}
        <Card sx={{
          p: 0,
          borderRadius: '14px',
          bgcolor: 'white',
          transition: 'all 0.3s ease',
          width: '100%',
          border: 'none',
          boxShadow: 'none',
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
              flex: 0.35,
              minWidth: { xs: '100%', md: '250px' },
              maxWidth: { xs: '100%', md: '280px' },
              borderRadius: '12px',
              overflow: 'hidden',
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
            <Box sx={{
              flex: 0.65,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '600px'
            }}>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                color: '#1f2937',
                mb: 2,
                fontSize: '1.125rem'
              }}>
                Oxpay Merchant App – Power in Your Pocket
              </Typography>
              <Typography variant="body1" sx={{
                color: '#6b7280',
                fontSize: '0.8rem',
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        flexShrink: 0
                      }}>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.76074 12.2663L6.81387 10.3194C6.67553 10.1811 6.50595 10.1119 6.30512 10.1119C6.10428 10.1119 5.92644 10.188 5.77158 10.3402C5.63338 10.4818 5.56428 10.6528 5.56428 10.8534C5.56428 11.0538 5.63505 11.2232 5.77658 11.3615L8.25845 13.8642C8.40164 14.0057 8.56866 14.0765 8.75949 14.0765C8.95033 14.0765 9.11817 14.0057 9.26303 13.8642L14.1824 8.93982C14.338 8.78759 14.4157 8.6119 14.4157 8.41273C14.4157 8.21357 14.338 8.03662 14.1824 7.8819C14.0302 7.74357 13.8502 7.67787 13.6424 7.68482C13.4346 7.69176 13.2603 7.7644 13.1195 7.90273L8.76074 12.2663ZM10.0005 18.9579C8.84137 18.9579 7.74734 18.7366 6.71845 18.2938C5.6897 17.851 4.79116 17.2454 4.02283 16.4771C3.25449 15.7088 2.64894 14.8104 2.20616 13.7821C1.76338 12.7538 1.54199 11.66 1.54199 10.5006C1.54199 9.32759 1.76338 8.22662 2.20616 7.19773C2.64894 6.16898 3.25421 5.27385 4.02199 4.51232C4.78977 3.75065 5.68796 3.14773 6.71658 2.70357C7.74519 2.25926 8.83928 2.03711 9.99887 2.03711C11.1722 2.03711 12.2735 2.25912 13.3028 2.70315C14.332 3.14718 15.2272 3.74975 15.9884 4.51086C16.7498 5.27197 17.3525 6.16697 17.7966 7.19586C18.2407 8.22475 18.4628 9.32614 18.4628 10.5C18.4628 11.6597 18.2407 12.754 17.7964 13.7827C17.3522 14.8115 16.7493 15.7098 15.9876 16.4777C15.2261 17.2456 14.3312 17.851 13.3028 18.2938C12.2745 18.7366 11.1737 18.9579 10.0005 18.9579ZM9.99991 17.5386C11.9588 17.5386 13.6216 16.8528 14.9884 15.4813C16.3551 14.1096 17.0384 12.4492 17.0384 10.5C17.0384 8.54114 16.3551 6.87829 14.9884 5.51148C13.6216 4.14482 11.958 3.46148 9.99741 3.46148C8.05074 3.46148 6.39137 4.14482 5.01928 5.51148C3.64734 6.87829 2.96137 8.54197 2.96137 10.5025C2.96137 12.4492 3.64713 14.1086 5.01866 15.4806C6.39033 16.8526 8.05074 17.5386 9.99991 17.5386Z" fill="#03810E" />
                        </svg>
                      </Box>
                      <Typography sx={{ color: '#6b7280', fontSize: '0.8rem' }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                Everything you need to manage payments, now in your pocket. Download and transform your business today!
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Store 2 - Even Layout (Text + Image) */}
        <Card sx={{
          p: 0,
          borderRadius: '14px',
          bgcolor: 'white',
          transition: 'all 0.3s ease',
          width: '100%',
          border: 'none',
          boxShadow: 'none',
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
            <Box sx={{
              flex: 0.65,
              textAlign: 'left',
              order: { xs: 2, md: 1 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                color: '#1f2937',
                mb: 2,
                fontSize: '1.125rem'
              }}>
                Create Payment Links
              </Typography>
              <Typography variant="body1" sx={{
                color: '#6b7280',
                fontSize: '0.8rem',
                mb: 3,
                lineHeight: 1.6
              }}>
                Send. Click. Paid. It's that simple. Generate secure payment URLs with just a few taps, no coding required.
              </Typography>
            </Box>

            {/* Image */}
            <Box sx={{
              flex: 0.35,
              minWidth: { xs: '100%', md: '200px' },
              maxWidth: { xs: '100%', md: '230px' },
              borderRadius: '12px',
              overflow: 'hidden',
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
          p: 0,
          borderRadius: '14px',
          bgcolor: 'white',
          transition: 'all 0.3s ease',
          width: '100%',
          border: 'none',
          boxShadow: 'none',
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
              flex: 0.35,
              minWidth: { xs: '100%', md: '200px' },
              maxWidth: { xs: '100%', md: '230px' },
              height: { xs: '300px', md: '400px' },
              borderRadius: '12px',
              overflow: 'hidden',
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
            <Box sx={{
              flex: 0.65,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '400px'
            }}>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                color: '#1f2937',
                mb: 2,
                fontSize: '1.125rem'
              }}>
                Send Receipt via Email
              </Typography>
              <Typography variant="body1" sx={{
                color: '#6b7280',
                fontSize: '0.8rem',
                mb: 3,
                lineHeight: 1.6
              }}>
                Go Green. Save on paper. Stay connected. Automatically email receipts to customers or internal teams in seconds. Add multiple recipients, CC support, and share receipts without wasting paper.
              </Typography>
            </Box>
          </Box>
        </Card>

          {/* Ready To Get Started Call-to-Action Card */}
          <Card sx={{
            px: 4,
            py: 2,
            borderRadius: '14px',
            bgcolor: '#F2E5FB',
            textAlign: 'left',
            mt: 8,
            mb: 4
          }}>
            <Typography variant="h3" sx={{
              fontWeight: 'bold',
              color: '#7E01D7',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '2rem',
              mb: 1
            }}>
              Ready To Get Started?
            </Typography>
            <Typography variant="body1" sx={{
              color: '#6b7280',
              fontSize: '0.8rem',
              mb: 3,
              maxWidth: '600px',
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Our expert support team is here to guide you through every step of integrating the Oxpay API into your website—quickly and seamlessly.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: 'white',
                  color: '#7E01D7',
                  borderColor: '#7E01D7',
                  borderRadius: '20px',
                  py: 0.5,
                  px: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: '1px solid #7E01D7',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f8f5ff',
                    borderColor: '#7E01D7',
                    color: '#7E01D7',
                    boxShadow: 'none'
                  }
                }}
              >
                Contact Support
              </Button>
              <Button
                variant="contained"
                sx={{
                   backgroundColor: 'white',
                  color: '#7E01D7',
                  borderColor: '#7E01D7',
                  borderRadius: '20px',
                  py: 0.5,
                  px: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  border: '1px solid #7E01D7',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#f8f5ff',
                    borderColor: '#7E01D7',
                    color: '#7E01D7',
                    boxShadow: 'none'
                  }
                }}
              >
                Contact Sales
              </Button>
            </Box>
          </Card>
      </Box>
    </Box>
  );
};

export default StorePaymentsTab;
