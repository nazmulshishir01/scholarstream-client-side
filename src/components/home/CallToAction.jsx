import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const CallToAction = () => {
  return (
    <section className="section-padding bg-base-200">
      <div className="container-custom">
        <div className="bg-gradient-to-br from-secondary via-secondary to-slate-800 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white mb-4">
                Ready to Start Your Scholarship Journey?
              </h2>
              <p className="text-white/70 mb-6 text-lg">
                Join thousands of students who have found their dream scholarships through ScholarStream. 
                Create your free account today and unlock access to exclusive opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors group"
                >
                  Get Started Free
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FiPlay className="w-4 h-4 fill-white" />
                  </div>
                  Watch Demo
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 20}`}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-secondary"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-white/60 text-sm">Trusted by 50K+ students</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=400&fit=crop"
                  alt="Students studying"
                  className="rounded-2xl shadow-2xl"
                />
                
                {/* Floating Stats Card */}
                <div className="absolute -left-8 bottom-8 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">98%</p>
                      <p className="text-sm text-slate-500">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
