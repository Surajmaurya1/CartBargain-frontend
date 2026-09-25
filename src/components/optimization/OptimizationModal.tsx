import React from 'react';
import { Dialog } from '../ui/Dialog';
import { useBasket } from '../../context/BasketContext';
import { OptimizationStrategy } from '../../types';
import { OptimizationBreakdown } from './OptimizationBreakdown';
import { WhyThisBasket } from './WhyThisBasket';
import { Check, Layers, DollarSign, Store, Shield } from 'lucide-react';

const strategies: {
  id: OptimizationStrategy;
  title: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: 'split_lowest_cost',
    title: 'Lowest Total Cost',
    description: 'Split across stores to minimize spend.',
    icon: Layers,
  },
  {
    id: 'lowest_product_price',
    title: 'Lowest Item Price',
    description: 'Optimize strictly for unit prices.',
    icon: DollarSign,
  },
  {
    id: 'single_store_best',
    title: 'Single Store Best',
    description: 'One provider with full coverage.',
    icon: Store,
  },
  {
    id: 'minimize_delivery_fees',
    title: 'Minimize Fees',
    description: 'Balance stores for free delivery.',
    icon: Shield,
  },
];

export function OptimizationModal() {
  const {
    isOptimizationModalOpen,
    setIsOptimizationModalOpen,
    selectedStrategy,
    setSelectedStrategy,
    optimizationResult,
  } = useBasket();

  return (
    <Dialog
      isOpen={isOptimizationModalOpen}
      onClose={() => setIsOptimizationModalOpen(false)}
      title="Optimize Basket"
      description="Choose an allocation strategy to maximize your savings."
      maxWidth="3xl"
    >
      <div className="space-y-5">

        {/* Strategy row — 4 cards side by side */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {strategies.map((strat) => {
            const isSelected = selectedStrategy === strat.id;
            const Icon = strat.icon;
            return (
              <button
                key={strat.id}
                type="button"
                onClick={() => setSelectedStrategy(strat.id)}
                className={`relative p-3.5 rounded-[18px] text-left border transition-all flex flex-col gap-2.5 ${
                  isSelected
                    ? 'border-main bg-card-item shadow-md'
                    : 'border-border bg-card-inner hover:border-sub'
                }`}
              >
                {/* Icon */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-btn-bg' : 'bg-card-item border border-border'
                }`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-btn-text' : 'text-sub'}`} />
                </div>

                {/* Text */}
                <div>
                  <div className="text-xs font-bold text-main leading-snug">{strat.title}</div>
                  <p className="text-[11px] text-sub mt-0.5 leading-snug">{strat.description}</p>
                </div>

                {/* Selected tick */}
                {isSelected && (
                  <span className="absolute top-3 right-3">
                    <Check className="w-3.5 h-3.5 text-status-green" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Breakdown + rationale */}
        <OptimizationBreakdown result={optimizationResult} />
        <WhyThisBasket result={optimizationResult} />
      </div>
    </Dialog>
  );
}
