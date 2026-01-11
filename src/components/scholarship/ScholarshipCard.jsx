import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiAward, FiArrowRight } from 'react-icons/fi';
import { format } from 'date-fns';

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    scholarshipCategory,
    degree,
    applicationFees,
    applicationDeadline
  } = scholarship;

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'full fund':
        return 'bg-success text-white';
      case 'partial':
        return 'bg-warning text-black';
      case 'self-fund':
        return 'bg-info text-white';
      default:
        return 'bg-base-300 text-base-content';
    }
  };

  const formatDeadline = (date) => {
    if (!date) return 'Open';
    try {
      return format(new Date(date), 'MMM dd, yyyy');
    } catch {
      return 'Open';
    }
  };

  return (
    <div className="card-custom group h-full flex flex-col">
      {/* Image Container - Fixed Height */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={universityImage || 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop'}
          alt={universityName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(scholarshipCategory)}`}>
            {scholarshipCategory || 'Scholarship'}
          </span>
        </div>
      </div>

      {/* Content Container - Flex Grow */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Title Section */}
        <div className="flex-grow">
          <h3 className="font-display text-lg font-semibold text-base-content mb-1.5 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {scholarshipName || 'Scholarship Program'}
          </h3>
          <p className="text-sm text-base-content/70 font-medium mb-3 truncate">
            {universityName || 'University'}
          </p>

          {/* Meta Info */}
          <div className="space-y-2 text-sm text-base-content/60">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-primary flex-shrink-0" size={14} />
              <span className="truncate">{universityCity}, {universityCountry}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiAward className="text-primary flex-shrink-0" size={14} />
              <span>{degree || 'All Degrees'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-primary flex-shrink-0" size={14} />
              <span>Deadline: {formatDeadline(applicationDeadline)}</span>
            </div>
          </div>
        </div>

        {/* Footer Section - Always at Bottom */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
          <div>
            <span className="text-lg font-bold text-primary">
              {applicationFees > 0 ? `$${applicationFees}` : 'Free'}
            </span>
            <span className="text-xs text-base-content/50 block">Application Fee</span>
          </div>
          <Link
            to={`/scholarship/${_id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            Details <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Component
export const ScholarshipCardSkeleton = () => {
  return (
    <div className="card-custom h-full flex flex-col overflow-hidden">
      <div className="h-44 skeleton-loading flex-shrink-0" />
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="h-6 skeleton-loading rounded w-3/4" />
        <div className="h-4 skeleton-loading rounded w-1/2" />
        <div className="space-y-2 mt-2">
          <div className="h-4 skeleton-loading rounded w-full" />
          <div className="h-4 skeleton-loading rounded w-2/3" />
          <div className="h-4 skeleton-loading rounded w-3/4" />
        </div>
        <div className="mt-auto pt-4 border-t border-base-300 flex justify-between">
          <div className="h-8 skeleton-loading rounded w-16" />
          <div className="h-8 skeleton-loading rounded w-20" />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
