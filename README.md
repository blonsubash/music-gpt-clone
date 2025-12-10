# Music GPT Clone

A modern, interactive music generation interface built with Next.js, featuring an intuitive sidebar navigation, prompt-based input system, and a beautiful dark theme.

## Features

- 🎨 **Modern UI/UX** - Clean, dark-themed interface with smooth animations
- 🎵 **Prompt-Based Interface** - Interactive prompt box for music generation requests
- 📱 **Responsive Design** - Built with Tailwind CSS for optimal viewing on all devices
- 🧩 **Component-Based Architecture** - Modular, reusable components for easy maintenance
- 🎯 **Type-Safe** - Full TypeScript support for better developer experience
- 🎨 **Customizable Colors** - Centralized color system for easy theming (see [COLORS.md](./COLORS.md))

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Package Manager**: pnpm

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

This project follows a clean, modular architecture. For detailed information about the project structure, component hierarchy, and architecture principles, see [STRUCTURE.md](./STRUCTURE.md).

### Key Directories

- `app/` - Next.js App Router pages and layouts
- `components/` - React components organized by feature
  - `layout/` - Layout components (Header, Sidebar)
  - `prompt/` - Prompt input and controls
  - `ui/` - Reusable UI components
- `hooks/` - Custom React hooks
- `lib/` - Utilities, constants, and type definitions

## Color System

The project uses a centralized color system defined in CSS. To customize colors, see [COLORS.md](./COLORS.md) for detailed instructions and color reference.

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component modularity and reusability

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

This project is private and proprietary.
