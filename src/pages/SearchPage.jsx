import React, { useState, useMemo, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { searchFakeProfiles } from '../data/fakeProfiles';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function SearchPage({ onNavigate }) {
  const [query, setQuery] = useState('');
  const [realProfiles, setRealProfiles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        let q = supabase.from('profiles').select('id, full_name, username, bio, avatar_url, is_public');
        if (query.trim()) {
          const s = query.trim().replace(/%/g, '\\%');
          q = q.or(`full_name.ilike.%${s}%,username.ilike.%${s}%,bio.ilike.%${s}%`);
        }
        const { data } = await q.limit(20);
        setRealProfiles(data || []);
      } catch {
        setRealProfiles([]);
      }
    };
    fetchProfiles();
  }, [query]);

  const fakeResults = useMemo(() => searchFakeProfiles(query), [query]);

  const results = useMemo(() => {
    const seen = new Set();
    const combined = [];
    const add = (p) => {
      const id = p.id;
      if (seen.has(id)) return;
      seen.add(id);
      combined.push(p);
    };
    if (user) {
      const q = query.trim().toLowerCase();
      const matchesUser = !q || (user.fullName?.toLowerCase().includes(q) || user.username?.toLowerCase().includes(q) || user.email?.toLowerCase().includes(q));
      if (matchesUser) add({ id: user.id, fullName: user.fullName, username: user.username, bio: user.bio, avatarUrl: user.avatarUrl, isReal: true });
    }
    realProfiles.forEach(p => add({ id: p.id, fullName: p.full_name, username: p.username, bio: p.bio, avatarUrl: p.avatar_url, isReal: true }));
    fakeResults.forEach(p => add(p));
    return combined;
  }, [user, realProfiles, fakeResults, query]);

  const handleViewProfile = (profile) => {
    if (profile.isReal) {
      onNavigate('userProfile', { userId: profile.id });
    } else {
      onNavigate('userProfile', { userId: profile.id });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Search</h1>

      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-800 placeholder-slate-400"
          autoFocus
        />
      </div>

      {/* Results */}
      <div className="space-y-2">
        {results.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">
              {query.trim() ? 'No people found. Try a different search.' : 'Start typing to search for people'}
            </p>
          </div>
        ) : (
          results.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleViewProfile(profile)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all text-left border border-slate-100"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-slate-400">{profile.fullName.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 truncate">{profile.fullName}</p>
                <p className="text-sm text-slate-500 truncate">@{profile.username}</p>
                {profile.bio && (
                  <p className="text-sm text-slate-600 line-clamp-2 mt-1">{profile.bio}</p>
                )}
              </div>
              <User className="w-5 h-5 text-slate-400 shrink-0" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
