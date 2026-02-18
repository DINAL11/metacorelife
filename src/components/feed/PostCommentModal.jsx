import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PostCommentModal({ isOpen, onClose, post, comments, onAddComment, isFake }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !isAuthenticated()) return;
    setSubmitting(true);
    try {
      const ok = await onAddComment(post.id, text.trim(), isFake);
      if (ok) {
        setText('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const displayComments = comments || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex flex-col justify-end md:justify-center md:items-center z-50 p-0 md:p-4">
      <div className="bg-white dark:bg-slate-800 rounded-t-3xl md:rounded-3xl max-h-[80vh] w-full md:max-w-lg flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">Comments</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {displayComments.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400 text-center py-8">No comments yet. Be the first!</p>
          ) : (
            displayComments.map((c, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {(c.userName || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{c.userName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 break-words">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {isAuthenticated() ? (
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={!text.trim() || submitting}
                className="p-2 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white rounded-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        ) : (
          <p className="p-4 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700">
            Sign in to comment
          </p>
        )}
      </div>
    </div>
  );
}
