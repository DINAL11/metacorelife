import React, { useState } from 'react';
import { LogOut, Trophy, Calendar, Award, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengesContext';
import LoginModal from '../components/auth/LoginModal';
import EditProfileModal from '../components/profile/EditProfileModal';
import CelebrationModal from '../components/challenges/CelebrationModal';
import BadgeDetailModal from '../components/badges/BadgeDetailModal';

export default function ProfilePage({ onNavigate }) {
  const { user, logout, isAuthenticated, updateProfile } = useAuth();
  const { userPosts, getOngoingChallenges, getCompletedChallenges, getBadges, getChallengeById, updateChallengeProgress, createPost } = useChallenges();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [celebration, setCelebration] = useState(null); // { challengeTitle, challengeBadge }
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'challenges', 'posts'

  const handleLogout = () => {
    logout();
    onNavigate('welcome');
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
  };

  if (!isAuthenticated()) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
            👤
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome!</h2>
          <p className="text-slate-600 mb-6">Sign in to track your progress, join challenges, and connect with the community</p>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Sign In / Register
            </button>
            <p className="text-sm text-slate-500">
              Or continue exploring as a guest
            </p>
          </div>
        </div>
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  const ongoingChallenges = getOngoingChallenges();
  const completedChallenges = getCompletedChallenges();
  const badges = getBadges();
  const userPostsList = userPosts.filter(p => p.userId === user.id);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
            ) : (
              user.fullName.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">{user.fullName}</h2>
            <p className="text-slate-600 text-sm truncate">{user.email}</p>
            {user.bio && (
              <p className="text-slate-600 text-sm mt-2 line-clamp-2">{user.bio}</p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowEditProfile(true)}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Edit Profile"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600">{userPostsList.length}</div>
            <div className="text-sm text-slate-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{completedChallenges.length}</div>
            <div className="text-sm text-slate-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{badges.length}</div>
            <div className="text-sm text-slate-500">Badges</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'challenges'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'posts'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Posts
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Badges - certificate-style, clickable */}
          {badges.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-slate-800">Badges Earned</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.map((badge, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedBadge(badge)}
                    className="text-left rounded-2xl p-4 border-2 border-cyan-100 bg-gradient-to-br from-cyan-50/80 to-purple-50/80 hover:border-cyan-300 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <div className="text-4xl mb-2">{badge.badge}</div>
                    <p className="text-sm font-semibold text-slate-800 line-clamp-2">{badge.challengeTitle}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {badge.completedDate ? new Date(badge.completedDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : ''}
                    </p>
                    <span className="text-xs text-cyan-600 font-medium mt-2 inline-block">View details →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ongoing Challenges */}
          {ongoingChallenges.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-cyan-500" />
                <h3 className="text-lg font-bold text-slate-800">Active Challenges</h3>
              </div>
              <div className="space-y-3">
                {ongoingChallenges.slice(0, 3).map(uc => {
                  const challenge = getChallengeById(uc.challengeId);
                  if (!challenge) return null;
                  const progress = (uc.currentDay / challenge.duration) * 100;
                  return (
                    <div key={uc.id} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{challenge.emoji}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">{challenge.title}</h4>
                          <p className="text-xs text-slate-500">Day {uc.currentDay} of {challenge.duration} • Streak: {uc.streak}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-slate-500">
                          Last check-in:{' '}
                          {uc.lastUpdateDate
                            ? new Date(uc.lastUpdateDate).toLocaleDateString()
                            : 'Not yet'}
                        </p>
                        <button
                          type="button"
                          onClick={async () => {
                            const result = await updateChallengeProgress(uc.id);
                            if (result.completedChallenge) {
                              setCelebration(result.completedChallenge);
                            } else if (!result.success) {
                              alert('You already logged progress for today or this challenge is completed.');
                            }
                          }}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors"
                        >
                          Log today&apos;s progress
                        </button>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {/* Ongoing */}
          {ongoingChallenges.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Ongoing Challenges</h3>
              <div className="space-y-3">
                {ongoingChallenges.map(uc => {
                  const challenge = getChallengeById(uc.challengeId);
                  if (!challenge) return null;
                  const progress = (uc.currentDay / challenge.duration) * 100;
                  return (
                    <div key={uc.id} className="bg-white rounded-3xl p-5 shadow-sm border-l-4 border-cyan-400">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{challenge.emoji}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 mb-1">{challenge.title}</h4>
                          <p className="text-sm text-slate-600 mb-3">{challenge.description}</p>
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                              <span>Day {uc.currentDay} of {challenge.duration}</span>
                              <span>🔥 Streak: {uc.streak} days</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-slate-500">
                              Last check-in:{' '}
                              {uc.lastUpdateDate
                                ? new Date(uc.lastUpdateDate).toLocaleDateString()
                                : 'Not yet'}
                            </p>
                            <button
                              type="button"
                              onClick={async () => {
                                const result = await updateChallengeProgress(uc.id);
                                if (result.completedChallenge) {
                                  setCelebration(result.completedChallenge);
                                } else if (!result.success) {
                                  alert('You already logged progress for today or this challenge is completed.');
                                }
                              }}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors"
                            >
                              Log today&apos;s progress
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Completed */}
          {completedChallenges.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Completed Challenges
              </h3>
              <div className="space-y-3">
                {completedChallenges.map(uc => {
                  const challenge = getChallengeById(uc.challengeId);
                  const title = challenge?.title || 'Challenge';
                  const badge = challenge?.badge || '🏆';
                  const emoji = challenge?.emoji || '✓';
                  return (
                    <div key={uc.id} className="bg-white rounded-3xl p-5 shadow-sm border-l-4 border-green-400">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
                          <p className="text-sm text-slate-600 mb-2">
                            Completed on {uc.lastUpdateDate ? new Date(uc.lastUpdateDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : '—'}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl" title="Earned badge">{badge}</span>
                            <span className="text-xs text-slate-500">Badge earned</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {ongoingChallenges.length === 0 && completedChallenges.length === 0 && (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
              <p className="text-slate-600 mb-4">You haven't joined any challenges yet</p>
              <button
                onClick={() => onNavigate('challenges')}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Browse Challenges
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'posts' && (
        <div className="space-y-4">
          {userPostsList.length > 0 ? (
            userPostsList.map(post => (
              <div key={post.id} className="bg-white rounded-3xl p-5 shadow-sm">
                {post.mediaUrl && (
                  <div className="mb-3 rounded-2xl overflow-hidden border border-slate-100 bg-black/5">
                    {post.mediaType === 'video' ? (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="w-full max-h-[360px] object-contain bg-black"
                      />
                    ) : (
                      <img
                        src={post.mediaUrl}
                        alt="Post media"
                        className="w-full max-h-[360px] object-cover"
                      />
                    )}
                  </div>
                )}
                <p className="text-slate-800 mb-3 whitespace-pre-wrap break-words">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.type === 'completion' && <span className="text-green-600">✓ Challenge Completed</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
              <p className="text-slate-600 mb-4">You haven't posted anything yet</p>
              <button
                onClick={() => onNavigate('create')}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Create Your First Post
              </button>
            </div>
          )}
        </div>
      )}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={user}
        onSave={async (updates) => {
          const mapped = {};
          if (updates.full_name !== undefined) mapped.full_name = updates.full_name;
          if (updates.bio !== undefined) mapped.bio = updates.bio;
          if (updates.avatar_url !== undefined) mapped.avatar_url = updates.avatar_url;
          return updateProfile(mapped);
        }}
      />
      <CelebrationModal
        isOpen={!!celebration}
        onClose={() => setCelebration(null)}
        userName={user?.fullName}
        challengeTitle={celebration?.challengeTitle}
        challengeBadge={celebration?.challengeBadge}
      />
      <BadgeDetailModal
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
        badge={selectedBadge}
        userName={user?.fullName}
        onShareToFeed={async () => {
          if (!selectedBadge || !user) return;
          const msg = `🎉 I earned the ${selectedBadge.challengeTitle} badge on MetaCoreLife! Completed on ${selectedBadge.completedDate ? new Date(selectedBadge.completedDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : ''}.`;
          await createPost(msg, selectedBadge.challengeId, 'completion', null);
          setSelectedBadge(null);
          onNavigate('feed');
        }}
      />
    </div>
  );
}