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
      category: 'Health',
      description: 'Non-slip, eco-friendly yoga mat with alignment marks.',
      price: 49.99,
      image: '🧘',
      featured: true
    },
    {
      id: 2,
      name: 'Resistance Bands Set',
      category: 'Health',
      description: '5-piece resistance band set with varying resistance levels.',
      price: 29.99,
      image: '💪',
      featured: false
    },
    {
      id: 3,
      name: 'The Intelligent Investor',
      category: 'Books',
      description: "Benjamin Graham's classic book on value investing.",
      price: 24.99,
      image: '📚',
      featured: true
    },
    {
      id: 4,
      name: 'Meal Prep Containers',
      category: 'Health',
      description: 'BPA-free meal prep containers, set of 10.',
      price: 34.99,
      image: '🍱',
      featured: false
    },
    {
      id: 5,
      name: 'Meditation Cushion',
      category: 'Gear',
      description: 'Comfortable zafu meditation cushion.',
      price: 39.99,
      image: '🧘‍♀️',
      featured: false
    },
    {
      id: 6,
      name: 'Fitness Journal',
      category: 'Books',
      description: 'Track your workouts and progress.',
      price: 19.99,
      image: '📓',
      featured: false
    },
    {
      id: 7,
      name: 'Protein Powder',
      category: 'Supplements',
      description: 'Whey protein isolate, 2lbs. Perfect for post-workout recovery.',
      price: 44.99,
      image: '🥤',
      featured: false
    },
    {
      id: 8,
      name: 'Running Shoes',
      category: 'Gear',
      description: 'Lightweight running shoes with superior cushioning.',
      price: 89.99,
      image: '👟',
      featured: true
    },
    {
      id: 9,
      name: 'Atomic Habits',
      category: 'Books',
      description: 'Build good habits and break bad ones by James Clear.',
      price: 16.99,
      image: '📖',
      featured: false
    },
    {
      id: 10,
      name: 'Multivitamin Complex',
      category: 'Supplements',
      description: 'Daily multivitamin with essential vitamins and minerals.',
      price: 24.99,
      image: '💊',
      featured: false
    },
    {
      id: 11,
      name: 'Water Bottle',
      category: 'Gear',
      description: 'Insulated stainless steel water bottle, 32oz.',
      price: 29.99,
      image: '💧',
      featured: false
    },
    {
      id: 12,
      name: 'Dumbbell Set',
      category: 'Gear',
      description: 'Adjustable dumbbell set, 5-50lbs per dumbbell.',
      price: 149.99,
      image: '🏋️',
      featured: false
    },
    {
      id: 13,
      name: 'Omega-3 Supplements',
      category: 'Supplements',
      description: 'High-quality fish oil capsules, 120 count.',
      price: 19.99,
      image: '🐟',
      featured: false
    },
    {
      id: 14,
      name: 'The 7 Habits of Highly Effective People',
      category: 'Books',
      description: 'Classic self-help book by Stephen Covey.',
      price: 15.99,
      image: '📗',
      featured: false
    },
    {
      id: 15,
      name: 'Foam Roller',
      category: 'Gear',
      description: 'High-density foam roller for muscle recovery.',
      price: 24.99,
      image: '🎯',
      featured: false
    }
  ];

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter(p => {
        const filterLower = activeFilter.toLowerCase();
        const categoryLower = p.category.toLowerCase();
        return categoryLower === filterLower || 
               (filterLower === 'health' && categoryLower === 'health') ||
               (filterLower === 'books' && categoryLower === 'books') ||
               (filterLower === 'gear' && categoryLower === 'gear') ||
               (filterLower === 'supplements' && categoryLower === 'supplements');
      });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">Marketplace</h1>
        </div>
        <p className="text-sm md:text-base text-slate-600 text-center">Curated products to support your growth journey</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm md:text-base ${
              activeFilter === filter
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            {product.featured && (
              <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 flex items-center gap-1 w-fit rounded-br-xl">
                ⭐ Featured
              </div>
            )}
            <div className="h-40 md:h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-5xl md:text-6xl">
              {product.image}
            </div>
            <div className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-base md:text-lg text-slate-800 flex-1">{product.name}</h3>
                <span className="inline-block px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium whitespace-nowrap">
                  {product.category.toLowerCase()}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl md:text-2xl font-bold text-slate-800">${product.price}</span>
                <button 
                  onClick={() => addToCart(product)}
                  className="px-3 md:px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-xs md:text-sm flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}