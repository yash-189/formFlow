# FormFlow Frontend

A modern, dynamic form builder and submission management system built with React, TypeScript, and TailwindCSS.


## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4 with custom theme system
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Form Handling**: Custom validation with schema-driven rendering
- **Date Handling**: date-fns
- **HTTP Client**: Axios

## Project Structure

```
src/
├── features/                   # Feature-based modules
│   ├── form-builder/          # Dynamic form rendering
│   │   ├── api/              # API integration
│   │   ├── components/       # Form components
│   │   ├── hooks/            # Custom hooks
│   │   └── types/            # TypeScript types
│   └── submissions/           # Submission management
│       ├── api/              # Submission API
│       ├── components/       # Table and viewer components
│       ├── hooks/            # Submission hooks
│       └── types/            # Submission types
├── shared/                    # Shared utilities and components
│   ├── components/           # Reusable components
│   │   ├── feedback/        # Loading, error, empty states
│   │   ├── form/            # Form wrappers and utilities
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Base UI components (shadcn)
│   ├── constants/            # Application constants
│   ├── hooks/                # Shared hooks
│   ├── services/             # HTTP client and services
│   └── utils/                # Utility functions
├── components/                # Top-level components
├── pages/                     # Page components
└── App.tsx                    # Root application component
```

## Architecture

### Feature-Based Organization

The codebase is organized by features rather than technical layers. Each feature is self-contained with its own API layer, components, hooks, and types. This approach:

- Improves code discoverability
- Reduces coupling between features
- Makes it easier to scale and maintain
- Facilitates code splitting and lazy loading

### Component Structure

Components follow a clear hierarchy:

1. **Pages**: Route-level components that compose features
2. **Features**: Domain-specific functionality (form-builder, submissions)
3. **Shared Components**: Reusable UI elements and layouts
4. **UI Components**: Base components from shadcn/ui

### State Management

- **Server State**: Managed with TanStack Query for caching, synchronization, and automatic refetching
- **Local State**: React hooks for component-level state
- **Theme State**: Context API for dark/light mode preferences

### Form System

The application uses a schema-driven approach for form rendering:

1. **Schema Definition**: Forms are defined as JSON schemas on the backend
2. **Dynamic Rendering**: `FormFieldRenderer` interprets schemas and renders appropriate fields
3. **Validation**: Both client-side and server-side validation with real-time feedback
4. **Type Safety**: Full TypeScript support for form data and validation rules

### Data Table System

The submissions table uses a flexible, reusable table component:

- Built on TanStack Table for sorting, filtering, and pagination
- Server-side pagination for performance
- Column-based architecture for easy customization
- Responsive design with horizontal scroll on mobile

## Key Features

### Dynamic Forms

- Schema-driven form generation
- Support for multiple field types (text, number, date, select, multi-select, textarea, switch)
- Real-time validation with error messages
- Conditional field rendering based on field type
- Responsive grid layout

### Submission Management

- Paginated submission table
- Inline data display for all form fields
- Search and filter capabilities
- Export functionality (planned)

### Theme System

- Light and dark mode support
- System preference detection
- Persistent theme selection
- Smooth transitions between themes
- Theme-aware components throughout

### User Experience

- Loading states for async operations
- Error boundaries and error messages
- Empty states with actionable CTAs
- Success confirmations with auto-redirect
- Responsive design for all screen sizes

## API Integration

The frontend communicates with the backend through a centralized API client:

- **Base Client**: Axios instance with interceptors
- **Feature APIs**: Domain-specific API functions
- **Type Safety**: Full TypeScript coverage for requests and responses
- **Error Handling**: Consistent error processing and user feedback

## Styling Approach



## Development Workflow

### Getting Started

```bash
npm install
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint


