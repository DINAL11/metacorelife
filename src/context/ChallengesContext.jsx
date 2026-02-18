import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const ChallengesContext = createContext();

// Sample challenges data (these would ideally be in Supabase too, but keeping them here for now)
const sampleChallenges = [
  {
    id: 1,
    title: '21-Day Morning Routine',
    emoji: '🌅',
    category: 'Health',
    level: 'Beginner',
    description: 'Start your day right with a consistent morning routine. Wake up at the same time, hydrate, stretch, and set intentions for the day.',
    duration: 21,
    participants: 1248,
    badge: '🌅'
  },
  {
    id: 2,
    title: '30-Day Fitness Journey',
    emoji: '💪',
    category: 'Health',
    level: 'Intermediate',
    description: 'Commit to 30 minutes of exercise daily. Move your body and feel the transformation.',
    duration: 30,
    participants: 2134,
    badge: '💪'
  },
  {
    id: 3,
    title: '7-Day Meditation Challenge',
    emoji: '🧘',
    category: 'Health',
    level: 'Beginner',
    description: 'Practice 10 minutes of meditation daily. Find peace and clarity in your mind.',
    duration: 7,
    participants: 3456,
    badge: '🧘'
  },
  {
    id: 4,
    title: '21-Day No Spend Challenge',
    emoji: '💰',
    category: 'Wealth',
    level: 'Intermediate',
    description: 'Avoid unnecessary spending for 21 days. Build better financial habits and save money.',
    duration: 21,
    participants: 892,
    badge: '💰'
  },
  {
    id: 5,
    title: '30-Day Daily Investing',
    emoji: '📈',
    category: 'Wealth',
    level: 'Advanced',
    description: 'Invest a small amount daily and learn about investing. Build wealth one day at a time.',
    duration: 30,
    participants: 567,
    badge: '📈'
  },
  {
    id: 6,
    title: '14-Day Gratitude Practice',
    emoji: '💝',
    category: 'Relationships',
    level: 'Beginner',
    description: 'Write down three things you\'re grateful for each day. Strengthen your relationships and mindset.',
    duration: 14,
    participants: 2103,
    badge: '💝'
  },
  {
    id: 7,
    title: '21-Day Declutter Challenge',
    emoji: '🧹',
    category: 'Health',
    level: 'Beginner',
    description: 'Declutter one area of your home each day. Create space for what matters.',
    duration: 21,
    participants: 1789,
    badge: '🧹'
  },
  {
    id: 8,
    title: '30-Day Reading Challenge',
    emoji: '📚',
    category: 'Wealth',
    level: 'Beginner',
    description: 'Read for 20 minutes daily. Expand your knowledge and grow your mind.',
    duration: 30,
    participants: 1234,
    badge: '📚'
  },
  {
    id: 9,
    title: '1-Day Quick Win',
    emoji: '⚡',
    category: 'Health',
    level: 'Beginner',
    description: 'Complete one small win today. Join, log progress, and earn your first badge!',
    duration: 1,
    participants: 0,
    badge: '⚡'
  }
];

export function ChallengesProvider({ children }) {
  const { user } = useAuth();
  const [userChallenges, setUserChallenges] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user challenges from Supabase
  useEffect(() => {
    if (!user) {
      setUserChallenges([]);
      setUserPosts([]);
      setLoading(false);
      return;
    }

    const loadUserData = async () => {
      try {
        // Load user challenges
        const { data: challenges, error: challengesError } = await supabase
          .from('user_challenges')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (challengesError) throw challengesError;

        // Transform Supabase data to match our format
        const transformedChallenges = (challenges || []).map(c => ({
          id: c.id,
          challengeId: c.challenge_id,
          userId: c.user_id,
          startDate: c.start_date,
          currentDay: c.current_day,
          streak: c.streak,
          completed: c.completed,
          lastUpdateDate: c.last_update_date
        }));

        setUserChallenges(transformedChallenges);

        // Load user posts
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        const transformedPosts = (posts || []).map(p => ({
          id: p.id,
          userId: p.user_id,
          userName: p.user_name,
          content: p.content,
          challengeId: p.challenge_id,
          type: p.type,
          createdAt: p.created_at,
          likes: p.likes || [],
          comments: p.comments || [],
          mediaUrl: p.media_url || null,
          mediaType: p.media_type || null
        }));

        setUserPosts(transformedPosts);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  // Load all posts from Supabase
  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const { data: posts, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100);

        if (error) throw error;

        const transformedPosts = (posts || []).map(p => ({
          id: p.id,
          userId: p.user_id,
          userName: p.user_name,
          content: p.content,
          challengeId: p.challenge_id,
          type: p.type,
          createdAt: p.created_at,
          likes: p.likes || [],
          comments: p.comments || [],
          mediaUrl: p.media_url || null,
          mediaType: p.media_type || null
        }));

        setAllPosts(transformedPosts);
      } catch (error) {
        console.error('Error loading all posts:', error);
      }
    };

    loadAllPosts();

    // Subscribe to new posts
    const subscription = supabase
      .channel('posts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        loadAllPosts();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const joinChallenge = async (challengeId) => {
    if (!user) return false;
    
    const challenge = sampleChallenges.find(c => c.id === challengeId);
    if (!challenge) return false;

    const alreadyJoined = userChallenges.find(uc => uc.challengeId === challengeId && !uc.completed);
    if (alreadyJoined) return false;

    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
          start_date: new Date().toISOString(),
          current_day: 1,
          streak: 1,
          completed: false,
          last_update_date: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      const newChallenge = {
        id: data.id,
        challengeId: data.challenge_id,
        userId: data.user_id,
        startDate: data.start_date,
        currentDay: data.current_day,
        streak: data.streak,
        completed: data.completed,
        lastUpdateDate: data.last_update_date
      };

      setUserChallenges([...userChallenges, newChallenge]);
      return true;
    } catch (error) {
      console.error('Error joining challenge:', error);
      return false;
    }
  };

  // Use local date for streak logic (avoid timezone bugs)
  const toLocalDateString = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const updateChallengeProgress = async (userChallengeId) => {
    if (!user) return { success: false, completedChallenge: null };

    const userChallenge = userChallenges.find(uc => uc.id === userChallengeId && uc.userId === user.id && !uc.completed);
    if (!userChallenge) return { success: false, completedChallenge: null };

    const today = toLocalDateString(new Date());
    const lastUpdate = toLocalDateString(userChallenge.lastUpdateDate);

    if (today === lastUpdate) {
      // Already updated today
      return { success: false, completedChallenge: null };
    }

    let newDay = userChallenge.currentDay;
    let newStreak = userChallenge.streak;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = toLocalDateString(yesterday);

    if (lastUpdate === yesterdayStr) {
      // Consecutive day - increment streak
      newStreak = userChallenge.streak + 1;
    } else {
      // Streak broken (missed a day or more)
      newStreak = 1;
    }

    newDay = userChallenge.currentDay + 1;
    const challenge = sampleChallenges.find(c => c.id === userChallenge.challengeId);
    const isCompleted = newDay > challenge.duration;

    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .update({
          current_day: newDay,
          streak: newStreak,
          completed: isCompleted,
          last_update_date: new Date().toISOString()
        })
        .eq('id', userChallengeId)
        .select()
        .single();

      if (error) throw error;

      const updated = userChallenges.map(uc =>
        uc.id === userChallengeId
          ? {
              ...uc,
              currentDay: data.current_day,
              streak: data.streak,
              completed: data.completed,
              lastUpdateDate: data.last_update_date
            }
          : uc
      );

      setUserChallenges(updated);

      if (isCompleted && challenge) {
        return {
          success: true,
          completedChallenge: {
            challengeTitle: challenge.title,
            challengeBadge: challenge.badge,
            challengeId: challenge.id,
            lastUpdateDate: data.last_update_date
          }
        };
      }
      return { success: true, completedChallenge: null };
    } catch (error) {
      console.error('Error updating challenge progress:', error);
      return { success: false, completedChallenge: null };
    }
  };

  const getOngoingChallenges = () => {
    if (!user) return [];
    return userChallenges.filter(uc => uc.userId === user.id && !uc.completed);
  };

  const getCompletedChallenges = () => {
    if (!user) return [];
    return userChallenges.filter(uc => uc.userId === user.id && uc.completed);
  };

  const getChallengeById = (challengeId) => {
    return sampleChallenges.find(c => c.id === challengeId);
  };

  const createPost = async (content, challengeId = null, type = 'update', media = null) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          user_name: user.fullName,
          content,
          challenge_id: challengeId,
          type,
          likes: [],
          comments: [],
          media_url: media?.url || null,
          media_type: media?.type || null
        })
        .select()
        .single();

      if (error) throw error;

      const newPost = {
        id: data.id,
        userId: data.user_id,
        userName: data.user_name,
        content: data.content,
        challengeId: data.challenge_id,
        type: data.type,
        createdAt: data.created_at,
        likes: data.likes || [],
        comments: data.comments || [],
        mediaUrl: data.media_url || null,
        mediaType: data.media_type || null
      };

      setUserPosts([newPost, ...userPosts]);
      setAllPosts([newPost, ...allPosts]);
      return true;
    } catch (error) {
      console.error('Error creating post:', error);
      return false;
    }
  };

  const likePost = async (postId) => {
    if (!user) return false;

    const post = allPosts.find(p => p.id === postId);
    if (!post) return false;

    const hasLiked = post.likes.includes(user.id);
    const newLikes = hasLiked
      ? post.likes.filter(id => id !== user.id)
      : [...post.likes, user.id];

    try {
      const { error } = await supabase
        .from('posts')
        .update({ likes: newLikes })
        .eq('id', postId);

      if (error) throw error;

      const updated = allPosts.map(p =>
        p.id === postId ? { ...p, likes: newLikes } : p
      );

      setAllPosts(updated);
      return true;
    } catch (error) {
      console.error('Error liking post:', error);
      return false;
    }
  };

  const addComment = async (postId, text) => {
    if (!user) return false;

    const post = allPosts.find(p => p.id === postId);
    if (!post) return false;

    const newComment = {
      userId: user.id,
      userName: user.fullName || user.email?.split('@')[0] || 'User',
      text: text.trim()
    };

    const newComments = [...(post.comments || []), newComment];

    try {
      const { error } = await supabase
        .from('posts')
        .update({ comments: newComments })
        .eq('id', postId);

      if (error) throw error;

      const updated = allPosts.map(p =>
        p.id === postId ? { ...p, comments: newComments } : p
      );

      setAllPosts(updated);
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    }
  };

  const getBadges = () => {
    if (!user) return [];
    const completed = getCompletedChallenges();
    return completed.map(uc => {
      const challenge = getChallengeById(uc.challengeId);
      return {
        challengeId: uc.challengeId,
        challengeTitle: challenge?.title,
        badge: challenge?.badge,
        completedDate: uc.lastUpdateDate
      };
    });
  };

  return (
    <ChallengesContext.Provider value={{
      allChallenges: sampleChallenges,
      userChallenges,
      userPosts,
      allPosts,
      joinChallenge,
      updateChallengeProgress,
      getOngoingChallenges,
      getCompletedChallenges,
      getChallengeById,
      createPost,
      likePost,
      addComment,
      getBadges,
      loading
    }}>
      {children}
    </ChallengesContext.Provider>
  );
}

export function useChallenges() {
  const context = useContext(ChallengesContext);
  if (!context) {
    throw new Error('useChallenges must be used within ChallengesProvider');
  }
  return context;
}
