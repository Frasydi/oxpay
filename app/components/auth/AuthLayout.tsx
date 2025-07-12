import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { TrendUp, Global, FlashCircle } from 'iconsax-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex',
      background: 'white',
      fontFamily: '"Open Sans", sans-serif',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {/* Form Section - Left Side */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        bgcolor: '#FFFFFF',
        p: 4,
        overflow: 'auto',
        height: '100vh',
        // Hide scrollbar while keeping scroll functionality
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        msOverflowStyle: 'none', // IE and Edge
        scrollbarWidth: 'none' // Firefox
      }}>
        {/* <Box sx={{ maxWidth: 500, width: '100%', py: 2 }}> */}
          {children}
        {/* </Box> */}
      </Box>
      
      {/* Visual Branding Section - Right Side */}
      <Box sx={{ 
        flex: 1,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E5CCF7 100%)',
        color: 'white', 
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 4,
        position: 'relative',
        overflow: 'hidden',
        borderTopLeftRadius: { xs: 24, md: 48 },
        borderBottomLeftRadius: { xs: 24, md: 48 },
        border: '1px solid #e9d5ff',
        mx: 'auto',
        maxWidth: '50vw',
        height: '100vh'
      }}>
        {/* Background Logo 2 */}
        <Box
          component="img"
          src="/OX PAY logo 2.png"
          alt="OXPay Background"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: { xs: '80%', sm: '85%', md: '90%', lg: '90%' },
            height: 'auto',
            opacity: 0.6,
            zIndex: 1,
            objectFit: 'contain',
            objectPosition: 'bottom right'
          }}
        />
        
        {/* Main Logo */}
        <Box sx={{ 
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}>
          <Box
            component="img"
            src="/OX PAY logo 1.png"
            alt="OXPay Logo"
            sx={{
              width: { xs: 140, md: 180 },
              height: 'auto'
            }}
          />
        </Box>
        
        <Box sx={{ mt: 'auto', mb: 6 }}>
          <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: 700, zIndex: 2, position: 'relative', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexDirection: 'column', textAlign: 'left', flex: 1, minWidth: 0 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Background transparent circle */}
              <Box sx={{
                position: 'absolute',
                top: -1.5,
                left: -1.5,
                width: 43,
                height: 43,
                borderRadius: '50%',
                bgcolor: '#7E01D74D',
                opacity: 0.3,
                zIndex: 0
              }} />
              {/* Main icon circle */}
              <Box sx={{ 
                p: 1.5, 
                background: 'linear-gradient(42.84deg, #7E01D7 -7.35%, #B957FF 90.68%)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                position: 'relative',
                zIndex: 1
              }}>
                <TrendUp size={20} color="white" variant="Bold" />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1f2937', fontSize: '1.1rem', fontFamily: '"Open Sans", sans-serif' }}>
                Payment Efficiency
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.4, fontFamily: '"Open Sans", sans-serif' }}>
                Boost revenue with seamless customer experiences, global acquiring, and more
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexDirection: 'column', textAlign: 'left', flex: 1, minWidth: 0 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Background transparent circle */}
              <Box sx={{
                position: 'absolute',
                top: -1.5,
                left: -1.5,
                width: 43,
                height: 43,
                borderRadius: '50%',
                bgcolor: '#7E01D74D',
                opacity: 0.3,
                zIndex: 0
              }} />
              {/* Main icon circle */}
              <Box sx={{ 
                p: 1.5, 
                background: 'linear-gradient(42.84deg, #7E01D7 -7.35%, #B957FF 90.68%)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                position: 'relative',
                zIndex: 1
              }}>
                <Global size={20} color="white" variant="Bold" />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1f2937', fontSize: '1.1rem', fontFamily: '"Open Sans", sans-serif' }}>
                Global Networks
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.4, fontFamily: '"Open Sans", sans-serif' }}>
                Accept and Send Payments from anywhere with a wide range of payment methods
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexDirection: 'column', textAlign: 'left', flex: 1, minWidth: 0 }}>
            <Box sx={{ position: 'relative' }}>
              {/* Background transparent circle */}
              <Box sx={{
                position: 'absolute',
                top: -1.5,
                left: -1.5,
                width: 43,
                height: 43,
                borderRadius: '50%',
                bgcolor: '#7E01D74D',
                opacity: 0.3,
                zIndex: 0
              }} />
              {/* Main icon circle */}
              <Box sx={{ 
                p: 1.5, 
                background: 'linear-gradient(42.84deg, #7E01D7 -7.35%, #B957FF 90.68%)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                position: 'relative',
                zIndex: 1
              }}>
                <FlashCircle size={20} color="white" variant="Bold" />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1f2937', fontSize: '1.1rem', fontFamily: '"Open Sans", sans-serif' }}>
                One Powerful System
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.4, fontFamily: '"Open Sans", sans-serif' }}>
                Streamline your payments through one unified API that evolves with you
              </Typography>
            </Box>
          </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
