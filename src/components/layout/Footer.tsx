import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card-inner py-8 mt-16 transition-colors text-xs text-sub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-btn-bg flex items-center justify-center text-btn-text">
            <ShoppingCart className="w-3 h-3" />
          </div>
          <span className="font-semibold text-main">
            BlinkBargain
          </span>
          <span className="text-[11px] text-sub">
            — Basket Price Comparison
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-sub">
          <span>Blinkit • Zepto • Instamart</span>
          <span>Powered by SerpApi</span>
        </div>
      </div>
    </footer>
  );
}
