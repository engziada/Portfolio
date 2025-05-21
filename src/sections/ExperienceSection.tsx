import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ExperienceSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experienceData = [
    {
      id: 'job1',
      title: t('experience.job1.title'),
      company: t('experience.job1.company'),
      period: t('experience.job1.period'),
      description: t('experience.job1.description'),
      highlights: t('experience.job1.highlights', { returnObjects: true }) as string[],
    },
    {
      id: 'job2',
      title: t('experience.job2.title'),
      company: t('experience.job2.company'),
      period: t('experience.job2.period'),
      description: t('experience.job2.description'),
      highlights: t('experience.job2.highlights', { returnObjects: true }) as string[],
    },
    {
      id: 'job3',
      title: t('experience.job3.title'),
      company: t('experience.job3.company'),
      period: t('experience.job3.period'),
      description: t('experience.job3.description'),
      highlights: t('experience.job3.highlights', { returnObjects: true }) as string[],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  return (
    <section id="experience" className="section-container bg-zinc-900 curved-section">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="text-xl text-zinc-400">{t('experience.subtitle')}</p>
        </motion.div>

        <motion.div 
          className="mt-16"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experienceData.map((job, index) => (
            <motion.div
              key={job.id}
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-dot" />
              <div className={`${isRTL ? 'pr-6' : 'pl-6'}`}>
                <h3 className="text-2xl font-bold text-primary-400">{job.title}</h3>
                <div className="flex items-center mt-1 mb-3">
                  <p className="text-lg text-zinc-200 font-medium">{job.company}</p>
                  <span className="mx-2 text-zinc-500">•</span>
                  <p className="text-sm text-zinc-400">{job.period}</p>
                </div>
                <p className="text-zinc-300 mb-4">{job.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.highlights.map((highlight, i) => (
                    <li 
                      key={i} 
                      className="flex items-center text-sm text-zinc-400"
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-400 mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;