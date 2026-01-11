import { Helmet } from 'react-helmet-async';
import Banner from '../components/home/Banner';
import Stats from '../components/home/Stats';
import HowItWorks from '../components/home/HowItWorks';
import TopScholarships from '../components/home/TopScholarships';
import FeaturedCategories from '../components/home/FeaturedCategories';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SuccessStories from '../components/home/SuccessStories';
import Partners from '../components/home/Partners';
import BlogPreview from '../components/home/BlogPreview';
import FAQ from '../components/home/FAQ';
import Newsletter from '../components/home/Newsletter';
import CallToAction from '../components/home/CallToAction';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ScholarStream - Find Your Dream Scholarship</title>
        <meta name="description" content="Connect with top universities worldwide and discover thousands of scholarship opportunities. Your path to educational excellence begins here." />
      </Helmet>
      
      {/* 1. Hero Banner - 60-70% height */}
      <Banner />
      
      {/* 2. Statistics Section */}
      <Stats />
      
      {/* 3. How It Works - Process Steps */}
      <HowItWorks />
      
      {/* 4. Top Scholarships - Featured Cards */}
      <TopScholarships />
      
      {/* 5. Browse by Category */}
      <FeaturedCategories />
      
      {/* 6. Why Choose Us - Features */}
      <WhyChooseUs />
      
      {/* 7. Success Stories - Testimonials */}
      <SuccessStories />
      
      {/* 8. University Partners */}
      <Partners />
      
      {/* 9. Latest Blog Posts */}
      <BlogPreview />
      
      {/* 10. FAQ Section */}
      <FAQ />
      
      {/* 11. Newsletter Subscription */}
      <Newsletter />
      
      {/* 12. Call to Action */}
      <CallToAction />
    </>
  );
};

export default Home;
