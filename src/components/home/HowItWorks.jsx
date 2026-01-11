import { motion } from 'framer-motion';
import { FiSearch, FiFileText, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import SectionTitle from '../shared/SectionTitle';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiSearch,
      title: 'Browse Scholarships',
      description: 'Search through thousands of scholarships from top universities worldwide using our advanced filters.',
      color: 'bg-blue-500'
    },
    {
      icon: FiFileText,
      title: 'Submit Application',
      description: 'Complete your profile and submit applications with just a few clicks. Track all applications in one place.',
      color: 'bg-purple-500'
    },
    {
      icon: FiCreditCard,
      title: 'Pay Application Fee',
      description: 'Secure payment processing through Stripe. Pay only the application fee with no hidden charges.',
      color: 'bg-amber-500'
    },
    {
      icon: FiCheckCircle,
      title: 'Get Accepted',
      description: 'Receive updates on your application status. Get accepted and start your educational journey!',
      color: 'bg-green-500'
    }
  ];

  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        <SectionTitle
          title="How It Works"
          subtitle="Your journey to getting a scholarship is just 4 simple steps away"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-base-300">
                  <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-base-300 rotate-45" />
                </div>
              )}

              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-block mb-4">
                  <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-base-100 border-2 border-base-300 rounded-full flex items-center justify-center text-sm font-bold text-base-content">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-base-content mb-2">{step.title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
