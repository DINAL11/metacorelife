/**
 * Seed / fake profiles for discovery when users have no followers.
 * These profiles are searchable and viewable - like Instagram's explore.
 */

export const FAKE_PROFILE_PREFIX = 'fake-';

export const fakeProfiles = [
  {
    id: 'fake-1',
    username: 'sarah.wellness',
    fullName: 'Sarah Mitchell',
    bio: 'Mindfulness coach • 21-day challenges advocate • Building habits that stick 🌱',
    avatarUrl: 'https://i.pravatar.cc/150?u=sarah1',
    postsCount: 24,
    badgesCount: 8,
    isFake: true
  },
  {
    id: 'fake-2',
    username: 'mike.fitness',
    fullName: 'Mike Johnson',
    bio: 'Early bird • Morning routine enthusiast • Day 47 of my fitness journey 💪',
    avatarUrl: 'https://i.pravatar.cc/150?u=mike2',
    postsCount: 31,
    badgesCount: 5,
    isFake: true
  },
  {
    id: 'fake-3',
    username: 'emma.reads',
    fullName: 'Emma Chen',
    bio: '📚 30-day reading challenge • Learning to invest • Grateful for this community',
    avatarUrl: 'https://i.pravatar.cc/150?u=emma3',
    postsCount: 18,
    badgesCount: 6,
    isFake: true
  },
  {
    id: 'fake-4',
    username: 'alex.meditation',
    fullName: 'Alex Rivera',
    bio: 'Meditation beginner • 7-day streak 🧘 • Finding peace one breath at a time',
    avatarUrl: 'https://i.pravatar.cc/150?u=alex4',
    postsCount: 12,
    badgesCount: 3,
    isFake: true
  },
  {
    id: 'fake-5',
    username: 'jordan.saves',
    fullName: 'Jordan Taylor',
    bio: 'No-spend challenge survivor • Building wealth habits • FIRE journey',
    avatarUrl: 'https://i.pravatar.cc/150?u=jordan5',
    postsCount: 22,
    badgesCount: 7,
    isFake: true
  },
  {
    id: 'fake-6',
    username: 'priya.grateful',
    fullName: 'Priya Sharma',
    bio: 'Gratitude journaling • 14-day practice complete ✨ • Spreading positivity',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya6',
    postsCount: 15,
    badgesCount: 4,
    isFake: true
  },
  {
    id: 'fake-7',
    username: 'david.declutter',
    fullName: 'David Kim',
    bio: 'Decluttering my life • Minimalist in progress • Less stuff, more peace',
    avatarUrl: 'https://i.pravatar.cc/150?u=david7',
    postsCount: 19,
    badgesCount: 5,
    isFake: true
  },
  {
    id: 'fake-8',
    username: 'olivia.growth',
    fullName: 'Olivia Martinez',
    bio: 'Personal growth enthusiast • Challenge collector • This app changed my routine 🌟',
    avatarUrl: 'https://i.pravatar.cc/150?u=olivia8',
    postsCount: 28,
    badgesCount: 9,
    isFake: true
  }
];

export const fakePosts = [
  {
    id: 'fake-post-1',
    userId: 'fake-1',
    userName: 'Sarah Mitchell',
    userUsername: 'sarah.wellness',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=sarah1',
    content: 'Completed Day 21 of my morning routine! Waking up at 5:30am has completely transformed my productivity. The first hour of the day is now mine. 🌅',
    challengeId: 1,
    type: 'completion',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: [],
    comments: [],
    mediaUrl: 'https://picsum.photos/seed/morning1/600/400',
    mediaType: 'image',
    isFake: true
  },
  {
    id: 'fake-post-2',
    userId: 'fake-2',
    userName: 'Mike Johnson',
    userUsername: 'mike.fitness',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=mike2',
    content: 'Day 15 of the 30-day fitness journey! Not gonna lie, it was tough today but I showed up. That\'s what matters. 💪',
    challengeId: 2,
    type: 'update',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-1', 'fake-3'],
    comments: [{ userId: 'fake-1', userName: 'Sarah Mitchell', text: 'You got this! Keep going!' }],
    mediaUrl: null,
    mediaType: null,
    isFake: true
  },
  {
    id: 'fake-post-3',
    userId: 'fake-3',
    userName: 'Emma Chen',
    userUsername: 'emma.reads',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=emma3',
    content: 'Just finished my 20 minutes of reading. "Atomic Habits" is changing how I think about building routines. Highly recommend! 📚',
    challengeId: 8,
    type: 'update',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-2', 'fake-5'],
    comments: [],
    mediaUrl: 'https://picsum.photos/seed/book1/600/400',
    mediaType: 'image',
    isFake: true
  },
  {
    id: 'fake-post-4',
    userId: 'fake-4',
    userName: 'Alex Rivera',
    userUsername: 'alex.meditation',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=alex4',
    content: 'Day 5 of meditation! My mind is already feeling calmer. 10 minutes seems like nothing but the impact is huge. 🧘',
    challengeId: 3,
    type: 'update',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-1'],
    comments: [],
    mediaUrl: null,
    mediaType: null,
    isFake: true
  },
  {
    id: 'fake-post-5',
    userId: 'fake-5',
    userName: 'Jordan Taylor',
    userUsername: 'jordan.saves',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=jordan5',
    content: '21-day no-spend challenge COMPLETE! Saved $340 by avoiding impulse buys. Learned so much about my spending habits. 💰',
    challengeId: 4,
    type: 'completion',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-1', 'fake-2', 'fake-3', 'fake-6'],
    comments: [
      { userId: 'fake-1', userName: 'Sarah Mitchell', text: 'Amazing! That\'s a huge win!' },
      { userId: 'fake-6', userName: 'Priya Sharma', text: 'Inspired to try this next month!' }
    ],
    mediaUrl: null,
    mediaType: null,
    isFake: true
  },
  {
    id: 'fake-post-6',
    userId: 'fake-6',
    userName: 'Priya Sharma',
    userUsername: 'priya.grateful',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=priya6',
    content: 'Three things I\'m grateful for today: 1) This supportive community 2) My health 3) Another sunrise 🌅 Grateful for day 10!',
    challengeId: 6,
    type: 'update',
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-1', 'fake-4', 'fake-8'],
    comments: [],
    mediaUrl: null,
    mediaType: null,
    isFake: true
  },
  {
    id: 'fake-post-7',
    userId: 'fake-7',
    userName: 'David Kim',
    userUsername: 'david.declutter',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=david7',
    content: 'Decluttered my bedroom today. Donated 3 bags of clothes. Feel so much lighter! The 21-day declutter challenge is real. 🧹',
    challengeId: 7,
    type: 'update',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-2', 'fake-5', 'fake-8'],
    comments: [],
    mediaUrl: 'https://picsum.photos/seed/declutter1/600/400',
    mediaType: 'image',
    isFake: true
  },
  {
    id: 'fake-post-8',
    userId: 'fake-8',
    userName: 'Olivia Martinez',
    userUsername: 'olivia.growth',
    userAvatarUrl: 'https://i.pravatar.cc/150?u=olivia8',
    content: 'Earned my 9th badge! This community has helped me stay accountable. If you\'re new here - start with the 1-day quick win. You won\'t regret it! ⚡',
    challengeId: 9,
    type: 'completion',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likes: ['fake-1', 'fake-2', 'fake-3', 'fake-4', 'fake-5'],
    comments: [{ userId: 'fake-1', userName: 'Sarah Mitchell', text: 'Congrats! You\'re crushing it!' }],
    mediaUrl: null,
    mediaType: null,
    isFake: true
  }
];

export function getFakeProfileById(id) {
  return fakeProfiles.find(p => p.id === id) || null;
}

export function getFakePostsByUserId(userId) {
  return fakePosts.filter(p => p.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function searchFakeProfiles(query) {
  if (!query || query.trim().length === 0) return fakeProfiles;
  const q = query.trim().toLowerCase();
  return fakeProfiles.filter(
    p =>
      p.fullName.toLowerCase().includes(q) ||
      p.username.toLowerCase().includes(q) ||
      (p.bio && p.bio.toLowerCase().includes(q))
  );
}

export function isFakeProfileId(id) {
  return typeof id === 'string' && id.startsWith(FAKE_PROFILE_PREFIX);
}

export function getFakeProfileBadges(userId) {
  return fakeProfileBadges[userId] || [];
}

export const fakeProfileBadges = {
  'fake-1': [
    { challengeId: 1, challengeTitle: '21-Day Morning Routine', badge: '🌅', completedDate: '2025-01-15' },
    { challengeId: 3, challengeTitle: '7-Day Meditation Challenge', badge: '🧘', completedDate: '2025-01-01' },
    { challengeId: 6, challengeTitle: '14-Day Gratitude Practice', badge: '💝', completedDate: '2024-12-20' }
  ],
  'fake-2': [
    { challengeId: 2, challengeTitle: '30-Day Fitness Journey', badge: '💪', completedDate: '2025-02-01' },
    { challengeId: 1, challengeTitle: '21-Day Morning Routine', badge: '🌅', completedDate: '2024-12-01' }
  ],
  'fake-3': [
    { challengeId: 8, challengeTitle: '30-Day Reading Challenge', badge: '📚', completedDate: '2025-01-20' },
    { challengeId: 6, challengeTitle: '14-Day Gratitude Practice', badge: '💝', completedDate: '2024-11-15' }
  ],
  'fake-4': [{ challengeId: 3, challengeTitle: '7-Day Meditation Challenge', badge: '🧘', completedDate: '2025-02-01' }],
  'fake-5': [
    { challengeId: 4, challengeTitle: '21-Day No Spend Challenge', badge: '💰', completedDate: '2025-01-25' },
    { challengeId: 5, challengeTitle: '30-Day Daily Investing', badge: '📈', completedDate: '2024-12-10' }
  ],
  'fake-6': [{ challengeId: 6, challengeTitle: '14-Day Gratitude Practice', badge: '💝', completedDate: '2025-01-10' }],
  'fake-7': [
    { challengeId: 7, challengeTitle: '21-Day Declutter Challenge', badge: '🧹', completedDate: '2025-01-18' },
    { challengeId: 1, challengeTitle: '21-Day Morning Routine', badge: '🌅', completedDate: '2024-11-30' }
  ],
  'fake-8': [
    { challengeId: 9, challengeTitle: '1-Day Quick Win', badge: '⚡', completedDate: '2025-02-01' },
    { challengeId: 1, challengeTitle: '21-Day Morning Routine', badge: '🌅', completedDate: '2024-12-15' },
    { challengeId: 3, challengeTitle: '7-Day Meditation Challenge', badge: '🧘', completedDate: '2024-12-01' }
  ]
};
