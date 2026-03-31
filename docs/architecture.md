# Architecture

## Overview

`arkada-widgets` is a React widget library that also ships as Web Components. The architecture enforces a strict layering rule: API logic never touches UI, and UI never knows about the API.

```
┌─────────────────────────────────────────────────────┐
│                   Consumer                          │
│  React app  │  Plain HTML  │  Any framework         │
└──────┬──────┴──────┬───────┴────────────────────────┘
       │             │
       │ import      │ <custom-element>
       ▼             ▼
┌─────────────────────────────────────────────────────┐
│               Public interface                      │
│  src/index.ts          src/web-components/index.ts  │
└──────┬──────────────────────────┬───────────────────┘
       │                          │
       ▼                          ▼
┌─────────────────┐   ┌───────────────────────────────┐
│  Smart widget   │   │        Web Component          │
│  (React)        │   │  createArkadaElement wrapper  │
│                 │◄──│  + Shadow DOM + styles        │
└────────┬────────┘   └───────────────────────────────┘
         │
         ▼
┌─────────────────┐
│   UI widget     │  Pure presentational component.
│  (React)        │  No API calls. No side effects.
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Data hook      │  Fetches data. Returns state.
│  (React hook)   │  Knows nothing about rendering.
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API client    │  Singleton. Generated from OpenAPI spec.
│  (shared)       │  Configured with ARKADA_PUBLIC_API_URL.
└─────────────────┘
```

---

## Layer Responsibilities

### API client — `src/shared/api/client.ts`

A single instance of the generated `Api` class, configured with the base URL from `src/shared/config`. Shared across all widgets — never instantiated per component.

```
src/shared/api/
  spec.json        ← OpenAPI spec (source of truth)
  types.ts         ← Auto-generated: HttpClient, Api class, all DTOs
  client.ts        ← Singleton instance, base URL injection
```

### Data hook — `src/widgets/<name>/hooks/`

Responsible for one thing: fetching data and returning state. Does not render anything. Cleans up on unmount via `AbortController`.

### UI widget — `src/widgets/verify-wallet-button/`

A purely presentational React component. No `useEffect`, no API calls. Accepts state as props and fires callbacks. Multiple visual variants are contained here.

> This layer is **internal**. It is never exported from the public package entry (`src/index.ts`).

### Smart widget — `src/widgets/wallet-verification-button/`

Composes the data hook + UI widget. This is what the consumer imports. Accepts only the minimal props needed: `walletAddress`, `theme`, `variant`. Everything else is handled internally.

### Web Component — `src/web-components/`

Wraps the smart widget in a custom element using the `createArkadaElement` factory. Renders into a Shadow DOM to ensure complete style isolation. Translates HTML attributes to React props.

---

## Key Design Decisions

### Why split `verify-wallet-button` (UI) from `wallet-verification-button` (smart)?

Separating presentational and container components keeps the UI independently testable and reusable. If a new widget needs a similar button, it can use the UI component without the API logic. The consumer never sees this split — they only use the smart widget.

### Why a singleton API client?

Instantiating `new Api()` per component would create separate fetch configurations for each widget instance. The singleton ensures one configuration point and avoids any resource duplication when multiple widgets are on the same page.

### Why is `variant` in `data` for the Web Component, not a separate attribute?

The `createArkadaElement` factory only handles a fixed set of shared attributes (`theme`, `size`, `data`). Adding first-class support for every widget-specific attribute would require modifying the factory for each new widget. Passing widget-specific config through the `data` JSON keeps the factory stable and avoids a growing list of observed attributes.

### Why Shadow DOM?

Widgets are embedded into third-party pages. Shadow DOM guarantees that external CSS cannot break the widget's appearance, and the widget's CSS cannot leak into the host page.

---

## Directory Structure

```
src/
├── shared/
│   ├── api/
│   │   ├── spec.json              OpenAPI specification
│   │   ├── types.ts               Auto-generated types and client
│   │   └── client.ts              Singleton API client
│   ├── config/
│   │   └── index.ts               ARKADA_PUBLIC_API_URL and global defaults
│   ├── hooks/
│   │   └── useTheme.ts            Sets data-theme attribute on element ref
│   └── utils/
│       └── cn.ts                  clsx wrapper
├── ui-kit/                        Base components, tokens, themes (internal)
├── widgets/
│   ├── verify-wallet-button/      UI-only presentational component (internal)
│   └── wallet-verification-button/
│       ├── components/            WalletVerificationButton (smart, exported)
│       ├── hooks/                 useWalletVerification
│       └── index.ts
└── web-components/
    ├── base/
    │   └── createArkadaElement.ts Factory for custom elements
    ├── arkada-wvbs-widget.tsx     Web Component wrapper
    └── index.ts                   Registers all elements, re-exports types
```
