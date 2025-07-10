import React from 'react';
import { useAuth } from '~/contexts/AuthContext';
import LoadingPage from '../common/LoadingPage';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true, 
  fallback = <LoadingPage /> 
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (requireAuth && !isAuthenticated) {
    // User needs to be authenticated but isn't - the AuthProvider will handle redirect
    return <>{fallback}</>;
  }

  if (!requireAuth && isAuthenticated) {
    // User is authenticated but trying to access auth pages - the AuthProvider will handle redirect
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default AuthGuard;
