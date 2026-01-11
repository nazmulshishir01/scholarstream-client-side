import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiShield, FiCamera, FiEdit2, FiSave, FiX, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updateUserProfile(formData.displayName, formData.photoURL);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20' },
      moderator: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' },
      student: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' }
    };
    return badges[role] || badges.student;
  };

  const badge = getRoleBadge(role);

  return (
    <div className="p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">My Profile</h1>
          <p className="text-base-content/60 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-primary via-primary/80 to-accent relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-4 md:px-8 pb-8">
            {/* Avatar */}
            <div className="absolute -top-16 left-4 md:left-8">
              <div className="relative">
                <img
                  src={user?.photoURL || 'https://i.ibb.co/5GzXkwq/user.png'}
                  alt={user?.displayName}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-4 border-base-100 object-cover shadow-lg"
                />
                {isEditing && (
                  <label className="absolute bottom-2 right-2 w-8 h-8 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center justify-center cursor-pointer transition-colors shadow-md">
                    <FiCamera size={16} />
                  </label>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium text-sm"
                >
                  <FiEdit2 size={16} />
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-base-300 hover:bg-base-200 text-base-content rounded-xl transition-colors font-medium text-sm"
                >
                  <FiX size={16} />
                  Cancel
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="mt-16 md:mt-12">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Photo URL
                    </label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-success hover:bg-success/90 text-white rounded-xl transition-colors font-medium disabled:opacity-50"
                  >
                    <FiSave size={16} />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FiUser className="text-primary text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Name</p>
                      <p className="text-lg font-semibold text-base-content">
                        {user?.displayName || 'Not set'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                      <FiMail className="text-info text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Email</p>
                      <p className="text-lg font-semibold text-base-content break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${badge.bg} flex items-center justify-center`}>
                      <FiShield className={`${badge.text} text-xl`} />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60">Role</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${badge.bg} ${badge.text} border ${badge.border}`}>
                        {role || 'Student'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FiCalendar className="text-primary" />
                </div>
                <p className="text-lg font-bold text-base-content">
                  {user?.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'N/A'}
                </p>
                <p className="text-sm text-base-content/60 mt-1">Member Since</p>
              </div>
              
              <div className="bg-success/5 border border-success/10 rounded-xl p-5 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FiCheckCircle className={user?.emailVerified ? 'text-success' : 'text-warning'} />
                </div>
                <p className="text-lg font-bold text-base-content">
                  {user?.emailVerified ? 'Verified' : 'Pending'}
                </p>
                <p className="text-sm text-base-content/60 mt-1">Email Status</p>
              </div>
              
              <div className={`${badge.bg} border ${badge.border} rounded-xl p-5 text-center`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FiShield className={badge.text} />
                </div>
                <p className={`text-lg font-bold capitalize ${badge.text}`}>
                  {role || 'Student'}
                </p>
                <p className="text-sm text-base-content/60 mt-1">Account Type</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
