import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiAward, FiGlobe, FiUsers } from 'react-icons/fi';

const Banner = () => {
  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-gradient-to-br from-base-100 via-primary/5 to-base-200 pt-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-20 h-20 bg-primary/10 rounded-2xl rotate-12 hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-accent/20 rounded-full hidden lg:block"
        />
      </div>

      <div className="container-custom relative z-10 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              🎓 Your Future Starts Here
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-base-content leading-tight mb-4"
            >
              Find Your Dream{' '}
              <span className="gradient-text">Scholarship</span>{' '}
              Today
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base lg:text-lg text-base-content/70 mb-6 max-w-xl"
            >
              Connect with top universities worldwide and discover thousands of scholarship 
              opportunities. Your path to educational excellence begins here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/scholarships"
                className="btn-primary group"
              >
                <FiSearch />
                Search Scholarships
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="btn-outline"
              >
                Create Free Account
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-primary">2,500+</p>
                <p className="text-xs lg:text-sm text-base-content/60">Scholarships</p>
              </div>
              <div className="text-center border-x border-base-300">
                <p className="text-2xl lg:text-3xl font-bold text-primary">500+</p>
                <p className="text-xs lg:text-sm text-base-content/60">Universities</p>
              </div>
              <div className="text-center">
                <p className="text-2xl lg:text-3xl font-bold text-primary">50K+</p>
                <p className="text-xs lg:text-sm text-base-content/60">Students</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src="https://www.scholarchipsfund.org/wp-content/uploads/2024/09/Scholarships-on-Student.jpg"
                alt="Students celebrating graduation"
                className="rounded-2xl shadow-2xl w-full object-cover max-h-[400px]"
              />
              
              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-8 top-1/4 bg-base-100 p-4 rounded-xl shadow-xl border border-base-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <FiAward className="text-success text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Full Fund</p>
                    <p className="font-bold text-base-content">2,500+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-4 bottom-1/4 bg-base-100 p-4 rounded-xl shadow-xl border border-base-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiGlobe className="text-primary text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Countries</p>
                    <p className="font-bold text-base-content">150+</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-base-content/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-2.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
