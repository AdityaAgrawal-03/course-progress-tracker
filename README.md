# CourseTrack — Interactive Course Progress Tracker

A modern, responsive course progress tracker built with React, TypeScript, and Zustand. Track your learning journey across multiple courses with persistent progress tracking.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)

## Features

- **Dashboard View** — Overview of all enrolled courses with progress indicators
- **Course Detail View** — Collapsible modules with individual lesson tracking
- **Mark Lessons Complete** — Toggle completion with instant UI feedback
- **Progress Visualization** — Animated progress bars and circular progress rings
- **Persistent State** — Progress saved to localStorage via Zustand persist middleware
- **Responsive Design** — Mobile-first layout with sidebar on desktop
- **Keyboard Accessible** — Full keyboard navigation support
- **Completion Celebration** — Visual feedback when a course hits 100%
- **Reset Progress** — Option to reset individual course progress

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | React 18 + TypeScript               |
| Bundler          | Vite 6                              |
| Styling          | Tailwind CSS 3.4                    |
| State Management | Zustand 5 (with persist middleware) |
| Routing          | React Router 7                      |
| Animations       | Framer Motion + CSS animations      |
| Icons            | Lucide React                        |
| Linting          | ESLint 9 + Prettier                 |

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable primitives (Badge, ProgressBar)
│   ├── CompletionBanner.tsx # Course completion celebration
│   ├── CourseCard.tsx       # Dashboard course card
│   ├── LessonItem.tsx       # Individual lesson row with toggle
│   ├── ModuleSection.tsx    # Collapsible module accordion
│   └── ProgressRing.tsx     # Circular SVG progress indicator
├── data/
│   └── curriculum.ts        # Mock course curriculum data
├── hooks/
│   └── useProgress.ts       # Progress calculation hook
├── pages/
│   ├── Dashboard.tsx         # All courses overview
│   └── CoursePage.tsx        # Individual course detail view
├── store/
│   └── progressStore.ts     # Zustand store with localStorage
├── types/
│   └── index.ts             # TypeScript type definitions
├── utils/
│   └── progress.ts          # Helper functions and configs
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point
└── index.css                # Global styles + Tailwind
```

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/course-progress-tracker.git
cd course-progress-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

### Lint

```bash
npm run lint
```

## Design Decisions

1. **Zustand over Redux** — Minimal boilerplate for straightforward state. The `persist` middleware handles localStorage automatically.

2. **Custom hooks for logic** — Components stay presentational. All progress calculations live in `useProgress.ts`.

3. **Strict TypeScript** — No `any` types. All data structures are strongly typed with discriminated unions for lesson types.

4. **CSS-first animations** — Tailwind keyframes for most transitions, keeping the bundle lean. Framer Motion available for complex orchestration.

5. **Accessibility** — All interactive elements are keyboard navigable with proper ARIA labels and focus indicators.

## Deployment

This project is configured for one-click deployment on **Vercel**:

1. Push code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no configuration needed
4. Live in ~30 seconds

## License

MIT
