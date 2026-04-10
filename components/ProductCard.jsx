/**
 * ProductCard - Displays individual Nothing products
 * 
 * Each card promotes a different level of nothingness.
 * The cards themselves are visible to sell the invisible.
 * 
 * SATIRICALLY IMPORTANT: Feature text is sacred - do not change.
 */

'use client';

import React from 'react';
import { Package, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../lib/currency';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  currency = 'USD',
  inCart = false 
}) {
  const { t } = useTranslation();
  const productKey = `products.${product.id}`;
  
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
          <Package size={28} className="text-purple-400" />
        </div>
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {formatPrice(product.price, currency)}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white">
        {t(`${productKey}.name`)}
      </h3>
      
      <p className="text-gray-300 mb-4 text-sm">
        {t(`${productKey}.description`)}
      </p>
      
      <ul className="mb-6 space-y-2">
        {t(`${productKey}.features`, { returnObjects: true }).map((feature, idx) => (
          <li key={idx} className="flex items-start text-xs text-gray-400">
            <span className="text-green-400 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => onAddToCart(product)}
        disabled={inCart}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
          inCart
            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/50'
        }`}
      >
        {inCart ? (
          <>
            <Check size={18} />
            {t('common.addedToCart')}
          </>
        ) : (
          <>
            <Package size={18} />
            {t('common.addToCart')}
          </>
        )}
      </button>
      
      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500">
          {t('products.limitedStock')}
        </span>
      </div>
    </div>
  );
}

ProductCard.displayName = 'ProductCard';
