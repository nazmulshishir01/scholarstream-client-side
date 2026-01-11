import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Allow both admin and moderator
  if (user && (role === 'admin' || role === 'moderator')) {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

export default ModeratorRoute;
