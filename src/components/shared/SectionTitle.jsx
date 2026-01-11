import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, center = true, light = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-10 ${center ? 'text-center' : ''}`}
    >
      <h2 className={`heading-primary mb-3 ${light ? 'text-white' : 'text-base-content'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-base lg:text-lg ${center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-base-content/60'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
