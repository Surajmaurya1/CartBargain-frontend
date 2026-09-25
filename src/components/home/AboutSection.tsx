import React from 'react';
import { Shield, Database, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-bold tracking-tight text-main">
          About BlinkBargain
        </h3>
        <p className="text-sm text-sub mt-2 leading-relaxed">
          An independent grocery price intelligence platform aggregating verified quick commerce listings across Blinkit, Zepto, and Instamart.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="block-card p-5">
            <Database className="w-5 h-5 text-status-green mb-2" />
            <h4 className="text-sm font-bold text-main">SerpApi Data</h4>
            <p className="text-xs text-sub mt-1">
              Live queries against store merchant feeds.
            </p>
          </div>

          <div className="block-card p-5">
            <Shield className="w-5 h-5 text-status-green mb-2" />
            <h4 className="text-sm font-bold text-main">Unbiased</h4>
            <p className="text-xs text-sub mt-1">
              Deterministic calculations based on unit costs.
            </p>
          </div>

          <div className="block-card p-5">
            <Sparkles className="w-5 h-5 text-status-green mb-2" />
            <h4 className="text-sm font-bold text-main">Direct Checkout</h4>
            <p className="text-xs text-sub mt-1">
              Check out directly on the merchant app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
