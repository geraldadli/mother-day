import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import FloatingElements from '../Animation/FloatingElements';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import useParallaxEffect from '../../hooks/useParallaxEffect';
import { useCardTheme } from '../../context/CardThemeContext';

const CardInside: React.FC = () => {
  const [message, setMessage] = useState(
    "Dear Mom,\n\nThank you for your endless love, support, and encouragement. You've always been there for me through thick and thin, and I'm forever grateful for everything you do. You are my inspiration, my rock, and my best friend.\n\nHappy Mother's Day! I love you more than words can express.\n\nWith all my love,"
  );
  const [name, setName] = useState("Gerald");
  const [isEditing, setIsEditing] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);

  const parallax = useParallaxEffect({ intensity: 5, reverse: true });
  const { themeColors } = useCardTheme();

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
    setShowImageUploader(false);
  };

  return (
    <div
      className={`w-full h-auto rounded-lg shadow-2xl overflow-hidden bg-gradient-to-b ${themeColors.secondary} flex flex-col items-center justify-between p-4 sm:p-6`}
    >
      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-card-texture"></div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
        <FloatingElements type="hearts" count={12} density="low" />
      </div>

      <div className="w-full relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            transform: `translateX(${parallax.x}px) translateY(${parallax.y}px)`,
          }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-1 sm:mr-2" />
          <h2
            className={`text-lg sm:text-xl md:text-2xl font-serif ${themeColors.text} font-bold text-center`}
          >
            For My Wonderful Mother
          </h2>
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 ml-1 sm:ml-2" />
        </motion.div>

        <div className="relative">
          {image && (
            <motion.div
              className="w-full flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-40 h-32 sm:w-48 sm:h-36 rounded-lg overflow-hidden shadow-md border-2 border-white">
                <img
                  src={image}
                  alt="Uploaded memory"
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-pink-600 hover:text-pink-700 transition-colors"
                  onClick={() => setShowImageUploader(true)}
                >
                  <ImageIcon size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {isEditing ? (
            <motion.textarea
              className="w-full h-auto p-4 border border-pink-200 rounded bg-white/80 text-sm sm:text-base text-pink-900 font-light leading-relaxed focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="w-full min-h-40 sm:min-h-48 p-4 bg-white/80 border border-pink-200 rounded text-sm sm:text-base text-pink-900 font-light leading-relaxed whitespace-pre-wrap shadow-sm"
              onClick={() => setIsEditing(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {message}
            </motion.div>
          )}
        </div>

        <motion.div
          className="mt-6 text-right w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {isEditing ? (
            <input
              className="w-full px-4 py-2 text-sm sm:text-base md:text-lg font-serif text-pink-800 bg-transparent border-b border-pink-300 focus:outline-none focus:border-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p
              className="text-sm sm:text-base md:text-lg font-serif text-pink-800 italic cursor-pointer break-words"
              onClick={() => setIsEditing(true)}
            >
              {name}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CardInside;