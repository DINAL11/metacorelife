import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Sparkles, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengesContext';

export default function FeedPage({ onNavigate }) {
  const { isAuthenticated, user } = useAuth();
  const { allPosts, likePost, getChallengeById } = useChallenges();
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Health', 'Wealth', 'Relationships'];

  // Sort posts by date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredPosts = activeFilter === 'All'
    ? sortedPosts
    : sortedPosts.filter(post => {
        if (post.challengeId) {
          const challenge = getChallengeById(post.challengeId);
          return challenge && challenge.category === activeFilter;
        }
        return false;
      });

  const handleLike = (postId) => {
    if (!isAuthenticated()) {
      alert('Please sign in to like posts');
      return;
    }
    likePost(postId);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Feed</h1>
        {isAuthenticated() && onNavigate && (
          <button
            onClick={() => onNavigate('create')}
            className="p-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
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

      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No posts yet</h3>
          <p className="text-sm md:text-base text-slate-600 mb-6">
            Be the first to share your journey! Post an update<br className="hidden md:block" />
            about your progress or start a challenge.
          </p>
          {isAuthenticated() && onNavigate ? (
            <button
              onClick={() => onNavigate('create')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Create Your First Post
            </button>
          ) : (
            <p className="text-sm text-slate-500">Sign in to create posts</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => {
            const challenge = post.challengeId ? getChallengeById(post.challengeId) : null;
            const isLiked = isAuthenticated() && user && post.likes.includes(user.id);

            return (
              <div key={post.id} className="bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{post.userName}</h4>
                    <p className="text-xs text-slate-500">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {challenge && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-100 rounded-full">
                      <span className="text-lg">{challenge.emoji}</span>
                      <span className="text-xs font-medium text-cyan-700">{challenge.title}</span>
                    </div>
                  )}
                </div>

                {/* Media */}
                {post.mediaUrl && (
                  <div className="mb-4 rounded-2xl overflow-hidden border border-slate-100 bg-black/5">
                    {post.mediaType === 'video' ? (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="w-full max-h-[420px] object-contain bg-black"
                      />
                    ) : (
                      <img
                        src={post.mediaUrl}
                        alt="Post media"
                        className="w-full max-h-[420px] object-cover"
                      />
                    )}
                  </div>
                )}

                {/* Post Content */}
                <p className="text-slate-800 mb-4 whitespace-pre-wrap break-words">{post.content}</p>

                {/* Post Type Badge */}
                {post.type === 'completion' && (
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                    <span className="text-green-700 text-sm font-medium">✓ Challenge Completed!</span>
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{post.likes.length}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments?.length || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-600 transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
