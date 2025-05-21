import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { label: t('header.home'), href: '#hero' },
    { label: t('header.experience'), href: '#experience' },
    { label: t('header.skills'), href: '#skills' },
    { label: t('header.projects'), href: '#projects' },
    { label: t('header.about'), href: '#about' },
    { label: t('header.contact'), href: '#contact' },
  ];

  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Framer motion variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.5 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-900/80 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="page-container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold gradient-text">
          Portfolio
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-200 hover:text-primary-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher mobile />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-4 text-zinc-200 hover:text-primary-400"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 bg-zinc-900 z-50 pt-24 md:hidden`}
        variants={mobileMenuVariants}
        initial="closed"
        animate={mobileMenuOpen ? 'open' : 'closed'}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xl font-medium text-zinc-200 hover:text-primary-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;