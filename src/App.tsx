import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import URLShortener from './components/URLShortener';
import Features from './components/Features';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentView === 'home'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                URL Shortener
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  currentView === 'admin'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Admin Panel
              </button>
            </div>
          </div>

          <Header />
          
          {currentView === 'home' ? (
            <>
              <URLShortener />
              <Features />
            </>
          ) : (
            <AdminPanel />
          )}
        </div>
      </div>
    </div>
  )
}

export default App;