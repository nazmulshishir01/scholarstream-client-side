import { motion } from 'framer-motion';
import { FiShield, FiClock, FiHeadphones, FiDollarSign, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import SectionTitle from '../shared/SectionTitle';

const WhyChooseUs = () => {
  const features = [
    {
      icon: FiShield,
      title: 'Verified Scholarships',
      description: 'All scholarships are verified and legitimate. We work directly with universities to ensure authenticity.'
    },
    {
      icon: FiClock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about new scholarships, deadlines, and application status changes.'
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Our dedicated support team is always ready to help you with any questions or concerns.'
    },
    {
      icon: FiDollarSign,
      title: 'Transparent Fees',
      description: 'No hidden charges. Pay only the application fee with complete transparency.'
    },
    {
      icon: FiTrendingUp,
      title: 'High Success Rate',
      description: '98% of our applicants receive positive responses from their scholarship applications.'
    },
    {
      icon: FiGlobe,
      title: 'Global Opportunities',
      description: 'Access scholarships from 500+ universities across 150+ countries worldwide.'
    }
  ];

  return (
    <section className="section-padding bg-base-200">
      <div className="container-custom">
        <SectionTitle
          title="Why Choose ScholarStream?"
          subtitle="We're committed to helping you find and secure the best scholarship opportunities"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-100 rounded-2xl p-6 border border-base-300 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-base-content mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-base-content/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
