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
    <div className={`w-full h-full rounded-lg shadow-2xl overflow-hidden bg-gradient-to-b ${themeColors.secondary} flex flex-col items-center justify-between p-8`}>
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-card-texture"></div>
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
        <FloatingElements type="hearts" count={12} density="low" />
      </div>
      
      <div className="w-full relative z-10">
        <motion.div 
          className="flex justify-center items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            transform: `translateX(${parallax.x}px) translateY(${parallax.y}px)`
          }}
        >
          <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
          <h2 className={`text-3xl font-serif ${themeColors.text} font-bold`}>
            For My Wonderful Mother
          </h2>
          <Sparkles className="w-5 h-5 text-purple-500 ml-2" />
        </motion.div>
        
        <div className="relative">
          {image && (
            <motion.div 
              className="w-full flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-64 h-48 rounded-lg overflow-hidden shadow-md border-2 border-white">
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
          
          {showImageUploader ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ImageUploader 
                onImageUpload={handleImageUpload} 
                currentImage={image}
              />
              <div className="flex justify-end mt-2">
                <button
                  className="text-sm text-pink-600 hover:text-pink-800 transition-colors"
                  onClick={() => setShowImageUploader(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          ) : !image && (
            <motion.div
              className="flex justify-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <button
                className="flex items-center px-3 py-1.5 text-sm rounded-full bg-white/80 text-pink-600 hover:bg-white hover:text-pink-700 shadow-sm transition-colors"
                onClick={() => setShowImageUploader(true)}
              >
                <ImageIcon size={14} className="mr-1.5" />
                Add a photo memory
              </button>
            </motion.div>
          )}
          
          {isEditing ? (
            <motion.textarea
              className="w-full h-64 p-4 border border-pink-200 rounded bg-white/80 text-lg text-pink-900 font-light leading-relaxed focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoFocus
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div 
              className="w-full min-h-64 p-4 bg-white/80 border border-pink-200 rounded text-lg text-pink-900 font-light leading-relaxed whitespace-pre-wrap shadow-sm"
              onClick={() => setIsEditing(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              {message}
            </motion.div>
          )}
        </div>
        
        <motion.div 
          className="mt-6 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {isEditing ? (
            <input
              className="px-4 py-2 text-xl font-serif text-pink-800 bg-transparent border-b border-pink-300 focus:outline-none focus:border-pink-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p 
              className="text-xl font-serif text-pink-800 italic cursor-pointer" 
              onClick={() => setIsEditing(true)}
            >
              {name}
            </p>
          )}
        </motion.div>
        
        {isEditing && (
          <motion.div 
            className="mt-4 text-right"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
              onClick={() => setIsEditing(false)}
            >
              Save
            </button>
          </motion.div>
        )}
      </div>
      
      <motion.div 
        className="w-full max-w-lg mt-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="text-center text-sm text-pink-600">
          <p>Click anywhere on the card to {isEditing ? "save" : "edit"} your message</p>
          <p className="mt-1">Click the card to flip back to the cover</p>
        </div>
      </motion.div>
    </div>
  );
};

export default CardInside;