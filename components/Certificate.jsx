/**
 * Certificate - Satirical PDF certificate display and download
 * 
 * Creates the ultimate proof of purchase for the ultimate purchase: nothing.
 * The certificate itself is the only physical thing you get.
 * 
 * [ NOTHING CAPTURED ] is the visual punchline
 */

'use client';

import { useState, useCallback } from 'react';
import { Download, Check, Star, Shield, Clock } from 'lucide-react';
import { generateCertificatePDF } from '../lib/pdf';
import { formatPrice } from '../lib/currency';

export default function Certificate({ order, currency = 'USD' }) {
  const [downloaded, setDownloaded] = useState(false);
  
  // Generate random photo for visual
  const photo = {
    bg: 'bg-gradient-to-br from-purple-400 to-pink-500',
    text: 'Your Nothing being carefully packaged'
  };
  
  const handleDownload = useCallback(() => {
    const doc = generateCertificatePDF(order, currency);
    const fileName = `NOTHING-CERTIFICATE-${order.orderId}.pdf`;
    doc.save(fileName);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }, [order, currency]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-green-500 rounded-full mb-4 animate-float">
            <Check size={48} />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-300">
            You have purchased absolutely nothing
          </p>
        </div>
        
        {/* Certificate Visual */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <div className={`aspect-video ${photo.bg} rounded-xl mb-6 flex items-center justify-center`}>
            <div className="text-center text-white">
              <Package size={64} className="mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-4">
                {photo.text}
              </h3>
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur rounded-full">
                <span className="text-sm">
                  Order #{order.orderId}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Check size={16} className="text-green-400" />
                <span className="text-sm text-gray-400">Verified</span>
              </div>
              <p className="text-sm text-white">
                {order.items[0]?.name || 'Nothing'}
              </p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield size={16} className="text-blue-400" />
                <span className="text-sm text-gray-400">Authentic</span>
              </div>
              <p className="text-sm text-white">
                {order.orderId}
              </p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={16} className="text-purple-400" />
                <span className="text-sm text-gray-400">Purchased</span>
              </div>
              <p className="text-sm text-white">
                {order.date}
              </p>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star size={16} className="text-yellow-400" />
                <span className="text-sm text-gray-400">Value</span>
              </div>
              <p className="text-sm text-white">
                {formatPrice(parseFloat(order.total), currency)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Download Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleDownload}
            disabled={downloaded}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-bold text-lg shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloaded ? (
              <>
                <Check size={24} />
                Certificate Downloaded!
              </>
            ) : (
              <>
                <Download size={24} />
                Download PDF Certificate
              </>
            )}
          </button>
          
          <p className="mt-4 text-sm text-gray-400">
            {downloaded 
              ? "Your certificate is ready. Print it on transparent paper for authenticity."
              : "Download your official proof of purchase. Includes [ NOTHING CAPTURED ]."
            }
          </p>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Purchased by:</span>
              <span className="text-white font-semibold">{order.name}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Email:</span>
              <span className="text-white">{order.email}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Items:</span>
              <span className="text-white">
                {order.items.length} item(s)
              </span>
            </div>
            
            <div className="flex justify-between text-sm pt-2 border-t border-white/10">
              <span className="text-gray-400">Total:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {formatPrice(parseFloat(order.total), currency)}
              </span>
            </div>
          </div>
          
          <div className="text-center bg-purple-500/20 p-3 rounded-lg mt-6">
            <span className="text-sm text-purple-300">
              <strong>[ NOTHING CAPTURED ]</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Certificate.displayName = 'Certificate';
