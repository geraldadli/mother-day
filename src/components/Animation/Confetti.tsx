import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const [isActive, setIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Update dimensions on mount and resize
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (active) {
      setIsActive(true);
      const timer = setTimeout(() => {
        setIsActive(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      recycle={false}
      colors={[
        '#ff6694', // pink-500
        '#9775fa', // purple-500
        '#ffc2d6', // pink-200
        '#dcd7fe', // purple-200
        '#ffa3c0', // pink-300
      ]}
    />
  );
};

export default Confetti;