import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiGlobe } from 'react-icons/fi';

const About = () => {
  const stats = [
    { value: '50,000+', label: 'Students Helped' },
    { value: '500+', label: 'Partner Universities' },
    { value: '150+', label: 'Countries Reached' },
    { value: '$50M+', label: 'Scholarships Awarded' }
  ];

  const values = [
    {
      icon: FiTarget,
      title: 'Our Mission',
      description: 'To democratize access to education by connecting talented students with scholarship opportunities worldwide, regardless of their background.'
    },
    {
      icon: FiEye,
      title: 'Our Vision',
      description: 'A world where every deserving student has access to quality education through comprehensive scholarship support and guidance.'
    },
    {
      icon: FiHeart,
      title: 'Our Values',
      description: 'Integrity, transparency, and student-first approach guide everything we do. We believe in equal opportunities for all.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      bio: 'Former scholarship recipient turned education advocate with 15+ years experience.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      bio: 'Built relationships with 500+ universities across 150 countries.'
    },
    {
      name: 'Emily Williams',
      role: 'Student Success Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Dedicated to ensuring every student achieves their scholarship goals.'
    },
    {
      name: 'David Kumar',
      role: 'Technology Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      bio: 'Building the platform that connects students to their dreams.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - ScholarStream</title>
        <meta name="description" content="Learn about ScholarStream's mission to connect students with scholarship opportunities worldwide." />
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
              About Us
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-base-content mb-6">
              Empowering Students to Achieve Their Educational Dreams
            </h1>
            <p className="text-lg text-base-content/70">
              ScholarStream is the leading platform connecting ambitious students with life-changing scholarship opportunities from top universities worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-8 rounded-2xl bg-base-200 border border-base-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-base-content mb-4">{item.title}</h3>
                <p className="text-base-content/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-base-content mb-6">Our Story</h2>
              <div className="space-y-4 text-base-content/70">
                <p>
                  ScholarStream was founded in 2020 by a group of former scholarship recipients who understood firsthand the challenges students face when searching for educational funding.
                </p>
                <p>
                  We noticed that talented students often missed out on scholarship opportunities simply because they didn't know where to look or how to navigate the complex application process.
                </p>
                <p>
                  Today, we've helped over 50,000 students from 150+ countries secure scholarships worth more than $50 million. Our platform partners with 500+ universities worldwide to bring the best opportunities directly to students.
                </p>
                <p>
                  But we're just getting started. Our goal is to ensure that no deserving student is denied education due to financial constraints.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">5+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-base-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-base-content mb-4">Meet Our Team</h2>
            <p className="text-base-content/60 max-w-2xl mx-auto">
              Dedicated professionals committed to helping students achieve their educational goals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4 inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-2xl object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-base-content">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-sm text-base-content/60">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
