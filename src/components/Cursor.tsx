import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const Cursor = () => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const mousePosition = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show cursor after a short delay to avoid initial position jump
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Setup event listeners for cursor state changes
    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    // Apply to all clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Clean up
    return () => {
      clearTimeout(timer);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      border: '1px solid rgba(59, 130, 246, 0.8)',
      height: 48,
      width: 48,
    },
  };

  // Don't render if not visible yet (avoids initial position jumps)
  if (!isVisible) return null;

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    />
  );
};

export default Cursor;