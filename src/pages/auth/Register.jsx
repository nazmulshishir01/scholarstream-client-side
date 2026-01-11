import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiImage, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch('password', '');

  // Password strength checker
  const getPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[A-Z]/)) strength++;
    if (pass.match(/[0-9]/)) strength++;
    if (pass.match(/[!@#$%^&*]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = ['bg-error', 'bg-warning', 'bg-info', 'bg-success'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

  const onSubmit = async (data) => {
    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      // Create user
      const result = await createUser(data.email, data.password);
      
      // Update profile
      await updateUserProfile(data.name, data.photoURL);

      // Save to database
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'
      };
      await axiosPublic.post('/users', userInfo);

      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
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
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Google login failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Register - ScholarStream</title>
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
                  Create Account
                </h1>
                <p className="text-base-content/60">
                  Start your scholarship journey today
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="text"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-error text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

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

                {/* Photo URL */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Photo URL <span className="text-base-content/40">(Optional)</span>
                  </label>
                  <div className="relative">
                    <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    <input
                      type="url"
                      {...register('photoURL')}
                      placeholder="Enter your photo URL"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
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
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                          message: 'Must contain uppercase and special character'
                        }
                      })}
                      placeholder="Create a strong password"
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
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              index < passwordStrength 
                                ? strengthColors[passwordStrength - 1] 
                                : 'bg-base-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-base-content/60">
                        Password strength: <span className={`font-medium ${passwordStrength > 2 ? 'text-success' : passwordStrength > 1 ? 'text-warning' : 'text-error'}`}>
                          {strengthLabels[passwordStrength - 1] || 'Very Weak'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-5 h-5 rounded border-base-300 text-primary focus:ring-primary/50 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-base-content/70 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/about" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/about" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
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

              {/* Login Link */}
              <p className="text-center mt-6 text-base-content/60">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Register;
