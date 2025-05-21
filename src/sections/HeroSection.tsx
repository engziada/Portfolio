import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  isLoaded: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isLoaded }) => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
    >
      {/* Decorative shapes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-600/10 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-secondary-500/10 blur-3xl" />
      
      {/* Blob shape with gradient */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blob-shape bg-gradient-to-br from-primary-800/20 to-secondary-600/20 animate-[blob_8s_infinite] blur-2xl opacity-70" />

      <motion.div 
        className="max-w-5xl mx-auto text-center z-10 px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.p 
          className="text-xl md:text-2xl font-light text-primary-300 mb-4"
          variants={itemVariants}
        >
          {t('hero.greeting')}
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
          variants={itemVariants}
        >
          <span className="gradient-text">{t('hero.tagline')}</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          {t('hero.description')}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <a 
            href="#projects" 
            className="btn btn-primary min-w-[180px] group"
          >
            {t('hero.cta')}
          </a>
          <a 
            href="#contact" 
            className="btn btn-outline min-w-[180px] group"
          >
            {t('hero.secondaryCta')}
          </a>
        </motion.div>
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToExperience}
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="text-zinc-500 hover:text-primary-400" size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;