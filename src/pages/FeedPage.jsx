import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Health', 'Wealth', 'Love'];

  return (
    <div className="max-w-2xl mx-auto">
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

      <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-400 rounded-full"></div>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No posts yet</h3>
        <p className="text-slate-600 mb-6">
          Be the first to share your journey! Post an update<br />
          about your progress or start a challenge.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto">
          <Sparkles className="w-4 h-4" />
          Create Your First Post
        </button>
      </div>
    </div>
  );
}