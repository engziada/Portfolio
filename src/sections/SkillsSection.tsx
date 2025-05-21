import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const skillCategories = [
    {
      id: 'frontend',
      title: t('skills.frontend.title'),
      skills: t('skills.frontend.skills', { returnObjects: true }) as string[],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      id: 'backend',
      title: t('skills.backend.title'),
      skills: t('skills.backend.skills', { returnObjects: true }) as string[],
      color: 'from-teal-500 to-emerald-500',
    },
    {
      id: 'design',
      title: t('skills.design.title'),
      skills: t('skills.design.skills', { returnObjects: true }) as string[],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'tools',
      title: t('skills.tools.title'),
      skills: t('skills.tools.skills', { returnObjects: true }) as string[],
      color: 'from-amber-500 to-orange-500',
    },
  ];

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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="section-container relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-900/30 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary-900/30 rounded-full blur-3xl opacity-60"></div>
      
      <motion.div 
        className="max-w-5xl mx-auto relative z-10"
        style={{ y }}
      >
        <div className="text-center mb-16">
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="text-xl text-zinc-400">{t('skills.subtitle')}</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/50 hover:border-primary-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className={`skill-pill bg-gradient-to-r ${category.color} bg-opacity-10 text-white`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;