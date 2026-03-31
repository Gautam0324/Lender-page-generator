import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { getStorageItem, INITIAL_DATA } from '../store/localStorage';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const settings = getStorageItem('settings', INITIAL_DATA.settings);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Personal Loan', path: '/loan/personal' },
    { name: 'Business Loan', path: '/loan/business' },
    { name: 'Mortgage', path: '/loan/mortgage' },
    { name: 'Auto Loan', path: '/loan/auto' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {settings.customHeaderText && (
        <div className="bg-[var(--color-primary)] text-white text-center text-sm font-medium px-4 py-2">
          {settings.customHeaderText}
        </div>
      )}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-3xl font-bold text-[var(--color-primary)] font-heading">
                  {settings.siteName}
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-[var(--color-secondary)]'
                      : 'text-gray-700 hover:text-[var(--color-secondary)]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/apply"
                className="bg-[var(--color-secondary)] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-yellow-600 transition-colors shadow-sm"
              >
                Apply Now
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[var(--color-primary)] focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-[var(--color-secondary)] bg-gray-50'
                      : 'text-gray-700 hover:text-[var(--color-secondary)] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/apply"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 bg-[var(--color-secondary)] text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export const Footer = () => {
  const settings = getStorageItem('settings', INITIAL_DATA.settings);

  return (
    <footer className="bg-[var(--color-primary)] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-3xl font-bold text-white font-heading mb-6 block">
              {settings.siteName}
            </span>
            <p className="text-gray-400 mb-6">
              Empowering your financial future with flexible, reliable, and transparent lending solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Contact</Link></li>
              <li><Link to="/apply" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Apply Now</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/admin/login" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 font-heading">Loan Services</h4>
            <ul className="space-y-3">
              <li><Link to="/loan/personal" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Personal Loans</Link></li>
              <li><Link to="/loan/business" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Business Loans</Link></li>
              <li><Link to="/loan/mortgage" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Mortgages</Link></li>
              <li><Link to="/loan/auto" className="text-gray-400 hover:text-[var(--color-secondary)] transition-colors">Auto Loans</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 font-heading">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="mr-3 text-[var(--color-secondary)] flex-shrink-0 mt-1" />
                <span className="text-gray-400">{settings.contactPhone}</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-3 text-[var(--color-secondary)] flex-shrink-0 mt-1" />
                <span className="text-gray-400">{settings.contactEmail}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
        {settings.customFooterText && (
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-400 text-sm">
            {settings.customFooterText}
          </div>
        )}
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
};
