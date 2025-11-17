import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Health', 'Books', 'Gear', 'Supplements'];
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Premium Yoga Mat',
      category: 'health',
      description: 'Non-slip, eco-friendly yoga mat with alignment marks.',
      price: 49.99,
      image: '🧘',
      featured: true
    },
    {
      id: 2,
      name: 'Resistance Bands Set',
      category: 'health',
      description: '5-piece resistance band set with varying resistance levels.',
      price: 29.99,
      image: '💪',
      featured: false
    },
    {
      id: 3,
      name: 'The Intelligent Investor',
      category: 'books',
      description: "Benjamin Graham's classic book on value investing.",
      price: 24.99,
      image: '📚',
      featured: true
    },
    {
      id: 4,
      name: 'Meal Prep Containers',
      category: 'health',
      description: 'BPA-free meal prep containers, set of 10.',
      price: 34.99,
      image: '🍱',
      featured: false
    },
    {
      id: 5,
      name: 'Meditation Cushion',
      category: 'gear',
      description: 'Comfortable zafu meditation cushion.',
      price: 39.99,
      image: '🧘‍♀️',
      featured: false
    },
    {
      id: 6,
      name: 'Fitness Journal',
      category: 'books',
      description: 'Track your workouts and progress.',
      price: 19.99,
      image: '📓',
      featured: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-cyan-600">Marketplace</h1>
        </div>
        <p className="text-slate-600">Curated products to support your growth journey</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            {product.featured && (
              <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 flex items-center gap-1 w-fit rounded-br-xl">
                ⭐ Featured
              </div>
            )}
            <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-6xl">
              {product.image}
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-800 mb-1">{product.name}</h3>
              <span className="inline-block px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium mb-2">
                {product.category}
              </span>
              <p className="text-sm text-slate-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl font-bold text-slate-800">${product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}