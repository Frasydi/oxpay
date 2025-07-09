import React from 'react';
import { Button, CircularProgress } from '@mui/material';

interface AuthButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'submit',
  fullWidth = true
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        py: 1,
        borderRadius: '25px',
        bgcolor: '#D1D5DB',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'none',
        '&:hover': {
          bgcolor: '#9CA3AF'
        },
        '&:disabled': {
          bgcolor: '#e5e7eb'
        }
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default AuthButton;
