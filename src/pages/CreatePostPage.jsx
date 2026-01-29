import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChallenges } from '../context/ChallengesContext';

export default function CreatePostPage({ onNavigate }) {
  const { isAuthenticated } = useAuth();
  const { createPost, getOngoingChallenges, updateChallengeProgress, getChallengeById } = useChallenges();
  const [content, setContent] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [postType, setPostType] = useState('general'); // 'general', 'update', 'completion'
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated()) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to create posts</p>
          <button
            onClick={() => onNavigate('profile')}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  const ongoingChallenges = getOngoingChallenges();

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setMediaFile(null);
      setMediaPreview(null);
      return;
    }

    // Simple validation: allow images and videos only
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Please select an image or video file');
      return;
    }

    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;
    if (submitting) return;

    setSubmitting(true);

    try {
      let media = null;

      // Upload media if provided
      if (mediaFile) {
        try {
          // Lazy import to avoid circular deps
          const { supabase } = await import('../lib/supabase');
          const fileExt = mediaFile.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
          const filePath = `posts/${fileName}`;

          const { data, error } = await supabase.storage
            .from('post-media')
            .upload(filePath, mediaFile, {
              contentType: mediaFile.type,
              upsert: false
            });

          if (error) {
            console.error('Error uploading media:', error);
            alert('Could not upload media. Posting without media.');
          } else if (data?.path) {
            const { data: publicUrlData } = supabase.storage
              .from('post-media')
              .getPublicUrl(data.path);

            if (publicUrlData?.publicUrl) {
              media = {
                url: publicUrlData.publicUrl,
                type: mediaFile.type.startsWith('image/') ? 'image' : 'video'
              };
            }
          }
        } catch (err) {
          console.error('Unexpected error uploading media:', err);
          alert('Could not upload media. Posting without media.');
        }
      }

      let success = false;

      if (postType === 'update' && selectedChallenge) {
        // Check if challenge will be completed after this update
        const challenge = getChallengeById(selectedChallenge.challengeId);
        const willComplete = selectedChallenge.currentDay + 1 > challenge.duration;
        
        // Update challenge progress
        await updateChallengeProgress(selectedChallenge.id);
        
        // If challenge will be completed, create completion post
        if (willComplete) {
          success = await createPost(
            `🎉 I completed the ${challenge.title} challenge! ${content}`,
            selectedChallenge.challengeId,
            'completion',
            media
          );
        } else {
          success = await createPost(content, selectedChallenge.challengeId, 'update', media);
        }
      } else {
        success = await createPost(
          content,
          selectedChallenge?.challengeId || null,
          postType,
          media
        );
      }

      if (!success) {
        alert('Could not create post. Please try again.');
        return;
      }

      setContent('');
      setSelectedChallenge(null);
      setPostType('general');
      setMediaFile(null);
      setMediaPreview(null);
      onNavigate('feed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-600" />
            <h2 className="text-2xl font-bold text-slate-800">Create Post</h2>
          </div>
          <button
            onClick={() => onNavigate('feed')}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Post Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setPostType('general')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  postType === 'general'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setPostType('update')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  postType === 'update'
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Challenge Update
              </button>
            </div>
          </div>

          {/* Challenge Selection (for updates) */}
          {postType === 'update' && ongoingChallenges.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Challenge</label>
              <select
                value={selectedChallenge?.id || ''}
                onChange={(e) => {
                  const challenge = ongoingChallenges.find(c => c.id === parseInt(e.target.value));
                  setSelectedChallenge(challenge || null);
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Select a challenge...</option>
                {ongoingChallenges.map(uc => {
                  const challenge = getChallengeById(uc.challengeId);
                  if (!challenge) return null;
                  return (
                    <option key={uc.id} value={uc.id}>
                      {challenge.title} (Day {uc.currentDay}/{challenge.duration})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">What's on your mind?</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your progress, thoughts, or achievements..."
              rows={6}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">{content.length} characters</p>
          </div>

          {/* Media Upload (Optional) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Photo / Video <span className="text-xs text-slate-400">(optional)</span>
            </label>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium cursor-pointer hover:bg-slate-200 transition-colors">
                Choose File
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleMediaChange}
                />
              </label>
              {mediaFile && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="truncate max-w-[160px]">{mediaFile.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaFile(null);
                      setMediaPreview(null);
                    }}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {mediaPreview && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200">
                {mediaFile?.type.startsWith('image/') ? (
                  <img src={mediaPreview} alt="Preview" className="w-full max-h-64 object-cover" />
                ) : (
                  <video
                    src={mediaPreview}
                    controls
                    className="w-full max-h-64 bg-black object-contain"
                  />
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !content.trim() || (postType === 'update' && !selectedChallenge)}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
}

