import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  PlayCircle,
  Chart,
  DocumentText,
  Setting2,
  Notification,
  ArrowDown2,
  ArrowRight2,
  MoneyRecive,
  Book1,
  MessageQuestion,
  Shop,
  Activity,
  Shield,
  NotificationStatus,
  Profile,
  Clock,
  MessageQuestion as FAQ,
  Logout,
  HambergerMenu,
  CloseSquare,
  Add
} from 'iconsax-react';
import { useAuth } from '~/contexts/AuthContext';

// Custom SVG Components
const ZapIcon = ({ size = "20", color = "#374151" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.2037 14.5532L4.49947 13.7592C4.13897 13.7179 3.90172 13.5231 3.78772 13.175C3.67372 12.8268 3.74938 12.5285 4.01472 12.28L15.188 2.01246C15.2586 1.95846 15.3365 1.91279 15.4215 1.87546C15.5065 1.83812 15.6319 1.81946 15.7977 1.81946C16.0717 1.81946 16.2814 1.93462 16.4267 2.16496C16.5719 2.39512 16.5738 2.62854 16.4325 2.86521L12.7722 9.47671L19.4825 10.2587C19.843 10.3 20.0802 10.4958 20.1942 10.846C20.3082 11.1961 20.2326 11.4935 19.9675 11.738L8.81197 21.9815C8.7413 22.0395 8.66347 22.0861 8.57847 22.1215C8.49347 22.1568 8.36805 22.1745 8.20222 22.1745C7.92822 22.1745 7.71764 22.0603 7.57047 21.832C7.42314 21.6038 7.42013 21.3714 7.56147 21.1347L11.2037 14.5532ZM11.355 17.3142L17.6907 11.6972L10.2537 10.7972L12.651 6.69171L6.27222 12.3457L13.7092 13.2325L11.355 17.3142Z" fill={color}/>
  </svg>
);

const TransferIcon = ({ size = "20", color = "#374151" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.71361 6.69251C9.64703 6.76513 9.5954 6.85015 9.56168 6.94273C9.52796 7.0353 9.5128 7.13361 9.51708 7.23204C9.52135 7.33047 9.54496 7.42709 9.58658 7.51639C9.62819 7.6057 9.68699 7.68593 9.75961 7.75251C9.83223 7.81909 9.91725 7.87071 10.0098 7.90444C10.1024 7.93816 10.2007 7.95331 10.2991 7.94904C10.3976 7.94477 10.4942 7.92115 10.5835 7.87954C10.6728 7.83793 10.753 7.77913 10.8196 7.70651L13.7526 4.50651C13.8792 4.36822 13.9495 4.18752 13.9495 4.00001C13.9495 3.8125 13.8792 3.6318 13.7526 3.49351L10.8196 0.29351C10.7536 0.219039 10.6734 0.15845 10.5838 0.115275C10.4941 0.0720998 10.3967 0.0472009 10.2973 0.0420291C10.198 0.0368573 10.0985 0.0515162 10.0049 0.0851515C9.91122 0.118787 9.82519 0.170726 9.7518 0.237943C9.67842 0.305159 9.61914 0.386309 9.57743 0.476663C9.53572 0.567018 9.51241 0.66477 9.50885 0.764224C9.50529 0.863679 9.52157 0.962846 9.55672 1.05595C9.59188 1.14905 9.64521 1.23422 9.71361 1.30651L11.4946 3.24951H4.59961C3.60505 3.24951 2.65122 3.6446 1.94796 4.34786C1.2447 5.05112 0.849609 6.00495 0.849609 6.99951V7.06651C0.849609 7.26542 0.928627 7.45619 1.06928 7.59684C1.20993 7.73749 1.4007 7.81651 1.59961 7.81651C1.79852 7.81651 1.98929 7.73749 2.12994 7.59684C2.27059 7.45619 2.34961 7.26542 2.34961 7.06651V6.99951C2.34961 6.40277 2.58666 5.83048 3.00862 5.40852C3.43058 4.98656 4.00287 4.74951 4.59961 4.74951H11.4946L9.71461 6.69251H9.71361ZM6.28561 9.30651C6.42007 9.15985 6.49077 8.96577 6.48214 8.76698C6.47352 8.56819 6.38627 8.38097 6.23961 8.24651C6.09294 8.11204 5.89887 8.04135 5.70008 8.04998C5.50129 8.0586 5.31407 8.14585 5.17961 8.29251L2.24761 11.4925C2.1207 11.6309 2.05029 11.8118 2.05029 11.9995C2.05029 12.1873 2.1207 12.3682 2.24761 12.5065L5.17961 15.7065C5.31407 15.8532 5.50129 15.9404 5.70008 15.949C5.89887 15.9577 6.09294 15.887 6.23961 15.7525C6.38627 15.618 6.47352 15.4308 6.48214 15.232C6.49077 15.0332 6.42007 14.8392 6.28561 14.6925L4.50561 12.7505H11.3996C11.8921 12.7505 12.3799 12.6535 12.8349 12.465C13.2899 12.2764 13.7034 12.0001 14.0516 11.6518C14.3998 11.3035 14.676 10.89 14.8644 10.4349C15.0528 9.97979 15.1497 9.49205 15.1496 8.99951V8.93251C15.1496 8.7336 15.0706 8.54283 14.9299 8.40218C14.7893 8.26153 14.5985 8.18251 14.3996 8.18251C14.2007 8.18251 14.0099 8.26153 13.8693 8.40218C13.7286 8.54283 13.6496 8.7336 13.6496 8.93251V8.99951C13.6496 9.59625 13.4126 10.1685 12.9906 10.5905C12.5686 11.0125 11.9963 11.2495 11.3996 11.2495H4.50461L6.28461 9.30551L6.28561 9.30651Z" fill={color}/>
  </svg>
);

const AnalyticsIcon = ({ size = "20", color = "#374151" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2 3.9C2 3.40294 2.40701 3 2.90909 3H21.0909C21.593 3 22 3.40294 22 3.9C22 4.39705 21.593 4.8 21.0909 4.8V11.3172C21.0909 12.0416 21.0909 12.6396 21.0507 13.1266C21.009 13.6325 20.9194 14.0976 20.6946 14.5344C20.3459 15.2117 19.7896 15.7625 19.1054 16.1076C18.6642 16.3302 18.1945 16.4189 17.6835 16.4602C17.1915 16.5 16.5875 16.5 15.8557 16.5H14.511L18.0365 19.4086C18.4222 19.7268 18.4744 20.2943 18.1529 20.6761C17.8315 21.058 17.2583 21.1096 16.8726 20.7914L12.9091 17.5215V20.1C12.9091 20.597 12.5021 21 12 21C11.4979 21 11.0909 20.597 11.0909 20.1V17.5215L7.12744 20.7914C6.74173 21.1096 6.16849 21.058 5.84707 20.6761C5.52565 20.2943 5.57776 19.7268 5.96347 19.4086L9.48905 16.5H8.14429C7.41249 16.5 6.80852 16.5 6.31652 16.4602C5.80552 16.4189 5.33579 16.3302 4.89458 16.1076C4.21035 15.7625 3.65406 15.2117 3.30543 14.5344C3.08062 14.0976 2.99102 13.6325 2.94927 13.1266C2.90907 12.6396 2.90908 12.0416 2.90909 11.3172V4.8C2.40701 4.8 2 4.39705 2 3.9ZM4.72727 4.8V11.28C4.72727 12.0509 4.72798 12.575 4.76141 12.9801C4.79397 13.3746 4.853 13.5764 4.92544 13.7172C5.09976 14.0559 5.3779 14.3312 5.72002 14.5038C5.8622 14.5755 6.06602 14.634 6.46458 14.6662C6.87375 14.6993 7.40311 14.7 8.18182 14.7H11.9994C11.9998 14.7 12.0002 14.7 12.0006 14.7H15.8182C16.5969 14.7 17.1262 14.6993 17.5354 14.6662C17.934 14.634 18.1378 14.5755 18.28 14.5038C18.6221 14.3312 18.9002 14.0559 19.0746 13.7172C19.147 13.5764 19.206 13.3746 19.2386 12.9801C19.272 12.575 19.2727 12.0509 19.2727 11.28V4.8H4.72727ZM12 6.6C12.5021 6.6 12.9091 7.00294 12.9091 7.49999V12C12.9091 12.497 12.5021 12.9 12 12.9C11.4979 12.9 11.0909 12.497 11.0909 12V7.49999C11.0909 7.00294 11.4979 6.6 12 6.6ZM8.36364 8.39999C8.86571 8.39999 9.27273 8.80294 9.27273 9.29999V12C9.27273 12.497 8.86571 12.9 8.36364 12.9C7.86156 12.9 7.45455 12.497 7.45455 12V9.29999C7.45455 8.80294 7.86156 8.39999 8.36364 8.39999ZM15.6364 10.2C16.1384 10.2 16.5455 10.6029 16.5455 11.1V12C16.5455 12.497 16.1384 12.9 15.6364 12.9C15.1343 12.9 14.7273 12.497 14.7273 12V11.1C14.7273 10.6029 15.1343 10.2 15.6364 10.2Z" fill={color}/>
  </svg>
);

const QuickPlayIcon = ({ size = "20", color = "#374151" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M19 15C19.5523 15 20 15.4477 20 16V18H22C22.5523 18 23 18.4477 23 19C23 19.5523 22.5523 20 22 20H20V22C20 22.5523 19.5523 23 19 23C18.4477 23 18 22.5523 18 22V20H16C15.4477 20 15 19.5523 15 19C15 18.4477 15.4477 18 16 18H18V16C18 15.4477 18.4477 15 19 15Z" fill={color}/>
    <path d="M6 15C6 14.4477 6.44772 14 7 14H11C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16H7C6.44772 16 6 15.5523 6 15Z" fill={color}/>
    <path d="M2 9H22V11H2V9Z" fill={color}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M7.7587 4H16.2413C17.0463 3.99999 17.7106 3.99998 18.2518 4.04419C18.8139 4.09012 19.3306 4.18868 19.816 4.43597C20.5686 4.81947 21.1805 5.43139 21.564 6.18404C21.8113 6.66937 21.9099 7.18608 21.9558 7.74817C22 8.28936 22 8.95372 22 9.75868V12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12V9.8C20 8.94342 19.9992 8.36113 19.9624 7.91104C19.9266 7.47262 19.8617 7.24842 19.782 7.09202C19.5903 6.7157 19.2843 6.40973 18.908 6.21799C18.7516 6.1383 18.5274 6.07337 18.089 6.03755C17.6389 6.00078 17.0566 6 16.2 6H7.8C6.94342 6 6.36113 6.00078 5.91104 6.03755C5.47262 6.07337 5.24842 6.1383 5.09202 6.21799C4.7157 6.40973 4.40973 6.7157 4.21799 7.09202C4.1383 7.24842 4.07337 7.47262 4.03755 7.91104C4.00078 8.36113 4 8.94342 4 9.8V14.2C4 15.0566 4.00078 15.6389 4.03755 16.089C4.07337 16.5274 4.1383 16.7516 4.21799 16.908C4.40973 17.2843 4.7157 17.5903 5.09202 17.782C5.24842 17.8617 5.47262 17.9266 5.91104 17.9624C6.36113 17.9992 6.94342 18 7.8 18H12C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20H7.75873C6.95374 20 6.28938 20 5.74817 19.9558C5.18608 19.9099 4.66937 19.8113 4.18404 19.564C3.43139 19.1805 2.81947 18.5686 2.43597 17.816C2.18868 17.3306 2.09012 16.8139 2.04419 16.2518C1.99998 15.7106 1.99999 15.0463 2 14.2413V9.7587C1.99999 8.95373 1.99998 8.28937 2.04419 7.74818C2.09012 7.18608 2.18868 6.66937 2.43597 6.18404C2.81947 5.43139 3.43139 4.81947 4.18404 4.43597C4.66937 4.18868 5.18608 4.09012 5.74817 4.04419C6.28937 3.99998 6.95373 3.99999 7.7587 4Z" fill={color}/>
  </svg>
);

const MerchantPortalIcon = ({ size = "20", color = "#374151" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1_19059)">
      <path d="M5.5 20H15.5V10.1641L12.3359 7H5.5V20ZM17.5 20.25C17.5 20.7141 17.3155 21.1591 16.9873 21.4873C16.6591 21.8155 16.2141 22 15.75 22H5.25C4.78587 22 4.34089 21.8155 4.0127 21.4873C3.68451 21.1591 3.5 20.7141 3.5 20.25V6.75C3.5 6.28587 3.68451 5.84088 4.0127 5.5127L4.14062 5.39648C4.45207 5.1412 4.84377 5 5.25 5H12.75L12.8486 5.00488C13.0776 5.02757 13.2929 5.12883 13.457 5.29297L17.207 9.04297L17.2734 9.11621C17.4193 9.29417 17.5 9.51791 17.5 9.75V20.25Z" fill={color}/>
      <path d="M6.5 6V3.75C6.5 3.28587 6.68451 2.84088 7.0127 2.5127L7.14062 2.39648C7.45207 2.1412 7.84377 2 8.25 2H15.75L15.8486 2.00488C16.0776 2.02757 16.2929 2.12883 16.457 2.29297L20.207 6.04297L20.2734 6.11621C20.4193 6.29417 20.5 6.51791 20.5 6.75V17.25C20.5 17.7141 20.3155 18.1591 19.9873 18.4873C19.6591 18.8155 19.2141 19 18.75 19H16.5C15.9477 19 15.5 18.5523 15.5 18C15.5 17.4477 15.9477 17 16.5 17H18.5V7.16406L15.3359 4H8.5V6C8.5 6.55228 8.05228 7 7.5 7C6.94772 7 6.5 6.55228 6.5 6Z" fill={color}/>
      <path d="M12.75 13.25C13.3023 13.25 13.75 13.6977 13.75 14.25C13.75 14.8023 13.3023 15.25 12.75 15.25H8.25C7.69772 15.25 7.25 14.8023 7.25 14.25C7.25 13.6977 7.69772 13.25 8.25 13.25H12.75Z" fill={color}/>
      <path d="M12.75 16.25C13.3023 16.25 13.75 16.6977 13.75 17.25C13.75 17.8023 13.3023 18.25 12.75 18.25H8.25C7.69772 18.25 7.25 17.8023 7.25 17.25C7.25 16.6977 7.69772 16.25 8.25 16.25H12.75Z" fill={color}/>
    </g>
    <defs>
      <clipPath id="clip0_1_19059">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const DocumentationIcon = ({ size = "20", color = "#374151" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1_19059)">
      <path d="M5.5 20H15.5V10.1641L12.3359 7H5.5V20ZM17.5 20.25C17.5 20.7141 17.3155 21.1591 16.9873 21.4873C16.6591 21.8155 16.2141 22 15.75 22H5.25C4.78587 22 4.34089 21.8155 4.0127 21.4873C3.68451 21.1591 3.5 20.7141 3.5 20.25V6.75C3.5 6.28587 3.68451 5.84088 4.0127 5.5127L4.14062 5.39648C4.45207 5.1412 4.84377 5 5.25 5H12.75L12.8486 5.00488C13.0776 5.02757 13.2929 5.12883 13.457 5.29297L17.207 9.04297L17.2734 9.11621C17.4193 9.29417 17.5 9.51791 17.5 9.75V20.25Z" fill={color}/>
      <path d="M6.5 6V3.75C6.5 3.28587 6.68451 2.84088 7.0127 2.5127L7.14062 2.39648C7.45207 2.1412 7.84377 2 8.25 2H15.75L15.8486 2.00488C16.0776 2.02757 16.2929 2.12883 16.457 2.29297L20.207 6.04297L20.2734 6.11621C20.4193 6.29417 20.5 6.51791 20.5 6.75V17.25C20.5 17.7141 20.3155 18.1591 19.9873 18.4873C19.6591 18.8155 19.2141 19 18.75 19H16.5C15.9477 19 15.5 18.5523 15.5 18C15.5 17.4477 15.9477 17 16.5 17H18.5V7.16406L15.3359 4H8.5V6C8.5 6.55228 8.05228 7 7.5 7C6.94772 7 6.5 6.55228 6.5 6Z" fill={color}/>
      <path d="M12.75 13.25C13.3023 13.25 13.75 13.6977 13.75 14.25C13.75 14.8023 13.3023 15.25 12.75 15.25H8.25C7.69772 15.25 7.25 14.8023 7.25 14.25C7.25 13.6977 7.69772 13.25 8.25 13.25H12.75Z" fill={color}/>
      <path d="M12.75 16.25C13.3023 16.25 13.75 16.6977 13.75 17.25C13.75 17.8023 13.3023 18.25 12.75 18.25H8.25C7.69772 18.25 7.25 17.8023 7.25 17.25C7.25 16.6977 7.69772 16.25 8.25 16.25H12.75Z" fill={color}/>
    </g>
    <defs>
      <clipPath id="clip0_1_19059">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

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
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(() => {
    // Determine initial selected item based on current path
    const path = location.pathname;
    if (path === '/dashboard') return 'getting-started';
    if (path === '/transactions') return 'transactions';
    if (path === '/reports') return 'reports';
    return 'getting-started';
  });
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    products: true,
    settings: false,
    documentation: false
  });
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState<null | HTMLElement>(null);
  const [showFooter, setShowFooter] = useState(true);

  // Update selected item when location changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') {
      setSelectedItem('getting-started');
    } else if (path === '/transactions') {
      setSelectedItem('transactions');
    } else if (path === '/reports') {
      setSelectedItem('reports');
    }
  }, [location.pathname]);

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    username: '@johndoe',
    email: 'john.doe@example.com',
    lastLogin: '2 hours ago'
  };

  const navGroups = [
    {
      title: 'Products',
      key: 'products',
      items: [
        { label: 'Getting Started', iconComponent: ZapIcon, path: 'getting-started' },
        { label: 'Transactions', iconComponent: TransferIcon, path: 'transactions' },
        { label: 'Reports', iconComponent: AnalyticsIcon, path: 'reports' },
        { label: 'Quick Play', iconComponent: QuickPlayIcon, path: 'quick-play' },
        { label: 'Merchant Portal', iconComponent: MerchantPortalIcon, path: 'merchant-portal' }
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
            { label: 'Profile', path: 'profile' },
            { label: 'API Keys', path: 'api-keys' }
          ]
        },
        {
          label: 'Documentation',
          iconComponent: DocumentationIcon,
          children: [
            { label: 'API Specification', path: 'api-specification' },
            { label: 'Merchant Portal Manual', path: 'merchant-portal-manual' }
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
    // Close mobile drawer when item is clicked
    if (isMobile) {
      setMobileOpen(false);
    }
    // Navigate to the appropriate route
    if (path === 'getting-started') {
      navigate('/dashboard');
    } else {
      navigate(`/${path}`);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
              if (hasChildren) {
                handleSectionToggle(item.label.toLowerCase());
              } else if (item.path) {
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
              <ArrowRight2 
                size="16" 
                style={{ 
                  transform: openSections[item.label.toLowerCase()] ? 'rotate(-90deg)' : 'rotate(90deg)',
                  transition: 'transform 0.2s ease'
                }} 
                color={colors.neutralDarker}
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

  // Sidebar content component
  const SidebarContent = () => (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box
          component="img"
          src="/OX PAY logo 1.png"
          alt="OXPay Logo"
          sx={{
            width: 120,
            height: 'auto'
          }}
        />
        {isMobile && (
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{ ml: 1 }}
          >
            <CloseSquare size="24" color={colors.neutralDarker} />
          </IconButton>
        )}
      </Box>

      {/* Navigation */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto', 
        py: 2,
        // Hide scrollbar for webkit browsers
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        // Hide scrollbar for Firefox
        scrollbarWidth: 'none',
        // Ensure content is still scrollable
        msOverflowStyle: 'none',
      }}>
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

        {/* Footer - positioned naturally at bottom of navigation items */}
        {showFooter && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Card sx={{
              backgroundColor: '#000000',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              <CardContent sx={{ p: 3, position: 'relative' }}>
                {/* Close Button */}
                <IconButton
                  onClick={() => setShowFooter(false)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  size="small"
                >
                  <Add size="20" color="white" style={{ transform: 'rotate(45deg)' }} />
                </IconButton>

                {/* Content */}
                <Box sx={{ pr: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: 1.3,
                      mb: 1
                    }}
                  >
                    Manage Every Payment in One Place
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#cccccc',
                      fontSize: '12px',
                      lineHeight: 1.4,
                      mb: 3
                    }}
                  >
                    Download now from the App Store or Google Play and simplify your financial life.
                  </Typography>

                  {/* App Store Buttons */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1
                  }}>
                    {/* Google Play Button */}
                    <Box
                      component="img"
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      sx={{
                        width: '120px',
                        height: 'auto',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease',
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                    />
                    
                    {/* App Store Button */}
                    <Box
                      component="img"
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      sx={{
                        width: '120px',
                        height: 'auto',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s ease',
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 280,
              backgroundColor: 'white',
              borderRight: '1px solid #e5e7eb'
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
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
          <SidebarContent />
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: { xs: 0, md: 280 },
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, sm: 3 },
            gap: 2,
            zIndex: 1000,
            backgroundColor: 'white',
            borderBottom: { xs: '1px solid #e5e7eb', md: 'none' }
          }}
        >
          {/* Left side - Mobile menu button and merchant info */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <HambergerMenu size="24" color={colors.neutralDarker} />
              </IconButton>
            )}
            
            {/* Merchant info - hide on small mobile screens */}
            <Box onClick={() => {

            }}  sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 2,
              p : 2,
              cursor :"pointer",
              borderRadius : 2,
              '&:hover': {
                backgroundColor: colors.electricVioletLightest
              }
            }}>
              <Shop 
                size="20" 
                color={colors.neutralDarker} 
              />
              <Typography
                variant="body1"
                sx={{
                  color: colors.neutralDarker,
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
              >
                Merchant Name
              </Typography>
              <Box
                sx={{
                  color: colors.neutralDarker,
                  fontSize: '12px'
                }}
              >
                ▴
              </Box>
            </Box>
          </Box>

          {/* Right side - Notifications and user menu */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 }
          }}>
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
                size={isMobile ? "small" : "medium"}
                sx={{
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: colors.electricVioletLightest
                  }
                }}
              >
                <Notification size={isMobile ? "18" : "20"} color="#000000" />
              </IconButton>
            </Card>
          </Badge>

          {/* Vertical divider - hide on small screens */}
          {!isMobile && (
            <Divider 
              orientation="vertical" 
              sx={{ 
                mx: 1,
                height: '30px',
                alignSelf: 'center'
              }} 
            />
          )}

          {/* User info and avatar */}
          <Box 
            onClick={handleUserMenuOpen}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 1, sm: 1.5 },
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
                width: { xs: 28, sm: 32 },
                height: { xs: 28, sm: 32 },
                backgroundColor: '#F2E5FB',
                border: `2px solid ${colors.electricVioletLight}`,
                color: colors.electricViolet,
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                fontWeight: 600
              }}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            
            {/* User name - hide on small mobile screens */}
            <Typography
              variant="body2"
              sx={{
                color: colors.neutralDarker,
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' }
              }}
            >
              Hello, {user.firstName}
            </Typography>

            <Box
              sx={{
                p: 0.5,
                color: colors.neutralDarker,
                transform: Boolean(userMenuAnchor) ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              <span style={{ fontSize: '14px' }}>▾</span>
            </Box>
          </Box>
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ 
          flex: 1, 
          overflow: 'auto', 
          backgroundColor: 'white', 
          pt: '64px',
          // Hide scrollbar for webkit browsers
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          // Hide scrollbar for Firefox
          scrollbarWidth: 'none',
          // Ensure content is still scrollable
          msOverflowStyle: 'none',
        }}>
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
        PaperProps={{
          sx: { 
            width: { xs: 260, sm: 280 },
            p: 0,
            mt: 1,
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
          }
        }}
      >
        {/* User Info Section */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                backgroundColor: '#F2E5FB',
                border: `2px solid ${colors.electricVioletLight}`,
                color: colors.electricViolet,
                fontSize: '1.125rem',
                fontWeight: 600
              }}
            >
              {user.firstName.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{
                fontWeight: 600,
                color: '#1f2937',
                fontSize: '0.875rem',
                lineHeight: 1.2
              }}>
                {user.fullName}
              </Typography>
              <Typography variant="body2" sx={{
                color: '#6b7280',
                fontSize: '0.75rem',
                lineHeight: 1.2,
                mt: 0.5
              }}>
                {user.username}
              </Typography>
              <Typography variant="caption" sx={{
                color: '#9ca3af',
                fontSize: '0.6875rem',
                fontFamily :"Open Sans",
                lineHeight: 1.2,
                mt: 0.55,
                display: 'block'
              }}>
                Last login: {user.lastLogin}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ mx: 3, my: 1 }} />

        {/* Menu Items */}
        <Box sx={{ pb: 1 }}>
          <MenuItem 
            onClick={() => {
              handleUserMenuClose();
              navigate('/profile');
            }}
            sx={{ 
              pl: 3, 
              pr: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: colors.electricVioletLightest
              }
            }}
          >
            <Profile size="18" color="#6b7280" style={{ marginRight: '12px' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#374151' }}>
              Profile
            </Typography>
          </MenuItem>
          
          <MenuItem 
            onClick={handleUserMenuClose}
            sx={{ 
              pl: 3, 
              pr: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: colors.electricVioletLightest
              }
            }}
          >
            <Clock size="18" color="#6b7280" style={{ marginRight: '12px' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#374151' }}>
              History
            </Typography>
          </MenuItem>
          
          <MenuItem 
            onClick={handleUserMenuClose}
            sx={{ 
              pl: 3, 
              pr: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: colors.electricVioletLightest
              }
            }}
          >
            <FAQ size="18" color="#6b7280" style={{ marginRight: '12px' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#374151' }}>
              FAQ
            </Typography>
          </MenuItem>
          
          <MenuItem 
            onClick={() => {
              handleUserMenuClose();
              handleLogout();
            }}
            sx={{ 
              pl: 3, 
              pr: 2,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#fef2f2'
              }
            }}
          >
            <Logout size="18" color="#dc2626" style={{ marginRight: '12px' }} />
            <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#dc2626' }}>
              Sign Out
            </Typography>
          </MenuItem>
        </Box>
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
            width: { xs: 300, sm: 320 }, 
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
