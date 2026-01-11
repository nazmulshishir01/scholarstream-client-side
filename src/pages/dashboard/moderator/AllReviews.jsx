import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiTrash2, FiStar, FiSearch, FiMessageSquare } from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// Skeleton loader
const ReviewSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-base-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-base-300 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-base-300 rounded w-1/4"></div>
            <div className="h-3 bg-base-300 rounded w-1/3"></div>
            <div className="h-4 bg-base-300 rounded w-20 mt-2"></div>
            <div className="h-16 bg-base-300 rounded mt-3"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-reviews']);
      toast.success('Review deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete review');
    }
  });

  const handleDelete = (id, userName) => {
    Swal.fire({
      title: 'Delete Review?',
      text: `Delete ${userName}'s review? This action cannot be undone.`,
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

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-base-300'}`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review =>
    review.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.reviewComment?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.ratingPoint, 0) / reviews.length).toFixed(1)
    : 0;

  const stats = [
    { label: 'Total Reviews', value: reviews.length, color: 'bg-primary/10 text-primary' },
    { label: 'Average Rating', value: averageRating, color: 'bg-warning/10 text-warning' },
    { label: 'Positive (4-5★)', value: reviews.filter(r => r.ratingPoint >= 4).length, color: 'bg-success/10 text-success' },
    { label: 'Negative (<3★)', value: reviews.filter(r => r.ratingPoint < 3).length, color: 'bg-error/10 text-error' }
  ];

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">All Reviews</h1>
          <p className="text-base-content/60 mt-1">Moderate scholarship reviews</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.color} rounded-xl p-4 border border-base-300`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <ReviewSkeleton />
        ) : filteredReviews.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-12 text-center">
            <FiMessageSquare className="text-5xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/60">No reviews found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-100 rounded-2xl border border-base-300 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* User Info */}
                  <img
                    src={review.userImage || 'https://i.ibb.co/5GzXkwq/user.png'}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-base-content">{review.userName}</h3>
                        <p className="text-sm text-base-content/60">{review.userEmail}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-base-content/50">
                          {review.reviewDate
                            ? format(new Date(review.reviewDate), 'MMM dd, yyyy')
                            : 'N/A'}
                        </span>
                        <button
                          onClick={() => handleDelete(review._id, review.userName)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          title="Delete Review"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(review.ratingPoint)}
                      <span className="text-sm text-base-content/60">({review.ratingPoint}/5)</span>
                    </div>

                    {/* University */}
                    <p className="text-sm font-medium text-primary mb-2">{review.universityName}</p>

                    {/* Comment */}
                    <p className="text-base-content/70">{review.reviewComment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllReviews;
