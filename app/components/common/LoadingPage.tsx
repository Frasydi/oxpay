import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '~/contexts/AuthContext';

const LoadingPage: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #E5CCF7 100%)',
        color: '#1f2937',
        textAlign: 'center',
        padding: 2
      }}
    >
      <Box sx={{ mb: 3 }}>
        <img 
          src="/OX PAY logo 1.png" 
          alt="OX PAY Logo" 
          style={{ 
            maxWidth: '200px', 
            height: 'auto',
            marginBottom: '20px'
          }} 
        />
      </Box>
      
      <CircularProgress 
        size={50} 
        sx={{ 
          color: '#7E01D7',
          mb: 3
        }} 
      />
      
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium', color: '#1f2937' }}>
        {isLoading ? 'Loading OX PAY...' : isAuthenticated ? 'Redirecting to Dashboard...' : 'Welcome to OX PAY'}
      </Typography>
      
      <Typography variant="body1" sx={{ opacity: 0.7, maxWidth: '400px', color: '#6b7280' }}>
        {isLoading 
          ? 'Please wait while we verify your authentication status.'
          : isAuthenticated 
            ? 'Taking you to your dashboard...'
            : 'Secure payment solutions for modern businesses.'
        }
      </Typography>
    </Box>
  );
};

export default LoadingPage;
