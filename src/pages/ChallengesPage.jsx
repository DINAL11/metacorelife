import React, { useState, useEffect, useRef } from 'react';
import { Target, CheckCircle, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengesContext';

export default function ChallengesPage({ highlightChallengeId }) {
  const { isAuthenticated } = useAuth();
  const { allChallenges, joinChallenge, userChallenges, getOngoingChallenges } = useChallenges();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Health', 'Wealth', 'Relationships'];

  const ongoingChallengeIds = new Set(getOngoingChallenges().map(uc => uc.challengeId));
  const challengeRefs = useRef({});

  useEffect(() => {
    if (highlightChallengeId && challengeRefs.current[highlightChallengeId]) {
      challengeRefs.current[highlightChallengeId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightChallengeId]);

  const filteredChallenges = activeFilter === 'All'
    ? allChallenges
    : allChallenges.filter(c => c.category === activeFilter);

  const handleJoinChallenge = async (challengeId) => {
    if (!isAuthenticated()) {
      alert('Please sign in to join challenges');
      return;
    }

    const ok = await joinChallenge(challengeId);
    if (ok) {
      alert('Challenge joined! Start tracking your progress in Profile.');
    } else {
      if (ongoingChallengeIds.has(challengeId)) {
        alert('You are already participating in this challenge!');
      } else {
        alert('Failed to join challenge. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-cyan-600">Challenges</h1>
        </div>
        <p className="text-sm md:text-base text-slate-600">Join challenges and track your progress</p>
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

      <div className="space-y-4">
        {filteredChallenges.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <p className="text-slate-600">No challenges found in this category</p>
          </div>
        ) : (
          filteredChallenges.map(challenge => {
            const isJoined = ongoingChallengeIds.has(challenge.id);
            const userChallenge = userChallenges.find(uc => uc.challengeId === challenge.id && !uc.completed);
            const progress = userChallenge ? (userChallenge.currentDay / challenge.duration) * 100 : 0;

            return (
              <div
                key={challenge.id}
                ref={el => challengeRefs.current[challenge.id] = el}
                className={`bg-white dark:bg-slate-800 rounded-3xl p-4 md:p-6 shadow-sm border-t-4 hover:shadow-md transition-all ${
                  highlightChallengeId === challenge.id
                    ? 'border-cyan-500 ring-2 ring-cyan-400/50 dark:ring-cyan-500/50'
                    : 'border-cyan-400 dark:border-slate-600'
                }`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="text-3xl md:text-4xl flex-shrink-0">{challenge.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">{challenge.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 md:px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                        {challenge.category}
                      </span>
                      <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {challenge.level}
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-slate-600 mb-4">{challenge.description}</p>
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-500 mb-4">
                      <span>📅 {challenge.duration} days</span>
                      <span>👥 {challenge.participants.toLocaleString()} participants</span>
                      {userChallenge && (
                        <>
                          <span className="flex items-center gap-1">
                            <Flame className="w-4 h-4 text-orange-500" />
                            {userChallenge.streak} day streak
                          </span>
                        </>
                      )}
                    </div>

                    {/* Progress Bar (if joined) */}
                    {isJoined && userChallenge && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Day {userChallenge.currentDay} of {challenge.duration}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => handleJoinChallenge(challenge.id)}
                      disabled={isJoined}
                      className={`w-full py-2 md:py-3 rounded-xl font-semibold transition-all text-sm md:text-base ${
                        isJoined
                          ? 'bg-green-100 text-green-700 cursor-not-allowed flex items-center justify-center gap-2'
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                          Joined
                        </>
                      ) : (
                        'Join Challenge'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
