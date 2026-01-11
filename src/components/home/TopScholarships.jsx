import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SectionTitle from '../shared/SectionTitle';
import ScholarshipCard, { ScholarshipCardSkeleton } from '../scholarship/ScholarshipCard';

const TopScholarships = () => {
  const axiosPublic = useAxiosPublic();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['topScholarships'],
    queryFn: async () => {
      const res = await axiosPublic.get('/scholarships/top');
      return res.data;
    }
  });

  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        <SectionTitle
          title="Top Scholarships"
          subtitle="Discover the most popular and affordable scholarship opportunities from top universities worldwide"
        />

        {/* 4 Cards per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(8)].map((_, i) => (
                <ScholarshipCardSkeleton key={i} />
              ))
            : scholarships.slice(0, 8).map((scholarship, index) => (
                <motion.div
                  key={scholarship._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ScholarshipCard scholarship={scholarship} />
                </motion.div>
              ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/scholarships"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            View All Scholarships
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopScholarships;
