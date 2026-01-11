import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FiMapPin, FiCalendar, FiDollarSign, FiAward, FiGlobe, 
  FiBookOpen, FiStar, FiArrowLeft, FiHeart, FiClock
} from 'react-icons/fi';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ScholarshipCard from '../components/scholarship/ScholarshipCard';
import toast from 'react-hot-toast';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch scholarship details
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships/${id}`);
      return res.data;
    }
  });

  // Fetch reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/scholarship/${id}`);
      return res.data;
    }
  });

  // Fetch related scholarships
  const { data: relatedScholarships = [] } = useQuery({
    queryKey: ['relatedScholarships', scholarship?.scholarshipCategory, id],
    enabled: !!scholarship?.scholarshipCategory,
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships/related/${scholarship.scholarshipCategory}/${id}`);
      return res.data;
    }
  });

  const handleApply = () => {
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login', { state: { from: `/scholarship/${id}` } });
      return;
    }
    navigate(`/checkout/${id}`);
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }
    try {
      await axiosSecure.post(`/wishlist/${user.email}`, { scholarshipId: id });
      toast.success('Added to wishlist!');
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const getCategoryBadge = (category) => {
    const badges = {
      'Full fund': 'bg-success/10 text-success border-success/20',
      'Partial': 'bg-warning/10 text-warning border-warning/20',
      'Self-fund': 'bg-info/10 text-info border-info/20'
    };
    return badges[category] || 'bg-base-200 text-base-content border-base-300';
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.ratingPoint, 0) / reviews.length).toFixed(1)
    : 0;

  if (isLoading) return <LoadingSpinner fullScreen />;

  if (!scholarship) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-base-200">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-base-content mb-4">Scholarship not found</h2>
          <Link to="/scholarships" className="btn-primary">
            Browse Scholarships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{scholarship.scholarshipName} - ScholarStream</title>
      </Helmet>

      <div className="pt-24 pb-16 bg-base-200 min-h-screen">
        <div className="container-custom">
          {/* Back Button */}
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-2 text-base-content/60 hover:text-primary mb-6 transition-colors"
          >
            <FiArrowLeft />
            Back to Scholarships
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
                {/* Image */}
                <div className="relative h-64 md:h-80">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getCategoryBadge(scholarship.scholarshipCategory)}`}>
                      {scholarship.scholarshipCategory}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-white mt-3">
                      {scholarship.scholarshipName}
                    </h1>
                    <p className="text-white/80 mt-1">{scholarship.universityName}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {[
                      { icon: FiMapPin, label: 'Location', value: `${scholarship.universityCity}, ${scholarship.universityCountry}`, color: 'primary' },
                      { icon: FiGlobe, label: 'World Rank', value: `#${scholarship.universityWorldRank}`, color: 'warning' },
                      { icon: FiAward, label: 'Degree', value: scholarship.degree, color: 'success' },
                      { icon: FiBookOpen, label: 'Subject', value: scholarship.subjectCategory, color: 'info' },
                      { icon: FiCalendar, label: 'Deadline', value: scholarship.applicationDeadline ? format(new Date(scholarship.applicationDeadline), 'MMMM dd, yyyy') : 'Open', color: 'error' },
                      { icon: FiStar, label: 'Rating', value: `${averageRating} / 5 (${reviews.length} reviews)`, color: 'warning' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-${item.color}/10 rounded-xl flex items-center justify-center`}>
                          <item.icon className={`text-${item.color}`} size={24} />
                        </div>
                        <div>
                          <p className="text-sm text-base-content/60">{item.label}</p>
                          <p className="font-semibold text-base-content">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-base-content mb-4">About This Scholarship</h2>
                    <p className="text-base-content/70 leading-relaxed">
                      {scholarship.scholarshipDescription || 
                        `This ${scholarship.scholarshipCategory} scholarship at ${scholarship.universityName} offers 
                        an excellent opportunity for students pursuing ${scholarship.degree} in ${scholarship.subjectCategory}. 
                        Located in the beautiful city of ${scholarship.universityCity}, ${scholarship.universityCountry}, 
                        this university is ranked #${scholarship.universityWorldRank} globally.`}
                    </p>
                  </div>

                  {/* Coverage */}
                  <div className="bg-base-200 rounded-xl p-6">
                    <h3 className="font-semibold text-lg text-base-content mb-4">Coverage & Stipend</h3>
                    <ul className="space-y-2 text-base-content/70">
                      <li className="flex items-center gap-2">
                        <FiDollarSign className="text-success" />
                        Tuition Fee Coverage: {scholarship.tuitionFees ? `$${scholarship.tuitionFees}` : 'Full Coverage'}
                      </li>
                      <li className="flex items-center gap-2">
                        <FiDollarSign className="text-primary" />
                        Application Fee: ${scholarship.applicationFees}
                      </li>
                      <li className="flex items-center gap-2">
                        <FiDollarSign className="text-warning" />
                        Service Charge: ${scholarship.serviceCharge}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 md:p-8 mt-8">
                <h2 className="text-xl font-bold text-base-content mb-6">Student Reviews</h2>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b border-base-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.userImage || 'https://i.ibb.co/5GzXkwq/user.png'}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-base-content">{review.userName}</h4>
                              <span className="text-sm text-base-content/50">
                                {format(new Date(review.reviewDate), 'MMM dd, yyyy')}
                              </span>
                            </div>
                            <div className="flex gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${i < review.ratingPoint ? 'fill-amber-400 text-amber-400' : 'text-base-300'}`}
                                />
                              ))}
                            </div>
                            <p className="text-base-content/70">{review.reviewComment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-base-content/50 text-center py-8">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-base-100 rounded-2xl border border-base-300 p-6 sticky top-24">
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Application Fee</span>
                    <span className="font-medium text-base-content">${scholarship.applicationFees || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Service Charge</span>
                    <span className="font-medium text-base-content">${scholarship.serviceCharge || 0}</span>
                  </div>
                  <div className="border-t border-base-200 pt-3 flex justify-between">
                    <span className="font-semibold text-base-content">Total</span>
                    <span className="font-bold text-xl text-primary">
                      ${(scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all mb-3"
                >
                  Apply for Scholarship
                </button>

                <button
                  onClick={handleAddToWishlist}
                  className="w-full py-3 border border-base-300 text-base-content font-medium rounded-xl hover:bg-base-200 transition-all flex items-center justify-center gap-2"
                >
                  <FiHeart />
                  Add to Wishlist
                </button>

                <p className="text-xs text-base-content/50 text-center mt-4 flex items-center justify-center gap-1">
                  <FiClock size={12} />
                  Posted: {scholarship.scholarshipPostDate 
                    ? format(new Date(scholarship.scholarshipPostDate), 'MMMM dd, yyyy')
                    : 'N/A'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Related Scholarships */}
          {relatedScholarships.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-base-content mb-8">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedScholarships.slice(0, 4).map((s) => (
                  <ScholarshipCard key={s._id} scholarship={s} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScholarshipDetails;
