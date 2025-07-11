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
                stroke="#6400AC"
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
                    width: 32,
                    height: 20,
                    borderRadius: 1,
                    backgroundColor: isVisa ? '#1A1F71' : '#EB001B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    {isVisa ? 'VISA' : 'MC'}
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
