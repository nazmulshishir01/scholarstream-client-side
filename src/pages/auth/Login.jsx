import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield, FiUsers, FiLoader } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);
  const { signIn, signInWithGoogle, createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Demo credentials
  const demoCredentials = {
    admin: { 
      email: 'admin@scholarstream.com', 
      password: 'Admin@123',
      name: 'Admin User',
      role: 'admin'
    },
    moderator: { 
      email: 'moderator@scholarstream.com', 
      password: 'Moderator@123',
      name: 'Moderator User',
      role: 'moderator'
    },
    student: { 
      email: 'student@scholarstream.com', 
      password: 'Student@123',
      name: 'Student User',
      role: 'student'
    }
  };

  // Handle demo login - create account if doesn't exist
  const handleDemoLogin = async (role) => {
    const credentials = demoCredentials[role];
    setDemoLoading(role);
    
    try {
      // First try to sign in
      await signIn(credentials.email, credentials.password);
      toast.success(`Logged in as ${role}!`);
      navigate(from, { replace: true });
    } catch (error) {
      // If user doesn't exist, create the account
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        try {
          toast.loading(`Creating ${role} account...`, { id: 'demo-create' });
          
          // Create user in Firebase
          await createUser(credentials.email, credentials.password);
          await updateUserProfile(credentials.name, 'https://i.ibb.co/5GzXkwq/user.png');
          
          // Save user to database with role
          await axiosPublic.post('/users', {
            name: credentials.name,
            email: credentials.email,
            photoURL: 'https://i.ibb.co/5GzXkwq/user.png',
            role: credentials.role
          });
          
          toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} account created & logged in!`, { id: 'demo-create' });
          navigate(from, { replace: true });
        } catch (createError) {
          toast.error(`Failed to create ${role} account: ${createError.message}`, { id: 'demo-create' });
        }
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setDemoLoading(null);
    }
  };

  // Fill credentials without auto-login
  const fillCredentials = (role) => {
    const credentials = demoCredentials[role];
    setValue('email', credentials.email);
    setValue('password', credentials.password);
    toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`, {
      icon: '🔑',
      duration: 2000
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid email or password. Please check your credentials.');
      } else {
        toast.error(error.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      };
      await axiosPublic.post('/users', userInfo);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Google login failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - ScholarStream</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-base-200">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-base-content mb-2">
                  Welcome Back
                </h1>
                <p className="text-base-content/60">
                  Sign in to continue your scholarship journey
                </p>
              </div>

              {/* Demo Login Buttons - Click to auto-login/create */}
              <div className="mb-6">
                <p className="text-sm text-base-content/60 mb-3 text-center">
                  Quick Demo Login <span className="text-xs">(Click to login)</span>:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={demoLoading !== null}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-error/10 hover:bg-error/20 border border-error/20 transition-all group disabled:opacity-50"
                  >
                    {demoLoading === 'admin' ? (
                      <FiLoader className="text-error text-xl animate-spin" />
                    ) : (
                      <FiShield className="text-error text-xl group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-xs font-medium text-error">Admin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('moderator')}
                    disabled={demoLoading !== null}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-warning/10 hover:bg-warning/20 border border-warning/20 transition-all group disabled:opacity-50"
                  >
                    {demoLoading === 'moderator' ? (
                      <FiLoader className="text-warning text-xl animate-spin" />
                    ) : (
                      <FiUsers className="text-warning text-xl group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-xs font-medium text-warning">Moderator</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('student')}
                    disabled={demoLoading !== null}
                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all group disabled:opacity-50"
                  >
                    {demoLoading === 'student' ? (
                      <FiLoader className="text-primary text-xl animate-spin" />
                    ) : (
                      <FiUser className="text-primary text-xl group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-xs font-medium text-primary">Student</span>
                  </button>
                </div>
                <p className="text-xs text-base-content/40 text-center mt-2">
                  First click creates account, then logs in automatically
                </p>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-base-300"></div>
                <span className="px-4 text-sm text-base-content/50">OR</span>
                <div className="flex-1 border-t border-base-300"></div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required'
                      })}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-base-300"></div>
                <span className="px-4 text-sm text-base-content/50">OR</span>
                <div className="flex-1 border-t border-base-300"></div>
              </div>

              {/* Social Login */}
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 border border-base-300 rounded-xl flex items-center justify-center gap-3 hover:bg-base-200 transition-colors"
              >
                <FcGoogle size={24} />
                <span className="font-medium text-base-content">Continue with Google</span>
              </button>

              {/* Register Link */}
              <p className="text-center mt-6 text-base-content/60">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
