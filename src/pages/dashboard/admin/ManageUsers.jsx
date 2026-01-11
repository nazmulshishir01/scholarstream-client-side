import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiTrash2, FiSearch, FiShield, FiUser, FiSettings, FiUsers, FiUserCheck, FiUserX } from 'react-icons/fi';
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
        <div className="h-8 w-24 bg-base-300 rounded"></div>
      </div>
    ))}
  </div>
);

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['all-users', roleFilter],
    queryFn: async () => {
      const params = roleFilter !== 'all' ? `?role=${roleFilter}` : '';
      const res = await axiosSecure.get(`/users${params}`);
      return res.data;
    }
  });

  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      return await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
      toast.success('Role updated successfully!');
    },
    onError: () => {
      toast.error('Failed to update role');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-users']);
      toast.success('User deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete user');
    }
  });

  const handleRoleChange = (userId, newRole, userName) => {
    Swal.fire({
      title: 'Change User Role?',
      text: `Make ${userName} a ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, change it!',
      background: 'var(--fallback-b1,oklch(var(--b1)))',
      color: 'var(--fallback-bc,oklch(var(--bc)))'
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id: userId, role: newRole });
      }
    });
  };

  const handleDelete = (id, email) => {
    if (email === currentUser?.email) {
      toast.error("You cannot delete yourself!");
      return;
    }
    
    Swal.fire({
      title: 'Delete User?',
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

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <FiShield className="text-error" />;
      case 'moderator':
        return <FiSettings className="text-warning" />;
      default:
        return <FiUser className="text-primary" />;
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-error/10 text-error border-error/20',
      moderator: 'bg-warning/10 text-warning border-warning/20',
      student: 'bg-primary/10 text-primary border-primary/20'
    };
    return badges[role] || badges.student;
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: users.length, icon: FiUsers, color: 'bg-base-200 text-base-content' },
    { label: 'Students', value: users.filter(u => u.role === 'student').length, icon: FiUser, color: 'bg-primary/10 text-primary' },
    { label: 'Moderators', value: users.filter(u => u.role === 'moderator').length, icon: FiSettings, color: 'bg-warning/10 text-warning' },
    { label: 'Admins', value: users.filter(u => u.role === 'admin').length, icon: FiShield, color: 'bg-error/10 text-error' }
  ];

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">Manage Users</h1>
          <p className="text-base-content/60 mt-1">View and manage platform users</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div key={idx} className={`${stat.color} rounded-xl p-4 border border-base-300`}>
              <div className="flex items-center gap-3">
                <stat.icon className="text-xl" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-70">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="moderator">Moderators</option>
            <option value="admin">Admins</option>
          </select>
          
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search users..."
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
        ) : filteredUsers.length === 0 ? (
          <div className="bg-base-100 rounded-2xl border border-base-300 p-12 text-center">
            <FiUserX className="text-5xl text-base-content/20 mx-auto mb-4" />
            <p className="text-base-content/60">No users found.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
              <table className="w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Change Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  {filteredUsers.map((userData) => (
                    <tr key={userData._id} className="hover:bg-base-200/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={userData.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                            alt={userData.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex items-center gap-2">
                            {getRoleIcon(userData.role)}
                            <span className="font-medium text-base-content">{userData.name}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-base-content/70">{userData.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getRoleBadge(userData.role)}`}>
                          {userData.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {userData.email !== currentUser?.email ? (
                          <select
                            value={userData.role}
                            onChange={(e) => handleRoleChange(userData._id, e.target.value, userData.name)}
                            className="px-3 py-2 text-sm rounded-lg border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                            disabled={roleMutation.isPending}
                          >
                            <option value="student">Student</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span className="text-sm text-base-content/40">Current User</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {userData.email !== currentUser?.email && (
                          <button
                            onClick={() => handleDelete(userData._id, userData.email)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredUsers.map((userData) => (
                <motion.div
                  key={userData._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-base-100 rounded-xl border border-base-300 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={userData.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                        alt={userData.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(userData.role)}
                          <span className="font-medium text-base-content">{userData.name}</span>
                        </div>
                        <p className="text-sm text-base-content/60 truncate max-w-[200px]">{userData.email}</p>
                      </div>
                    </div>
                    {userData.email !== currentUser?.email && (
                      <button
                        onClick={() => handleDelete(userData._id, userData.email)}
                        className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-base-200">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getRoleBadge(userData.role)}`}>
                      {userData.role}
                    </span>
                    {userData.email !== currentUser?.email ? (
                      <select
                        value={userData.role}
                        onChange={(e) => handleRoleChange(userData._id, e.target.value, userData.name)}
                        className="px-3 py-2 text-sm rounded-lg border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                        disabled={roleMutation.isPending}
                      >
                        <option value="student">Student</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className="text-sm text-base-content/40">You</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ManageUsers;
