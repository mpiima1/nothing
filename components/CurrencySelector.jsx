/**
 * CurrencySelector - Dropdown for switching between supported currencies
 * 
 * Allows users to select their preferred currency for displaying prices.
 * Persists selection to localStorage.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { DollarSign, ChevronDown } from 'lucide-react';
import { getCurrencies } from '../lib/currency';

const supportedCurrencies = getCurrencies();

export default function CurrencySelector({ onCurrencyChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('nothing-store-currency');
    let currencyCode = stored || 'USD';
    
    if (stored && supportedCurrencies.some(c => c.code === stored)) {
      currencyCode = stored;
    }
    
    const found = supportedCurrencies.find(c => c.code === currencyCode);
    setCurrentCurrency(found || supportedCurrencies[0]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currency) => {
    setCurrentCurrency(currency);
    setIsOpen(false);
    localStorage.setItem('nothing-store-currency', currency.code);
    if (onCurrencyChange) {
      onCurrencyChange(currency.code);
    }
  };

  const activeCurrency = mounted && currentCurrency ? currentCurrency : supportedCurrencies[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1.5 md:py-3 md:px-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg border border-white/20 transition-all duration-200 text-sm md:text-base font-medium"
      >
        <DollarSign size={14} className="text-green-400" />
        <span>{activeCurrency.code}</span>
        <ChevronDown 
          size={12} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="fixed top-auto left-0 mt-2 w-32 bg-slate-900/95 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl overflow-hidden z-[100] animate-fade-in">
          {supportedCurrencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleSelect(currency)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/10 transition-colors ${
                activeCurrency.code === currency.code ? 'bg-green-500/20' : ''
              }`}
            >
              <span className="text-lg">{currency.flag}</span>
              <span className={activeCurrency.code === currency.code ? 'text-green-300 font-semibold' : 'text-white'}>
                {currency.code}
              </span>
              {activeCurrency.code === currency.code && (
                <span className="ml-auto text-green-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

CurrencySelector.displayName = 'CurrencySelector';