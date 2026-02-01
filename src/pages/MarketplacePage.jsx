import React from 'react';
import { ShoppingBag, Sparkles, Heart } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="max-w-2xl mx-auto min-h-[60vh] flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-3xl mb-6 shadow-xl">
          <ShoppingBag className="w-10 h-10 md:w-12 md:h-12 text-white" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-2 max-w-md mx-auto">
          Get personalized, handpicked products to support your Core Life.
        </p>
        <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
          We&apos;re curating the best gear, books, and tools for your health, wealth, and relationships—all in one place.
        </p>
        <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            Curated for you
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-pink-500" />
            Growth-focused
          </span>
        </div>
      </div>
    </div>
  );
}
