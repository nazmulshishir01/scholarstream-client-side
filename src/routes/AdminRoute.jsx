import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
