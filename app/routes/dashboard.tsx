import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Typography, 
  Button,
  Card,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import { Logout, UserEdit, Shield } from 'iconsax-react';
import authService from '~/services/AuthService';
import ProtectedRoute from '~/components/auth/ProtectedRoute';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      p: 3,
      transition: 'all 0.3s ease'
    }}>
      <Box sx={{ 
        maxWidth: '800px', 
        mx: 'auto'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4
        }}>
          <Box>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold', 
              color: '#1f2937',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '2rem'
            }}>
              Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mt: 1 }}>
              Welcome back, {user?.email}
            </Typography>
          </Box>
          
          <Button
            onClick={handleLogout}
            variant="outlined"
            startIcon={<Logout size="20" />}
            sx={{
              borderColor: '#dc2626',
              color: '#dc2626',
              '&:hover': {
                borderColor: '#b91c1c',
                backgroundColor: '#fef2f2'
              }
            }}
          >
            Logout
          </Button>
        </Box>

        {/* User Info Card */}
        <Card sx={{ 
          p: 3, 
          mb: 3,
          border: '1px solid #e5e7eb',
          borderRadius: '14px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ 
              width: 64, 
              height: 64, 
              bgcolor: '#8b5cf6',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              mr: 3
            }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: '#1f2937',
                mb: 0.5
              }}>
                {user?.email}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                User ID: {user?.id}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Shield color="#10b981" variant="Bold" size="20" style={{ marginRight: '12px' }} />
              <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 500 }}>
                Multi-Factor Authentication Enabled
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <UserEdit color="#8b5cf6" variant="Bold" size="20" style={{ marginRight: '12px' }} />
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                Account verified and active
              </Typography>
            </Box>
          </Stack>
        </Card>

        {/* Quick Actions */}
        <Card sx={{ 
          p: 3,
          border: '1px solid #e5e7eb',
          borderRadius: '14px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            color: '#1f2937',
            mb: 3
          }}>
            Quick Actions
          </Typography>
          
          <Stack spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '12px',
                borderColor: '#e5e7eb',
                color: '#374151',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#8b5cf6',
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              View Profile Settings
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '12px',
                borderColor: '#e5e7eb',
                color: '#374151',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#8b5cf6',
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              Security Settings
            </Button>
            
            <Button
              variant="outlined"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '12px',
                borderColor: '#e5e7eb',
                color: '#374151',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#8b5cf6',
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              Transaction History
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

const ProtectedDashboard = () => {
  return (
    <ProtectedRoute requireAuth={true}>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default ProtectedDashboard;
