# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **Imports**: Group imports: 1) React/Next.js, 2) Components (@/ path), 3) External packages
- **Components**: Use function declarations with PascalCase names
- **Types**: Use TypeScript interfaces (ComponentProps naming pattern) and explicit types
- **File Names**: kebab-case.tsx for components, camelCase.ts for utilities
- **Formatting**: Use proper indentation (2 spaces) and semicolons
- **Styling**: Tailwind CSS with utility-first approach, use cn() for conditionals
- **Error Handling**: Defensive programming with nullish coalescing and default values
- **Strict Mode**: TypeScript strict mode enabled, ensure proper type definitions

When creating new components, follow structure in existing components and maintain consistent patterns.