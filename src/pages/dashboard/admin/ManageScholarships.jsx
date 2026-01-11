import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit2, FiTrash2, FiSearch, FiPlus, FiEye, FiX, FiSave, FiAward, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// Skeleton loader
const TableSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
        <div className="w-16 h-12 bg-base-300 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-base-300 rounded w-1/3"></div>
          <div className="h-3 bg-base-300 rounded w-1/4"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-base-300 rounded"></div>
          <div className="h-8 w-8 bg-base-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['admin-scholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships/admin/all');
      return res.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/scholarships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-scholarships']);
      toast.success('Scholarship deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete scholarship');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosSecure.put(`/scholarships/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-scholarships']);
      setShowEditModal(false);
      toast.success('Scholarship updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update scholarship');
    }
  });

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Delete Scholarship?',
      text: `Are you sure you want to delete "${name}"?`,
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.applicationFees = parseInt(data.applicationFees);
    data.serviceCharge = parseInt(data.serviceCharge);
    data.universityWorldRank = parseInt(data.universityWorldRank);
    updateMutation.mutate({ id: selectedScholarship._id, data });
  };

  const filteredScholarships = scholarships.filter(s =>
    s.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.universityName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryBadge = (category) => {
    const badges = {
      'Full fund': 'bg-success/10 text-success border-success/20',
      'Partial': 'bg-warning/10 text-warning border-warning/20',
      'Self-fund': 'bg-info/10 text-info border-info/20'
    };
    return badges[category] || 'bg-base-200 text-base-content border-base-300';
  };

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">Manage Scholarships</h1>
            <p className="text-base-content/60 mt-1">Total: {scholarships.length} scholarships</p>
          </div>
          <Link
            to="/dashboard/add-scholarship"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors"
          >
            <FiPlus size={18} />
            Add Scholarship
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-6">
            <TableSkeleton />
          </div>
        ) : filteredScholarships.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-12 text-center">
            <FiAward className="text-5xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/60">No scholarships found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
              <table className="w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Scholarship</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Fees</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Deadline</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {filteredScholarships.map((scholarship) => (
                    <tr key={scholarship._id} className="hover:bg-base-200/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={scholarship.universityImage}
                            alt={scholarship.universityName}
                            className="w-16 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-base-content">{scholarship.scholarshipName}</p>
                            <p className="text-sm text-base-content/60">{scholarship.universityName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryBadge(scholarship.scholarshipCategory)}`}>
                          {scholarship.scholarshipCategory}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-base-content">
                        ${scholarship.applicationFees + scholarship.serviceCharge}
                      </td>
                      <td className="px-6 py-4 text-base-content/70">
                        {scholarship.applicationDeadline
                          ? format(new Date(scholarship.applicationDeadline), 'MMM dd, yyyy')
                          : 'Open'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/scholarship/${scholarship._id}`}
                            className="p-2 text-info hover:bg-info/10 rounded-lg transition-colors"
                            title="View"
                          >
                            <FiEye size={18} />
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedScholarship(scholarship);
                              setShowEditModal(true);
                            }}
                            className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(scholarship._id, scholarship.scholarshipName)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredScholarships.map((scholarship) => (
                <motion.div
                  key={scholarship._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-base-100 rounded-xl border border-base-300 overflow-hidden"
                >
                  <div className="flex gap-3 p-4">
                    <img
                      src={scholarship.universityImage}
                      alt={scholarship.universityName}
                      className="w-20 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base-content truncate">{scholarship.scholarshipName}</h3>
                      <p className="text-sm text-base-content/60 truncate">{scholarship.universityName}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryBadge(scholarship.scholarshipCategory)}`}>
                        {scholarship.scholarshipCategory}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-base-200/50 border-t border-base-200">
                    <div className="text-sm">
                      <span className="text-base-content/60">Fees:</span>
                      <span className="font-medium text-base-content ml-1">
                        ${scholarship.applicationFees + scholarship.serviceCharge}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/scholarship/${scholarship._id}`}
                        className="p-2 text-info hover:bg-info/10 rounded-lg transition-colors"
                      >
                        <FiEye size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedScholarship(scholarship);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(scholarship._id, scholarship.scholarshipName)}
                        className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedScholarship && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-base-100 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-base-100 px-6 py-4 border-b border-base-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-base-content">Edit Scholarship</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-base-200 rounded-lg transition-colors"
                >
                  <FiX size={20} className="text-base-content/60" />
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Scholarship Name</label>
                    <input
                      name="scholarshipName"
                      defaultValue={selectedScholarship.scholarshipName}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">University Name</label>
                    <input
                      name="universityName"
                      defaultValue={selectedScholarship.universityName}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Country</label>
                    <input
                      name="universityCountry"
                      defaultValue={selectedScholarship.universityCountry}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">City</label>
                    <input
                      name="universityCity"
                      defaultValue={selectedScholarship.universityCity}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">World Rank</label>
                    <input
                      name="universityWorldRank"
                      type="number"
                      defaultValue={selectedScholarship.universityWorldRank}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Application Fees</label>
                    <input
                      name="applicationFees"
                      type="number"
                      defaultValue={selectedScholarship.applicationFees}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Service Charge</label>
                    <input
                      name="serviceCharge"
                      type="number"
                      defaultValue={selectedScholarship.serviceCharge}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">Deadline</label>
                    <input
                      name="applicationDeadline"
                      type="date"
                      defaultValue={selectedScholarship.applicationDeadline?.split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-success hover:bg-success/90 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                  >
                    <FiSave size={18} />
                    {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 border border-base-300 text-base-content font-medium rounded-xl hover:bg-base-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageScholarships;
