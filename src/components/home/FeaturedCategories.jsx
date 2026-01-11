import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCode, FiHeart, FiTrendingUp, FiBriefcase, FiFeather, FiLayers, FiBook, FiGlobe } from 'react-icons/fi';
import SectionTitle from '../shared/SectionTitle';

const FeaturedCategories = () => {
  const categories = [
    { icon: FiCode, name: 'Computer Science', count: 450, color: 'from-blue-500 to-cyan-500' },
    { icon: FiHeart, name: 'Medical & Health', count: 320, color: 'from-red-500 to-pink-500' },
    { icon: FiTrendingUp, name: 'Engineering', count: 580, color: 'from-amber-500 to-orange-500' },
    { icon: FiBriefcase, name: 'Business & MBA', count: 410, color: 'from-purple-500 to-indigo-500' },
    { icon: FiFeather, name: 'Arts & Design', count: 180, color: 'from-pink-500 to-rose-500' },
    { icon: FiLayers, name: 'Science', count: 390, color: 'from-green-500 to-emerald-500' },
    { icon: FiBook, name: 'Law & Policy', count: 150, color: 'from-slate-500 to-gray-600' },
    { icon: FiGlobe, name: 'Agriculture', count: 120, color: 'from-lime-500 to-green-500' },
  ];

  return (
    <section className="section-padding bg-base-200">
      <div className="container-custom">
        <SectionTitle
          title="Browse by Category"
          subtitle="Explore scholarships across various fields of study"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/scholarships?category=${encodeURIComponent(category.name)}`}
                className="block group"
              >
                <div className="bg-base-100 rounded-xl p-6 border border-base-300 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-base-content mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-base-content/60">{category.count} scholarships</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
