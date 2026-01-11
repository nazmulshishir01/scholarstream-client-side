import { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiFileText, FiArrowRight } from 'react-icons/fi';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
  const location = useLocation();
  const { scholarshipName, universityName, amount, transactionId } = location.state || {};

  useEffect(() => {
    // Trigger confetti on page load
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Redirect if no state
  if (!location.state) {
    return <Navigate to="/dashboard/my-applications" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Payment Successful - ScholarStream</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-success/5 to-base-100 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-8 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-success text-4xl" />
            </motion.div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-base-content mb-2">
              Payment Successful!
            </h1>
            <p className="text-base-content/60 mb-6">
              Your scholarship application has been submitted successfully.
            </p>

            {/* Details Card */}
            <div className="bg-base-200 rounded-xl p-6 mb-6 text-left">
              <div className="flex items-center gap-2 text-base-content mb-4">
                <FiFileText className="text-primary" />
                <span className="font-medium">Payment Details</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Scholarship</span>
                  <span className="font-medium text-base-content text-right">{scholarshipName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">University</span>
                  <span className="font-medium text-base-content text-right">{universityName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Amount Paid</span>
                  <span className="font-bold text-success">${amount}</span>
                </div>
                <hr className="border-base-300" />
                <div className="flex justify-between text-sm">
                  <span className="text-base-content/60">Transaction ID</span>
                  <span className="font-mono text-base-content/70 text-xs">{transactionId?.slice(0, 20)}...</span>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-medium text-primary mb-2">What's Next?</h3>
              <ul className="text-sm text-base-content/70 space-y-1">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-success text-xs" />
                  Your application is now under review
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-success text-xs" />
                  You'll receive updates via email
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-success text-xs" />
                  Track your application status in dashboard
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <Link
              to="/dashboard/my-applications"
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium"
            >
              Go to My Applications
              <FiArrowRight />
            </Link>

            {/* Secondary Action */}
            <Link
              to="/scholarships"
              className="inline-block mt-4 text-primary hover:underline text-sm"
            >
              Browse More Scholarships
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentSuccess;
