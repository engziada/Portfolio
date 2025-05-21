import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  mobile?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile = false }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.button
      className={`flex items-center justify-center ${
        mobile ? 'text-zinc-200' : 'text-zinc-200 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-full px-4 py-2'
      }`}
      onClick={toggleLanguage}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      aria-label="Switch language"
    >
      <Globe size={mobile ? 24 : 20} className="mr-2" />
      {!mobile && (
        <span className="text-sm font-medium">
          {i18n.language === 'en' ? 'العربية' : 'English'}
        </span>
      )}
    </motion.button>
  );
};

export default LanguageSwitcher;