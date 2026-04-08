/**
 * EnhancedButton - Reusable button with hover glow effects
 * 
 * Consistent call-to-action styling across the Nothing Store.
 * All buttons use the same satirical marketing tone.
 */

'use client';

import React from 'react';

export default function EnhancedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '',
  ...props 
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/50',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-purple-500',
    accent: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-blue-500/50',
    outline: 'bg-transparent border-2 border-purple-500 hover:bg-purple-500/20 text-purple-400'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

EnhancedButton.displayName = 'EnhancedButton';
