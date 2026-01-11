import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import SectionTitle from '../shared/SectionTitle';

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: 'Top 10 Full-Fund Scholarships for International Students in 2026',
      excerpt: 'Discover the most prestigious fully-funded scholarship opportunities available for international students this year.',
      image: 'https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Scholarships',
      date: 'Jan 16, 2026',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'How to Write a Winning Scholarship Essay: Expert Tips',
      excerpt: 'Learn the secrets to crafting compelling scholarship essays that stand out from thousands of applicants.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
      category: 'Tips & Guides',
      date: 'Jan 13, 2026',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Scholarship Interview Preparation: What You Need to Know',
      excerpt: 'Prepare yourself for scholarship interviews with these proven strategies and common questions to expect.',
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&h=250&fit=crop',
      category: 'Career Advice',
      date: 'Dec 28, 2026',
      readTime: '6 min read'
    }
  ];

  return (
    <section className="section-padding bg-base-100">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="heading-primary text-base-content mb-2">Latest from Our Blog</h2>
            <p className="text-base-content/60 max-w-xl">
              Expert insights, tips, and guides to help you succeed in your scholarship journey
            </p>
          </div>
          <Link
            to="/blog"
            className="text-primary font-medium hover:underline inline-flex items-center gap-2 group"
          >
            View All Posts
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="card-custom overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-sm text-base-content/60 mb-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-base-content mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-base-content/60 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <span className="mt-4 text-primary font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
