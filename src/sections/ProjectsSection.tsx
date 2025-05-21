import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Project data
  const projects = [
    {
      id: 'project1',
      title: t('projects.project1.title'),
      description: t('projects.project1.description'),
      technologies: t('projects.project1.technologies', { returnObjects: true }) as string[],
      image: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      viewProject: t('projects.project1.viewProject'),
      viewCode: t('projects.project1.viewCode')
    },
    {
      id: 'project2',
      title: t('projects.project2.title'),
      description: t('projects.project2.description'),
      technologies: t('projects.project2.technologies', { returnObjects: true }) as string[],
      image: 'https://images.pexels.com/photos/4098225/pexels-photo-4098225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      viewProject: t('projects.project2.viewProject'),
      viewCode: t('projects.project2.viewCode')
    },
    {
      id: 'project3',
      title: t('projects.project3.title'),
      description: t('projects.project3.description'),
      technologies: t('projects.project3.technologies', { returnObjects: true }) as string[],
      image: 'https://images.pexels.com/photos/6932524/pexels-photo-6932524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      viewProject: t('projects.project3.viewProject'),
      viewCode: t('projects.project3.viewCode')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="section-container bg-zinc-900 curved-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="text-xl text-zinc-400">{t('projects.subtitle')}</p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group ${index === 0 ? 'lg:col-span-2' : ''}`}
              variants={projectVariants}
            >
              <div className="relative overflow-hidden rounded-xl mb-6 group-hover:shadow-xl group-hover:shadow-primary-500/20 transition-all duration-300">
                {/* Project image with overlay */}
                <div className="aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 to-secondary-900/70 z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-3 text-zinc-100">{project.title}</h3>
                <p className="text-zinc-400 mb-4">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    {project.viewProject}
                  </a>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-zinc-300 hover:text-zinc-100 font-medium"
                  >
                    <Github size={16} className="mr-1" />
                    {project.viewCode}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.a
            href="#"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {t('projects.viewAll')}
            <ArrowRight size={16} className="ml-1" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;