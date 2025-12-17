# Music GPT Clone

A modern, full-stack music generation application built with Next.js, featuring real-time generation updates, an interactive music player, and a beautiful dark-themed interface.

## Features

### Core Functionality

- 🎵 **AI Music Generation** - Prompt-based music generation with real-time progress tracking
- 🔄 **Real-Time Updates** - WebSocket-powered live status updates during generation
- 🎧 **Built-in Music Player** - Floating music player with dual layout modes (vertical/horizontal)
- 📜 **Generation History** - View and replay all your recent music generations
- ⚡ **Live Progress Tracking** - Real-time progress bar showing generation status

### User Interface

- 🎨 **Modern UI/UX** - Clean, dark-themed interface with smooth animations
- 📱 **Responsive Design** - Optimized for all devices with mobile-first approach
- 🎯 **Interactive Components** - Tooltips, hover states, and smooth transitions
- 👤 **Profile Menu** - User profile management with settings
- 🎪 **Flexible Layouts** - Collapsible sidebar and adaptive music player layouts

### Technical Features

- 🧩 **Component-Based Architecture** - Modular, reusable React components
- 🔒 **Type-Safe** - Full TypeScript support for better developer experience
- 🎨 **Customizable Colors** - Centralized color system for easy theming (see [COLORS.md](./COLORS.md))
- 🔌 **WebSocket Integration** - Real-time bidirectional communication
- 📦 **State Management** - Zustand for efficient global state management

## Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org) (App Router with React 19)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Tooltips**: Tippy.js

### Backend & Real-Time

- **Custom Server**: Node.js with Next.js custom server
- **WebSocket**: Socket.IO (Server & Client)
- **Real-Time Communication**: Bidirectional event-based communication

### Audio Processing

- **HTML5 Audio**: Native browser audio API

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js config
- **CSS Processing**: PostCSS with Tailwind

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn/bun)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd music-gpt-clone
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The application uses a custom Node.js server (`server.js`) that integrates Socket.IO for real-time WebSocket communication.

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### What You'll See

- **Main Interface**: A clean prompt input box where you can describe the music you want to generate
- **Sidebar**: Navigation menu with library, recent generations, and settings
- **Real-Time Generation**: Watch your music generation progress in real-time
- **Music Player**: A floating player that appears when you play generated music
- **Recent Generations**: Gallery of all your previously generated music tracks

## Project Structure

This project follows a clean, modular architecture. For detailed information about the project structure, component hierarchy, and architecture principles, see [STRUCTURE.md](./STRUCTURE.md).

### Key Directories

- `app/` - Next.js App Router pages and layouts
  - `api/` - API routes for server-side logic
  - `assets/` - SVG icons and static assets
- `components/` - React components organized by feature
  - `layout/` - Layout components (Header, Sidebar, ProfileMenu)
  - `player/` - Music player components (Floating, Vertical, Horizontal)
  - `prompt/` - Prompt input, controls, and actions
  - `generation/` - Recent generations display
  - `providers/` - Context providers (Socket.IO)
  - `ui/` - Reusable UI components (animations, buttons)
- `hooks/` - Custom React hooks
  - `useSocket.ts` - WebSocket connection management
  - `useTooltip.ts` - Tooltip functionality
  - `useActiveNavigation.ts` - Navigation state management
- `lib/` - Utilities, constants, and type definitions
  - `store.ts` - Zustand state management (generations, player state)
  - `types.ts` - TypeScript type definitions
  - `utils.ts` - Helper functions
- `server.js` - Custom Node.js server with Socket.IO integration
- `public/` - Static assets (audio samples, images)

## Architecture & Key Components

### Real-Time Music Generation Flow

1. **User Input**: User enters a music prompt in the PromptInput component
2. **WebSocket Connection**: The app maintains a persistent Socket.IO connection
3. **Generation Request**: Request is sent to the custom server via WebSocket
4. **Progress Updates**: Server emits real-time progress updates (0-100%)
5. **Completion**: When complete, audio URL and thumbnail are sent to client
6. **State Update**: Zustand store updates, triggering UI re-renders
7. **Player Activation**: FloatingMusicPlayer component displays with the generated music

### State Management (Zustand)

The app uses a centralized Zustand store (`lib/store.ts`) that manages:

- **Generations**: Array of all music generations with status, progress, and metadata
- **Current Generation**: The currently playing/selected generation
- **Player State**: Play/pause state, current time, duration, volume
- **UI State**: Profile menu, tooltips, modals

### WebSocket Events

**Client → Server**:

- `start-generation`: Initiates a new music generation

**Server → Client**:

- `generation-update`: Real-time status updates with progress percentage
- `connect/disconnect`: Connection status events

### Component Highlights

#### FloatingMusicPlayer

- Dual layout modes (vertical/horizontal)
- Full audio controls (play/pause, seek, volume)
- Like/favorite functionality
- Responsive design that adapts to screen size

#### PromptInput

- Rich text input with validation
- Character count and limit
- Real-time validation feedback
- Integrated action buttons

#### RecentGenerations

- Gallery view of all generated music
- Status indicators (generating, completed, failed)
- Click to play/replay functionality
- Thumbnail images for visual appeal

#### Sidebar

- Collapsible navigation on mobile
- Active state management
- Search functionality
- Library and settings sections

## Color System

The project uses a centralized color system defined in CSS. To customize colors, see [COLORS.md](./COLORS.md) for detailed instructions and color reference.

## Development

### Available Scripts

- `pnpm dev` - Start development server with Socket.IO (runs `server.js`)
- `pnpm build` - Build for production
- `pnpm start` - Start production server with Socket.IO
- `pnpm lint` - Run ESLint

### Development Server

The application uses a custom Node.js server (`server.js`) that:

- Integrates Socket.IO for WebSocket communication
- Handles Next.js request routing
- Manages real-time music generation simulations
- Provides thumbnail image selection logic

### Code Style & Best Practices

- **TypeScript**: Full type safety with strict mode
- **ESLint**: Code quality and consistency enforcement
- **Component Design**:
  - Single responsibility principle
  - Props interfaces for all components
  - Custom hooks for shared logic
- **State Management**:
  - Zustand for global state
  - Local state for component-specific data
- **Styling**:
  - Tailwind CSS utility classes
  - CSS variables for theming
  - Responsive design patterns
- **Real-Time Communication**:
  - Socket.IO for bidirectional events
  - Event-driven architecture
  - Graceful error handling

### Key Development Features

- **Hot Module Replacement**: Instant updates during development
- **TypeScript IntelliSense**: Full autocomplete and type checking
- **Real-Time WebSocket Debugging**: Console logs for connection events
- **Component Organization**: Feature-based folder structure
- **Custom Hooks**: Reusable logic (useSocket, useTooltip, useActiveNavigation)

### Adding New Features

1. **New Components**: Add to appropriate folder in `components/`
2. **State Management**: Extend Zustand store in `lib/store.ts`
3. **WebSocket Events**: Add event handlers in `server.js` and `useSocket.ts`
4. **Styling**: Use Tailwind classes and CSS variables from `globals.css`
5. **Types**: Define interfaces in `lib/types.ts` or component files

## API & WebSocket Integration

### WebSocket Connection

The app establishes a WebSocket connection on mount via the `SocketProvider`:

```typescript
// Automatic connection in layout
<SocketProvider>{children}</SocketProvider>
```

### Generation Workflow

1. User submits a prompt
2. Client generates a unique ID for the generation
3. Client emits `start-generation` event with ID and prompt
4. Server simulates generation with progress updates every 100ms
5. Server emits `generation-update` events with:
   - `status`: "pending" | "generating" | "completed" | "failed"
   - `progress`: 0-100
   - `audioUrl`: URL to generated audio (on completion)
   - `thumbnailUrl`: Thumbnail identifier (on completion)
6. Client updates Zustand store, triggering UI updates

### Custom Server Features

The `server.js` file provides:

- **Next.js Integration**: Seamless Next.js request handling
- **Socket.IO Server**: WebSocket server on same port as HTTP
- **Generation Simulation**: Progress tracking and completion handling
- **Active Generation Management**: Prevents duplicate generations
- **Thumbnail Selection**: Deterministic image selection based on generation ID

## Troubleshooting

### Common Issues

**WebSocket Connection Failed**

- Ensure the dev server is running (`pnpm dev`)
- Check console for connection errors
- Verify port 3000 is not in use by another process

**Audio Not Playing**

- Check browser console for audio playback errors
- Ensure browser allows audio autoplay
- Verify audio file exists at `/public/audio/sample.mp3`

**Styles Not Loading**

- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `pnpm install`
- Check Tailwind CSS configuration

**TypeScript Errors**

- Run type checking: `npx tsc --noEmit`
- Ensure all dependencies are installed
- Check `tsconfig.json` for correct paths

**Hot Reload Not Working**

- Restart the development server
- Check for syntax errors in modified files
- Ensure file watchers are not exhausted (increase limit on Linux)

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React 19 Documentation](https://react.dev) - React framework documentation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Framer Motion Documentation](https://www.framer.com/motion/) - Animation library
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript language
- [Socket.IO Documentation](https://socket.io/docs/) - Real-time communication
- [Zustand Documentation](https://zustand-demo.pmnd.rs/) - State management

### Project Documentation

- [STRUCTURE.md](./STRUCTURE.md) - Detailed project structure and architecture
- [COLORS.md](./COLORS.md) - Color system and theming guide

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components inspired by modern music generation platforms
- Icons from [Lucide React](https://lucide.dev)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)

---

**Note**: This is a clone/learning project demonstrating modern web development practices with Next.js, TypeScript, and real-time WebSocket communication.
