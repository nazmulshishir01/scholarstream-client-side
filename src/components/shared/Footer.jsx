import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/scholarships', label: 'All Scholarships' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' },
  ];

  const scholarshipTypes = [
    'Full Fund Scholarships',
    'Partial Scholarships',
    'Self-fund Programs',
    'Research Grants',
    'STEM Scholarships',
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img
                src="/logo.png"
                alt="ScholarStream logo"
                className="w-10 h-10 rounded-lg object-cover"
                width={40}
                height={40}
              />
              <span className="text-xl font-display font-bold">
                <span className="text-primary">Scholar</span>
                <span className="text-white">Stream</span>
              </span>
            </Link>

            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Connecting students with life-changing scholarship opportunities worldwide. 
              Your journey to educational excellence starts here.
            </p>
            
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1 group text-sm"
                  >
                    <FiArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scholarship Types */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Scholarship Types</h3>
            <ul className="space-y-3">
              {scholarshipTypes.map((type, index) => (
                <li key={index}>
                  <Link 
                    to="/scholarships" 
                    className="text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1 group text-sm"
                  >
                    <FiArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                <span className="text-slate-400 text-sm">
                  123 Education Street,<br />Boston, MA 02101, USA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary flex-shrink-0" size={18} />
                <a href="tel:+15551234567" className="text-slate-400 hover:text-primary transition-colors text-sm">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary flex-shrink-0" size={18} />
                <a href="mailto:support@scholarstream.com" className="text-slate-400 hover:text-primary transition-colors text-sm">
                  support@scholarstream.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm text-center md:text-left">
            © {currentYear} ScholarStream. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/about" className="text-slate-400 text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="text-slate-400 text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-slate-400 text-sm hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
