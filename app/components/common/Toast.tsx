import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    open: boolean;
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ open, message, type, onClose }: ToastProps) {
    const getToastBackgroundColor = () => {
        switch (type) {
            case 'success': return '#343A40'; // Green
            case 'error': return '#DC3545'; // Red  
            case 'info': return '#17A2B8'; // Blue
            default: return '#343A40'; // Default dark
        }
    };

    return (
        <Snackbar
            open={open}
            onClose={onClose}
            anchorOrigin={{ 
                vertical: 'top', 
                horizontal: 'center' 
            }}
            sx={{
                top: '10% !important', // Position at 10% from top
                '& .MuiSnackbarContent-root': {
                    backgroundColor: getToastBackgroundColor(),
                    color: 'white',
                    borderRadius: '12px',
                    padding: '0 16px', // Remove vertical padding, keep horizontal
                    minWidth: '320px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'inherit',
                    minHeight: '48px' // Set consistent height
                }
            }}
            message={
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    <Typography sx={{ 
                        color: 'white', 
                        fontSize: '14px',
                        fontWeight: 500
                    }}>
                        {message}
                    </Typography>
                    <Typography
                        onClick={onClose}
                        sx={{ 
                            color: 'white',
                            fontSize: '14px',
                            fontWeight: 500,
                            ml: 2,
                            cursor: 'pointer',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Undo
                    </Typography>
                </Box>
            }
        />
    );
}
