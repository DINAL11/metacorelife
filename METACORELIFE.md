# MetaCoreLife — Product & Vision Document

## What is MetaCoreLife?

**MetaCoreLife** is a social platform designed for personal growth and positive lifestyle change. Unlike traditional social media that prioritizes vanity metrics and endless scrolling, MetaCoreLife focuses on **Health, Wealth, and Relationships** — the three pillars of a fulfilling life.

It combines the familiar, engaging experience of Instagram (feed, profiles, discovery) with purpose-driven features: challenges, progress tracking, badges, and a supportive community that celebrates real achievements.

---

## Why MetaCoreLife Exists

- **Problem**: Social media often harms mental health, wastes time, and promotes comparison without action. Most platforms lack structure for meaningful self-improvement.
- **Solution**: MetaCoreLife flips the script — it’s a social network that encourages you to act, commit, and grow. You share progress, join challenges, and earn badges instead of chasing likes and followers.
- **Purpose**: “A social network that actually improves your life” — built for users who want connection with intention.

---

## Vision

- **Short-term**: Be the go-to platform for people starting their self-improvement journey — challenges, accountability, and community in one place.
- **Long-term**: Create a trusted ecosystem where brands, creators, and users collaborate on wellness, habits, and growth — with outcomes that matter.

---

## Core Features (Current)

| Feature | Description |
|--------|-------------|
| **Feed** | Posts from the community (challenges, updates, completions). Visible even to new users via discovery content. |
| **Challenges** | Curated challenges (21-day routines, fitness, meditation, financial habits, gratitude, etc.) with progress tracking and streaks. |
| **Badges** | Earn badges for completing challenges. Displayed on profile and shareable. |
| **Profile** | Personal dashboard with stats, badges, active challenges, and posts. Editable bio and avatar. |
| **Create Post** | Share updates, photos, videos, and challenge completions. |
| **Marketplace / Shop** | Browse products related to wellness and personal growth (integrated with Stripe). |
| **Search** | Search for people and discovery of profiles to follow and connect. |
| **Guest Mode** | Explore feed and challenges without signing up. |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React (icons) |
| **Backend / Auth** | Supabase (PostgreSQL, Auth, Realtime) |
| **Payments** | Stripe (React Stripe JS) |
| **Hosting** | GitHub Pages (Vite build) |
| **State** | React Context (Auth, Cart, Challenges) |

---

## Future Plans & Roadmap

1. **Follow System** — Follow users, personalized feed based on who you follow.
2. **Stories** — 24h stories for quick check-ins and updates.
3. **DMs / Messaging** — Private 1:1 or group chats for accountability partners.
4. **Notifications** — Push + in-app for likes, comments, challenge reminders.
5. **Advanced Challenges** — Community challenges, leaderboards, team challenges.
6. **Creator Mode** — Paid challenges, courses, and coaching.
7. **Mobile Apps** — Native iOS/Android for better engagement.
8. **Wellness Integrations** — Fitness trackers, meditation apps, finance tools.

---

## Monetization Strategy

| Model | Description |
|------|-------------|
| **Premium Subscription** | Ad-free experience, exclusive challenges, advanced analytics (e.g. $4.99–9.99/mo). |
| **Marketplace Commission** | Revenue share from products sold in the shop. |
| **Challenge Sponsors** | Brands sponsor challenges (e.g. fitness brands, wellness apps). |
| **Creator Monetization** | Creators charge for paid challenges or coaching. |
| **Ads (Optional)** | Non-intrusive, wellness-focused ads if needed later. |

---

## Making MetaCoreLife a Startup

1. **MVP → Beta** — Ship the current feature set, gather feedback, iterate.
2. **User Acquisition** — Content marketing, partnerships with wellness influencers, SEO.
3. **Retention** — Streaks, reminders, community events.
4. **Funding** — Bootstrap first, then consider pre-seed for mobile apps and growth.
5. **Legal** — Incorporate, privacy policy, terms of service.
6. **Team** — Start solo, add roles (product, growth, support) as usage grows.

---

## Additional Features to Consider

- **Streaks & Reminders** — Daily reminders for active challenges.
- **Explore Tab** — Discover challenges, trending posts, categories.
- **Tags & Hashtags** — #MorningRoutine, #FitnessJourney, etc.
- **Accountability Partners** — Match users with similar goals.
- **Weekly Digests** — Email summaries of progress and milestones.
- **Dark Mode** — Theme toggle.
- **Accessibility** — Screen reader support, contrast, keyboard navigation.
- **Offline Support** — Basic PWA for limited offline use.

---

## File Structure (Summary)

```
metacorelife/
├── public/           # Static assets (logo.png goes here)
├── src/
│   ├── components/   # Reusable UI
│   ├── context/      # Auth, Cart, Challenges
│   ├── data/         # Fake profiles, seed data
│   ├── lib/          # Supabase client
│   ├── pages/        # Feed, Profile, Challenges, etc.
│   └── services/     # Auth helpers
├── supabase-schema.sql
└── METACORELIFE.md   # This document
```

---

## Logo

Place your logo file at **`public/logo.png`**. The app will display it in the header, welcome page, and login modal. If the file is missing, a fallback SVG is shown. Supported formats: PNG, JPG, SVG.

---

*Last updated: February 2026*
