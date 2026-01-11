import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiUsers, FiAward, FiFileText, FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

// Skeleton loader component
const StatCardSkeleton = () => (
  <div className="bg-base-100 rounded-2xl border border-base-300 p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-3">
        <div className="h-4 w-20 bg-base-300 rounded"></div>
        <div className="h-8 w-24 bg-base-300 rounded"></div>
      </div>
      <div className="w-14 h-14 bg-base-300 rounded-xl"></div>
    </div>
  </div>
);

const ChartSkeleton = () => (
  <div className="bg-base-100 rounded-2xl border border-base-300 p-6 animate-pulse">
    <div className="h-5 w-40 bg-base-300 rounded mb-6"></div>
    <div className="h-64 bg-base-300 rounded"></div>
  </div>
);

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await axiosSecure.get('/analytics');
      return res.data;
    }
  });

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  const stats = [
    {
      title: 'Total Users',
      value: analytics?.totalUsers || 0,
      icon: FiUsers,
      color: 'primary',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      change: '+12%'
    },
    {
      title: 'Total Scholarships',
      value: analytics?.totalScholarships || 0,
      icon: FiAward,
      color: 'success',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      change: '+8%'
    },
    {
      title: 'Total Applications',
      value: analytics?.totalApplications || 0,
      icon: FiFileText,
      color: 'info',
      bgColor: 'bg-info/10',
      textColor: 'text-info',
      change: '+23%'
    },
    {
      title: 'Fees Collected',
      value: `$${analytics?.totalFeesCollected || 0}`,
      icon: FiDollarSign,
      color: 'warning',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      change: '+15%'
    }
  ];

  const applicationsByUniversity = analytics?.applicationsByUniversity || [];
  const applicationsByCategory = analytics?.applicationsByCategory || [];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 border border-base-300 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-base-content">{label}</p>
          <p className="text-sm text-primary font-bold">{payload[0].value} applications</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <div className="h-8 w-48 bg-base-300 rounded animate-pulse"></div>
          <div className="h-4 w-64 bg-base-300 rounded animate-pulse mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
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
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">Analytics Dashboard</h1>
          <p className="text-base-content/60 mt-1">Platform statistics and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-100 rounded-2xl border border-base-300 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/60">{stat.title}</p>
                  <p className="text-2xl md:text-3xl font-bold text-base-content mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <FiTrendingUp className="text-success text-sm" />
                    <span className="text-xs text-success font-medium">{stat.change}</span>
                    <span className="text-xs text-base-content/40">vs last month</span>
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`${stat.textColor} text-2xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart - Applications by University */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-base-100 rounded-2xl border border-base-300 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FiTrendingUp className="text-primary" />
              <h2 className="text-lg font-semibold text-base-content">Applications by University</h2>
            </div>
            {applicationsByUniversity.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={applicationsByUniversity}
                    margin={{ top: 10, right: 10, left: -10, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-base-300" />
                    <XAxis 
                      dataKey="_id" 
                      tick={{ fontSize: 11, fill: 'currentColor' }}
                      className="text-base-content/60"
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: 'currentColor' }}
                      className="text-base-content/60"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="count" 
                      name="Applications" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-base-content/40">
                No data available
              </div>
            )}
          </motion.div>

          {/* Pie Chart - Applications by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-base-100 rounded-2xl border border-base-300 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FiPieChart className="text-success" />
              <h2 className="text-lg font-semibold text-base-content">Applications by Category</h2>
            </div>
            {applicationsByCategory.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={applicationsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="_id"
                    >
                      {applicationsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-base-content/40">
                No data available
              </div>
            )}
          </motion.div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Application Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-base-100 rounded-2xl border border-base-300 p-6"
          >
            <h3 className="text-lg font-semibold text-base-content mb-4">Application Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Pending', key: 'pending', color: 'warning' },
                { label: 'Processing', key: 'processing', color: 'info' },
                { label: 'Completed', key: 'completed', color: 'success' },
                { label: 'Rejected', key: 'rejected', color: 'error' }
              ].map(status => (
                <div key={status.key} className="flex justify-between items-center p-3 bg-base-200 rounded-xl">
                  <span className="text-base-content/70">{status.label}</span>
                  <span className={`px-3 py-1 bg-${status.color}/10 text-${status.color} rounded-full text-sm font-medium`}>
                    {analytics?.statusCounts?.[status.key] || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* User Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-base-100 rounded-2xl border border-base-300 p-6"
          >
            <h3 className="text-lg font-semibold text-base-content mb-4">User Distribution</h3>
            <div className="space-y-3">
              {[
                { label: 'Students', key: 'student', color: 'primary' },
                { label: 'Moderators', key: 'moderator', color: 'warning' },
                { label: 'Admins', key: 'admin', color: 'error' }
              ].map(role => (
                <div key={role.key} className="flex justify-between items-center p-3 bg-base-200 rounded-xl">
                  <span className="text-base-content/70">{role.label}</span>
                  <span className={`px-3 py-1 bg-${role.color}/10 text-${role.color} rounded-full text-sm font-medium`}>
                    {analytics?.userRoles?.[role.key] || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-base-100 rounded-2xl border border-base-300 p-6"
          >
            <h3 className="text-lg font-semibold text-base-content mb-4">Payment Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Paid Applications', key: 'paid', color: 'success' },
                { label: 'Unpaid Applications', key: 'unpaid', color: 'error' }
              ].map(payment => (
                <div key={payment.key} className="flex justify-between items-center p-3 bg-base-200 rounded-xl">
                  <span className="text-base-content/70">{payment.label}</span>
                  <span className={`px-3 py-1 bg-${payment.color}/10 text-${payment.color} rounded-full text-sm font-medium`}>
                    {analytics?.paymentStatus?.[payment.key] || 0}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
