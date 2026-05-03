import type { Course } from "../types";

export const courses: Course[] = [
  {
    id: "cs-101",
    title: "Web Development Fundamentals",
    description:
      "Master HTML, CSS, and JavaScript from the ground up. Build real projects and understand how the web truly works.",
    instructor: "Sarah Chen",
    difficulty: "beginner",
    totalDuration: "4h 32min",
    thumbnail: "🌐",
    modules: [
      {
        id: "m1",
        title: "Getting Started with HTML",
        lessons: [
          { id: "l1", title: "Introduction to HTML", duration: "8 min", type: "video" },
          { id: "l2", title: "Document Structure & Semantics", duration: "12 min", type: "article" },
          { id: "l3", title: "Forms and Input Elements", duration: "15 min", type: "video" },
          { id: "l4", title: "HTML Fundamentals Quiz", duration: "5 min", type: "quiz" },
        ],
      },
      {
        id: "m2",
        title: "Styling with CSS",
        lessons: [
          { id: "l5", title: "CSS Selectors & Specificity", duration: "14 min", type: "video" },
          { id: "l6", title: "Flexbox Deep Dive", duration: "20 min", type: "video" },
          { id: "l7", title: "CSS Grid Layouts", duration: "18 min", type: "article" },
          { id: "l8", title: "Build a Responsive Card", duration: "25 min", type: "exercise" },
          { id: "l9", title: "CSS Layout Challenge", duration: "10 min", type: "quiz" },
        ],
      },
      {
        id: "m3",
        title: "JavaScript Essentials",
        lessons: [
          { id: "l10", title: "Variables, Types & Operators", duration: "16 min", type: "video" },
          { id: "l11", title: "Functions & Scope", duration: "20 min", type: "video" },
          { id: "l12", title: "DOM Manipulation", duration: "22 min", type: "article" },
          { id: "l13", title: "Event Handling Patterns", duration: "18 min", type: "video" },
          { id: "l14", title: "Build an Interactive Form", duration: "30 min", type: "exercise" },
          { id: "l15", title: "JavaScript Mastery Quiz", duration: "10 min", type: "quiz" },
        ],
      },
    ],
  },
  {
    id: "cs-102",
    title: "React & Modern Frontend",
    description:
      "Learn React from scratch — components, hooks, state management, and building production-ready applications.",
    instructor: "Alex Rivera",
    difficulty: "intermediate",
    totalDuration: "6h 15min",
    thumbnail: "⚛️",
    modules: [
      {
        id: "m4",
        title: "React Foundations",
        lessons: [
          { id: "l16", title: "What is React & Why Use It?", duration: "10 min", type: "video" },
          { id: "l17", title: "JSX and Component Basics", duration: "18 min", type: "video" },
          { id: "l18", title: "Props and Data Flow", duration: "15 min", type: "article" },
          { id: "l19", title: "Build Your First Component", duration: "20 min", type: "exercise" },
          { id: "l20", title: "React Basics Quiz", duration: "8 min", type: "quiz" },
        ],
      },
      {
        id: "m5",
        title: "Hooks & State Management",
        lessons: [
          { id: "l21", title: "useState and useEffect", duration: "22 min", type: "video" },
          { id: "l22", title: "Custom Hooks Patterns", duration: "20 min", type: "article" },
          { id: "l23", title: "Context API Deep Dive", duration: "18 min", type: "video" },
          { id: "l24", title: "State Management with Zustand", duration: "25 min", type: "video" },
          { id: "l25", title: "Build a Todo App", duration: "35 min", type: "exercise" },
          { id: "l26", title: "Hooks Mastery Quiz", duration: "10 min", type: "quiz" },
        ],
      },
      {
        id: "m6",
        title: "Production Patterns",
        lessons: [
          { id: "l27", title: "React Router Setup", duration: "16 min", type: "video" },
          { id: "l28", title: "API Integration Patterns", duration: "22 min", type: "article" },
          { id: "l29", title: "Error Boundaries & Suspense", duration: "18 min", type: "video" },
          { id: "l30", title: "Performance Optimization", duration: "20 min", type: "video" },
          { id: "l31", title: "Build a Dashboard App", duration: "45 min", type: "exercise" },
          { id: "l32", title: "Final Assessment", duration: "15 min", type: "quiz" },
        ],
      },
    ],
  },
  {
    id: "cs-103",
    title: "TypeScript Masterclass",
    description:
      "Go from zero to advanced TypeScript. Learn type systems, generics, utility types, and real-world patterns.",
    instructor: "Priya Sharma",
    difficulty: "advanced",
    totalDuration: "5h 48min",
    thumbnail: "🔷",
    modules: [
      {
        id: "m7",
        title: "TypeScript Basics",
        lessons: [
          { id: "l33", title: "Why TypeScript Matters", duration: "8 min", type: "video" },
          { id: "l34", title: "Basic Types & Interfaces", duration: "18 min", type: "video" },
          { id: "l35", title: "Type Narrowing & Guards", duration: "15 min", type: "article" },
          { id: "l36", title: "Typing Exercise Set", duration: "20 min", type: "exercise" },
        ],
      },
      {
        id: "m8",
        title: "Advanced Type System",
        lessons: [
          { id: "l37", title: "Generics In Depth", duration: "25 min", type: "video" },
          { id: "l38", title: "Utility Types Cookbook", duration: "20 min", type: "article" },
          { id: "l39", title: "Conditional & Mapped Types", duration: "22 min", type: "video" },
          { id: "l40", title: "Advanced Type Challenges", duration: "30 min", type: "exercise" },
          { id: "l41", title: "Type System Quiz", duration: "10 min", type: "quiz" },
        ],
      },
      {
        id: "m9",
        title: "Real-World Patterns",
        lessons: [
          { id: "l42", title: "Typing React Components", duration: "20 min", type: "video" },
          { id: "l43", title: "API Response Typing", duration: "18 min", type: "article" },
          { id: "l44", title: "Error Handling Patterns", duration: "15 min", type: "video" },
          { id: "l45", title: "Build a Type-Safe API Client", duration: "40 min", type: "exercise" },
          { id: "l46", title: "Final TypeScript Assessment", duration: "15 min", type: "quiz" },
        ],
      },
    ],
  },
];
