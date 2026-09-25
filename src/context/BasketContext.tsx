import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  ComparisonRow,
  GroceryItem,
  LocationDetails,
  OptimizationResult,
  OptimizationStrategy,
  ProviderId,
  ProviderSummary,
  SearchEngineType,
} from '../types';
import { DEFAULT_GROCERY_ITEMS, LOCATIONS_LIST } from '../data/mockData';
import { buildComparisonRows, calculateProviderSummaries, optimizeBasket } from '../lib/optimizer';
import { parseGroceryInput } from '../lib/utils';

interface BasketContextType {
  currentScreen: 'home' | 'results';
  setCurrentScreen: (screen: 'home' | 'results') => void;
  rawSearchInput: string;
  setRawSearchInput: (val: string) => void;
  items: GroceryItem[];
  location: LocationDetails;
  setLocation: (loc: LocationDetails) => void;
  searchEngine: SearchEngineType;
  setSearchEngine: (engine: SearchEngineType) => void;
  selectedProviders: ProviderId[];
  toggleProvider: (pId: ProviderId) => void;
  comparisonRows: ComparisonRow[];
  providerSummaries: ProviderSummary[];
  optimizationResult: OptimizationResult;
  selectedStrategy: OptimizationStrategy;
  setSelectedStrategy: (strategy: OptimizationStrategy) => void;
  isOptimizationModalOpen: boolean;
  setIsOptimizationModalOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isLoadingSearch: boolean;
  addItem: (name: string, quantity?: number, unit?: string) => void;
  removeItem: (id: string) => void;
  updateItemQuantity: (id: string, qty: number) => void;
  handleSearchSubmit: (customText?: string) => void;
  loadPreset: (presetItemsText: string) => void;
  resetToDefault: () => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'results'>('home');
  const [rawSearchInput, setRawSearchInput] = useState('atta 5kg, rice 2kg, milk 1L, eggs 12, bread');
  const [items, setItems] = useState<GroceryItem[]>(DEFAULT_GROCERY_ITEMS);
  const [location, setLocation] = useState<LocationDetails>(LOCATIONS_LIST[0]);
  const [searchEngine, setSearchEngine] = useState<SearchEngineType>('google_shopping');
  const [selectedProviders, setSelectedProviders] = useState<ProviderId[]>(['blinkit', 'zepto', 'instamart']);
  const [selectedStrategy, setSelectedStrategy] = useState<OptimizationStrategy>('split_lowest_cost');
  
  const [isOptimizationModalOpen, setIsOptimizationModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const comparisonRows = useMemo(() => {
    return buildComparisonRows(items, selectedProviders);
  }, [items, selectedProviders]);

  const providerSummaries = useMemo(() => {
    return calculateProviderSummaries(comparisonRows, selectedProviders);
  }, [comparisonRows, selectedProviders]);

  const optimizationResult = useMemo(() => {
    return optimizeBasket(comparisonRows, selectedStrategy, selectedProviders);
  }, [comparisonRows, selectedStrategy, selectedProviders]);

  const toggleProvider = useCallback((pId: ProviderId) => {
    setSelectedProviders((prev) => {
      if (prev.includes(pId)) {
        if (prev.length <= 1) return prev;
        return prev.filter((id) => id !== pId);
      } else {
        return [...prev, pId];
      }
    });
  }, []);

  const addItem = useCallback((name: string, quantity = 1, unit = '1 pc') => {
    const parsed = parseGroceryInput(`${name} ${unit}`);
    if (parsed.length > 0) {
      setItems((prev) => [...prev, parsed[0]]);
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateItemQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  }, [removeItem]);

  const handleSearchSubmit = useCallback((customText?: string) => {
    const textToParse = customText !== undefined ? customText : rawSearchInput;
    if (textToParse.trim()) {
      const parsedItems = parseGroceryInput(textToParse);
      if (parsedItems.length > 0) {
        setItems(parsedItems);
      }
    }

    setIsLoadingSearch(true);
    setTimeout(() => {
      setIsLoadingSearch(false);
      setCurrentScreen('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  }, [rawSearchInput]);

  const loadPreset = useCallback((presetItemsText: string) => {
    setRawSearchInput(presetItemsText);
    const parsed = parseGroceryInput(presetItemsText);
    setItems(parsed);
    setIsLoadingSearch(true);
    setTimeout(() => {
      setIsLoadingSearch(false);
      setCurrentScreen('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  }, []);

  const resetToDefault = useCallback(() => {
    setItems(DEFAULT_GROCERY_ITEMS);
    setRawSearchInput('atta 5kg, rice 2kg, milk 1L, eggs 12, bread');
    setCurrentScreen('home');
  }, []);

  return (
    <BasketContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        rawSearchInput,
        setRawSearchInput,
        items,
        location,
        setLocation,
        searchEngine,
        setSearchEngine,
        selectedProviders,
        toggleProvider,
        comparisonRows,
        providerSummaries,
        optimizationResult,
        selectedStrategy,
        setSelectedStrategy,
        isOptimizationModalOpen,
        setIsOptimizationModalOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isLoadingSearch,
        addItem,
        removeItem,
        updateItemQuantity,
        handleSearchSubmit,
        loadPreset,
        resetToDefault,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}
