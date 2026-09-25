import React from 'react';
import { SearchPanel } from './SearchPanel';
import { LiveBasketPreview } from './LiveBasketPreview';
import { motion } from 'framer-motion';
import { MetalText } from 'metal-fx';
import { useTheme } from '../../context/ThemeContext';

export function HeroSection() {
  const { theme } = useTheme();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12 space-y-6 sm:space-y-8">
      {/* Hero Headline & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-3xl space-y-3"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-heading leading-[1.15] flex flex-wrap items-center gap-x-2.5">
          <span>Compare.</span>
          <MetalText
            font="800 48px/1.15 Inter, -apple-system, sans-serif"
            color={theme === 'dark' ? '#FFFFFF' : '#0F172A'}
            strength={0.95}
          >
            Optimize.
          </MetalText>
          <span>Save on every order.</span>
        </h1>
        <p className="text-sm sm:text-base text-sub max-w-2xl leading-relaxed">
          Find where your grocery list is cheapest across Blinkit, Zepto, and Instamart. Compare total basket prices or split your cart to maximize savings.
        </p>
      </motion.div>

      {/* Side-by-Side Comparison Card & Hero Image Card (Aligned perfectly to each other) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* On Mobile: Image card first (order-1), on Desktop: right column (5 cols, order-2) */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col">
          <LiveBasketPreview />
        </div>

        {/* Search / Comparison Card (7 cols, order-2 on mobile, order-1 on desktop) */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col">
          <SearchPanel />
        </div>
      </div>
    </section>
  );
}