import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiClock, FiArrowRight, FiTag } from 'react-icons/fi';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Scholarships', 'Tips & Guides', 'Career Advice', 'Success Stories', 'News'];

  const posts = [
    {
      id: 1,
      title: 'Top 10 Full-Fund Scholarships for International Students in 2026',
      excerpt: 'Discover the most prestigious fully-funded scholarship opportunities available for international students this year. Learn about eligibility requirements and application deadlines.',
      image: 'https://plus.unsplash.com/premium_photo-1683887034491-f58b4c4fca72?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Scholarships',
      date: 'Jan 15, 2026',
      readTime: '5 min read',
      featured: true
    },
    {
      id: 2,
      title: 'How to Write a Winning Scholarship Essay: Expert Tips',
      excerpt: 'Learn the secrets to crafting compelling scholarship essays that stand out from thousands of applicants. Includes templates and examples.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop',
      category: 'Tips & Guides',
      date: 'Jan 13, 2026',
      readTime: '7 min read',
      featured: true
    },
    {
      id: 3,
      title: 'Scholarship Interview Preparation: What You Need to Know',
      excerpt: 'Prepare yourself for scholarship interviews with these proven strategies and common questions to expect from admission committees.',
      image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&h=400&fit=crop',
      category: 'Career Advice',
      date: 'Dec 28, 2026',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'From Rejection to Fulbright: Sarah\'s Inspiring Journey',
      excerpt: 'After being rejected twice, Sarah finally secured the prestigious Fulbright scholarship. Here\'s her inspiring story and the lessons she learned.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&h=400&fit=crop',
      category: 'Success Stories',
      date: 'Dec 22, 2026',
      readTime: '8 min read'
    },
    {
      id: 5,
      title: 'STEM Scholarships 2025: Complete Guide for Science Students',
      excerpt: 'A comprehensive guide to the best STEM scholarships available worldwide. From engineering to biotechnology, find your perfect match.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
      category: 'Scholarships',
      date: 'Dec 18, 2026',
      readTime: '10 min read'
    },
    {
      id: 6,
      title: 'New Scholarship Programs Announced for 2025',
      excerpt: 'Major universities announce new scholarship programs for the upcoming academic year. Here\'s what you need to know about these opportunities.',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop',
      category: 'News',
      date: 'Dec 15, 2026',
      readTime: '4 min read'
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <>
      <Helmet>
        <title>Blog - ScholarStream</title>
        <meta name="description" content="Expert insights, tips, and guides to help you succeed in your scholarship journey." />
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
              Our Blog
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-base-content mb-6">
              Scholarship Insights & Tips
            </h1>
            <p className="text-lg text-base-content/70">
              Expert advice, success stories, and the latest news to help you secure your dream scholarship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-base-100 border-b border-base-300 sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="input-custom pl-12"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="section-padding bg-base-100">
          <div className="container-custom">
            <h2 className="text-2xl font-display font-bold text-base-content mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                        Featured
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-full mb-2">
                          {post.category}
                        </span>
                        <h3 className="text-xl font-semibold text-white line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-base-200">
        <div className="container-custom">
          <h2 className="text-2xl font-display font-bold text-base-content mb-8">
            {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
            <span className="text-base font-normal text-base-content/60 ml-2">
              ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
            </span>
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-base-content/60">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
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
                        <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium rounded-full flex items-center gap-1">
                          <FiTag size={12} />
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
                        
                        <p className="text-sm text-base-content/60 line-clamp-3 flex-grow">
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
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
