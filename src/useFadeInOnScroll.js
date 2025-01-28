// src/useFadeInOnScroll.js
import { useEffect, useRef } from 'react';

const useFadeInOnScroll = () => {
  const ref = useRef();
  const hasAnimated = useRef(false); // Track if animation has occurred

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (element && !hasAnimated.current) {
        const { top, bottom } = element.getBoundingClientRect();
        const isVisible = top < window.innerHeight && bottom >= 0;
        if (isVisible) {
          element.classList.add('animate-fadeIn');
          hasAnimated.current = true; // Mark as animated
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially in case elements are already in view
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return ref;
};

export default useFadeInOnScroll;

