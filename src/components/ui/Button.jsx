import React from 'react';
import { Loader2 } from "lucide-react"; // For loading states

export default function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md", 
  isLoading = false,
  disabled = false,
  className = "", 
  icon: Icon, // Accepts a Lucide icon component
  ...props 
}) {
  
  // 1. Base Structure
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none disabled:grayscale";

  // 2. Style Variants
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 border border-indigo-400/20",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700",
    ghost: "bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white",
    danger: "bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white",
  };

  // 3. Size Variations
  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-3",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'}`} />}
          {children}
        </>
      )}
    </button>
  );
}