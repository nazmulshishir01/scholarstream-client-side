import { useLocation, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiXCircle, FiAlertTriangle, FiArrowRight, FiRefreshCw } from 'react-icons/fi';

const PaymentFailed = () => {
  const location = useLocation();
  const { scholarshipName, error } = location.state || {};

  // Redirect if no state
  if (!location.state) {
    return <Navigate to="/dashboard/my-applications" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Payment Failed - ScholarStream</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-error/5 to-base-100 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8 text-center">
            {/* Failed Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiXCircle className="text-error text-4xl" />
            </motion.div>

            {/* Failed Message */}
            <h1 className="text-2xl font-bold text-base-content mb-2">
              Payment Failed
            </h1>
            <p className="text-base-content/60 mb-6">
              We couldn't process your payment. Don't worry, you can try again.
            </p>

            {/* Details Card */}
            <div className="bg-base-200 rounded-xl p-6 mb-6 text-left">
              <div className="flex items-center gap-2 text-base-content mb-4">
                <FiAlertTriangle className="text-warning" />
                <span className="font-medium">Error Details</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Scholarship</span>
                  <span className="font-medium text-base-content text-right">{scholarshipName}</span>
                </div>
                <hr className="border-base-300" />
                <div>
                  <span className="text-base-content/60 text-sm">Error Message:</span>
                  <p className="text-error text-sm mt-1">{error || 'Payment was declined. Please try again.'}</p>
                </div>
              </div>
            </div>

            {/* What to do */}
            <div className="bg-warning/5 border border-warning/10 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-medium text-warning mb-2">What You Can Do:</h3>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li>• Check your card details and try again</li>
                <li>• Make sure you have sufficient funds</li>
                <li>• Contact your bank if the issue persists</li>
                <li>• Your application is saved - pay later from dashboard</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/dashboard/my-applications"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium"
              >
                Go to Dashboard
                <FiArrowRight />
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-base-200 hover:bg-base-300 text-base-content rounded-xl transition-colors font-medium"
              >
                <FiRefreshCw />
                Try Again
              </button>
            </div>

            {/* Help Link */}
            <p className="mt-6 text-sm text-base-content/60">
              Need help?{' '}
              <Link to="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentFailed;
