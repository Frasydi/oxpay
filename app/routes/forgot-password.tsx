import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Link,
    Alert,
    CircularProgress,
    Card,
    IconButton
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { useAuth } from '~/contexts/AuthContext';
import authService from '~/services/AuthService';
import AuthLayout from '~/components/auth/AuthLayout';
import AuthButton from '~/components/auth/AuthButton';
import { ArrowLeft2 } from 'iconsax-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [resendLoading, setResendLoading] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Call your forgot password service here
            await authService.forgotPassword(email);
            setSuccess(true);
        } catch (error: any) {
            setError(error.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleResendCode = async () => {
        setResendLoading(true);
        setError('');
        try {
            await authService.forgotPassword(email);
            // Show success message or toast
        } catch (error: any) {
            setError(error.message || 'Failed to resend code');
        } finally {
            setResendLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode.length === 4) {
            setLoading(true);
            setError('');
            try {
                // Call verify OTP service here
                // await authService.verifyResetOtp(email, otpCode);
                setOtpVerified(true);
                console.log('OTP verified:', otpCode);
            } catch (error: any) {
                setError(error.message || 'Invalid verification code');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // Call reset password service here
            // await authService.resetPassword(email, newPassword);
            // Navigate to login with success message
            navigate('/login', { 
                state: { message: 'Password reset successfully. Please login with your new password.' }
            });
        } catch (error: any) {
            setError(error.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>

            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
                boxShadow: 'none',
                border: '1px solid #e5e7eb',
                borderRadius: "14px",
                width: 'fit-content'
            }}>
                <IconButton
                    onClick={() => {
                        navigate("/login", {
                            replace: true
                        })
                    }}
                >
                    <ArrowLeft2 size="20" color='black' variant="Linear" />
                </IconButton>
            </Card>

            <Box sx={{ mb: 4, mt: 5 }}>
                {/* Lock Icon */}
                <Box sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Box sx={{
                        backgroundColor: '#A74DE60D',
                        borderRadius: '12px',
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {otpVerified ? (
                            // Password Check Icon
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.9309 12.1166L27.9309 15.2062C27.2836 15.118 26.5479 15.0738 25.724 15.0591L25.724 12.1166C25.724 7.4821 24.4146 4.39244 17.9999 4.39244C11.5852 4.39244 10.2757 7.4821 10.2757 12.1166V15.0591C9.45184 15.0738 8.7162 15.118 8.06885 15.2062V12.1166C8.06885 7.84991 9.09873 2.18555 17.9999 2.18555C26.901 2.18555 27.9309 7.84991 27.9309 12.1166Z" fill="#A74DE6" />
                                <path d="M27.9308 15.2057C27.2834 15.1174 26.5478 15.0733 25.7239 15.0586L10.2756 15.0586C9.45171 15.0733 8.71608 15.1174 8.06872 15.2057C4.31699 15.6618 3.28711 17.5009 3.28711 22.4149L3.28711 25.3574C3.28711 31.2425 4.75837 32.7138 10.6434 32.7138H25.3561C31.2411 32.7138 32.7124 31.2425 32.7124 25.3574V22.4149C32.7124 17.5009 31.6825 15.6618 27.9308 15.2057Z" fill="#A74DE6" />
                                <circle cx="18" cy="23.5" r="1.5" fill="white" />
                                <path d="M15 23.5L17 25.5L21 21.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            // Original Lock Icon
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.9309 12.1166L27.9309 15.2062C27.2836 15.118 26.5479 15.0738 25.724 15.0591L25.724 12.1166C25.724 7.4821 24.4146 4.39244 17.9999 4.39244C11.5852 4.39244 10.2757 7.4821 10.2757 12.1166V15.0591C9.45184 15.0738 8.7162 15.118 8.06885 15.2062V12.1166C8.06885 7.84991 9.09873 2.18555 17.9999 2.18555C26.901 2.18555 27.9309 7.84991 27.9309 12.1166Z" fill="#A74DE6" />
                                <path d="M27.9308 15.2057C27.2834 15.1174 26.5478 15.0733 25.7239 15.0586L10.2756 15.0586C9.45171 15.0733 8.71608 15.1174 8.06872 15.2057C4.31699 15.6618 3.28711 17.5009 3.28711 22.4149L3.28711 25.3574C3.28711 31.2425 4.75837 32.7138 10.6434 32.7138H25.3561C31.2411 32.7138 32.7124 31.2425 32.7124 25.3574V22.4149C32.7124 17.5009 31.6825 15.6618 27.9308 15.2057ZM13.1593 24.9308C12.8798 25.1956 12.4972 25.3574 12.1147 25.3574C11.9234 25.3574 11.7322 25.3133 11.5556 25.2397C11.3644 25.1662 11.2172 25.0632 11.0701 24.9308C10.8053 24.6512 10.6434 24.2687 10.6434 23.8862C10.6434 23.6949 10.6876 23.5037 10.7611 23.3271C10.8347 23.1505 10.9377 22.9887 11.0701 22.8416C11.2172 22.7092 11.3644 22.6062 11.5556 22.5326C12.1 22.2972 12.7473 22.4296 13.1593 22.8416C13.2917 22.9887 13.3947 23.1505 13.4683 23.3271C13.5418 23.5037 13.586 23.6949 13.586 23.8862C13.586 24.2687 13.4241 24.6512 13.1593 24.9308ZM19.3533 24.4453C19.2798 24.6218 19.1768 24.7837 19.0444 24.9308C18.7648 25.1956 18.3823 25.3574 17.9998 25.3574C17.6025 25.3574 17.2347 25.1956 16.9552 24.9308C16.8227 24.7837 16.7198 24.6218 16.6462 24.4453C16.5726 24.2687 16.5285 24.0774 16.5285 23.8862C16.5285 23.4889 16.6903 23.1211 16.9552 22.8416C17.4995 22.2972 18.4853 22.2972 19.0444 22.8416C19.3092 23.1211 19.471 23.4889 19.471 23.8862C19.471 24.0774 19.4269 24.2687 19.3533 24.4453ZM24.9294 24.9308C24.6499 25.1956 24.2673 25.3574 23.8848 25.3574C23.5023 25.3574 23.1198 25.1956 22.8402 24.9308C22.5754 24.6512 22.4135 24.2834 22.4135 23.8862C22.4135 23.4889 22.5754 23.1211 22.8402 22.8416C23.3993 22.2972 24.385 22.2972 24.9294 22.8416C24.9883 22.9151 25.0471 22.9887 25.106 23.077C25.1648 23.1505 25.209 23.2388 25.2384 23.3271C25.2825 23.4154 25.3119 23.5037 25.3267 23.5919C25.3414 23.6949 25.3561 23.7979 25.3561 23.8862C25.3561 24.2687 25.1942 24.6512 24.9294 24.9308Z" fill="#A74DE6" />
                            </svg>
                        )}
                    </Box>
                </Box>

                <Typography variant="h4" sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#1f2937',
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '2rem',
                    textAlign: 'left'
                }}>
                    {otpVerified ? 'Set New Password' : success ? 'Enter Verification Code' : 'Forgot Password'}
                </Typography>
                <Typography variant="body1" sx={{
                    color: '#6b7280',
                    fontFamily: '"Open Sans", sans-serif',
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    textAlign: 'left'
                }}>
                    {otpVerified ? 'Must be at least 8 characters.' : success ? `We sent a code to ${email}` : 'No worries we will send you reset instructions.'}
                </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}


            {/* Forgot Password Form */}
            {!success ? (
                <Box component="form" onSubmit={handleForgotPassword}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                                Email
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 6,
                                        '& input': {
                                            padding: '12px 14px'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <AuthButton loading={loading} hasInputs={email.trim() !== ''}>
                            Send Reset Link
                        </AuthButton>
                    </Stack>
                </Box>
            ) : !otpVerified ? (
                // OTP Verification Form
                <Box component="form" onSubmit={handleVerifyOtp}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#374151' }}>
                                Verification Code
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        id={`otp-${index}`}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        variant="outlined"
                                        inputProps={{
                                            maxLength: 1,
                                            style: {
                                                textAlign: 'center',
                                                fontSize: '1.5rem',
                                                fontWeight: 'bold'
                                            }
                                        }}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                '& input': {
                                                    padding: '16px 0'
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: '#A74DE6',
                                                    borderWidth: 2
                                                }
                                            }
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        <AuthButton loading={loading} hasInputs={otp.every(digit => digit !== '')}>
                            Verify Code
                        </AuthButton>

                        {/* Resend Code */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#6b7280' }}>
                                Didn't get a code?{' '}
                                <Button
                                    variant="text"
                                    onClick={handleResendCode}
                                    disabled={resendLoading}
                                    sx={{
                                        color: '#9333ea',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        p: 0,
                                        minWidth: 'auto',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                            backgroundColor: 'transparent'
                                        }
                                    }}
                                >
                                    {resendLoading ? 'Sending...' : 'Resend Code'}
                                </Button>
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            ) : (
                // Set New Password Form
                <Box component="form" onSubmit={handleResetPassword}>
                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                                New Password
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Enter new password"
                                type="password"
                                value={newPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 6,
                                        '& input': {
                                            padding: '12px 14px'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: '#374151' }}>
                                Confirm Password
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Confirm new password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 6,
                                        '& input': {
                                            padding: '12px 14px'
                                        }
                                    }
                                }}
                            />
                        </Box>

                        <AuthButton loading={loading} hasInputs={newPassword.trim() !== '' && confirmPassword.trim() !== ''}>
                            Reset Password
                        </AuthButton>
                    </Stack>
                </Box>
            )}


        </AuthLayout>
    );
};

export default ForgotPassword;
