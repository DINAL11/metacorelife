-- Migration: Add profile picture, bio, and onboarding fields
-- Run this in Supabase SQL Editor after the initial schema
-- Also create an 'avatars' bucket in Storage (Dashboard > Storage > New bucket) and make it Public

-- Add profile columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_seen BOOLEAN DEFAULT true;

-- Add media columns to posts (if not already present)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS media_url TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS media_type TEXT;
