import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit2, FiTrash2, FiStar, FiX, FiMessageSquare } from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [selectedReview, setSelectedReview] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ rating: 5, comment: '' });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['my-reviews', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews']);
      toast.success('Review deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete review');
    }
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosSecure.put(`/reviews/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-reviews']);
      setShowEditModal(false);
      toast.success('Review updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update review');
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Delete Review?',
      text: "This action cannot be undone!",
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

  const handleEditSubmit = () => {
    if (!editData.comment.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    editMutation.mutate({
      id: selectedReview._id,
      data: {
        ratingPoint: editData.rating,
        reviewComment: editData.comment,
        reviewDate: new Date().toISOString()
      }
    });
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange && onChange(star)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors ${
              star <= rating ? 'text-amber-400' : 'text-base-300'
            } ${interactive ? 'text-2xl' : 'text-base'}`}
            disabled={!interactive}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-base-200 rounded-xl p-6 h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">My Reviews</h1>
          <p className="text-base-content/60 mt-1">Manage your scholarship reviews</p>
        </div>

        {/* Content */}
        {reviews.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-12 text-center">
            <FiMessageSquare className="text-5xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/60 mb-2">You haven't written any reviews yet.</p>
            <p className="text-sm text-base-content/40">Complete a scholarship application to leave a review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-base-100 rounded-2xl border border-base-300 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-base-content text-lg mb-1">
                      {review.universityName}
                    </h3>
                    <p className="text-sm text-base-content/60 mb-3">
                      {review.reviewDate
                        ? format(new Date(review.reviewDate), 'MMMM dd, yyyy')
                        : 'N/A'}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(review.ratingPoint)}
                      <span className="text-sm text-base-content/60">({review.ratingPoint}/5)</span>
                    </div>

                    {/* Comment */}
                    <p className="text-base-content/70">{review.reviewComment}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setEditData({
                          rating: review.ratingPoint,
                          comment: review.reviewComment
                        });
                        setShowEditModal(true);
                      }}
                      className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedReview && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-base-100 rounded-2xl max-w-md w-full"
            >
              <div className="px-6 py-4 border-b border-base-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Edit Review</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                >
                  <FiX size={20} className="text-base-content/60" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-base-content/60">
                  Review for: <span className="font-medium text-base-content">{selectedReview.universityName}</span>
                </p>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">Rating</label>
                  {renderStars(editData.rating, true, (star) => setEditData({ ...editData, rating: star }))}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">Comment</label>
                  <textarea
                    value={editData.comment}
                    onChange={(e) => setEditData({ ...editData, comment: e.target.value })}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={4}
                  />
                </div>

                <button
                  onClick={handleEditSubmit}
                  disabled={editMutation.isPending}
                  className="w-full py-3 bg-success hover:bg-success/90 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  {editMutation.isPending ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyReviews;
