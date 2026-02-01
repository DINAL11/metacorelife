import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser({
            id: session.user.id,
            email: session.user.email,
            fullName: profile?.full_name || session.user.email?.split('@')[0] || 'User',
            avatarUrl: profile?.avatar_url || null,
            bio: profile?.bio || null,
            onboardingSeen: profile?.onboarding_seen ?? true
          });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch or create user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!profile) {
          // Create profile if it doesn't exist (e.g. after email confirm, or OAuth)
          const fullName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User';
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: session.user.email,
              full_name: fullName,
              onboarding_seen: false
            })
            .select()
            .single();

          setUser({
            id: session.user.id,
            email: session.user.email,
            fullName: newProfile?.full_name || session.user.email?.split('@')[0] || 'User',
            avatarUrl: newProfile?.avatar_url || null,
            bio: newProfile?.bio || null,
            onboardingSeen: newProfile?.onboarding_seen ?? true
          });
        } else {
          setUser({
            id: session.user.id,
            email: session.user.email,
            fullName: profile.full_name || session.user.email?.split('@')[0] || 'User',
            avatarUrl: profile.avatar_url || null,
            bio: profile.bio || null,
            onboardingSeen: profile.onboarding_seen ?? true
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, fullName) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // When Supabase requires email confirmation, session is null until user confirms.
        // Don't try to create profile here—RLS will block it (no session). Profile is
        // created in onAuthStateChange when they confirm and sign in.
        const needsConfirmation = !authData.session;

        if (!needsConfirmation) {
          const { data: newProfile, error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: email,
              full_name: fullName,
              onboarding_seen: false
            })
            .select()
            .single();

          if (profileError) {
            console.error('Error creating profile:', profileError);
          }

          setUser({
            id: authData.user.id,
            email: authData.user.email,
            fullName: fullName,
            avatarUrl: newProfile?.avatar_url || null,
            bio: newProfile?.bio || null,
            onboardingSeen: false
          });
        }

        return {
          user: authData.user,
          error: null,
          needsConfirmation: !!needsConfirmation
        };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: error.message, needsConfirmation: false };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        setUser({
          id: data.user.id,
          email: data.user.email,
          fullName: profile?.full_name || data.user.email?.split('@')[0] || 'User',
          avatarUrl: profile?.avatar_url || null,
          bio: profile?.bio || null,
          onboardingSeen: profile?.onboarding_seen ?? true
        });
      }

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = () => !!user;

  const updateProfile = async (updates) => {
    if (!user) return false;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setUser(prev => ({
          ...prev,
          fullName: data.full_name ?? prev.fullName,
          avatarUrl: data.avatar_url ?? prev.avatarUrl,
          bio: data.bio ?? prev.bio,
          onboardingSeen: data.onboarding_seen ?? prev.onboardingSeen
        }));
      }
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const completeOnboarding = async () => {
    return updateProfile({ onboarding_seen: true });
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout, isAuthenticated, loading, updateProfile, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
