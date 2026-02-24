import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string[];
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
