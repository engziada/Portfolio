import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lenis from '@studio-freight/lenis';
import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import useIsDesktop from './hooks/useIsDesktop';

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isDesktop = useIsDesktop();
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: isRTL ? 'rtl' : 'ltr',
      gestureOrientation: isRTL ? 'vertical' : 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isRTL]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.add('loaded');
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`min-h-screen font-sans ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {isDesktop && <Cursor />}
      <div className="page-container">
        <Header />
        <main>
          <HeroSection isLoaded={isLoaded} />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;