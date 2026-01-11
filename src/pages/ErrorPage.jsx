import { Link, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-primary/10 to-base-300 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-base-content/10 select-none leading-none">
            404
          </h1>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 bg-warning/20 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-warning" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-[-20px] md:mt-[-40px]"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-base-content mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-base-content/60 max-w-md mx-auto mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          {error?.statusText || error?.message ? (
            <p className="text-error text-sm mb-8">
              Error: {error.statusText || error.message}
            </p>
          ) : (
            <p className="text-base-content/40 text-sm mb-8">
              Don't worry, let's get you back on track!
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
          >
            <FiHome className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-base-100 hover:bg-base-200 text-base-content px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 border border-base-300"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
