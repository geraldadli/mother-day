import React, { useEffect, useState, useCallback } from 'react';
import { Heart, Flower, Star, Music, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCardTheme } from '../../context/CardThemeContext';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: string;
  delay: number;
}

interface FloatingElementsProps {
  type?: 'flowers' | 'hearts' | 'stars' | 'mixed';
  count?: number;
  density?: 'low' | 'medium' | 'high';
}

const getRandomElement = (type: string): JSX.Element => {
  switch (type) {
    case 'heart':
      return <Heart className="text-pink-400" fill="#f472b6" size={16} />;
    case 'flower':
      return <Flower className="text-pink-500" fill="#ec4899" size={16} />;
    case 'star':
      return <Star className="text-yellow-400" fill="#facc15" size={16} />;
    case 'music':
      return <Music className="text-purple-400" fill="#c084fc" size={16} />;
    case 'sparkle':
      return <Sparkles className="text-amber-400" fill="#fbbf24" size={16} />;
    default:
      return <Heart className="text-pink-400" fill="#f472b6" size={16} />;
  }
};

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  type = 'flowers',
  count = 15,
  density = 'medium'
}) => {
  const { themeColors } = useCardTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  
  // Adjust count based on density
  const adjustedCount = density === 'low' ? count * 0.7 : density === 'high' ? count * 1.5 : count;
  
  const getElementType = useCallback((baseType: string): string => {
    if (baseType === 'mixed') {
      const options = ['heart', 'flower', 'star', 'music', 'sparkle'];
      return options[Math.floor(Math.random() * options.length)];
    }
    
    if (baseType === 'flowers') return 'flower';
    if (baseType === 'hearts') return 'heart';
    if (baseType === 'stars') return 'star';
    
    return 'heart';
  }, []);

  useEffect(() => {
    const newElements: FloatingElement[] = [];
    
    for (let i = 0; i < adjustedCount; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, // 0.5 to 2
        speed: Math.random() * 1.5 + 0.5, // 0.5 to 2
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
        type: getElementType(type),
        delay: Math.random() * 5 // Random delay for staggered animation
      });
    }
    
    setElements(newElements);
  }, [adjustedCount, type, getElementType]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {elements.map(element => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{ 
            x: `${element.x}%`, 
            y: `${element.y + 20}%`,
            opacity: 0,
            scale: 0,
            rotate: element.rotation
          }}
          animate={{ 
            y: [`${element.y + 20}%`, `${-10}%`],
            opacity: [0, element.opacity, 0],
            scale: [0, element.size, 0],
            rotate: [element.rotation, element.rotation + (360 * element.rotationSpeed)]
          }}
          transition={{ 
            duration: 15 / element.speed,
            ease: "easeInOut",
            times: [0, 0.1, 1],
            repeat: Infinity,
            delay: element.delay,
            repeatDelay: Math.random() * 2
          }}
          style={{
            left: `${element.x}%`,
          }}
        >
          {getRandomElement(element.type)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;