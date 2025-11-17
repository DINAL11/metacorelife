import React, { useState } from 'react';
import { Target } from 'lucide-react';

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Health', 'Wealth', 'Love'];

  const challenges = [
    {
      id: 1,
      title: '21-Day Morning Routine',
      emoji: '🌅',
      category: 'health',
      level: 'beginner',
      description: 'Start your day right with a consistent morning routine. Wake up at the same time, hydrate, stretch, and set intentions for the day.',
      duration: '21 days',
      participants: 1248
    },
    {
      id: 2,
      title: '30-Day Fitness Journey',
      emoji: '💪',
      category: 'health',
      level: 'intermediate',
      description: 'Commit to 30 minutes of exercise daily. Move your body and feel the transformation.',
      duration: '30 days',
      participants: 2134
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-cyan-600">Challenges</h1>
        </div>
        <p className="text-slate-600">Join challenges and track your progress</p>
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

      <div className="space-y-4">
        {challenges.map(challenge => (
          <div key={challenge.id} className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-cyan-400 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{challenge.emoji}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{challenge.title}</h3>
                <div className="flex gap-2 mb-3">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                    {challenge.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {challenge.level}
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{challenge.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span>📅 {challenge.duration}</span>
                  <span>👥 {challenge.participants}</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}