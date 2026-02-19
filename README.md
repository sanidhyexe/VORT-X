
# VORT-X: The Professional Network for Gamers

<p align="center">
  <img src="https://iili.io/FSFGRXS.jpg" alt="VORT-X Banner" data-ai-hint="abstract gaming background">
</p>

<p align="center">
  <strong>Connect, Compete, and Conquer.</strong>
</p>

---

Welcome to VORT-X! This document will give you a complete overview of the project, its features, and how to get it running.

VORT-X is a modern social platform designed exclusively for gamers. It aims to connect players, build communities, and provide a hub for all gaming-related activities. Think of it as the "LinkedIn for Gamers," a professional network where your gaming skills and passion take center stage.

## ✨ Core Features

Our goal is to build a comprehensive ecosystem for gamers. Here are the core features:

*   **Advanced Gamer Profiles**: Create a detailed user profile showcasing your gaming-specific information, such as preferred games, skill levels, play style, accolades, and a personal bio.
*   **Dynamic Social Feed**: A central, Instagram-style feed displaying tournament updates and posts from the community. Users can interact through likes, comments, and bookmarks.
*   **Tournament Ecosystem**:
    *   **Host & Manage**: Easily create and manage your own tournaments with detailed settings.
    *   **Register Teams**: A comprehensive registration system to capture full team rosters and process entry fees.
    *   **Admin Dashboard**: Manage participants, send notices, and review match results from a dedicated dashboard.
    *   **Feedback System**: Participants can leave star ratings and comments on finished tournaments.
*   **Community Hubs**: Join or create communities for specific games or interests. Each hub has dedicated channels for different topics (e.g., general chat, looking-for-group, strategies).
*   **Direct Messaging**: Engage in private one-on-one conversations with other users, with support for in-context messaging directly from tournament pages.
*   **Game & Tournament Discovery**: Browse a curated list of popular games, view community stats, and find or host tournaments for specific titles.

## 🚀 Tech Stack

This application is built with a modern, robust, and scalable tech stack:

*   **Framework**: [Next.js](https://nextjs.org/) (with App Router)
*   **UI Library**: [React](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
*   **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) for AI-powered features.
*   **State Management**: React Context API for managing global state like tournaments, communities, and the social feed.

## 🏁 Getting Started

To get the development server running locally, follow these simple steps. No prior experience is required to get started!

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer. We recommend version 18 or higher.

### Installation & Setup

1.  **Clone the repository:**
    If you have git installed, you can run the following command. If not, you can download the source code as a ZIP file.
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    This command will download all the necessary packages the project needs to run.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    This step is for connecting to services like Firebase Genkit. For now, you can just create an empty file.
    ```bash
    touch .env
    ```

4.  **Run the development server:**
    This command starts the application.
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the application live!

## 📁 Project Structure

The codebase is organized to be modular and easy to navigate. Here's a high-level overview of the key directories:

```
src/
├── app/                  # Next.js App Router: All pages and routes live here.
├── ai/                   # All Genkit-related code for AI features.
├── components/           # Reusable UI components.
│   ├── dashboard/        # Components specific to the user dashboard.
│   ├── layout/           # Global layout components (header, sidebar, etc.).
│   └── ui/               # Base UI components from ShadCN (Button, Card, etc.).
├── context/              # React Context providers for global state management.
├── hooks/                # Custom React hooks (e.g., useToast).
└── lib/                  # Utility functions and server-side logic.
```

This structure helps keep the code organized and makes it easier to find files as you explore the project.
