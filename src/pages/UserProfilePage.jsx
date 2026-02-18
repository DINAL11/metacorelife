import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Award } from 'lucide-react';
import { getFakeProfileById, getFakePostsByUserId, getFakeProfileBadges, isFakeProfileId } from '../data/fakeProfiles';
import { useChallenges } from '../context/ChallengesContext';
import { supabase } from '../lib/supabase';

export default function UserProfilePage({ userId, onBack, onNavigate }) {
  const { getChallengeById } = useChallenges();
  const isFake = isFakeProfileId(userId);
  const [realProfile, setRealProfile] = useState(null);
  const [realPosts, setRealPosts] = useState([]);
  const [realChallenges, setRealChallenges] = useState([]);

  useEffect(() => {
    if (!isFake && userId) {
      const load = async () => {
        const { data: p } = await supabase.from('profiles').select('id, full_name, username, bio, avatar_url, is_public').eq('id', userId).single();
        setRealProfile(p);
        const { data: posts } = await supabase.from('posts').select('*').eq('user_id', userId).order('created_at', { ascending: false });
        setRealPosts((posts || []).map(x => ({ ...x, userId: x.user_id, userName: x.user_name, challengeId: x.challenge_id, createdAt: x.created_at, mediaUrl: x.media_url, mediaType: x.media_type })));
        const { data: uc } = await supabase.from('user_challenges').select('*').eq('user_id', userId);
        setRealChallenges(uc || []);
      };
      load();
    }
  }, [isFake, userId]);

  const profile = isFake ? getFakeProfileById(userId) : realProfile;
  const posts = isFake ? getFakePostsByUserId(userId) : realPosts;
  const fakeBadges = getFakeProfileBadges(userId) || [];
  const realBadges = realChallenges.filter(c => c.completed).map(c => {
    const ch = getChallengeById(c.challenge_id);
    return { challengeId: c.challenge_id, challengeTitle: ch?.title, badge: ch?.badge || '🏆', completedDate: c.last_update_date };
  });
  const badges = isFake ? fakeBadges : realBadges;

  const fullName = profile?.full_name ?? profile?.fullName;
  const username = profile?.username;
  const avatarUrl = profile?.avatar_url ?? profile?.avatarUrl;
  const bio = profile?.bio;

  if (!profile && !isFake) {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-sm">
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-sm">
          <p className="text-slate-600 dark:text-slate-400">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-400 mb-6 font-medium">
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center">
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-slate-400">{(fullName || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{fullName}</h2>
            {username && <p className="text-slate-500 dark:text-slate-400 text-sm">@{username}</p>}
            {bio && <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{bio}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{profile.postsCount ?? posts.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{badges.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Badges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">—</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">Following</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" />
            Badges Earned
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((b, i) => {
              const ch = getChallengeById(b.challengeId);
              const title = b.challengeTitle || ch?.title || 'Challenge';
              return (
                <button
                  key={i}
                  onClick={() => ch && onNavigate('challenges', { highlightChallengeId: b.challengeId })}
                  className="text-left rounded-2xl p-4 border-2 border-cyan-100 dark:border-cyan-900/50 bg-gradient-to-br from-cyan-50/80 to-purple-50/80 dark:from-cyan-900/20 dark:to-purple-900/20 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all"
                >
                  <div className="text-4xl mb-2">{b.badge}</div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">{title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {b.completedDate ? new Date(b.completedDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : ''}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Posts
        </h3>
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center shadow-sm">
            <p className="text-slate-600 dark:text-slate-400">No posts yet</p>
          </div>
        ) : (
          posts.map((post) => {
            const challenge = post.challengeId ? getChallengeById(post.challengeId) : null;
            return (
              <div key={post.id} className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm">
                {post.mediaUrl && (
                  <div className="mb-4 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 bg-black/5">
                    {post.mediaType === 'video' ? (
                      <video src={post.mediaUrl} controls className="w-full max-h-[420px] object-contain bg-black" />
                    ) : (
                      <img src={post.mediaUrl} alt="Post" className="w-full max-h-[420px] object-cover" />
                    )}
                  </div>
                )}
                <p className="text-slate-800 dark:text-slate-200 mb-3 whitespace-pre-wrap break-words">{post.content}</p>
                {challenge && (
                  <button
                    onClick={() => onNavigate('challenges', { highlightChallengeId: post.challengeId })}
                    className="flex items-center gap-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 rounded-full w-fit mb-3 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                  >
                    <span className="text-lg">{challenge.emoji}</span>
                    <span className="text-xs font-medium text-cyan-700 dark:text-cyan-300">{challenge.title}</span>
                  </button>
                )}
                <p className="text-xs text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                  {post.type === 'completion' && ' • ✓ Challenge Completed'}
                </p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-sm text-slate-500">
                  <span>❤️ {post.likes?.length || 0} likes</span>
                  <span>💬 {post.comments?.length || 0} comments</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
