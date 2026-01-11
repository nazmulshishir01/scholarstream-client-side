import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  FiMenu, FiX, FiHome, FiUser, FiFileText, FiStar, FiPlusCircle, 
  FiList, FiUsers, FiBarChart2, FiCheckSquare, FiMessageSquare,
  FiLogOut, FiChevronLeft, FiSun, FiMoon
} from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import { useTheme } from '../providers/ThemeProvider';
import LoadingSpinner from '../components/shared/LoadingSpinner';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [role, roleLoading] = useRole();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  if (roleLoading) {
    return <LoadingSpinner />;
  }

  // Student menu items
  const studentLinks = [
    { path: '/dashboard/my-profile', icon: FiUser, label: 'My Profile' },
    { path: '/dashboard/my-applications', icon: FiFileText, label: 'My Applications' },
    { path: '/dashboard/my-reviews', icon: FiStar, label: 'My Reviews' },
  ];

  // Moderator menu items
  const moderatorLinks = [
    { path: '/dashboard/my-profile', icon: FiUser, label: 'My Profile' },
    { path: '/dashboard/manage-applications', icon: FiCheckSquare, label: 'Manage Applications' },
    { path: '/dashboard/all-reviews', icon: FiMessageSquare, label: 'All Reviews' },
  ];

  // Admin menu items
  const adminLinks = [
    { path: '/dashboard/my-profile', icon: FiUser, label: 'My Profile' },
    { path: '/dashboard/add-scholarship', icon: FiPlusCircle, label: 'Add Scholarship' },
    { path: '/dashboard/manage-scholarships', icon: FiList, label: 'Manage Scholarships' },
    { path: '/dashboard/manage-users', icon: FiUsers, label: 'Manage Users' },
    { path: '/dashboard/analytics', icon: FiBarChart2, label: 'Analytics' },
  ];

  // Get links based on role
  const getMenuLinks = () => {
    if (role === 'admin') return adminLinks;
    if (role === 'moderator') return moderatorLinks;
    return studentLinks;
  };

  const menuLinks = getMenuLinks();

  const getRoleBadge = () => {
    const badges = {
      admin: 'bg-error/10 text-error',
      moderator: 'bg-warning/10 text-warning',
      student: 'bg-primary/10 text-primary'
    };
    return badges[role] || badges.student;
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-base-100 border-b border-base-300 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-base-200 transition-colors"
          >
            <FiMenu size={24} className="text-base-content" />
          </button>
          
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
            <span className="font-display font-bold text-primary">ScholarStream</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-base-200 transition-colors"
          >
            {theme === 'dark' ? <FiSun className="text-amber-500" /> : <FiMoon className="text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-base-100 border-r border-base-300 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 rounded-lg" />
              <span className="font-display font-bold text-lg text-primary">ScholarStream</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
            >
              <FiX size={20} className="text-base-content" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <img
                src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                alt={user?.displayName}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base-content truncate">{user?.displayName}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadge()}`}>
                  {role || 'Student'}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {menuLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-base-content/70 hover:bg-base-200 hover:text-base-content'
                    }`
                  }
                >
                  <link.icon size={20} />
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-base-300" />

            {/* Back to Home */}
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base-content/70 hover:bg-base-200 hover:text-base-content transition-all"
            >
              <FiChevronLeft size={20} />
              Back to Home
            </Link>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-base-300 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base-content/70 hover:bg-base-200 transition-all"
            >
              {theme === 'dark' ? <FiSun size={20} className="text-amber-500" /> : <FiMoon size={20} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-error hover:bg-error/10 transition-all"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
