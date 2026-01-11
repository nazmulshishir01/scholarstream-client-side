import { motion } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';

const Partners = () => {
  const universities = [
    { name: 'Harvard University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Harvard_University_coat_of_arms.svg/200px-Harvard_University_coat_of_arms.svg.png' },
    { name: 'MIT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/200px-MIT_logo.svg.png' },
    { name: 'Stanford University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/200px-Seal_of_Leland_Stanford_Junior_University.svg.png' },
    { name: 'Oxford University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/200px-Oxford-University-Circlet.svg.png' },
    { name: 'Cambridge University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Coat_of_Arms_of_the_University_of_Cambridge.svg/200px-Coat_of_Arms_of_the_University_of_Cambridge.svg.png' },
    { name: 'Yale University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/200px-Yale_University_Shield_1.svg.png' },
  ];

  return (
    <section className="section-padding bg-base-100 overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title="Trusted by Top Universities"
          subtitle="Partner with world-renowned institutions for your educational journey"
        />

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-base-100 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-base-100 to-transparent z-10" />

          {/* Scrolling Logos */}
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16"
          >
            {[...universities, ...universities, ...universities].map((uni, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={uni.logo}
                  alt={uni.name}
                  className="h-16 w-auto object-contain"
                />
                <span className="text-xs text-base-content/60 whitespace-nowrap">{uni.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-sm text-base-content/60">Partner Universities</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">150+</p>
            <p className="text-sm text-base-content/60">Countries</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">$50M+</p>
            <p className="text-sm text-base-content/60">Scholarships Awarded</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">98%</p>
            <p className="text-sm text-base-content/60">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
