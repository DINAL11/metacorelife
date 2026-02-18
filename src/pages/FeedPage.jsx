import React, { useState, useMemo } from 'react';
import { Heart, MessageCircle, Share2, Sparkles, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengesContext';
import { fakePosts, isFakeProfileId } from '../data/fakeProfiles';
import PostCommentModal from '../components/feed/PostCommentModal';

export default function FeedPage({ onNavigate }) {
  const { isAuthenticated, user } = useAuth();
  const { allPosts, likePost, addComment, getChallengeById } = useChallenges();
  const [activeFilter, setActiveFilter] = useState('All');
  const [fakePostLikes, setFakePostLikes] = useState({});
  const [fakePostComments, setFakePostComments] = useState({});
  const [commentModalPost, setCommentModalPost] = useState(null);
  const filters = ['All', 'Health', 'Wealth', 'Relationships'];

  // Merge real posts with fake posts, sort by date (newest first)
  const mergedPosts = useMemo(() => {
    const combined = [...allPosts, ...fakePosts];
    return combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [allPosts]);

  const filteredPosts = activeFilter === 'All'
    ? mergedPosts
    : mergedPosts.filter(post => {
        if (post.challengeId) {
          const challenge = getChallengeById(post.challengeId);
          return challenge && challenge.category === activeFilter;
        }
        return false;
      });

  const handleLike = (postId, isFake) => {
    if (!isAuthenticated()) {
      alert('Please sign in to like posts');
      return;
    }
    if (isFake) {
      setFakePostLikes(prev => {
        const current = prev[postId] || [];
        const hasLiked = current.includes(user?.id);
        return {
          ...prev,
          [postId]: hasLiked ? current.filter(id => id !== user.id) : [...current, user.id]
        };
      });
    } else {
      likePost(postId);
    }
  };

  const getLikeCount = (post) => {
    if (post.isFake) {
      const base = post.likes?.length || 0;
      const userLiked = user && (fakePostLikes[post.id] || []).includes(user.id);
      return base + (userLiked ? 1 : 0);
    }
    return post.likes?.length || 0;
  };

  const isPostLiked = (post) => {
    if (!user) return false;
    if (post.isFake) {
      const userLikes = fakePostLikes[post.id] || [];
      return post.likes?.includes(user.id) || userLikes.includes(user.id);
    }
    return post.likes?.includes(user.id);
  };

  const handleViewProfile = (post) => {
    if (post.userId && isFakeProfileId(post.userId)) {
      onNavigate('userProfile', { userId: post.userId });
    }
  };

  const getCommentCount = (post) => {
    if (post.isFake) {
      const base = post.comments?.length || 0;
      const extra = fakePostComments[post.id]?.length || 0;
      return base + extra;
    }
    return post.comments?.length || 0;
  };

  const getComments = (post) => {
    if (post.isFake) {
      const base = post.comments || [];
      const extra = fakePostComments[post.id] || [];
      return [...base, ...extra];
    }
    return post.comments || [];
  };

  const handleAddComment = async (postId, text, isFake) => {
    if (!isAuthenticated()) return false;
    if (isFake) {
      setFakePostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), { userId: user.id, userName: user.fullName || 'You', text }]
      }));
      return true;
    }
    return addComment(postId, text);
  };

  const handleShare = (post) => {
    const url = `${window.location.origin}${window.location.pathname}#post-${post.id}`;
    const text = `${post.userName} on MetaCoreLife: ${post.content?.slice(0, 100)}...`;
    if (navigator.share) {
      navigator.share({
        title: 'MetaCoreLife',
        text,
        url
      }).catch(() => navigator.clipboard?.writeText(url).then(() => alert('Link copied!'))).catch(() => alert('Share unavailable'));
    } else {
      navigator.clipboard?.writeText(url).then(() => alert('Link copied to clipboard!')).catch(() => alert('Could not copy'));
    }
  };

  const handleChallengeClick = (challengeId) => {
    onNavigate('challenges', { highlightChallengeId: challengeId });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">Feed</h1>
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
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
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
            const isLiked = isAuthenticated() && isPostLiked(post);
            const isClickable = post.isFake && post.userId;

            return (
              <div key={post.id} className="bg-white rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all">
                {/* Post Header */}
                <div
                  className={`flex items-center gap-3 mb-4 ${isClickable ? 'cursor-pointer' : ''}`}
                  onClick={() => isClickable && handleViewProfile(post)}
                  onKeyDown={(e) => isClickable && (e.key === 'Enter' || e.key === ' ') && handleViewProfile(post)}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                    {post.userAvatarUrl ? (
                      <img src={post.userAvatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      post.userName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 truncate">{post.userName}</h4>
                    <p className="text-xs text-slate-500">
                      {post.userUsername && <span className="text-slate-400">@{post.userUsername} · </span>}
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
                    <button
                      onClick={(e) => { e.stopPropagation(); handleChallengeClick(challenge.id); }}
                      className="flex items-center gap-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 rounded-full hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                    >
                      <span className="text-lg">{challenge.emoji}</span>
                      <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">{challenge.title}</span>
                    </button>
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
                <p className="text-slate-800 dark:text-slate-200 mb-4 whitespace-pre-wrap break-words">{post.content}</p>

                {/* Post Type Badge */}
                {post.type === 'completion' && post.challengeId && (
                  <button
                    onClick={() => handleChallengeClick(post.challengeId)}
                    className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/40 rounded-full hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
                  >
                    <span className="text-green-700 dark:text-green-300 text-sm font-medium">✓ Challenge Completed!</span>
                  </button>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <button
                    onClick={() => handleLike(post.id, post.isFake)}
                    className={`flex items-center gap-2 transition-colors ${
                      isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500 dark:text-slate-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{getLikeCount(post)}</span>
                  </button>
                  <button
                    onClick={() => setCommentModalPost(post)}
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{getCommentCount(post)}</span>
                  </button>
                  <button
                    onClick={() => handleShare(post)}
                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400 transition-colors ml-auto"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <PostCommentModal
        isOpen={!!commentModalPost}
        onClose={() => setCommentModalPost(null)}
        post={commentModalPost}
        comments={commentModalPost ? getComments(commentModalPost) : []}
        onAddComment={handleAddComment}
        isFake={commentModalPost?.isFake}
      />
    </div>
  );
}
