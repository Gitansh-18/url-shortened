import React from 'react';
import { Link2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
          <Link2 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Short<span className="text-blue-200">Link</span>
        </h1>
      </div>
      <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Transform your long URLs into short, shareable links in seconds
      </p>
    </header>
  );
};

export default Header;