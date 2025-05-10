import React from 'react';
import Card from './components/Card/Card';
import { CardThemeProvider } from './context/CardThemeContext';
import { motion } from 'framer-motion';

function App() {
  return (
    <CardThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-pink-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.header 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-serif text-pink-800 mb-2">
              Mother's Day Celebration
            </h1>
            <p className="text-purple-600">
              A special card for an extraordinary mother
            </p>
          </motion.header>
          
          <main>
            <Card />
          </main>
          
          <motion.footer 
            className="mt-16 text-center text-sm text-pink-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p>Created with love | Mother's Day 2025</p>
          </motion.footer>
        </div>
      </div>
    </CardThemeProvider>
  );
}

export default App;