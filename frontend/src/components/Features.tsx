import React from 'react';
import { Zap, Shield, BarChart3, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate shortened URLs instantly with our optimized system'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your links are safe and will redirect properly every time'
  },
  {
    icon: BarChart3,
    title: 'Click Analytics',
    description: 'Track how many times your shortened URLs have been clicked'
  },
  {
    icon: Clock,
    title: 'No Expiration',
    description: 'Your shortened links work forever, no time limits or restrictions'
  }
];

const Features: React.FC = () => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
        Why Choose ShortLink?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 transform hover:scale-105"
            >
              <div className="bg-blue-500/20 rounded-xl p-3 w-fit mb-4">
                <Icon className="w-6 h-6 text-blue-200" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;