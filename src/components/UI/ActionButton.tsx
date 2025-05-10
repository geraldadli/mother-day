import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AudioManager from '../../utils/audioManager';

interface ActionButtonProps {
  children: ReactNode;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  children, 
  onClick, 
  icon, 
  variant = 'primary' 
}) => {
  const handleClick = () => {
    const audioManager = AudioManager.getInstance();
    audioManager.playSoundEffect('buttonClick');
    onClick();
  };

  const gradientClass = variant === 'primary' 
    ? 'from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
    : 'from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600';

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center justify-center px-4 py-2 bg-gradient-to-r ${gradientClass} text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.span 
          className="mr-2"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.button>
  );
};

export default ActionButton;