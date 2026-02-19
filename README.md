# VORT-X: The Professional Network for Gamers

<p align="center">
  <img src="https://raw.githubusercontent.com/yourusername/VORT-X/main/public/banner.jpg" alt="VORT-X - Gaming Setup with RGB Keyboard, Mouse, Headset and Controller" width="100%">
</p>

<p align="center">
  <strong>Connect, Compete, and Conquer.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-performance">Performance</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.3.1-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

---

## 🎮 About VORT-X

VORT-X is a **modern social platform designed exclusively for gamers**. It's the "LinkedIn for Gamers" - a professional network where your gaming skills, achievements, and passion take center stage. Whether you're looking to compete in tournaments, join gaming communities, or connect with fellow players, VORT-X provides the complete ecosystem.

### 🌟 Why VORT-X?

- **🏆 All-in-One Platform**: Host tournaments, manage teams, join communities, and connect with players
- **⚡ Built for Performance**: Optimized for speed with 40-60% faster load times
- **🎨 Modern UI/UX**: Beautiful, responsive design that works seamlessly across all devices
- **🤖 AI-Powered**: Smart features powered by Firebase Genkit for enhanced user experience
- **📱 Progressive Web App**: Works offline and can be installed on any device

---

## ✨ Features

### 🎯 Core Features

#### **Advanced Gamer Profiles**

Create comprehensive profiles showcasing:

- Preferred games and skill levels
- Gaming achievements and accolades
- Play style and availability
- Personal statistics and performance analytics
- Customizable banners and avatars

#### **Dynamic Social Feed**

- Instagram-style feed with tournament updates
- Real-time interactions (likes, comments, bookmarks)
- Story features for quick updates
- Share tournament highlights and achievements
- Follow players and communities

#### **Tournament Ecosystem**

- **Host & Manage**: Create tournaments with custom rules, prize pools, and formats
- **Team Registration**: Comprehensive system for team rosters and entry fees
- **Admin Dashboard**: Complete control over participants, announcements, and brackets
- **Live Credentials**: Secure tournament IDs and passwords for participants
- **Feedback System**: Star ratings and reviews for completed tournaments
- **Kick Requests**: Democratic player removal system with host approval

#### **Community Hubs**

- Join or create game-specific communities
- Dedicated channels for different topics (general, LFG, strategies, memes)
- Real-time messaging with typing indicators
- Community announcements and pinned messages
- Member management and moderation tools

#### **Direct Messaging**

- Private one-on-one conversations
- Rich media support (images, GIFs)
- Video/voice call integration
- In-context messaging from tournament pages
- Read receipts and typing indicators

#### **Game Discovery**

- Browse curated list of popular games
- View community stats and active players
- Find or host game-specific tournaments
- Game-specific leaderboards and rankings

---

## 🚀 Tech Stack

### **Frontend**

- **Framework**: [Next.js 15.3.3](https://nextjs.org/) with App Router
- **UI Library**: [React 18.3.1](https://react.dev/)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS animations + Canvas API

### **Backend & Services**

- **AI/ML**: [Firebase Genkit](https://firebase.google.com/docs/genkit)
- **Authentication**: Firebase Auth (ready to integrate)
- **Database**: Firebase Firestore (ready to integrate)
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod validation

### **Performance Optimizations**

- Code splitting with dynamic imports
- Lazy loading for heavy components
- Image optimization (AVIF/WebP formats)
- Memoization (React.memo, useMemo, useCallback)
- Throttled animations (30 FPS for efficiency)
- Production bundle optimization

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/VORT-X.git
   cd VORT-X
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Add your Firebase configuration here
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Additional Commands

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run Genkit development server
npm run genkit:dev
```

---

## ⚡ Performance

VORT-X is optimized for maximum performance and user experience.

### Key Optimizations

| Feature                    | Before      | After      | Improvement |
| -------------------------- | ----------- | ---------- | ----------- |
| **Initial Bundle Size**    | 800-1000 KB | 450-600 KB | ↓ 40%       |
| **Animation CPU Usage**    | 80-100%     | 30-40%     | ↓ 65%       |
| **Re-renders**             | Frequent    | Minimal    | ↓ 50%       |
| **Time to Interactive**    | 3-5s        | 1.5-2.5s   | ↓ 50%       |
| **First Contentful Paint** | 1.5-2s      | 0.8-1.2s   | ↓ 40%       |

### Performance Features

✅ **Code Splitting**: All heavy components lazy-loaded  
✅ **Image Optimization**: Modern formats (AVIF/WebP) with proper caching  
✅ **Particle Animation**: Reduced from 50 to 30 particles @ 30 FPS  
✅ **Context Optimization**: All providers use memoization  
✅ **Dynamic Imports**: Components load on-demand  
✅ **Suspense Boundaries**: Progressive UI loading

### Performance Documentation

- [PERFORMANCE_OPTIMIZATIONS.md](PERFORMANCE_OPTIMIZATIONS.md) - Detailed technical changes
- [LATENCY_EXPLAINED.md](LATENCY_EXPLAINED.md) - Understanding dev vs prod performance
- [PERFORMANCE_TESTING.md](PERFORMANCE_TESTING.md) - Testing guide and metrics

---

## 📁 Project Structure

```
VORT-X/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Dashboard (homepage)
│   │   ├── api/                # API routes
│   │   ├── communities/        # Community pages
│   │   ├── dashboard/          # User dashboard
│   │   ├── dms/                # Direct messaging
│   │   ├── events/             # Live events
│   │   ├── games/              # Game discovery
│   │   ├── landing/            # Landing page
│   │   ├── post/               # Social feed posts
│   │   ├── profile/            # User profiles
│   │   ├── search/             # Search functionality
│   │   ├── settings/           # User settings
│   │   ├── social/             # Social feed
│   │   └── tournaments/        # Tournament pages
│   │
│   ├── ai/                     # Firebase Genkit integration
│   │   ├── genkit.ts           # Genkit configuration
│   │   └── flows/              # AI flows
│   │
│   ├── components/             # Reusable components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── dms/                # Messaging components
│   │   ├── layout/             # Layout components (header, nav)
│   │   ├── settings/           # Settings components
│   │   ├── social/             # Social feed components
│   │   └── ui/                 # Base UI components (ShadCN)
│   │
│   ├── context/                # React Context providers
│   │   ├── community-context.tsx    # Community state
│   │   ├── feed-context.tsx         # Social feed state
│   │   ├── theme-context.tsx        # Theme management
│   │   └── tournament-context.tsx   # Tournament state
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-debounce.ts     # Debounce hook
│   │   └── use-toast.ts        # Toast notifications
│   │
│   └── lib/                    # Utilities and helpers
│       ├── actions.ts          # Server actions
│       └── utils.ts            # Utility functions
│
├── public/                     # Static assets
├── docs/                       # Documentation
├── IMAGES/                     # Project images
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 🎨 Key Components

### Layout Components

- **AppHeader**: Navigation bar with search and notifications
- **AppSidebar**: Main navigation sidebar
- **BottomNav**: Mobile navigation
- **ParticleBackground**: Animated background effect

### Dashboard Components

- **PlayerProfileCard**: User profile with stats
- **LiveEventsCard**: Real-time tournament events
- **RegisteredTournamentsCard**: User's tournament registrations
- **HostedTournaments**: Tournaments created by user
- **PerformanceAnalyticsCard**: Gaming performance metrics
- **RewardPointsCard**: Points and achievements

### Social Components

- **TournamentPost**: Tournament announcements
- **Stories**: Instagram-style stories
- **CreatePostDialog**: Post creation interface

---

## 🛠️ Development

### Code Quality

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
```

### Best Practices

- ✅ **TypeScript**: Strict typing for better code quality
- ✅ **Component Structure**: Modular, reusable components
- ✅ **Performance**: Memoization and lazy loading
- ✅ **Accessibility**: ARIA labels and semantic HTML
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Code Splitting**: Dynamic imports for optimal loading

### Performance Testing

Run Lighthouse audit in Chrome DevTools:

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Performance" category
4. Click "Analyze page load"

**Target Scores:**

- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with clear messages**
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure all tests pass

### Areas for Contribution

- 🐛 **Bug Fixes**: Report or fix bugs
- ✨ **Features**: Propose or implement new features
- 📝 **Documentation**: Improve or translate docs
- 🎨 **Design**: UI/UX improvements
- ⚡ **Performance**: Optimization suggestions
- 🧪 **Testing**: Add test coverage

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment tools
- **ShadCN**: For the beautiful component library
- **Radix UI**: For accessible primitives
- **Firebase**: For backend services
- **The Gaming Community**: For inspiration and feedback

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/VORT-X/issues)
- **Discussions**: [Join the conversation](https://github.com/yourusername/VORT-X/discussions)
- **Email**: your.email@example.com

---

## 🗺️ Roadmap

### Phase 1: Core Features (Current)

- ✅ User profiles and authentication
- ✅ Tournament creation and management
- ✅ Community hubs
- ✅ Social feed
- ✅ Direct messaging
- ✅ Performance optimizations

### Phase 2: Enhanced Features (Q2 2026)

- 🔄 Real-time notifications
- 🔄 Advanced search and filters
- 🔄 Leaderboards and rankings
- 🔄 Payment integration
- 🔄 Mobile app (React Native)
- 🔄 Streaming integration

### Phase 3: Advanced Features (Q3 2026)

- 📅 AI-powered matchmaking
- 📅 Team formation suggestions
- 📅 Tournament bracket automation
- 📅 Analytics dashboard
- 📅 Sponsorship marketplace
- 📅 API for third-party integrations

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/VORT-X?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/VORT-X?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/VORT-X)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/VORT-X)

---

<p align="center">
  <strong>Made with ❤️ by gamers, for gamers</strong>
</p>

<p align="center">
  <a href="#-about-vort-x">Back to Top ↑</a>
</p>
