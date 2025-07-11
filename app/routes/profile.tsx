import { ArrowBack, Edit, Close, Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Toast, { type ToastType } from '../components/common/Toast';
import { useState } from 'react';

export default function ProfilePage() {
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toast, setToast] = useState<{
        open: boolean;
        message: string;
        type: ToastType;
    }>({
        open: false,
        message: '',
        type: 'success'
    });

    const handleCloseModal = () => {
        setIsChangePasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    const showToast = (message: string, type: ToastType = 'success') => {
        setToast({ open: true, message, type });
        
        // Auto hide toast after 5 seconds
        setTimeout(() => {
            setToast(prev => ({ ...prev, open: false }));
        }, 5000);
    };

    const handleChangePassword = () => {
        // Validate passwords
        if (!currentPassword || !newPassword || !confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }
        
        // Simulate password change success
        // In real implementation, you would make an API call here
        
        // Close modal and show success toast
        handleCloseModal();
        showToast('Password changed successfully', 'success');
    };

    const handleToastClose = () => {
        setToast(prev => ({ ...prev, open: false }));
    };

    return (
        <DashboardLayout>
            <Box sx={{ 
                p: { xs: 2, sm: 3 }, 
                width: '100%', 
                maxWidth: '100vw', 
                boxSizing: 'border-box', 
                overflowX: 'hidden',
                // Custom scrollbar styling
                '& ::-webkit-scrollbar': {
                    width: '6px',
                    height: '6px',
                },
                '& ::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                },
                '& ::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '10px',
                    '&:hover': {
                        background: '#a8a8a8',
                    }
                },
                '& ::-webkit-scrollbar-thumb:active': {
                    background: '#888',
                }
            }}>
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 3,
                    gap: 2
                }}>
                    <IconButton 
                        sx={{ 
                            color: '#A44DE3',
                            '&:hover': {
                                backgroundColor: 'rgba(164, 77, 227, 0.1)'
                            }
                        }}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ color: '#A44DE3', fontWeight: 500 }}>
                        Settings
                    </Typography>
                </Box>

                {/* Profile Title */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" sx={{ 
                        fontWeight: 700, 
                        color: '#333',
                        mb: 1,
                        fontSize: { xs: '2rem', sm: '3rem' }
                    }}>
                        Profile
                    </Typography>
                    <Typography variant="body1" sx={{ 
                        color: '#666',
                        fontSize: '16px'
                    }}>
                        Manage your account data below
                    </Typography>
                </Box>

                {/* Personal Details Card */}
                <Card sx={{ 
                    mb: 3, 
                    borderRadius: 3, 
                    border: '1px solid #E5E7EB',
                    boxShadow: 'none',
                    width: '100%',
                    maxWidth: '100%'
                }}>
                    <CardContent sx={{ 
                        p: { xs: 2, sm: 3 },
                        width: '100%',
                        maxWidth: '100%'
                    }}>
                        {/* Personal Details Header */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 3,
                            gap: 1
                        }}>
                            <Box sx={{
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                                Personal Details
                            </Typography>
                        </Box>

                        {/* Profile Info */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            flexWrap: { xs: 'wrap', sm: 'nowrap' },
                            gap: { xs: 2, sm: 0 }
                        }}>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: 2
                            }}>
                                {/* Profile Avatar */}
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    backgroundColor: '#F2E5FB',
                                    border: '2px solid #A44DE3',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#A44DE3',
                                    fontWeight: 600,
                                    fontSize: '24px',
                                    position: 'relative'
                                }}>
                                    J
                                    {/* Status indicator */}
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 2,
                                        right: 2,
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: '#22C55E',
                                        border: '2px solid white'
                                    }} />
                                    {/* Edit icon */}
                                    <IconButton sx={{
                                        position: 'absolute',
                                        bottom: -2,
                                        right: -2,
                                        width: 24,
                                        height: 24,
                                        backgroundColor: 'white',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        '&:hover': {
                                            backgroundColor: '#f8f9fa',
                                            transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s ease-in-out'
                                    }}>
                                        <Edit sx={{ fontSize: 12, color: '#666' }} />
                                    </IconButton>
                                </Box>

                                {/* User Info */}
                                <Box>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600, 
                                        color: '#333',
                                        mb: 0.5
                                    }}>
                                        John Doe
                                    </Typography>
                                    <Typography variant="body2" sx={{ 
                                        color: '#666',
                                        fontSize: '14px'
                                    }}>
                                        johndoe@oxpay.com
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Edit Button */}
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: '#E5E7EB',
                                    color: '#666',
                                    textTransform: 'none',
                                    borderRadius: '25px', // Pill shape
                                    px: 2,
                                    py: 1,
                                    fontWeight: 500,
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:hover': {
                                        borderColor: '#A44DE3',
                                        backgroundColor: 'rgba(164, 77, 227, 0.04)',
                                        color: '#A44DE3'
                                    }
                                }}
                            >
                                Edit
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* Account Card */}
                <Card sx={{ 
                    borderRadius: 3, 
                    border: '1px solid #E5E7EB',
                    boxShadow: 'none',
                    width: '100%',
                    maxWidth: '100%'
                }}>
                    <CardContent sx={{ 
                        p: { xs: 2, sm: 3 },
                        width: '100%',
                        maxWidth: '100%'
                    }}>
                        {/* Account Header */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 3,
                            gap: 1
                        }}>
                            <Box sx={{
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <line x1="3" y1="10" x2="21" y2="10" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                                Account
                            </Typography>
                        </Box>

                        {/* Password Section */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            flexWrap: { xs: 'wrap', sm: 'nowrap' },
                            gap: { xs: 2, sm: 0 }
                        }}>
                            <Box>
                                <Typography variant="body1" sx={{ 
                                    fontWeight: 500, 
                                    color: '#333',
                                    mb: 0.5
                                }}>
                                    Password
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontSize: '14px',
                                    letterSpacing: '2px'
                                }}>
                                    ••••••••••
                                </Typography>
                            </Box>

                            {/* Change Password Button */}
                            <Button
                                variant="outlined"
                                onClick={() => setIsChangePasswordModalOpen(true)}
                                sx={{
                                    borderColor: '#E5E7EB',
                                    color: '#666',
                                    textTransform: 'none',
                                    borderRadius: '25px', // Pill shape
                                    px: 2,
                                    py: 1,
                                    fontWeight: 500,
                                    width: { xs: '100%', sm: 'auto' },
                                    '&:hover': {
                                        borderColor: '#A44DE3',
                                        backgroundColor: 'rgba(164, 77, 227, 0.04)',
                                        color: '#A44DE3'
                                    }
                                }}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

                {/* Change Password Modal */}
                <Modal
                    open={isChangePasswordModalOpen}
                    onClose={handleCloseModal}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
                        p: 2
                    }}
                >
                    <Card sx={{
                        borderRadius: '14px',
                        backgroundColor: 'white',
                        width: '100%',
                        maxWidth: '480px',
                        position: 'relative',
                        outline: 'none'
                    }}>
                        <CardContent sx={{ p: 4 }}>
                            {/* Close Button */}
                            <IconButton
                                onClick={handleCloseModal}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    color: '#666',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    }
                                }}
                            >
                                <Close />
                            </IconButton>

                            {/* Header */}
                            <Box sx={{ mb: 4, textAlign: 'left' }}>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 600, 
                                    color: '#333',
                                    mb: 1
                                }}>
                                    Change Password
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontSize: '14px'
                                }}>
                                    Update your existing password
                                </Typography>
                            </Box>

                            {/* Form Fields */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {/* Current Password */}
                                <Box>
                                    <Typography variant="body2" sx={{ 
                                        color: '#333',
                                        fontWeight: 500,
                                        mb: 1,
                                        textAlign: 'left'
                                    }}>
                                        Current Password
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter current password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                                        edge="end"
                                                        sx={{ color: '#666' }}
                                                    >
                                                        {!showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: '#E5E7EB',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#A44DE3',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#A44DE3',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                py: 1,
                                            },
                                        }}
                                    />
                                </Box>

                                {/* New Password */}
                                <Box>
                                    <Typography variant="body2" sx={{ 
                                        color: '#333',
                                        fontWeight: 500,
                                        mb: 1,
                                        textAlign: 'left'
                                    }}>
                                        New Password
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                                        edge="end"
                                                        sx={{ color: '#666' }}
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: '#E5E7EB',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#A44DE3',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#A44DE3',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                py: 1,
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Confirm Password */}
                                <Box>
                                    <Typography variant="body2" sx={{ 
                                        color: '#333',
                                        fontWeight: 500,
                                        mb: 1,
                                        textAlign: 'left'
                                    }}>
                                        Confirm Password
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        edge="end"
                                                        sx={{ color: '#666' }}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '8px',
                                                '& fieldset': {
                                                    borderColor: '#E5E7EB',
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: '#A44DE3',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#A44DE3',
                                                },
                                            },
                                            '& .MuiInputBase-input': {
                                                py: 1,
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Action Buttons */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: 2, 
                                    mt: 2,
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={handleChangePassword}
                                        sx={{
                                            backgroundColor: '#7E01D7',
                                            color: 'white',
                                            textTransform: 'none',
                                            borderRadius: '25px', // Pill shape
                                            px: 3,
                                            py: 1,
                                            '&:hover': {
                                                backgroundColor: '#6B00C7'
                                            }
                                        }}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Modal>

                {/* Toast Component */}
                <Toast
                    open={toast.open}
                    message={toast.message}
                    type={toast.type}
                    onClose={handleToastClose}
                />
            </Box>
        </DashboardLayout>
    );
}
