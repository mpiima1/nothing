/**
 * CartDrawer - Slide-out cart sidebar with animated transitions
 * 
 * Shows selected nothing items with satirical microcopy throughout.
 * The emptier the cart, the more expensive the experience.
 */

'use client';

import React from 'react';
import { ShoppingBag, X, Trash2, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../lib/currency';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  onCheckout,
  cart, 
  onRemoveItem,
  currency = 'USD'
}) {
  const { t } = useTranslation();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative bg-slate-900 w-full max-w-md h-full shadow-2xl border-l border-white/10 animate-slide-in flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center shrink-0">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('cart.title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">
                {t('cart.empty')}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t('cart.emptySubtext')}
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-500/20 rounded">
                    <ShoppingBag size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t(`products.${item.id}.name`)}</h4>
                    <p className="text-sm text-purple-400">
                      {formatPrice(item.price, currency)} {t('common.each')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                  >
                    <Trash2 size={18} className="text-red-400" />
                  </button>
                  <span className="font-bold text-white min-w-[70px] text-right">
                    {formatPrice(item.price, currency)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Footer */}
        {cart.length > 0 && (
          <div className="shrink-0 p-4 md:p-6 border-t border-white/10 bg-slate-900">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <span className="text-gray-400">{t('common.total')}:</span>
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {formatPrice(total, currency)}
              </span>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold text-base md:text-lg shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              {t('cart.checkoutYourNothing')}
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-2 md:mt-3">
              {t('cart.noPaymentRequired')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

CartDrawer.displayName = 'CartDrawer';
