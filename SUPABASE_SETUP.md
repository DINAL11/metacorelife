# Supabase Setup Guide

This guide will help you set up Supabase for MetaCoreLife.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in your project details and wait for it to be created

## 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy your **Project URL** and **anon/public key**
3. Create a `.env` file in the root of this project:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase-schema.sql` from this project
3. Copy and paste the entire SQL script into the SQL Editor
4. Click **Run** to execute the schema

This will create:
- `profiles` table (extends auth.users)
- `user_challenges` table (tracks user challenge progress)
- `posts` table (stores all posts)
- `cart_items` table (stores user cart items)
- Row Level Security (RLS) policies
- Indexes for performance

## 4. Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if needed (optional)

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Try signing up with a new account
3. Check your Supabase dashboard to see if the user was created
4. Try joining a challenge and creating a post
5. Verify data appears in your Supabase tables

## Troubleshooting

### "Supabase URL and Anon Key are required" warning
- Make sure your `.env` file exists in the project root
- Verify the variable names are exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your dev server after creating/updating `.env`

### Authentication errors
- Check that Email provider is enabled in Supabase
- Verify your API keys are correct
- Check browser console for detailed error messages

### Database errors
- Make sure you've run the `supabase-schema.sql` script
- Check that RLS policies are set up correctly
- Verify your user has the correct permissions

### Session not persisting
- Supabase handles session persistence automatically via localStorage
- Check browser localStorage for `sb-` prefixed keys
- Clear localStorage and try logging in again if issues persist

## Features Enabled

✅ User authentication (sign up/sign in)
✅ Session persistence
✅ User challenges stored in Supabase
✅ Posts stored in Supabase
✅ Cart items stored in Supabase
✅ Real-time post updates
✅ Row Level Security for data protection

