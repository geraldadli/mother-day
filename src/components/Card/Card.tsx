import React, { useState, useEffect } from 'react';
import { Heart, Download, Share2 } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import CardCover from './CardCover';
import CardInside from './CardInside';
import ActionButton from '../UI/ActionButton';
import AudioControl from '../UI/AudioControl';
import ThemeSelector from '../UI/ThemeSelector';
import Confetti from '../Animation/Confetti';
import AudioManager from '../../utils/audioManager';
import { motion } from 'framer-motion';

const Card: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [customImage, setCustomImage] = useState<string | undefined>(undefined);

  const toggleCard = () => {
    const audioManager = AudioManager.getInstance();

    if (!isOpen) {
      audioManager.playSoundEffect('cardOpen');
      setShowConfetti(true);
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.playSoundEffect('cardClose');
    }

    setIsOpen(!isOpen);
  };

  const handleDownload = () => {
    alert('Your card would be downloaded here!');
  };

  const handleShare = () => {
    alert('Your card would be shared here!');
  };

  useEffect(() => {
    const audioManager = AudioManager.getInstance();
    return () => {
      audioManager.stopBackgroundMusic();
    };
  }, []);

  return (
    <>
      <Confetti active={showConfetti} duration={3000} />

      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center p-4 sm:p-6">
        <div className="absolute top-0 right-0 md:top-4 md:right-4 z-20 flex space-x-2">
          <AudioControl />
        </div>

        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl perspective"
          style={{ perspective: '2000px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={1500}
            tiltReverse={true}
            className="w-full"
          >
            <div
              className="card-container relative transition-transform duration-1000 ease-in-out transform-style w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: isOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="absolute w-full h-full cursor-pointer"
                onClick={toggleCard}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <CardCover customImage={customImage} />
              </div>

              <div
                className="absolute w-full h-full cursor-pointer"
                onClick={toggleCard}
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <CardInside />
              </div>
            </div>
          </Tilt>
        </motion.div>

        <br></br>
        <br></br>
        <br></br>
        <motion.div
          className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ActionButton onClick={toggleCard} icon={<Heart />}>
            {isOpen ? 'Close Card' : 'Open Card'}
          </ActionButton>
          {/* <ActionButton onClick={handleDownload} icon={<Download />} variant="secondary">
            Download
          </ActionButton>
          <ActionButton onClick={handleShare} icon={<Share2 />} variant="secondary">
            Share
          </ActionButton> */}
        </motion.div>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ThemeSelector />
        </motion.div>
      </div>
    </>
  );
};

export default Card;