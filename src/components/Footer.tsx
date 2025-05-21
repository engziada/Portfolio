import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-zinc-800 mt-16">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold gradient-text">
              Muhammad Ziada
            </a>
            <p className="text-zinc-400 mt-2">{t('footer.designed')}</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-zinc-400 mb-4">{t('footer.followMe')}</p>
            <div className="flex space-x-4">
              <a href="https://github.com/engziada" className="text-zinc-400 hover:text-primary-400 transition-colors" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href={t('footer.linkedin')} className="text-zinc-400 hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-zinc-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-800 text-center md:text-left">
          <p className="text-zinc-500">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;