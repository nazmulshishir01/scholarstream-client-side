import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      details: 'support@scholarstream.com',
      subtext: 'We reply within 24 hours'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subtext: 'Mon-Fri, 9am-6pm EST'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: '123 Education Street',
      subtext: 'Boston, MA 02101, USA'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 - 18:00',
      subtext: 'Weekend: Closed'
    }
  ];

  const faqs = [
    {
      q: 'How long does it take to process my application?',
      a: 'Applications are typically reviewed within 3-5 business days.'
    },
    {
      q: 'Can I apply for multiple scholarships?',
      a: 'Yes! You can apply for as many scholarships as you qualify for.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit/debit cards through our secure Stripe integration.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - ScholarStream</title>
        <meta name="description" content="Get in touch with ScholarStream. We're here to help with any questions about scholarships and applications." />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-base-100 via-primary/5 to-base-200">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-base-content mb-6">
              We'd Love to Hear From You
            </h1>
            <p className="text-lg text-base-content/70">
              Have questions about scholarships? Need help with your application? Our team is here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300 text-center hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-base-content mb-1">{item.title}</h3>
                <p className="text-base-content font-medium">{item.details}</p>
                <p className="text-sm text-base-content/60">{item.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-bold text-base-content mb-2">Send us a Message</h2>
              <p className="text-base-content/60 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      First Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: 'First name is required' })}
                      className="input-custom"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-base-content mb-2">
                      Last Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: 'Last name is required' })}
                      className="input-custom"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    className="input-custom"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Subject <span className="text-error">*</span>
                  </label>
                  <select
                    {...register('subject', { required: 'Please select a subject' })}
                    className="input-custom"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="application">Application Help</option>
                    <option value="payment">Payment Issue</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-error text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-2">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'Message must be at least 20 characters' }
                    })}
                    rows={5}
                    className="input-custom resize-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-error text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="rounded-2xl overflow-hidden h-64 bg-base-200 border border-base-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.665567847917!2d-71.05856968447568!3d42.35954457918644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3708293df5dcd%3A0x2fbef9c9ce2aa3a0!2sBoston%2C%20MA%2C%20USA!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Location Map"
                ></iframe>
              </div>

              {/* Quick FAQ */}
              <div>
                <h3 className="text-xl font-semibold text-base-content mb-4 flex items-center gap-2">
                  <FiMessageCircle className="text-primary" />
                  Quick Answers
                </h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-base-200 rounded-xl p-4">
                      <h4 className="font-medium text-base-content mb-2">{faq.q}</h4>
                      <p className="text-sm text-base-content/60">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
