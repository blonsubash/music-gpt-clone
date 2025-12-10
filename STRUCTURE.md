# Project Structure

This project follows a clean, modular architecture with separation of concerns.

## Directory Structure

```
music-gpt-clone/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Main page (orchestrates layout)
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── layout/             # Layout components
│   │   ├── Header.tsx      # Top header with auth buttons
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
│   ├── prompt/             # Prompt box module
│   │   ├── PromptBox.tsx        # Main prompt container
│   │   ├── PromptInput.tsx      # Textarea input
│   │   ├── PromptControls.tsx   # Control buttons
│   │   ├── PromptActions.tsx    # Action buttons
│   │   └── index.ts             # Barrel exports
│   │
│   ├── ui/                 # Reusable UI components
│   │   └── NavButton.tsx   # Navigation button component
│   │
│   └── index.ts            # Main barrel export
│
├── hooks/                  # Custom React hooks
│   └── useActiveNavigation.ts  # Navigation state management
│
├── lib/                    # Utilities and configuration
│   ├── constants.ts        # App constants (nav items, etc.)
│   ├── types.ts            # TypeScript type definitions
│   └── utils.ts            # Utility functions (cn helper)
│
└── public/                 # Static assets
```

## Architecture Principles

1. **Component Modularity**: Each component has a single responsibility
2. **Separation of Concerns**: Business logic separated from UI
3. **Type Safety**: Full TypeScript coverage with proper types
4. **Reusability**: Components are composable and reusable
5. **Clean Imports**: Barrel exports for cleaner import statements
6. **Custom Hooks**: State management logic extracted to hooks
7. **Constants**: Configuration data centralized in constants file

## Component Hierarchy

```
Home (page.tsx)
├── Sidebar
│   ├── SidebarLogo
│   ├── SidebarSearch
│   ├── SidebarNavigation
│   │   └── NavButton (multiple)
│   ├── SidebarLibrary
│   │   └── NavButton (multiple)
│   ├── SidebarPromo
│   └── SidebarFooter
├── Header
└── PromptBox
    ├── PromptInput
    ├── PromptControls
    └── PromptActions
```

## Key Features

- ✅ Type-safe with TypeScript
- ✅ Component-based architecture
- ✅ Reusable UI components
- ✅ Custom hooks for state management
- ✅ Centralized constants
- ✅ Clean import paths with aliases (@/)
- ✅ Responsive design with Tailwind CSS
- ✅ Accessible (ARIA labels where appropriate)

