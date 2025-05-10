import React, { useState, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import AudioManager from '../../utils/audioManager';

const AudioControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioManager = AudioManager.getInstance();
  
  useEffect(() => {
    audioManager.setMuted(isMuted);
  }, [isMuted]);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioManager.playSoundEffect('buttonClick');
  };
  
  return (
    <button
      onClick={toggleMute}
      className="relative p-2 rounded-full bg-white/80 hover:bg-white/100 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
      aria-label={isMuted ? "Turn on sound" : "Turn off sound"}
    >
      {isMuted ? 
        <VolumeX className="w-5 h-5 text-pink-600" /> : 
        <Music className="w-5 h-5 text-pink-600" />
      }
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-pink-500 shadow animate-pulse"></span>
    </button>
  );
};

export default AudioControl;