import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import SectionTitle from '../shared/SectionTitle';

const SuccessStories = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chowdhury',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      university: 'Harvard University',
      scholarship: 'Full Fund',
      quote: 'ScholarStream changed my life! I found a full scholarship to Harvard that I never knew existed. The application process was seamless and the support team was incredibly helpful.',
      rating: 5
    },
    {
      id: 2,
      name: 'Nabeel Khan',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      university: 'MIT',
      scholarship: 'Full Fund',
      quote: 'The platform made it incredibly easy to compare different scholarships. I saved countless hours in my search and found my perfect match at MIT.',
      rating: 5
    },
    {
      id: 3,
      name: 'Ayesha Rahman',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      university: 'Oxford University',
      scholarship: 'Partial',
      quote: 'From a small town to Oxford! ScholarStream\'s resources and guidance were invaluable in my journey to study abroad. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        <SectionTitle
          title="Success Stories"
          subtitle="Hear from students who found their dream scholarships through ScholarStream"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card-custom p-6 lg:p-8 relative group"
            >
              {/* Quote Mark */}
              <div className="absolute top-4 right-4 text-6xl text-primary/10 font-display leading-none">
                "
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-base-content/70 mb-6 relative z-10 text-sm lg:text-base leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-base-300">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="font-semibold text-base-content">{testimonial.name}</h4>
                  <p className="text-sm text-base-content/60">
                    {testimonial.scholarship} • {testimonial.university}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
