import React from 'react';
import { Search, Scale, Cpu, PiggyBank, ShieldCheck } from 'lucide-react';

export function FeatureStrip() {
  const features = [
    {
      icon: <Search className="w-4 h-4 text-btn-text" />,
      title: 'Multiple Stores',
      description: 'Blinkit, Zepto, Instamart, BB Now.',
    },
    {
      icon: <Scale className="w-4 h-4 text-btn-text" />,
      title: 'Full Basket Pricing',
      description: 'Compare products and delivery fees.',
    },
    {
      icon: <Cpu className="w-4 h-4 text-btn-text" />,
      title: 'Cart Optimization',
      description: 'Split cart calculation for lower total.',
    },
    {
      icon: <PiggyBank className="w-4 h-4 text-btn-text" />,
      title: 'Real Savings',
      description: 'Transparent price delta breakdown.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-btn-text" />,
      title: 'Live SerpApi',
      description: 'Verified public merchant data.',
    },
  ];

  return (
    <div className="feature-strip-bg py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="block-card flex flex-col items-start p-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-btn-bg flex items-center justify-center mb-3 shrink-0">
                {feature.icon}
              </div>
              <h4 className="text-sm font-bold text-main">
                {feature.title}
              </h4>
              <p className="text-xs text-sub mt-1 leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
