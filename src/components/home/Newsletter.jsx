import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setLoading(false);
    toast.success('Successfully subscribed!');
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <FiMail className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              Stay Updated with Latest Scholarships
            </h2>
            <p className="text-white/80 mb-8">
              Get notified about new scholarship opportunities, application deadlines, and exclusive tips delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
              <button
                type="submit"
                disabled={loading || subscribed}
                className="px-6 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : subscribed ? (
                  <>
                    <FiCheck />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <FiSend />
                  </>
                )}
              </button>
            </form>

            <p className="text-white/60 text-sm mt-4">
              Join 50,000+ students. No spam, unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
