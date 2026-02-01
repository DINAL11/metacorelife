import React from 'react';
import { X, Share2, Download, FileText } from 'lucide-react';

export default function BadgeDetailModal({ isOpen, onClose, badge, userName, onShareToFeed }) {
  if (!isOpen || !badge) return null;

  const completionDate = badge.completedDate
    ? new Date(badge.completedDate).toLocaleDateString(undefined, { dateStyle: 'long' })
    : '';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I earned the ${badge.challengeTitle} badge on MetaCoreLife`,
        text: `I completed the ${badge.challengeTitle} challenge on ${completionDate}. 🎉`,
        url: window.location.origin
      }).catch(() => {});
    }
  };

  const handleDownload = () => {
    const el = document.getElementById('badge-certificate');
    if (!el) return;
    try {
      const html = el.outerHTML;
      const blob = new Blob([`<!DOCTYPE html><html><body>${html}</body></html>`], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MetaCoreLife-badge-${(badge.challengeTitle || 'challenge').replace(/\s+/g, '-')}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-slate-800">Badge</h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            id="badge-certificate"
            className="relative rounded-2xl p-6 mb-6 border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-purple-50 text-center shadow-inner"
          >
            <div className="absolute inset-0 rounded-2xl border border-cyan-100/50 pointer-events-none" />
            <div className="text-5xl mb-3">{badge.badge}</div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{badge.challengeTitle}</h3>
            <p className="text-sm text-slate-600 mb-2">Achievement</p>
            <p className="text-xs text-slate-500">Completed on {completionDate}</p>
            {userName && (
              <p className="text-xs text-slate-500 mt-1">Earned by {userName}</p>
            )}
          </div>

          <p className="text-sm text-slate-600 mb-4">
            You completed this challenge and earned this badge. Share your win with the community!
          </p>

          <div className="space-y-2">
            <button
              onClick={() => { onShareToFeed?.(); onClose(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <FileText className="w-5 h-5" />
              Share your win (post to feed)
            </button>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share externally
            </button>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
