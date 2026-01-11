import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FiCreditCard, FiLock, FiCheck, FiAlertCircle } from 'react-icons/fi';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// Checkout Form Component
const CheckoutForm = ({ scholarship, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (totalAmount > 0) {
      axiosSecure.post('/create-payment-intent', { amount: totalAmount })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error('Payment intent error:', err);
          toast.error('Failed to initialize payment');
        });
    }
  }, [totalAmount, axiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setCardError('');

    const card = elements.getElement(CardElement);

    if (!card) {
      setLoading(false);
      return;
    }

    try {
      // Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email
        }
      });

      if (methodError) {
        setCardError(methodError.message);
        setLoading(false);
        return;
      }

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id
      });

      if (confirmError) {
        setCardError(confirmError.message);
        // Save failed application
        await axiosSecure.post('/applications', {
          scholarshipId: scholarship._id,
          userId: user?.uid,
          userName: user?.displayName,
          userEmail: user?.email,
          universityName: scholarship.universityName,
          scholarshipCategory: scholarship.scholarshipCategory,
          subjectCategory: scholarship.subjectCategory,
          degree: scholarship.degree,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge,
          applicationStatus: 'pending',
          paymentStatus: 'unpaid',
          applicationDate: new Date().toISOString()
        });

        navigate('/payment-failed', {
          state: {
            scholarshipName: scholarship.scholarshipName,
            error: confirmError.message
          }
        });
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Save successful application
        const applicationData = {
          scholarshipId: scholarship._id,
          userId: user?.uid,
          userName: user?.displayName,
          userEmail: user?.email,
          universityName: scholarship.universityName,
          scholarshipCategory: scholarship.scholarshipCategory,
          subjectCategory: scholarship.subjectCategory,
          degree: scholarship.degree,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge,
          applicationStatus: 'pending',
          paymentStatus: 'paid',
          transactionId: paymentIntent.id,
          applicationDate: new Date().toISOString()
        };

        await axiosSecure.post('/applications', applicationData);

        // Save payment record
        await axiosSecure.post('/payments', {
          userEmail: user?.email,
          scholarshipId: scholarship._id,
          amount: totalAmount,
          transactionId: paymentIntent.id,
          paymentDate: new Date().toISOString()
        });

        navigate('/payment-success', {
          state: {
            scholarshipName: scholarship.scholarshipName,
            universityName: scholarship.universityName,
            amount: totalAmount,
            transactionId: paymentIntent.id
          }
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setCardError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Input */}
      <div>
        <label className="block text-sm font-medium text-base-content mb-3">
          Card Details
        </label>
        <div className="p-4 border border-base-300 rounded-xl bg-white">
          <CardElement options={cardElementOptions} />
        </div>
        {cardError && (
          <p className="mt-2 text-error text-sm flex items-center gap-1">
            <FiAlertCircle />
            {cardError}
          </p>
        )}
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-2 text-sm text-base-content/60">
        <FiLock className="text-success" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || loading}
        className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Processing...
          </>
        ) : (
          <>
            <FiCreditCard />
            Pay ${totalAmount}
          </>
        )}
      </button>
    </form>
  );
};

// Main Checkout Page
const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Scholarship not found</h2>
          <button onClick={() => navigate('/scholarships')} className="btn-primary">
            Browse Scholarships
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0);

  return (
    <>
      <Helmet>
        <title>Checkout - ScholarStream</title>
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-base-200">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Order Summary */}
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 h-fit">
                <h2 className="text-xl font-bold text-base-content mb-6">Order Summary</h2>
                
                {/* Scholarship Info */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-base-200">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-20 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-base-content">{scholarship.scholarshipName}</h3>
                    <p className="text-sm text-base-content/60">{scholarship.universityName}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      {scholarship.scholarshipCategory}
                    </span>
                  </div>
                </div>

                {/* Applicant Info */}
                <div className="mb-6 pb-6 border-b border-base-200">
                  <h3 className="font-medium text-base-content mb-3">Applicant Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Name</span>
                      <span className="text-base-content">{user?.displayName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/60">Email</span>
                      <span className="text-base-content">{user?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Fee Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Application Fee</span>
                    <span className="text-base-content">${scholarship.applicationFees || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-base-content/60">Service Charge</span>
                    <span className="text-base-content">${scholarship.serviceCharge || 0}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-base-200">
                    <span className="font-semibold text-base-content">Total</span>
                    <span className="font-bold text-xl text-primary">${totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6">
                <h2 className="text-xl font-bold text-base-content mb-6 flex items-center gap-2">
                  <FiCreditCard className="text-primary" />
                  Payment Details
                </h2>

                <Elements stripe={stripePromise}>
                  <CheckoutForm scholarship={scholarship} totalAmount={totalAmount} />
                </Elements>

                {/* Test Card Info */}
                <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-xl">
                  <p className="text-sm font-medium text-info mb-2">Test Card Numbers:</p>
                  <p className="text-xs text-base-content/70">Success: 4242 4242 4242 4242</p>
                  <p className="text-xs text-base-content/70">Decline: 4000 0000 0000 0002</p>
                  <p className="text-xs text-base-content/70">Use any future date and any 3-digit CVC</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
