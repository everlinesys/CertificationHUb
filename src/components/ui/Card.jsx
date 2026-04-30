import React from 'react';

/**
 * @param {string} className - Additional Tailwind classes for layout/spacing
 * @param {boolean} hoverable - Whether the card should animate on hover
 * @param {function} onClick - Optional click handler
 */
export default function Card({ 
  children, 
  className = "", 
  hoverable = true, 
  onClick,
  ...props 
}) {
  const baseStyles = "bg-zinc-900 border border-zinc-800 p-6 rounded-2xl overflow-hidden relative";
  
  const interactionStyles = hoverable 
    ? "cursor-pointer transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/80 hover:shadow-2xl hover:shadow-indigo-500/10 group" 
    : "";

  return (
    <div 
      onClick={onClick}
      className={`${baseStyles} ${interactionStyles} ${className}`}
      {...props}
    >
      {/* Decorative Shine (Only visible on hover if hoverable) */}
      {hoverable && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
      
      {/* Inner Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}