import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Card,
  CardContent
} from '@mui/material';
import {
  PlayCircle,
  Chart,
  DocumentText,
  Setting2,
  Notification,
  ArrowDown2,
  MoneyRecive,
  Book1,
  MessageQuestion,
  Shop,
  Activity,
  Shield,
  NotificationStatus,
  Profile
} from 'iconsax-react';

// Define color constants
const colors = {
  electricViolet: '#8b5cf6',
  electricVioletLight: '#a78bfa',
  electricVioletLightest: '#F2E5FB',
  neutralDarker: '#374151'
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  iconComponent?: React.ComponentType<any>;
  path?: string;
  children?: NavItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState('getting-started');
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    products: true,
    settings: false
  });
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  const navGroups = [
    {
      title: 'Products',
      key: 'products',
      items: [
        { label: 'Getting Started', iconComponent: PlayCircle, path: 'getting-started' },
        { label: 'Transactions', iconComponent: MoneyRecive, path: 'transactions' },
        { label: 'Reports', iconComponent: Chart, path: 'reports' },
        { label: 'Quick Play', iconComponent: Activity, path: 'quick-play' },
        { label: 'Merchant Portal', iconComponent: Shop, path: 'merchant-portal' }
      ]
    },
    {
      title: 'Settings',
      key: 'settings',
      items: [
        {
          label: 'Settings',
          iconComponent: Setting2,
          children: [
            { label: 'Profile Settings', path: 'profile-settings', iconComponent: Profile },
            { label: 'Security Settings', path: 'security-settings', iconComponent: Shield },
            { label: 'Notification Settings', path: 'notification-settings', iconComponent: NotificationStatus }
          ]
        },
        {
          label: 'Documentation',
          iconComponent: Book1,
          children: [
            { label: 'API Documentation', path: 'api-docs', iconComponent: DocumentText },
            { label: 'Integration Guide', path: 'integration-guide', iconComponent: Book1 },
            { label: 'SDK Documentation', path: 'sdk-docs', iconComponent: DocumentText }
          ]
        },
        { label: 'Support', iconComponent: MessageQuestion, path: 'support' }
      ]
    }
  ];

  const handleSectionToggle = (sectionKey: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const handleItemClick = (path: string) => {
    setSelectedItem(path);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isSelected = selectedItem === item.path;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <Box key={item.label}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (item.path) {
                handleItemClick(item.path);
              }
            }}
            sx={{
              pl: 2 + level * 2,
              py: 1,
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
              backgroundColor: 'transparent',
              color: isSelected ? colors.electricViolet : colors.neutralDarker,
              '&:hover': {
                backgroundColor: 'transparent',
                color: colors.electricViolet
              }
            }}
          >
            {item.iconComponent && (
              <ListItemIcon sx={{ 
                minWidth: '36px'
              }}>
                <item.iconComponent 
                  size={level > 0 ? "16" : "20"} 
                  color={isSelected ? colors.electricViolet : '#374151'} 
                />
              </ListItemIcon>
            )}
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: isSelected ? 600 : 500
              }}
            />
            {hasChildren && (
              <ArrowDown2 
                size="16" 
                style={{ 
                  transform: openSections[item.label.toLowerCase()] ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} 
              />
            )}
          </ListItemButton>
        </ListItem>
        
        {hasChildren && (
          <Collapse in={openSections[item.label.toLowerCase()]} timeout="auto">
            <List component="div" disablePadding>
              {item.children?.map(child => renderNavItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3 }}>
          <Box
            component="img"
            src="/OX PAY logo 1.png"
            alt="OXPay Logo"
            sx={{
              width: 120,
              height: 'auto'
            }}
          />
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
          {navGroups.map(group => (
            <Box key={group.key} sx={{ mb: 3 }}>
              <Typography
                variant="overline"
                sx={{
                  px: 3,
                  color: '#9ca3af',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  fontFamily: '"Open Sans", sans-serif'
                }}
              >
                {group.title}
              </Typography>
              <List component="nav" sx={{ pt: 1 }}>
                {group.items.map(item => renderNavItem(item))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 280,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: 3,
            gap: 2,
            zIndex: 1000
          }}
        >
          {/* Notification */}
          <Badge badgeContent={3} color="error">
            <Card 
              elevation={1}
              sx={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                p: 0
              }}
            >
              <IconButton
                onClick={handleNotificationMenuOpen}
                sx={{
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: colors.electricVioletLightest
                  }
                }}
              >
                <Notification size="20" color="#000000" />
              </IconButton>
            </Card>
          </Badge>

          {/* Vertical divider */}
          <Divider 
            orientation="vertical" 
            sx={{ 
              mx: 1,
              height: '30px',
              alignSelf: 'center'
            }} 
          />

          {/* User info and avatar */}
          <Box 
            onClick={handleUserMenuOpen}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              cursor: 'pointer',
              p: 1,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: colors.electricVioletLightest
              }
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: '#F2E5FB',
                border: `2px solid ${colors.electricVioletLight}`,
                color: colors.electricViolet,
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            
            <Typography
              variant="body2"
              sx={{
                color: colors.neutralDarker,
                fontWeight: 500
              }}
            >
              Hello, {user.firstName}
            </Typography>

            <Box
              sx={{
                p: 0.5,
                color: colors.neutralDarker
              }}
            >
              <span style={{ fontSize: '14px' }}>▾</span>
            </Box>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: 'white', pt: '64px' }}>
          {children}
        </Box>
      </Box>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Notification Menu */}
      <Menu
        anchorEl={notificationMenuAnchor}
        open={Boolean(notificationMenuAnchor)}
        onClose={handleNotificationMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: { 
            width: 320, 
            p: 1,
            mt: 1,
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none'
          }
        }}
      >
        <Card 
          elevation={3}
          sx={{ 
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#ffffff'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontSize: '1.1rem', 
                fontWeight: 600,
                color: '#1f2937'
              }}
            >
              Notifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                onClick={handleNotificationMenuClose}
                sx={{ 
                  borderRadius: '8px', 
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #f3f4f6',
                  backgroundColor: '#fafafa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#e5e7eb'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827', mb: 0.5 }}>
                  New transaction received
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  2 minutes ago
                </Typography>
              </Box>
              <Box
                onClick={handleNotificationMenuClose}
                sx={{ 
                  borderRadius: '8px', 
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #f3f4f6',
                  backgroundColor: '#fafafa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#e5e7eb'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827', mb: 0.5 }}>
                  Security alert
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  1 hour ago
                </Typography>
              </Box>
              <Box
                onClick={handleNotificationMenuClose}
                sx={{ 
                  borderRadius: '8px', 
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #f3f4f6',
                  backgroundColor: '#fafafa',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                    borderColor: '#e5e7eb'
                  }
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827', mb: 0.5 }}>
                  System maintenance scheduled
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280' }}>
                  3 hours ago
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Menu>
    </Box>
  );
};

export default DashboardLayout;
