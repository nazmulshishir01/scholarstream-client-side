import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/Home';
import AllScholarships from '../pages/AllScholarships';
import ScholarshipDetails from '../pages/ScholarshipDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Blog from '../pages/Blog';
import ErrorPage from '../pages/ErrorPage';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Payment Pages
import Checkout from '../pages/Checkout';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentFailed from '../pages/PaymentFailed';

// Dashboard Pages
import MyProfile from '../pages/dashboard/MyProfile';

// Student Dashboard
import MyApplications from '../pages/dashboard/student/MyApplications';
import MyReviews from '../pages/dashboard/student/MyReviews';

// Moderator Dashboard
import ManageApplications from '../pages/dashboard/moderator/ManageApplications';
import AllReviews from '../pages/dashboard/moderator/AllReviews';

// Admin Dashboard
import AddScholarship from '../pages/dashboard/admin/AddScholarship';
import ManageScholarships from '../pages/dashboard/admin/ManageScholarships';
import ManageUsers from '../pages/dashboard/admin/ManageUsers';
import Analytics from '../pages/dashboard/admin/Analytics';

// Route Guards
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import ModeratorRoute from './ModeratorRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'scholarships', element: <AllScholarships /> },
      { path: 'scholarship/:id', element: <ScholarshipDetails /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <Blog /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: 'checkout/:id',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        )
      },
      {
        path: 'payment-success',
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        )
      },
      {
        path: 'payment-failed',
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // Common
      { index: true, element: <MyProfile /> },
      { path: 'my-profile', element: <MyProfile /> },

      // Student Routes
      { path: 'my-applications', element: <MyApplications /> },
      { path: 'my-reviews', element: <MyReviews /> },

      // Moderator Routes
      {
        path: 'manage-applications',
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        )
      },
      {
        path: 'all-reviews',
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        )
      },

      // Admin Routes
      {
        path: 'add-scholarship',
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        )
      },
      {
        path: 'manage-scholarships',
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        )
      },
      {
        path: 'manage-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        )
      },
      {
        path: 'analytics',
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        )
      }
    ]
  }
]);

export default router;
