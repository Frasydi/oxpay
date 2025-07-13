import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

interface AuthButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  hasInputs?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  type = 'submit',
  fullWidth = true,
  hasInputs = false
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
        bgcolor: hasInputs ? '#8b5cf6' : '#B4B2B5',
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          bgcolor: hasInputs ? '#7c3aed' : '#B4B2B5',
          boxShadow :"none"
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
