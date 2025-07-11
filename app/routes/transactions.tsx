import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Menu, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TextField, InputAdornment } from '@mui/material';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { BarChartSharp, Info, FileDownload, ArrowUpward, ArrowDownward, MoreHoriz, Add, Search } from '@mui/icons-material';
import DashboardLayout from '../components/dashboard/DashboardLayout';

// Custom Active Dot Component
const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props;
    return (
        <g>
            <rect
                x={cx - 30}
                y={cy - 25}
                width={60}
                height={80}
                rx={12}
                ry={12}
                fill="url(#gradientRect)"
                // stroke="#6400AC"
                strokeWidth={1}
            />
            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="#6400AC"
                stroke="#fff"
                strokeWidth={2}
            />
            <text
                x={cx}
                y={cy - 30}
                textAnchor="middle"
                fill="#333"
                fontSize="12"
                fontWeight="600"
            >
                SGD {payload?.amount?.toLocaleString()}
            </text>
        </g>
    );
};

// Sample data for the current month (July 2025) - only 7 days
const generateTransactionData = () => {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short' });
    const data = [];
    
    for (let day = 1; day <= 7; day++) {
        data.push({
            date: `${day} ${currentMonth}`,
            amount: Math.floor(Math.random() * 5000) + 1000 // Random amounts between 1000-6000 SGD
        });
    }
    
    return data;
};

// Sample table data
const generateTableData = () => {
    const statuses = ['Success', 'Refunded', 'Rejected', 'Pending'];
    const paymentMethods = ['VISA', 'MASTER CARD'];
    
    return Array.from({ length: 10 }, (_, index) => ({
        id: `TXN${(index + 1).toString().padStart(6, '0')}`,
        terminalId: `TRM${(index + 1).toString().padStart(3, '0')}`,
        dateTime: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
        refNo: `REF${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        type: 'SALE',
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        amount: (Math.random() * 1000 + 50).toFixed(2),
        status: statuses[Math.floor(Math.random() * statuses.length)]
    }));
};

export default function TransactionsPage() {
    const transactionData = generateTransactionData();
    const [tableData, setTableData] = useState(generateTableData());
    const [orderBy, setOrderBy] = useState<string>('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    
    // Calculate total amount for display
    const totalAmount = transactionData.reduce((sum, item) => sum + item.amount, 0);
    
    // Dropdown state for summary
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCurrency, setSelectedCurrency] = useState('SGD');
    const open = Boolean(anchorEl);
    
    // Dropdown state for graph
    const [graphCurrencyAnchor, setGraphCurrencyAnchor] = useState<null | HTMLElement>(null);
    const [dateRangeAnchor, setDateRangeAnchor] = useState<null | HTMLElement>(null);
    const [selectedGraphCurrency, setSelectedGraphCurrency] = useState('SGD');
    const [selectedDateRange, setSelectedDateRange] = useState('7 days');
    const graphCurrencyOpen = Boolean(graphCurrencyAnchor);
    const dateRangeOpen = Boolean(dateRangeAnchor);
    
    const currencies = ['SGD', 'USD', 'EUR', 'JPY', 'MYR'];
    const dateRanges = ['7 days', '30 days', '1 month', '3 months', '6 months', '1 year'];
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleCurrencySelect = (currency: string) => {
        setSelectedCurrency(currency);
        setAnchorEl(null);
    };
    
    // Graph dropdown handlers
    const handleGraphCurrencyClick = (event: React.MouseEvent<HTMLElement>) => {
        setGraphCurrencyAnchor(event.currentTarget);
    };
    
    const handleDateRangeClick = (event: React.MouseEvent<HTMLElement>) => {
        setDateRangeAnchor(event.currentTarget);
    };
    
    const handleGraphCurrencyClose = () => {
        setGraphCurrencyAnchor(null);
    };
    
    const handleDateRangeClose = () => {
        setDateRangeAnchor(null);
    };
    
    const handleGraphCurrencySelect = (currency: string) => {
        setSelectedGraphCurrency(currency);
        setGraphCurrencyAnchor(null);
    };
    
    const handleDateRangeSelect = (range: string) => {
        setSelectedDateRange(range);
        setDateRangeAnchor(null);
    };

    // Table sorting handlers
    const handleSort = (column: string) => {
        const isAsc = orderBy === column && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(column);
        
        const sortedData = [...tableData].sort((a: any, b: any) => {
            let aVal = a[column];
            let bVal = b[column];
            
            // Handle numeric values
            if (column === 'amount') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            
            // Handle date values
            if (column === 'dateTime') {
                aVal = new Date(aVal).getTime();
                bVal = new Date(bVal).getTime();
            }
            
            if (aVal < bVal) {
                return isAsc ? 1 : -1;
            }
            if (aVal > bVal) {
                return isAsc ? -1 : 1;
            }
            return 0;
        });
        
        setTableData(sortedData);
    };

    // Get status color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success': return '#22C55E';
            case 'Refunded': return '#F59E0B';
            case 'Rejected': return '#EF4444';
            case 'Pending': return '#6B7280';
            default: return '#6B7280';
        }
    };

    // Payment method icon component
    const PaymentMethodIcon = ({ method }: { method: string }) => {
        const isVisa = method === 'VISA';
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                    width: 40,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {isVisa ? (
                        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7813 6.59949L17.4491 17.4297H14.6291L16.9616 6.59949H19.7813ZM31.6464 13.5926L33.1311 9.52547L33.9855 13.5926H31.6464ZM34.7929 17.4297H37.4014L35.1252 6.59949H32.7174C32.1764 6.59949 31.7199 6.91211 31.5167 7.39406L27.2857 17.4297H30.2473L30.8352 15.8124H34.4534L34.7929 17.4297ZM27.4327 13.8935C27.4448 11.0351 23.4536 10.8777 23.4812 9.60088C23.4895 9.21183 23.8625 8.79912 24.6772 8.6932C25.0819 8.64075 26.1947 8.60065 27.4582 9.17823L27.953 6.8816C27.2743 6.63686 26.401 6.40137 25.3148 6.40137C22.5275 6.40137 20.5656 7.87361 20.549 9.98171C20.5314 11.5407 21.9496 12.4107 23.0182 12.9289C24.1168 13.4599 24.486 13.7999 24.4812 14.2747C24.4739 15.0017 23.6048 15.3219 22.7939 15.3346C21.3758 15.3569 20.5528 14.9544 19.8969 14.6507L19.3859 17.0238C20.0446 17.3244 21.2609 17.5856 22.5227 17.599C25.4849 17.599 27.423 16.1449 27.4327 13.8935ZM15.7515 6.59949L11.1824 17.4297H8.20086L5.95253 8.78644C5.8159 8.2541 5.6972 8.0594 5.28211 7.83488C4.60478 7.46982 3.48511 7.12669 2.5 6.91417L2.56728 6.59949H7.36584C7.97727 6.59949 8.52762 7.00398 8.66632 7.70359L9.85397 13.971L12.7886 6.59949H15.7515Z" fill="#1434CB"/>
                        </svg>
                    ) : (
                        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.7936 5.4286H16.4318V18.571H23.7936V5.4286Z" fill="#FF5F00"/>
                            <path d="M16.8993 11.9998C16.8981 10.7341 17.1868 9.48471 17.7436 8.34623C18.3003 7.20776 19.1105 6.21003 20.1127 5.42859C18.8716 4.45942 17.381 3.8567 15.8113 3.68934C14.2417 3.52197 12.6563 3.7967 11.2363 4.48213C9.81642 5.16756 8.61926 6.23604 7.78171 7.56544C6.94415 8.89483 6.5 10.4315 6.5 11.9998C6.5 13.5681 6.94415 15.1048 7.78171 16.4342C8.61926 17.7636 9.81642 18.8321 11.2363 19.5175C12.6563 20.2029 14.2417 20.4776 15.8113 20.3103C17.381 20.1429 18.8716 19.5402 20.1127 18.571C19.1105 17.7896 18.3003 16.7919 17.7436 15.6534C17.1869 14.5149 16.8981 13.2655 16.8993 11.9998Z" fill="#EB001B"/>
                            <path d="M33.7251 11.9998C33.7251 13.5681 33.281 15.1048 32.4435 16.4342C31.606 17.7635 30.4089 18.832 28.989 19.5175C27.5691 20.2029 25.9837 20.4776 24.4141 20.3103C22.8444 20.1429 21.3539 19.5402 20.1127 18.571C21.1141 17.7888 21.9236 16.7909 22.4803 15.6526C23.0369 14.5143 23.3262 13.2653 23.3262 11.9998C23.3262 10.7343 23.0369 9.4853 22.4803 8.347C21.9236 7.20871 21.1141 6.21082 20.1127 5.42859C21.3539 4.45942 22.8444 3.8567 24.4141 3.68934C25.9837 3.52197 27.5691 3.79671 28.989 4.48215C30.4089 5.16759 31.606 6.23607 32.4435 7.56546C33.281 8.89486 33.7251 10.4315 33.7251 11.9998Z" fill="#F79E1B"/>
                            <path d="M32.9224 17.179V16.91H33.0316V16.8552H32.7534V16.91H32.8627V17.179H32.9224ZM33.4624 17.179V16.8546H33.3771L33.279 17.0778L33.181 16.8546H33.0956V17.179H33.1558V16.9343L33.2478 17.1453H33.3102L33.4022 16.9338V17.179H33.4624Z" fill="#F79E1B"/>
                        </svg>
                    )}
                </Box>
                <Typography variant="body2">{method}</Typography>
            </Box>
        );
    };

    // Filter badge handlers
    const filterOptions = [
        'Merchant Name',
        'Date and Time',
        'Amount',
        'Currency',
        'Status',
        'Payment Method',
        'More Filters'
    ];

    const handleFilterClick = (filter: string) => {
        setActiveFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    // Filter badge component
    const FilterBadge = ({ label }: { label: string }) => {
        const isActive = activeFilters.includes(label);
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    backgroundColor: 'white',
                    border: isActive ? '1px solid #A44DE3' : '1px dashed #CCCCCC',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'border 0.2s ease-in-out',
                    '&:hover': {
                        borderColor: '#A44DE3'
                    }
                }}
                onClick={() => handleFilterClick(label)}
            >
                <Box sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    borderColor: isActive ? '#A44DE3' : '#E0E0E0',
                    borderWidth : 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s ease-in-out'
                }}>
                    <Add sx={{ 
                        fontSize: 12, 
                        color: '#666',
                        // transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease-in-out'
                    }} />
                </Box>
                <Typography variant="body2" sx={{ 
                    color: isActive ? '#A44DE3' : '#666',
                    fontWeight: isActive ? 500 : 400,
                    fontSize: '14px'
                }}>
                    {label}
                </Typography>
            </Box>
        );
    };

    return (
        <DashboardLayout>
            <Box sx={{ p: 3 }}>
                <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
                    <CardContent sx={{ p: 3 }}>
                        {/* Card Header - Absolute positioned */}
                        <Box sx={{ 
                            position: 'absolute',
                            top: 24,
                            left: 24,
                            right: 24,
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            zIndex: 10
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BarChartSharp sx={{ color: 'black', fontSize: 24 }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Transactions Graph
                                </Typography>
                                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                                    <Info fontSize="small" />
                                </IconButton>
                            </Box>
                            
                            {/* Graph Dropdowns */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {/* Currency Dropdown */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    border: graphCurrencyOpen ? '1px solid #A44DE3' : '1px solid black',
                                    borderRadius: '12px',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    minWidth: '80px',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                onClick={handleGraphCurrencyClick}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                                        {selectedGraphCurrency}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: 10,
                                        color: '#666',
                                        transform: graphCurrencyOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}>▼</Typography>
                                </Box>
                                
                                {/* Date Range Dropdown */}
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    border: dateRangeOpen ? '1px solid #A44DE3' : '1px solid black',
                                    borderRadius: '12px',
                                    padding: '6px 12px',
                                    cursor: 'pointer',
                                    minWidth: '100px',
                                    transition: 'border-color 0.2s ease-in-out'
                                }}
                                onClick={handleDateRangeClick}
                                >
                                    <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                                        {selectedDateRange}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: 10,
                                        color: '#666',
                                        transform: dateRangeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}>▼</Typography>
                                </Box>
                            </Box>
                        </Box>
                        
                        {/* Currency Dropdown Menu */}
                        <Menu
                            anchorEl={graphCurrencyAnchor}
                            open={graphCurrencyOpen}
                            onClose={handleGraphCurrencyClose}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    minWidth: '80px'
                                }
                            }}
                        >
                            {currencies.map((currency) => (
                                <MenuItem
                                    key={currency}
                                    onClick={() => handleGraphCurrencySelect(currency)}
                                    selected={currency === selectedGraphCurrency}
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: currency === selectedGraphCurrency ? 600 : 400,
                                        '&.Mui-selected': {
                                            backgroundColor: '#f0f0f0'
                                        }
                                    }}
                                >
                                    {currency}
                                </MenuItem>
                            ))}
                        </Menu>
                        
                        {/* Date Range Dropdown Menu */}
                        <Menu
                            anchorEl={dateRangeAnchor}
                            open={dateRangeOpen}
                            onClose={handleDateRangeClose}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    minWidth: '100px'
                                }
                            }}
                        >
                            {dateRanges.map((range) => (
                                <MenuItem
                                    key={range}
                                    onClick={() => handleDateRangeSelect(range)}
                                    selected={range === selectedDateRange}
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: range === selectedDateRange ? 600 : 400,
                                        '&.Mui-selected': {
                                            backgroundColor: '#f0f0f0'
                                        }
                                    }}
                                >
                                    {range}
                                </MenuItem>
                            ))}
                        </Menu>
                        
                        {/* Amount Display - Below Header */}
                        <Box sx={{ 
                            position: 'absolute',
                            top: 60,
                            left: 24,
                            zIndex: 10
                        }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12 }}>
                                Amount
                            </Typography>
                            <Typography variant="h3" sx={{ fontWeight: 600, mt: 0.5 }}>
                                SGD {totalAmount.toLocaleString()}
                            </Typography>
                        </Box>
                        
                        {/* Line Chart */}
                        <Box sx={{ width: '100%', height: 300, mt: 6 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={transactionData} margin={{ top: 50, right: 50, left: 50, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="gradientRect" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="4.33%" stopColor="#E5CCF7" />
                                            <stop offset="33.4%" stopColor="#F2E5FB" />
                                            <stop offset="95.22%" stopColor="rgba(251, 246, 254, 0)" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid 
                                        strokeDasharray="none" 
                                        stroke="#e0e0e0" 
                                        vertical={true} 
                                        horizontal={false}
                                    />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={{ stroke: '#e0e0e0' }}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#666' }}
                                        interval={'preserveStartEnd'}
                                    />
                                    <Line 
                                        type="linear" 
                                        dataKey="amount" 
                                        stroke="#6400AC" 
                                        strokeWidth={2}
                                        dot={{ fill: '#6400AC', strokeWidth: 2, r: 4 }}
                                        activeDot={<CustomActiveDot />}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
                
                {/* Transactions Summary */}
                <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        {/* Header with Dropdown */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 3
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ 
                                    width: 24, 
                                    height: 24, 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img 
                                        src="/paper.svg" 
                                        alt="Table Icon" 
                                        width={20} 
                                        height={20} 
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Transactions Summary
                                </Typography>
                            </Box>
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 2,
                                padding: '4px 12px',
                                border : "1px solid #EEEEF2",
                                gap: 1,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#e9ecef'
                                }
                            }}
                            onClick={handleClick}
                            >
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedCurrency}</Typography>
                                <Typography sx={{ 
                                    fontSize: 12, 
                                    color: '#666',
                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease-in-out'
                                }}>▼</Typography>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'currency-button',
                                }}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        borderRadius: 1,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        minWidth: '80px'
                                    }
                                }}
                            >
                                {currencies.map((currency) => (
                                    <MenuItem 
                                        key={currency} 
                                        onClick={() => handleCurrencySelect(currency)}
                                        selected={currency === selectedCurrency}
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: currency === selectedCurrency ? 600 : 400,
                                            '&.Mui-selected': {
                                                backgroundColor: '#f0f0f0'
                                            }
                                        }}
                                    >
                                        {currency}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Summary Cards */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                            {/* Daily Sales */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Daily Sales
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    SGD 0.00
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    11th Jun 2025
                                </Typography>
                            </Box>

                            {/* Week-to-Date-Sales */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Week-to-Date-Sales
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    SGD 0.00
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    9th Jun 2025 - 11th Jun 2025
                                </Typography>
                            </Box>

                            {/* Month-to-Date-Sales */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Month-to-Date-Sales
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    SGD 0.00
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    1st Jun 2025 - 11th Jun 2025
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                
                {/* Transactions Table */}
                <Card sx={{ mt : 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <CardContent sx={{ p: 3 }}>
                        {/* Header with Action Buttons */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 3
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ 
                                    width: 24, 
                                    height: 24, 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <img 
                                        src="/tableicon.svg" 
                                        alt="Table Icon" 
                                        width={20} 
                                        height={20} 
                                        style={{ objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Transactions Table
                                </Typography>
                            </Box>
                            
                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<FileDownload />}
                                    sx={{
                                        borderColor: '#EEEEF2',
                                        color: '#333',
                                        textTransform: 'none',
                                        borderRadius: 1,
                                        fontSize: '14px',
                                        '&:hover': {
                                            borderColor: '#A44DE3',
                                            backgroundColor: 'rgba(164, 77, 227, 0.04)'
                                        }
                                    }}
                                >
                                    Export XLS/PDF
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: '#EEEEF2',
                                        color: '#333',
                                        textTransform: 'none',
                                        borderRadius: 1,
                                        fontSize: '14px',
                                        '&:hover': {
                                            borderColor: '#A44DE3',
                                            backgroundColor: 'rgba(164, 77, 227, 0.04)'
                                        }
                                    }}
                                >
                                    View Detail Report
                                </Button>
                            </Box>
                        </Box>

                        {/* Status Cards */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                            {/* Success */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Success
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    0
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Completed transactions
                                </Typography>
                            </Box>

                            {/* Refunded */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Refunded
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    0
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Refunded transactions
                                </Typography>
                            </Box>

                            {/* Rejected */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Rejected
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    0
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Failed transactions
                                </Typography>
                            </Box>

                            {/* Pending */}
                            <Box sx={{ 
                                p: 2, 
                                borderRadius: 2, 
                                backgroundColor: 'white',
                                border: '1px solid #EEEEF2',
                                position: 'relative'
                            }}>
                                <Box sx={{
                                    position: 'absolute',
                                    top: '8%',
                                    left: 0,
                                    width: '2px',
                                    height: '15%',
                                    backgroundColor: '#7E01D7'
                                }} />
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Pending
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                    0
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Processing transactions
                                </Typography>
                            </Box>
                        </Box>

                        {/* Filter Badges and Search Bar */}
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 3,
                            gap: 2
                        }}>
                            {/* Filter Badges */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt : 2,flexWrap: 'wrap', flex: 1 }}>
                                {filterOptions.map((filter) => (
                                    <FilterBadge key={filter} label={filter} />
                                ))}
                            </Box>
                            
                            {/* Search Bar */}
                            <TextField
                                placeholder="Search transactions..."
                                variant="outlined"
                                size="small"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search sx={{ color: '#9CA3AF', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    minWidth: 250,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: 'white',
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
                                        fontSize: '14px',
                                        color: '#374151',
                                        '&::placeholder': {
                                            color: '#9CA3AF',
                                            opacity: 1,
                                        },
                                    },
                                }}
                            />
                        </Box>

                        {/* Transactions Table */}
                        <Box sx={{ mt: 3 }}>
                            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #EEEEF2', borderRadius: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#F8F9FA' }}>
                                            {[
                                                { id: 'id', label: 'Transaction ID' },
                                                { id: 'terminalId', label: 'Terminal ID' },
                                                { id: 'dateTime', label: 'Date Time' },
                                                { id: 'refNo', label: 'Ref No' },
                                                { id: 'type', label: 'Type' },
                                                { id: 'paymentMethod', label: 'Payment Method' },
                                                { id: 'amount', label: 'Amount' },
                                                { id: 'status', label: 'Status' }
                                            ].map((column) => (
                                                <TableCell 
                                                    key={column.id}
                                                    sx={{ 
                                                        fontWeight: 600,
                                                        color: '#374151',
                                                        cursor: 'pointer',
                                                        userSelect: 'none',
                                                        '&:hover': {
                                                            backgroundColor: '#F3F4F6'
                                                        }
                                                    }}
                                                    onClick={() => handleSort(column.id)}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        {column.label}
                                                        {orderBy === column.id && (
                                                            order === 'asc' ? 
                                                            <ArrowUpward sx={{ fontSize: 16 }} /> : 
                                                            <ArrowDownward sx={{ fontSize: 16 }} />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            ))}
                                            <TableCell sx={{ width: 48 }}>
                                                {/* Empty header for actions column */}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((row, index) => (
                                            <TableRow 
                                                key={row.id}
                                                sx={{ 
                                                    '&:hover': { backgroundColor: '#F9FAFB' },
                                                    borderBottom: '1px solid #F3F4F6'
                                                }}
                                            >
                                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>
                                                    {row.id}
                                                </TableCell>
                                                <TableCell sx={{ color: '#6B7280' }}>
                                                    {row.terminalId}
                                                </TableCell>
                                                <TableCell sx={{ color: '#6B7280' }}>
                                                    {row.dateTime}
                                                </TableCell>
                                                <TableCell sx={{ color: '#6B7280' }}>
                                                    {row.refNo}
                                                </TableCell>
                                                <TableCell sx={{ color: '#6B7280' }}>
                                                    {row.type}
                                                </TableCell>
                                                <TableCell>
                                                    <PaymentMethodIcon method={row.paymentMethod} />
                                                </TableCell>
                                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>
                                                    SGD {row.amount}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={row.status}
                                                        size="small"
                                                        sx={{
                                                            backgroundColor: `${getStatusColor(row.status)}20`,
                                                            color: getStatusColor(row.status),
                                                            fontWeight: 500,
                                                            border: 'none'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton size="small" sx={{ color: '#6B7280' }}>
                                                        <MoreHoriz />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </DashboardLayout>
    );
}
