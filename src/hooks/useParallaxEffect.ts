import { useState, useEffect } from 'react';

interface ParallaxOptions {
  intensity?: number;
  reverse?: boolean;
}

export const useParallaxEffect = (options: ParallaxOptions = {}) => {
  const { intensity = 20, reverse = false } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth: width, innerHeight: height } = window;
      
      // Calculate mouse position as percentage of window width/height
      const x = (e.clientX / width - 0.5) * 2; // -1 to 1
      const y = (e.clientY / height - 0.5) * 2; // -1 to 1
      
      // Apply intensity and reverse if needed
      const factor = reverse ? -1 : 1;
      
      setPosition({
        x: x * intensity * factor,
        y: y * intensity * factor
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, reverse]);
  
  return position;
};

export default useParallaxEffect;