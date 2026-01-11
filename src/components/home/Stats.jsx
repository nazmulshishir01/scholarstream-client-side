import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiGlobe, FiDollarSign } from 'react-icons/fi';

const Stats = () => {
  const stats = [
    { icon: FiUsers, value: '50K+', label: 'Active Students' },
    { icon: FiAward, value: '5,000+', label: 'Scholarships Awarded' },
    { icon: FiGlobe, value: '150+', label: 'Countries Reached' },
    { icon: FiDollarSign, value: '$50M+', label: 'Total Funding Secured' },
  ];

  return (
    <section className="py-16 lg:py-20 bg-base-200 border-y border-base-300">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-primary/10 text-primary mb-4">
                  <Icon size={28} />
                </div>

                <motion.p
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content tracking-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.p>

                <p className="mt-2 text-base-content/60 font-medium text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
