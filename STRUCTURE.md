# Project Structure

This project follows a clean, modular architecture with separation of concerns, real-time WebSocket communication, and global state management.

## Directory Structure

```
music-gpt-clone/
├── app/                      # Next.js App Router
│   ├── api/                 # API routes
│   │   └── generate/        # Music generation endpoints
│   │       └── route.ts     # Generation API handler
│   ├── assets/              # Application assets
│   │   └── icons/          # SVG icons
│   │       ├── attach-file.svg
│   │       ├── controls.svg
│   │       ├── instrumental-wave.svg
│   │       └── index.ts    # Icon exports
│   ├── page.tsx             # Main page (home)
│   ├── layout.tsx           # Root layout with providers
│   ├── globals.css          # Global styles & CSS variables
│   └── favicon.ico          # App favicon
│
├── components/              # React components (feature-based)
│   ├── layout/             # Layout & navigation components
│   │   ├── Header.tsx      # Top header with auth buttons
│   │   ├── ProfileMenu.tsx # User profile dropdown menu
│   │   └── Sidebar/        # Sidebar module
│   │       ├── Sidebar.tsx           # Main sidebar container
│   │       ├── SidebarLogo.tsx       # Logo component
│   │       ├── SidebarSearch.tsx     # Search input
│   │       ├── SidebarNavigation.tsx # Navigation items
│   │       ├── SidebarLibrary.tsx    # Library section
│   │       ├── SidebarPromo.tsx      # Promotional box
│   │       ├── SidebarFooter.tsx     # Footer links
│   │       └── index.ts              # Barrel exports
│   │
│   ├── player/             # Music player components
│   │   ├── FloatingMusicPlayer.tsx  # Main player container
│   │   ├── VerticalPlayer.tsx       # Vertical layout player
│   │   ├── HorizontalPlayer.tsx     # Horizontal layout player
│   │   ├── PlayerProps.ts           # Shared player types
│   │   └── index.ts                 # Barrel exports
│   │
│   ├── generation/         # Music generation components
│   │   ├── RecentGenerations.tsx   # Generation history gallery
│   │   └── index.ts                # Barrel exports
│   │
│   ├── prompt/             # Prompt input module
│   │   ├── PromptBox.tsx        # Main prompt container
│   │   ├── PromptInput.tsx      # Rich textarea input
│   │   ├── PromptControls.tsx   # Control buttons
│   │   ├── PromptActions.tsx    # Action buttons
│   │   └── index.ts             # Barrel exports
│   │
│   ├── providers/          # Context providers
│   │   └── SocketProvider.tsx  # Socket.IO provider
│   │
│   ├── ui/                 # Reusable UI components
│   │   ├── NavButton.tsx   # Navigation button
│   │   ├── Animate.tsx     # Animation wrapper components
│   │   └── index.ts        # Barrel exports
│   │
│   └── index.ts            # Main barrel export
│
├── hooks/                  # Custom React hooks
│   ├── useActiveNavigation.ts  # Navigation state management
│   ├── useSocket.ts            # WebSocket connection hook
│   └── useTooltip.ts           # Tooltip functionality hook
│
├── lib/                    # Utilities and configuration
│   ├── store.ts            # Zustand global state store
│   ├── types.ts            # TypeScript type definitions
│   ├── constants.ts        # App constants (nav items, etc.)
│   ├── utils.ts            # Utility functions (cn, clsx)
│   ├── imageUtils.ts       # Image utility functions
│   └── placeholderUtils.ts # Placeholder data utilities
│
├── public/                 # Static assets
│   ├── audio/             # Audio files
│   │   └── sample.mp3     # Sample music file
│   └── *.svg              # Public SVG files
│
├── server.js               # Custom Node.js server with Socket.IO
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Architecture Principles

### Core Principles

1. **Component Modularity**: Each component has a single responsibility
2. **Separation of Concerns**: Business logic separated from UI components
3. **Type Safety**: Full TypeScript coverage with strict typing
4. **Reusability**: Components are composable and reusable
5. **Clean Imports**: Barrel exports for cleaner import statements
6. **Custom Hooks**: Shared logic extracted into reusable hooks
7. **Centralized Configuration**: Constants and types in dedicated files

### State Management

- **Global State**: Zustand store (`lib/store.ts`) for application-wide state
  - Generation history and status
  - Current playing track
  - Player state (play/pause, time, volume)
  - UI state (modals, menus)
- **Local State**: React useState for component-specific state
- **Real-Time Updates**: WebSocket events update global state reactively

### Real-Time Communication

- **Custom Server**: Node.js server with Socket.IO integration
- **WebSocket Events**: Bidirectional communication for live updates
- **Event-Driven**: Generation progress updates streamed in real-time
- **Connection Management**: Automatic reconnection and error handling

### Component Organization

- **Feature-Based**: Components grouped by feature/domain
- **Atomic Design**: Small, composable components
- **Provider Pattern**: Context providers for cross-cutting concerns
- **Barrel Exports**: Index files for clean imports

## Component Hierarchy

```
Root Layout (app/layout.tsx)
├── SocketProvider (WebSocket connection)
│   └── {children}

Home Page (app/page.tsx)
├── Sidebar
│   ├── SidebarLogo
│   ├── SidebarSearch
│   ├── SidebarNavigation
│   │   └── NavButton (multiple)
│   ├── SidebarLibrary
│   │   └── NavButton (multiple)
│   ├── SidebarPromo
│   └── SidebarFooter
│
├── Header
│   └── ProfileMenu (user menu dropdown)
│       ├── Profile Section
│       ├── Settings Options
│       ├── Help & Support
│       └── Sign Out
│
├── Main Content
│   ├── PromptBox
│   │   ├── PromptInput (rich textarea)
│   │   ├── PromptControls (character count, actions)
│   │   └── PromptActions (submit, attachments)
│   │
│   └── RecentGenerations (generation history)
│       └── Generation Cards (multiple)
│           ├── Thumbnail
│           ├── Title & Metadata
│           ├── Progress Bar (if generating)
│           └── Play Button
│
└── FloatingMusicPlayer (conditional render)
    ├── VerticalPlayer (layout mode)
    │   ├── Album Art
    │   ├── Track Info
    │   ├── Playback Controls
    │   ├── Progress Bar
    │   ├── Volume Control
    │   └── Action Buttons (like, layout toggle, close)
    │
    └── HorizontalPlayer (layout mode)
        ├── Album Art (smaller)
        ├── Track Info
        ├── Playback Controls
        ├── Progress Bar
        ├── Volume Control
        └── Action Buttons (like, layout toggle, close)
```

## Data Flow Architecture

### 1. Music Generation Flow

```
User Action (PromptInput)
    ↓
Generate unique ID + Create Generation object
    ↓
Add to Zustand Store (status: "pending")
    ↓
Emit WebSocket event → Server (start-generation)
    ↓
Server simulates generation with progress updates
    ↓
Server emits progress events → Client (generation-update)
    ↓
useSocket hook receives updates
    ↓
Update Zustand Store (status: "generating", progress: 0-100)
    ↓
UI components re-render (RecentGenerations shows progress)
    ↓
Generation completes
    ↓
Server sends audioUrl + thumbnailUrl
    ↓
Update Zustand Store (status: "completed")
    ↓
User clicks play
    ↓
Set currentGeneration in store
    ↓
FloatingMusicPlayer renders and plays audio
```

### 2. Player State Flow

```
User clicks play on generation
    ↓
Update Zustand Store: setCurrentGeneration(generation)
    ↓
FloatingMusicPlayer detects currentGeneration change
    ↓
Load audio file (audioRef.current.load())
    ↓
Set isPlaying to true
    ↓
Audio element plays
    ↓
Time updates trigger setCurrentTime
    ↓
Progress bar updates reactively
    ↓
User interactions (seek, volume, pause) update store
    ↓
Audio element syncs with store state
```

### 3. WebSocket Events

**Client → Server**:

- `start-generation` - Initiates music generation
  ```typescript
  { id: string, prompt: string }
  ```

**Server → Client**:

- `generation-update` - Progress and status updates
  ```typescript
  {
    id: string,
    status: "pending" | "generating" | "completed" | "failed",
    progress: number (0-100),
    audioUrl?: string,
    thumbnailUrl?: string,
    completedAt?: string
  }
  ```
- `connect` - Connection established
- `disconnect` - Connection lost

## Zustand Store Structure

```typescript
interface GenerationStore {
  // Generation data
  generations: Generation[]; // All generations
  currentGeneration: Generation | null; // Currently playing

  // Player state
  isPlaying: boolean; // Play/pause state
  currentTime: number; // Current playback position
  duration: number; // Track duration
  volume: number; // Volume (0-1)

  // UI state
  invalidPrompt: string | null; // Prompt validation errors
  insufficientCredit: boolean; // Credit check
  failedGeneration: Generation | null; // Failed generation details
  isProfileMenuOpen: boolean; // Profile menu state

  // Actions
  addGeneration: (generation) => void;
  updateGeneration: (id, updates) => void;
  setCurrentGeneration: (generation) => void;
  setIsPlaying: (isPlaying) => void;
  // ... more actions
}
```

## Custom Hooks

### useSocket

Manages WebSocket connection and event handling:

- Establishes Socket.IO connection on mount
- Listens for `generation-update` events
- Provides `startGeneration` function
- Returns connection status

### useTooltip

Provides tooltip functionality using Tippy.js:

- Lazy loads Tippy.js library
- Provides tooltip helper function
- Supports custom Tippy.js options

### useActiveNavigation

Manages navigation active state:

- Tracks current active navigation item
- Provides handler to change active item
- Persists state across component renders

## Key Features

### Architecture

- ✅ **Type-safe with TypeScript** - Full type coverage
- ✅ **Component-based architecture** - Modular design
- ✅ **Real-time WebSocket** - Live generation updates
- ✅ **Global state management** - Zustand store
- ✅ **Custom server** - Node.js with Socket.IO
- ✅ **Reusable UI components** - DRY principles

### Developer Experience

- ✅ **Custom hooks** - Shared logic extraction
- ✅ **Centralized configuration** - Constants and types
- ✅ **Clean imports** - Barrel exports and path aliases (@/)
- ✅ **Hot Module Replacement** - Fast development
- ✅ **TypeScript IntelliSense** - Full autocomplete

### User Experience

- ✅ **Responsive design** - Mobile-first with Tailwind CSS
- ✅ **Smooth animations** - Framer Motion
- ✅ **Interactive tooltips** - Tippy.js integration
- ✅ **Accessible** - ARIA labels and keyboard navigation
- ✅ **Real-time feedback** - Live progress tracking
- ✅ **Dual player layouts** - Vertical and horizontal modes

## File Naming Conventions

- **Components**: PascalCase (e.g., `FloatingMusicPlayer.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useSocket.ts`)
- **Utilities**: camelCase (e.g., `imageUtils.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `Generation`)
- **Constants**: UPPER_SNAKE_CASE for constants
- **Barrel exports**: `index.ts` in each feature folder

## Import Organization

```typescript
// 1. External dependencies
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// 2. Internal absolute imports (using @/ alias)
import { useGenerationStore } from "@/lib/store";
import { Generation } from "@/lib/types";

// 3. Relative imports (if needed)
import { PlayerProps } from "./PlayerProps";

// 4. Styles (if separate)
import "./styles.css";
```

## Code Organization Best Practices

1. **Keep components focused** - Single responsibility principle
2. **Extract complex logic** - Move to custom hooks
3. **Use TypeScript strictly** - Define all types/interfaces
4. **Centralize shared logic** - Utilities and constants
5. **Maintain consistent structure** - Follow established patterns
6. **Document complex logic** - Add comments where needed
7. **Use barrel exports** - Simplify imports
8. **Keep files small** - Split large components
