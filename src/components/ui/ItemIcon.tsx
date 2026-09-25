import React from 'react';
import {
  Wheat,
  CircleDot,
  Milk,
  Egg,
  Sandwich,
  Box,
  Droplets,
  Coffee,
  Package,
} from 'lucide-react';
import { ItemIconType } from '../../types';

interface ItemIconProps {
  type?: ItemIconType | string;
  className?: string;
  size?: number;
}

export function ItemIcon({ type, className = 'w-4 h-4', size }: ItemIconProps) {
  const iconProps = { className, size };

  switch (type) {
    case 'wheat':
      return <Wheat {...iconProps} />;
    case 'rice':
      return <CircleDot {...iconProps} />;
    case 'milk':
      return <Milk {...iconProps} />;
    case 'egg':
      return <Egg {...iconProps} />;
    case 'bread':
      return <Sandwich {...iconProps} />;
    case 'butter':
      return <Box {...iconProps} />;
    case 'oil':
      return <Droplets {...iconProps} />;
    case 'coffee':
      return <Coffee {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
}
