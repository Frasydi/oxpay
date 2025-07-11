import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card
} from '@mui/material';

const WebIntegrationsTab: React.FC = () => {
    // Plugin data array for easy editing
    const plugins = [
        {
            name: 'WooCommerce',
            description: 'Sync customer data and orders from your WooCommerce store',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/WooCommerce2025_logo.svg'
        },
        {
            name: 'Shopify',
            description: 'Display your Shopify customer contacts, orders, and refunds',
            logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg'
        },
        {
            name: 'Magento',
            description: 'Connect and manage Magento store data directly from your inbox',
            logo: 'https://connectif.ai/wp-content/uploads/2023/07/Magento.png'
        },
        {
            name: 'Squarespace',
            description: 'View customer and order info from your store.',
            logo: 'https://cdn.worldvectorlogo.com/logos/squarespace.svg'
        }
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}>
            {/* API Documentation Card - Even Layout (Text + Image) */}
            <Card sx={{
                borderRadius: '14px',
                bgcolor: 'white',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                width: '100%',
                '&:hover': {
                    transform: 'translateY(-2px)'
                },
                py: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    px: 3,
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    {/* Text Content */}
                    <Box sx={{
                        flex: 0.6,
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
                            fontSize: '1.25rem',
                            fontFamily: '"IBM Plex Sans", sans-serif'
                        }}>
                            API Documentation
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#6b7280',
                            fontSize: '0.875rem',
                            lineHeight: 1.6,
                            fontFamily: '"Open Sans", sans-serif'
                        }}>
                            Download now from the App Store or Google Play and simplify your financial life.
                        </Typography>
                    </Box>

                    {/* Image */}
                    <Box sx={{
                        flex: 0.4,
                        minWidth: { xs: '100%', md: '250px' },
                        height: '220px',
                        paddingX: 2,
                        borderRadius: '12px',
                        order: { xs: 1, md: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <Box
                            component="img"
                            src="/web1.png"
                            alt="API Documentation"
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

            {/* Web 1 - Odd Layout (Image + Text) */}
            <Card sx={{
                borderRadius: '14px',
                bgcolor: 'white',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                width: '100%',
                '&:hover': {
                    transform: 'translateY(-2px)'
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 7,
                    py: 2,
                    px: 3,
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    {/* Image */}
                    <Box sx={{
                        flex: 0.3,
                        minWidth: { xs: '100%', md: '250px' },
                        height: '420px',
                        paddingX: 2,
                        borderRadius: '12px',
                        bgcolor: '#F2E5FB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <Box
                            component="img"
                            src="/web2.png"
                            alt="Merchant-Hosted Checkout"
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
                        flex: 0.7,
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="h5" sx={{
                            fontWeight: 'bold',
                            color: '#1f2937',
                            mb: 2,
                            fontSize: '1.25rem',
                            fontFamily: '"IBM Plex Sans", sans-serif'
                        }}>
                            Merchant-Hosted Checkout
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#6b7280',
                            fontSize: '0.875rem',
                            mb: 3,
                            lineHeight: 1.6,
                            fontFamily: '"Open Sans", sans-serif'
                        }}>
                            Full control. Maximum flexibility. Host the entire checkout on your own site for a seamless customer experience.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#7E01D7',
                                color: 'white',
                                borderRadius: '25px',
                                py: 1,
                                px: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                boxShadow: 'none',
                                alignSelf: 'flex-start',
                                '&:hover': {
                                    backgroundColor: '#6B01B8',
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            View API Documentation
                        </Button>
                    </Box>
                </Box>
            </Card>

            {/* Web 2 - Even Layout (Text + Image) */}
            <Card sx={{
                borderRadius: '14px',
                bgcolor: 'white',
                boxShadow: 'none',
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
                    py: 2,
                    px: 3,
                    flexDirection: { xs: 'column', md: 'row' }
                }}>
                    {/* Text Content */}
                    <Box sx={{
                        flex: 0.7,
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
                            fontSize: '1.25rem',
                            fontFamily: '"IBM Plex Sans", sans-serif'
                        }}>
                            Oxpay-Hosted Payment Page
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#6b7280',
                            fontSize: '0.875rem',
                            mb: 3,
                            lineHeight: 1.6,
                            fontFamily: '"Open Sans", sans-serif'
                        }}>
                            Quick setup. No compliance headaches. Redirect your customers to Oxpay's secure payment page fast, compliant, and always up to date.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#7E01D7',
                                color: 'white',
                                borderRadius: '25px',
                                py: 1,
                                px: 3,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                boxShadow: 'none',
                                alignSelf: 'flex-start',
                                '&:hover': {
                                    backgroundColor: '#6B01B8',
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            View API Documentation
                        </Button>
                    </Box>

                    {/* Image */}
                    <Box sx={{
                        flex: 0.3,
                        minWidth: { xs: '100%', md: '250px' },
                        height: '420px',
                        paddingX: 2,
                        borderRadius: '12px',
                        bgcolor: '#F2E5FB',
                        order: { xs: 1, md: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <Box
                            component="img"
                            src="/web3.png"
                            alt="Oxpay-Hosted Payment Page"
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

            {/* Plugins section */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
                <Typography variant="h5" sx={{
                    fontWeight: 'bold',
                    color: '#1f2937',
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: '1.25rem',
                    mb: 2
                }}>
                    Plugins also available on:
                </Typography>
                <Typography variant="body1" sx={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    mb: 4,
                    lineHeight: 1.6
                }}>
                    Discover flexible payment solutions tailored for your business—whether in-store, online, or on the go.
                </Typography>

                {/* Plugin Cards Grid */}
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: 3,
                    mt: 4
                }}>
                    {plugins.map((plugin, index) => (
                        <Card key={index} sx={{
                            borderRadius: '14px',
                            bgcolor: 'white',
                            border: '1px solid #e5e7eb',
                            boxShadow: 'none',
                            transition: 'all 0.3s ease',
                            p: 3,
                            textAlign: 'left',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                borderColor: '#d1d5db'
                            }
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 2
                            }}>
                                <Box
                                    component="img"
                                    src={plugin.logo}
                                    alt={plugin.name}
                                    sx={{
                                        width: 64,
                                        height: 32,
                                        objectFit: 'contain'
                                    }}
                                />
                                <Typography variant="h6" sx={{
                                    fontWeight: 600,
                                    color: '#1f2937',
                                    fontSize: '1rem'
                                }}>
                                    {plugin.name}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{
                                color: '#6b7280',
                                fontSize: '0.875rem',
                                lineHeight: 1.5
                            }}>
                                {plugin.description}
                            </Typography>
                        </Card>
                    ))}
                </Box>

                {/* Integrations Card */}
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
                        Need help with Integration?
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
                        Our dedicated support team is here to assist you every step of the way—making it easy to integrate the Oxpay API seamlessly into your website.
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

export default WebIntegrationsTab;
