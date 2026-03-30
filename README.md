# Arkada Widgets

A UI widget library for the Arkada ecosystem. Widgets are shipped as Web Components with React rendering inside Shadow DOM, ensuring complete style isolation and compatibility with any framework.

## Tech Stack

- **React 19** + **TypeScript** — components and type safety
- **Vite** — library mode build (ES modules)
- **Tailwind CSS 4** — styling
- **Web Components** + Shadow DOM — isolation and universality
- **Storybook** — documentation and visual testing

## Quick Start

```bash
npm install
npm run dev        # Dev server
npm run storybook  # Component docs
npm run build      # Production build
```

## Exports

```javascript
// All widgets
import 'arkada-widgets';

// Wallet Verification only
import 'arkada-widgets/wallet-verification';
```

## Documentation

- [Wallet Verification Widget](docs/wallet-verification-widget/README.md) — crypto wallet verification status widget across blockchain networks

## Development

```bash
npm run dev          # Vite dev server with HMR
npm run storybook    # Storybook on port 6006
npm run build        # TypeScript + Vite production build
npm run lint         # ESLint
```
