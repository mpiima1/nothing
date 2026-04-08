import React, { useState } from 'react';
import { ShoppingCart, Package, Check, Camera } from 'lucide-react';

export default function NothingStore() {
  const [cart, setCart] = useState([]);
  const [view, setView] = useState('store');
  const [orderData, setOrderData] = useState(null);

  const products = [
    {
      id: 1,
      name: "Premium Nothing",
      price: 9.99,
      description: "Our flagship product. Absolutely nothing, but make it premium.",
      features: ["100% invisible", "Zero calories", "Infinite shelf life", "Hypoallergenic"]
    },
    {
      id: 2,
      name: "Deluxe Nothing",
      price: 24.99,
      description: "Nothing, but fancier. For the discerning consumer.",
      features: ["Artisanal emptiness", "Hand-crafted void", "Limited edition", "Certificate of authenticity"]
    },
    {
      id: 3,
      name: "Ultimate Nothing",
      price: 99.99,
      description: "The apex of nothingness. Pure absence in its final form.",
      features: ["Quantum-grade vacuum", "Philosophical implications included", "VIP nothing experience", "Personalized photo shoot"]
    },
    {
      id: 4,
      name: "Starter Nothing",
      price: 2.99,
      description: "Perfect for nothing beginners. Dip your toes into the void.",
      features: ["Entry-level emptiness", "Digital certificate", "Instagram-worthy", "Great conversation starter"]
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });

  const handleCheckout = () => {
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
  };

  const generateRandomPhoto = () => {
    const scenarios = [
      { bg: 'bg-gradient-to-br from-purple-400 to-pink-500', text: 'Your Nothing being carefully packaged' },
      { bg: 'bg-gradient-to-br from-blue-400 to-cyan-500', text: 'Quality control inspection of your Nothing' },
      { bg: 'bg-gradient-to-br from-green-400 to-emerald-500', text: 'Your Nothing in our state-of-the-art facility' },
      { bg: 'bg-gradient-to-br from-orange-400 to-red-500', text: 'Final preparations before shipping your Nothing' },
      { bg: 'bg-gradient-to-br from-indigo-400 to-purple-500', text: 'Your Nothing passing through security' }
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  };

  if (view === 'confirmation' && orderData) {
    const photo = generateRandomPhoto();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-green-500 rounded-full mb-4">
              <Check size={48} />
            </div>
            <h1 className="text-5xl font-bold mb-4">Congratulations!</h1>
            <p className="text-2xl text-gray-300">You've Successfully Purchased Nothing</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2 text-lg">
              <p><span className="text-gray-400">Order ID:</span> {orderData.orderId}</p>
              <p><span className="text-gray-400">Date:</span> {orderData.date}</p>
              <p><span className="text-gray-400">Total:</span> ${orderData.total}</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Camera size={24} />
              <h2 className="text-2xl font-bold">Exclusive Photo Documentation</h2>
            </div>
            <div className={`${photo.bg} rounded-xl p-12 mb-4 min-h-64 flex items-center justify-center`}>
              <div className="text-center">
                <Package size={80} className="mx-auto mb-4 opacity-20" />
                <p className="text-2xl font-semibold opacity-40">[ NOTHING CAPTURED ]</p>
              </div>
            </div>
            <p className="text-center text-gray-300 italic">{photo.text}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">What You've Received:</h2>
            <ul className="space-y-3">
              {orderData.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="text-gray-400">${item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center text-gray-400 italic">
            <p className="mb-4">A confirmation email with your Certificate of Nothing has been sent to {orderData.email}</p>
            <p className="text-sm">Thank you for supporting this absurd experiment. Your nothing means everything to us. 💜</p>
          </div>

          <button
            onClick={() => setView('store')}
            className="w-full mt-8 bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-semibold transition-colors"
          >
            Buy More Nothing
          </button>
        </div>
      </div>
    );
  }

  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setView('store')}
            className="mb-6 text-purple-300 hover:text-purple-100 transition-colors"
          >
            ← Back to Store
          </button>
          
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Your Nothing</h2>
            {cart.map(item => (
              <div key={item.cartId} className="flex justify-between items-center py-3 border-b border-white/10">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 text-xl font-bold">
              <span>Total:</span>
              <span>${getTotalPrice()}</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Full Name</label>
              <input
                type="text"
                value={checkoutForm.name}
                onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="John Doe"
              />
            </div>
            
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={checkoutForm.email}
                onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                placeholder="john@example.com"
              />
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold mb-2">⚠️ Legal Disclaimer</p>
              <p className="text-sm">By proceeding, you acknowledge that you are literally purchasing NOTHING. No physical or digital product will be delivered except a certificate and photo documentation. This is performance art / social experiment. All sales are final because... well, there's nothing to return.</p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={!checkoutForm.name || !checkoutForm.email}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Complete Purchase of Nothing - ${getTotalPrice()}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg sticky top-0 z-50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Nothing Store</h1>
            <p className="text-sm text-gray-400">Premium Nothing. Delivered.</p>
          </div>
          <button
            onClick={() => setView('checkout')}
            className="relative bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Cart ({cart.length})</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Buy Absolutely Nothing
        </h2>
        <p className="text-2xl text-gray-300 mb-4">
          The revolutionary e-commerce platform selling what you never knew you needed.
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          This is not a scam. This is performance art. This is social commentary. This is your chance to own a piece of conceptual absurdity. 100% transparent. 100% nothing.
        </p>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-8 pb-20">
        <h3 className="text-3xl font-bold mb-12 text-center">Choose Your Nothing</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-purple-500 transition-all hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl h-48 mb-6 flex items-center justify-center">
                <Package size={64} className="opacity-30" />
              </div>
              <h4 className="text-2xl font-bold mb-2">{product.name}</h4>
              <p className="text-3xl font-bold text-purple-400 mb-4">${product.price}</p>
              <p className="text-gray-300 mb-4">{product.description}</p>
              <ul className="text-sm text-gray-400 space-y-2 mb-6">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check size={16} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center text-gray-400">
          <p className="mb-4 text-lg">
            The Nothing Store - A bold experiment in absurdist capitalism
          </p>
          <p className="text-sm">
            All purchases are non-refundable (obviously). You are literally buying nothing. This is 100% transparent. Proceeds will fund the creator's next big idea. Thank you for being part of something beautifully meaningless.
          </p>
          <p className="text-xs mt-4 text-gray-500">
            © 2024 Nothing Store. All rights (to nothing) reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}