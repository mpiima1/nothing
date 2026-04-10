/**
 * NothingStore - The satirical heart of this performance art project
 * 
 * This component sells nothing, but makes it premium. It's a commentary on
 * consumer culture, marketing hype, and modern capitalism.
 *
 * SATIRICAL PRESERVATION REQUIRED:
 * - Keep all product feature text intact (it's the joke)
 * - Maintain deadpan professional tone throughout
 * - Never break the fourth wall (don't say "this is a joke")
 * - Make it look polished to enhance the absurdity
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { ShoppingCart, Package, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products } from '../lib/products';
import { formatPrice, getCurrencies } from '../lib/currency';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import EnhancedButton from './EnhancedButton';
import Certificate from './Certificate';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';
import { syncLanguage } from '../lib/i18n';
import '../lib/i18n';

const currencies = getCurrencies();

const PRIMES_100_TO_2000 = [
  101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
  179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257,
  263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349,
  353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439,
  443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541,
  547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631,
  641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733,
  739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829,
  839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
  947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033,
  1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117,
  1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223,
  1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303,
  1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429,
  1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499,
  1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601,
  1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697,
  1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789,
  1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901,
  1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999
];

export default function NothingStore() {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('store');
  const [orderData, setOrderData] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [salesCount, setSalesCount] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    syncLanguage();
    setSalesCount(PRIMES_100_TO_2000[Math.floor(Math.random() * PRIMES_100_TO_2000.length)]);
    setMounted(true);
    
    const storedCurrency = localStorage.getItem('nothing-store-currency');
    if (storedCurrency && currencies.some(c => c.code === storedCurrency)) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  const handleCurrencyChange = useCallback((currencyCode) => {
    setSelectedCurrency(currencyCode);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, { ...product, cartId: Date.now() }]);
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  const handleCheckout = useCallback(() => {
    if (!checkoutForm.name || !checkoutForm.email) return;
    
    const order = {
      name: checkoutForm.name,
      email: checkoutForm.email,
      items: cart,
      total: getTotalPrice(),
      orderId: `NOTHING-${Date.now()}`,
      date: new Date().toLocaleDateString()
    };
    
    setOrderData(order);
    setView('confirmation');
    setCart([]);
    setCheckoutForm({ name: '', email: '' });
  }, [checkoutForm, cart, getTotalPrice]);

  if (view === 'confirmation' && orderData) {
    return (
      <Certificate 
        order={orderData} 
        currency={selectedCurrency}
      />
    );
  }

  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              setView('store');
              setIsCartOpen(false);
            }}
            className="mb-6 text-purple-300 hover:text-purple-100 transition-colors inline-flex items-center gap-2"
          >
            ← {t('common.backToStore')}
          </button>
          
          <h1 className="text-4xl font-bold mb-8">{t('checkout.title')}</h1>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">{t('checkout.yourNothing')}</h2>
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0"
              >
                <span>{t(`products.${item.id}.name`)}</span>
                <span>{formatPrice(item.price, selectedCurrency)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 text-xl font-bold">
              <span>{t('common.total')}:</span>
              <span>{formatPrice(getTotalPrice(), selectedCurrency)}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="mb-6">
              <label className="block mb-2 font-semibold">{t('checkout.fullName')}</label>
              <input
                type="text"
                value={checkoutForm.name}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 text-white"
                placeholder={t('checkout.namePlaceholder')}
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-semibold">{t('checkout.email')}</label>
              <input
                type="email"
                value={checkoutForm.email}
                onChange={(e) =>
                  setCheckoutForm({ ...checkoutForm, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 text-white"
                placeholder={t('checkout.emailPlaceholder')}
              />
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold mb-2">⚠️ {t('checkout.disclaimerTitle')}</p>
              <p className="text-sm">
                {t('checkout.disclaimer')}
              </p>
            </div>

            <EnhancedButton
              variant="primary"
              onClick={handleCheckout}
              disabled={!checkoutForm.name || !checkoutForm.email}
              className="w-full"
            >
              {t('checkout.completePurchase')} - {formatPrice(getTotalPrice(), selectedCurrency)}
            </EnhancedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3 md:py-6 flex justify-between items-center gap-2 md:gap-4">
          {/* Left: Language + Currency (flex-1 to fill available space) */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <LanguageSelector />
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </div>

          {/* Center: Title (shows from sm, shrinks, hides when no space) */}
          <div className="hidden sm:flex flex-1 justify-center min-w-0 overflow-hidden transition-all duration-300">
            <div className="text-center whitespace-nowrap">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-bold">{t('hero.tagline')}</h1>
              <p className="text-xs sm:text-sm text-gray-400">Nothing Store</p>
            </div>
          </div>

          {/* Right: Cart button (flex-shrink:0 to never shrink) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="sm:hidden">
              <EnhancedButton
                variant="primary"
                onClick={() => setIsCartOpen(true)}
                className="relative !py-1.5 !px-2"
              >
                <ShoppingCart size={16} />
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </EnhancedButton>
            </div>
            <div className="hidden sm:block">
              <EnhancedButton
                variant="primary"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart size={20} />
                <span>{t('common.cart')} ({cart.length})</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </EnhancedButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {t('hero.title')}
        </h2>
        <p className="text-lg md:text-2xl text-gray-300 mb-3 md:mb-4">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
      </section>

      {/* Sales Counter Badge */}
      {mounted && (
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <div className="inline-block bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2">
            <span className="text-purple-300 font-semibold">
              🎉 {t('products.salesCounter', { count: salesCount })}
            </span>
          </div>
        </div>
      )}

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20">
        <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">{t('products.chooseYourNothing')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              inCart={cart.some((item) => item.id === product.id)}
              currency={selectedCurrency}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-400">
          <p className="mb-4 text-lg">
            {t('footer.tagline')}
          </p>
          <p className="text-sm">
            {t('footer.legal')}
          </p>
          <p className="text-xs mt-4 text-gray-500">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('checkout');
        }}
        cart={cart}
        onRemoveItem={removeFromCart}
        currency={selectedCurrency}
      />
    </div>
  );
}
