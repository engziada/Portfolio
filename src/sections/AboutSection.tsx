import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, BookOpen, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Value icons mapped to appropriate values
  const valueIcons = {
    value1: <Shield className="w-8 h-8 text-primary-400" />,
    value2: <BookOpen className="w-8 h-8 text-primary-400" />,
    value3: <Users className="w-8 h-8 text-primary-400" />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="section-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="text-xl text-zinc-400">{t('about.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Bio and photo */}
          <motion.div
            className="lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            ref={ref}
          >
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600">
                <img
                  src="https://images.pexels.com/photos/7661598/pexels-photo-7661598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Profile"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border-8 border-zinc-900 bg-zinc-800 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Profile closeup"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </motion.div>

          <div className="lg:order-1">
            <motion.p
              className="text-lg text-zinc-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('about.bio')}
            </motion.p>

            <motion.h3
              className="text-2xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('about.values.title')}
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {(['value1', 'value2', 'value3'] as const).map((valueKey) => (
                <motion.div
                  key={valueKey}
                  className="flex gap-4"
                  variants={itemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    {valueIcons[valueKey]}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-100 mb-2">
                      {t(`about.values.${valueKey}.title`)}
                    </h4>
                    <p className="text-zinc-400">
                      {t(`about.values.${valueKey}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;