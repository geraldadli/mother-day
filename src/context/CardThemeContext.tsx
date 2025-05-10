import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ThemeOption = 'floral' | 'elegant' | 'modern' | 'classic';

interface ThemeColors {
  primary: string;
  secondary: string;
  text: string;
  accent: string;
  background: string;
}

interface CardThemeContextType {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  themeColors: ThemeColors;
}

const themes: Record<ThemeOption, ThemeColors> = {
  floral: {
    primary: 'from-pink-100 to-pink-200',
    secondary: 'from-purple-50 to-pink-50',
    text: 'text-pink-800',
    accent: 'bg-pink-500',
    background: 'from-pink-50 via-purple-50 to-pink-50'
  },
  elegant: {
    primary: 'from-purple-100 to-purple-200',
    secondary: 'from-indigo-50 to-purple-50',
    text: 'text-purple-800',
    accent: 'bg-purple-500',
    background: 'from-purple-50 via-indigo-50 to-purple-50'
  },
  modern: {
    primary: 'from-blue-100 to-indigo-200',
    secondary: 'from-sky-50 to-blue-50',
    text: 'text-blue-800',
    accent: 'bg-blue-500',
    background: 'from-blue-50 via-sky-50 to-blue-50'
  },
  classic: {
    primary: 'from-amber-100 to-orange-200',
    secondary: 'from-yellow-50 to-amber-50',
    text: 'text-amber-800',
    accent: 'bg-amber-500',
    background: 'from-amber-50 via-yellow-50 to-amber-50'
  }
};

const CardThemeContext = createContext<CardThemeContextType>({
  currentTheme: 'floral',
  setTheme: () => {},
  themeColors: themes.floral
});

export const CardThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>('floral');

  const setTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme);
  };

  const value = {
    currentTheme,
    setTheme,
    themeColors: themes[currentTheme]
  };

  return (
    <CardThemeContext.Provider value={value}>
      {children}
    </CardThemeContext.Provider>
  );
};

export const useCardTheme = () => useContext(CardThemeContext);

export default CardThemeContext;