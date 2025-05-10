import React from 'react';
import { useCardTheme, ThemeOption } from '../../context/CardThemeContext';

const themeOptions: { value: ThemeOption; label: string; colors: string[] }[] = [
  { 
    value: 'floral', 
    label: 'Floral', 
    colors: ['bg-pink-200', 'bg-pink-400', 'bg-pink-600'] 
  },
  { 
    value: 'elegant', 
    label: 'Elegant', 
    colors: ['bg-purple-200', 'bg-purple-400', 'bg-purple-600'] 
  },
  { 
    value: 'modern', 
    label: 'Modern', 
    colors: ['bg-blue-200', 'bg-blue-400', 'bg-blue-600'] 
  },
  { 
    value: 'classic', 
    label: 'Classic', 
    colors: ['bg-amber-200', 'bg-amber-400', 'bg-amber-600'] 
  }
];

const ThemeSelector: React.FC = () => {
  const { currentTheme, setTheme } = useCardTheme();

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 items-center">
      <span className="text-sm font-medium">Card Theme:</span>
      <div className="flex space-x-2">
        {themeOptions.map((option) => (
          <button
            key={option.value}
            className={`group relative p-0.5 rounded-md focus:outline-none ${
              currentTheme === option.value ? 'ring-2 ring-offset-1' : ''
            }`}
            onClick={() => setTheme(option.value)}
            aria-label={`${option.label} theme`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded overflow-hidden">
              <div className="absolute inset-0 flex">
                {option.colors.map((color, i) => (
                  <div key={i} className={`flex-1 ${color}`}></div>
                ))}
              </div>
              <span className={`relative text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity`}>
                {option.label.charAt(0)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;