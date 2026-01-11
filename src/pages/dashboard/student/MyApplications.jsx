import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEye, FiEdit2, FiTrash2, FiCreditCard, FiStar, FiX, FiFileText, FiClock, FiCheck, FiXCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// Skeleton loader
const CardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-base-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-12 bg-base-300 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-base-300 rounded w-1/3"></div>
            <div className="h-3 bg-base-300 rounded w-1/4"></div>
          </div>
          <div className="h-6 w-20 bg-base-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['my-applications', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/applications/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-applications']);
      toast.success('Application deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete application');
    }
  });

  const reviewMutation = useMutation({
    mutationFn: async (data) => {
      return await axiosSecure.post('/reviews', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-applications']);
      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit review');
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Application?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete!',
      background: 'var(--fallback-b1,oklch(var(--b1)))',
      color: 'var(--fallback-bc,oklch(var(--bc)))'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleReviewSubmit = () => {
    if (!reviewData.comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    const review = {
      scholarshipId: selectedApplication.scholarshipId,
      universityName: selectedApplication.universityName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: reviewData.rating,
      reviewComment: reviewData.comment,
      reviewDate: new Date().toISOString()
    };

    reviewMutation.mutate(review);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20', icon: FiClock },
      processing: { bg: 'bg-info/10', text: 'text-info', border: 'border-info/20', icon: FiClock },
      completed: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20', icon: FiCheck },
      rejected: { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20', icon: FiXCircle }
    };
    return badges[status] || badges.pending;
  };

  const getPaymentBadge = (status) => {
    return status === 'paid'
      ? 'bg-success/10 text-success border-success/20'
      : 'bg-error/10 text-error border-error/20';
  };

  const stats = [
    { label: 'Total', value: applications.length, color: 'bg-base-200' },
    { label: 'Pending', value: applications.filter(a => a.applicationStatus === 'pending').length, color: 'bg-warning/10 text-warning' },
    { label: 'Completed', value: applications.filter(a => a.applicationStatus === 'completed').length, color: 'bg-success/10 text-success' }
  ];

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">My Applications</h1>
          <p className="text-base-content/60 mt-1">Track your scholarship applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.color} rounded-xl p-4 border border-base-300`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <CardSkeleton />
        ) : applications.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-12 text-center">
            <FiFileText className="text-5xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/60 mb-4">You haven't applied to any scholarships yet.</p>
            <Link
              to="/scholarships"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors"
            >
              Browse Scholarships
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const statusBadge = getStatusBadge(application.applicationStatus);
              const canEdit = application.applicationStatus === 'pending';
              const canPay = application.applicationStatus === 'pending' && application.paymentStatus === 'unpaid';
              const canReview = application.applicationStatus === 'completed';

              return (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden"
                >
                  {/* Main Content */}
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* University Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-base-content mb-1">
                          {application.universityName}
                        </h3>
                        <p className="text-base-content/60 text-sm mb-3">
                          {application.scholarshipCategory} • {application.degree}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                            <statusBadge.icon size={12} />
                            {application.applicationStatus}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentBadge(application.paymentStatus)}`}>
                            {application.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {/* Fees */}
                      <div className="text-right">
                        <p className="text-sm text-base-content/60">Total Fees</p>
                        <p className="text-xl font-bold text-base-content">
                          ${(application.applicationFees || 0) + (application.serviceCharge || 0)}
                        </p>
                      </div>
                    </div>

                    {/* Feedback */}
                    {application.feedback && (
                      <div className="mt-4 p-4 bg-base-200 rounded-xl">
                        <p className="text-sm text-base-content/60 mb-1">Moderator Feedback:</p>
                        <p className="text-base-content">{application.feedback}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-base-200/50 border-t border-base-200">
                    <p className="text-sm text-base-content/50">
                      Applied: {application.applicationDate
                        ? format(new Date(application.applicationDate), 'MMM dd, yyyy')
                        : 'N/A'}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowDetailsModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-2 text-info hover:bg-info/10 rounded-lg transition-colors text-sm font-medium"
                      >
                        <FiEye size={16} />
                        Details
                      </button>

                      {canEdit && (
                        <Link
                          to={`/dashboard/edit-application/${application._id}`}
                          className="flex items-center gap-1 px-3 py-2 text-success hover:bg-success/10 rounded-lg transition-colors text-sm font-medium"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </Link>
                      )}

                      {canPay && (
                        <Link
                          to={`/checkout/${application.scholarshipId}`}
                          className="flex items-center gap-1 px-3 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors text-sm font-medium"
                        >
                          <FiCreditCard size={16} />
                          Pay
                        </Link>
                      )}

                      {canReview && (
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowReviewModal(true);
                          }}
                          className="flex items-center gap-1 px-3 py-2 text-warning hover:bg-warning/10 rounded-lg transition-colors text-sm font-medium"
                        >
                          <FiStar size={16} />
                          Review
                        </button>
                      )}

                      {canEdit && (
                        <button
                          onClick={() => handleDelete(application._id)}
                          className="flex items-center gap-1 px-3 py-2 text-error hover:bg-error/10 rounded-lg transition-colors text-sm font-medium"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-base-100 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-base-100 px-6 py-4 border-b border-base-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Application Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                >
                  <FiX size={20} className="text-base-content/60" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60">University</p>
                    <p className="font-medium text-base-content">{selectedApplication.universityName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Category</p>
                    <p className="font-medium text-base-content">{selectedApplication.scholarshipCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Degree</p>
                    <p className="font-medium text-base-content">{selectedApplication.degree}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Subject</p>
                    <p className="font-medium text-base-content">{selectedApplication.subjectCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Application Fee</p>
                    <p className="font-medium text-base-content">${selectedApplication.applicationFees}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Service Charge</p>
                    <p className="font-medium text-base-content">${selectedApplication.serviceCharge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedApplication.applicationStatus).bg} ${getStatusBadge(selectedApplication.applicationStatus).text} ${getStatusBadge(selectedApplication.applicationStatus).border}`}>
                      {selectedApplication.applicationStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Payment</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentBadge(selectedApplication.paymentStatus)}`}>
                      {selectedApplication.paymentStatus}
                    </span>
                  </div>
                </div>

                {selectedApplication.feedback && (
                  <div className="pt-4 border-t border-base-200">
                    <p className="text-sm text-base-content/60 mb-2">Feedback</p>
                    <p className="text-base-content bg-base-200 p-3 rounded-lg">{selectedApplication.feedback}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-base-100 rounded-2xl max-w-md w-full"
            >
              <div className="px-6 py-4 border-b border-base-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Write a Review</h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                >
                  <FiX size={20} className="text-base-content/60" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-base-content/60">
                  Review for: <span className="font-medium text-base-content">{selectedApplication.universityName}</span>
                </p>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className={`text-3xl transition-colors ${star <= reviewData.rating ? 'text-amber-400' : 'text-base-300'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">Your Review</label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={4}
                  />
                </div>

                <button
                  onClick={handleReviewSubmit}
                  disabled={reviewMutation.isPending}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyApplications;
