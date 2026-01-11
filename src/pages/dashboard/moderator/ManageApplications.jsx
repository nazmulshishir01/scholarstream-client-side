import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiSearch, FiEye, FiMessageSquare, FiX, FiCheck, FiClock, FiXCircle, FiFileText, FiFilter } from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// Skeleton loader
const TableSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
        <div className="w-10 h-10 bg-base-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-base-300 rounded w-1/4"></div>
          <div className="h-3 bg-base-300 rounded w-1/3"></div>
        </div>
        <div className="h-6 w-20 bg-base-300 rounded"></div>
      </div>
    ))}
  </div>
);

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['all-applications', statusFilter],
    queryFn: async () => {
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const res = await axiosSecure.get(`/applications/all${params}`);
      return res.data;
    }
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/applications/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-applications']);
      toast.success('Status updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update status');
    }
  });

  const feedbackMutation = useMutation({
    mutationFn: async ({ id, feedback }) => {
      return await axiosSecure.patch(`/applications/${id}/feedback`, { feedback });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-applications']);
      setShowFeedbackModal(false);
      setFeedback('');
      toast.success('Feedback submitted successfully!');
    },
    onError: () => {
      toast.error('Failed to submit feedback');
    }
  });

  const handleStatusChange = (id, newStatus, applicantName) => {
    const messages = {
      processing: `Start processing ${applicantName}'s application?`,
      completed: `Mark ${applicantName}'s application as completed?`,
      rejected: `Reject ${applicantName}'s application?`
    };

    Swal.fire({
      title: 'Update Status?',
      text: messages[newStatus],
      icon: newStatus === 'rejected' ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'rejected' ? '#ef4444' : '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, update!',
      background: 'var(--fallback-b1,oklch(var(--b1)))',
      color: 'var(--fallback-bc,oklch(var(--bc)))'
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, status: newStatus });
      }
    });
  };

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) {
      toast.error('Please enter feedback');
      return;
    }
    feedbackMutation.mutate({ id: selectedApplication._id, feedback });
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

  const filteredApplications = applications.filter(app =>
    app.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total', value: applications.length, color: 'bg-base-200' },
    { label: 'Pending', value: applications.filter(a => a.applicationStatus === 'pending').length, color: 'bg-warning/10 text-warning' },
    { label: 'Processing', value: applications.filter(a => a.applicationStatus === 'processing').length, color: 'bg-info/10 text-info' },
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
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">Manage Applications</h1>
          <p className="text-base-content/60 mt-1">Review and process scholarship applications</p>
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-2">
            <FiFilter className="text-base-content/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search by name, email, or university..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6">
            <TableSkeleton />
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-12 text-center">
            <FiFileText className="text-5xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/60">No applications found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
              <table className="w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Applicant</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">University</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {filteredApplications.map((application) => {
                    const statusBadge = getStatusBadge(application.applicationStatus);
                    return (
                      <tr key={application._id} className="hover:bg-base-200/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-base-content">{application.userName}</p>
                            <p className="text-sm text-base-content/60">{application.userEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-base-content">{application.universityName}</p>
                          <p className="text-sm text-base-content/60">{application.scholarshipCategory}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                            <statusBadge.icon size={12} />
                            {application.applicationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentBadge(application.paymentStatus)}`}>
                            {application.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowDetailsModal(true);
                              }}
                              className="p-2 text-info hover:bg-info/10 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FiEye size={18} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setFeedback(application.feedback || '');
                                setShowFeedbackModal(true);
                              }}
                              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title="Feedback"
                            >
                              <FiMessageSquare size={18} />
                            </button>
                            {application.applicationStatus === 'pending' && (
                              <button
                                onClick={() => handleStatusChange(application._id, 'processing', application.userName)}
                                className="p-2 text-warning hover:bg-warning/10 rounded-lg transition-colors"
                                title="Start Processing"
                              >
                                <FiClock size={18} />
                              </button>
                            )}
                            {application.applicationStatus === 'processing' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(application._id, 'completed', application.userName)}
                                  className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                                  title="Mark Completed"
                                >
                                  <FiCheck size={18} />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(application._id, 'rejected', application.userName)}
                                  className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <FiXCircle size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredApplications.map((application) => {
                const statusBadge = getStatusBadge(application.applicationStatus);
                return (
                  <motion.div
                    key={application._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-100 rounded-xl border border-base-300 p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-base-content">{application.userName}</p>
                        <p className="text-sm text-base-content/60">{application.userEmail}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                        <statusBadge.icon size={12} />
                        {application.applicationStatus}
                      </span>
                    </div>

                    <div className="text-sm text-base-content/70 mb-3">
                      <p>{application.universityName}</p>
                      <p className="text-xs">{application.scholarshipCategory} • {application.degree}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-base-200">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentBadge(application.paymentStatus)}`}>
                        {application.paymentStatus}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setShowDetailsModal(true);
                          }}
                          className="p-2 text-info hover:bg-info/10 rounded-lg transition-colors"
                        >
                          <FiEye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setFeedback(application.feedback || '');
                            setShowFeedbackModal(true);
                          }}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <FiMessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
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
                    <p className="text-sm text-base-content/60">Applicant</p>
                    <p className="font-medium text-base-content">{selectedApplication.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Email</p>
                    <p className="font-medium text-base-content">{selectedApplication.userEmail}</p>
                  </div>
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
                    <p className="text-sm text-base-content/60">Application Date</p>
                    <p className="font-medium text-base-content">
                      {selectedApplication.applicationDate
                        ? format(new Date(selectedApplication.applicationDate), 'MMM dd, yyyy')
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Fees Paid</p>
                    <p className="font-medium text-base-content">
                      ${(selectedApplication.applicationFees || 0) + (selectedApplication.serviceCharge || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(selectedApplication.applicationStatus).bg} ${getStatusBadge(selectedApplication.applicationStatus).text} ${getStatusBadge(selectedApplication.applicationStatus).border}`}>
                      {selectedApplication.applicationStatus}
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

        {/* Feedback Modal */}
        {showFeedbackModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-base-100 rounded-2xl max-w-md w-full"
            >
              <div className="px-6 py-4 border-b border-base-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Application Feedback</h2>
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                >
                  <FiX size={20} className="text-base-content/60" />
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-base-content/60 mb-4">
                  Feedback for: <span className="font-medium text-base-content">{selectedApplication.userName}</span>
                </p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback..."
                  className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  rows={4}
                />
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={feedbackMutation.isPending}
                  className="w-full mt-4 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                >
                  {feedbackMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageApplications;
