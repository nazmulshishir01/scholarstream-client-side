import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown, FiLogOut, FiLayout, FiSun, FiMoon, FiUser, FiBookOpen, FiInfo, FiMail, FiHelpCircle } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../providers/ThemeProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownOpen && !e.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logOut();
    setDropdownOpen(false);
  };

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/scholarships', label: 'Scholarships' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const authLinks = [
    { path: '/', label: 'Home' },
    { path: '/scholarships', label: 'Scholarships' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const navLinks = user ? authLinks : publicLinks;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-100 shadow-lg' 
          : 'bg-base-100/90 backdrop-blur-md'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="ScholarStream logo"
              className="w-10 h-10 rounded-lg object-cover"
              width={40}
              height={40}
            />
            <span className="text-xl font-display font-bold">
              <span className="text-primary">Scholar</span>
              <span className="text-base-content">Stream</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-base-content/70 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-amber-500" />
              ) : (
                <FiMoon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {user ? (
              <div className="relative dropdown-container">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-colors"
                >
                  <img
                    src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                  />
                  <FiChevronDown
                    className={`transition-transform text-base-content ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-xl shadow-xl border border-base-300 py-2 animate-fadeIn z-50">
                    <div className="px-4 py-3 border-b border-base-300">
                      <p className="font-semibold text-base-content">{user.displayName}</p>
                      <p className="text-sm text-base-content/60 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content/80 hover:bg-base-200 hover:text-primary transition-colors"
                    >
                      <FiLayout size={18} />
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base-content/80 hover:bg-base-200 hover:text-primary transition-colors"
                    >
                      <FiUser size={18} />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-base-content/80 hover:bg-error/10 hover:text-error transition-colors"
                    >
                      <FiLogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-medium text-base-content/70 hover:text-primary transition-colors px-4 py-2"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary py-2.5 px-5">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5 text-amber-500" />
              ) : (
                <FiMoon className="w-5 h-5 text-slate-600" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-base-content hover:text-primary transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-base-300 animate-slideDown bg-base-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-base-content/70 hover:bg-base-200'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {user ? (
                <>
                  <div className="my-2 border-t border-base-300" />
                  <div className="px-4 py-2 flex items-center gap-3">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                    />
                    <div>
                      <p className="font-semibold text-base-content text-sm">{user.displayName}</p>
                      <p className="text-xs text-base-content/60">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg font-medium text-base-content/70 hover:bg-base-200 transition-colors flex items-center gap-2"
                  >
                    <FiLayout size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg font-medium text-error hover:bg-error/10 transition-colors text-left flex items-center gap-2"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="py-3 rounded-lg font-medium text-center border border-base-300 hover:border-primary hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
