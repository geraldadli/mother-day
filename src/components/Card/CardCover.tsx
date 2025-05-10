import React from 'react';
import { Heart } from 'lucide-react';
import FloatingElements from '../Animation/FloatingElements';
import { motion } from 'framer-motion';
import useParallaxEffect from '../../hooks/useParallaxEffect';
import { useCardTheme } from '../../context/CardThemeContext';

interface CardCoverProps {
  customImage?: string;
}

const CardCover: React.FC<CardCoverProps> = ({ customImage }) => {
  const parallax = useParallaxEffect({ intensity: 10 });
  const { themeColors } = useCardTheme();

  return (
    <div 
      className={`relative w-full h-full rounded-lg shadow-2xl overflow-hidden bg-gradient-to-b ${themeColors.primary} flex flex-col items-center justify-center text-center p-8`}
      style={{ 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-card-texture"></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <FloatingElements type="mixed" count={20} density="medium" />
      </div>
      
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          transform: `translateX(${parallax.x}px) translateY(${parallax.y}px)`
        }}
      >
        {customImage ? (
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={customImage} 
              alt="Custom" 
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${themeColors.accent} flex items-center justify-center animate-pulse-slow shadow-lg`}>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-white" fill="white" />
            </motion.div>
          </div>
        )}
        
        <motion.h1 
          className={`text-4xl sm:text-5xl md:text-6xl font-serif ${themeColors.text} mb-4 font-bold`}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Happy Mother's Day
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl text-pink-700 italic mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          To the most amazing mom in the world...
        </motion.p>
        
        <motion.div 
          className="relative border-t border-b border-pink-300 py-5 px-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <p className="text-md sm:text-lg text-pink-700">
              Click to open your special card
            </p>
            <motion.div 
              className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-4 text-pink-500"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart fill="#ec4899" size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-4 text-sm text-pink-600 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p>Made with love, 2025</p>
      </motion.div>
      
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-pink-300/30 to-transparent"></div>
    </div>
  );
};

export default CardCover;