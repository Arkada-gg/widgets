# Web Components

## Overview

Each widget is available as a standard custom element. The Web Component layer wraps the React smart widget in a Shadow DOM, giving it full style isolation from the host page.

---

## The `createArkadaElement` Factory

**File:** `src/web-components/base/createArkadaElement.ts`

The factory creates a class that extends `HTMLElement`. It handles the full lifecycle: mounting React into Shadow DOM, re-rendering on attribute changes, and unmounting on disconnect.

```ts
function createArkadaElement<TData>(config: ArkadaElementConfig<TData>): typeof HTMLElement
```

### Config shape

```ts
interface ArkadaElementConfig<TData> {
  component: React.ComponentType<{
    data: TData;
    theme?: WidgetTheme;
    size?: WidgetSize;
    [key: string]: unknown;
  }>;
  observedAttributes?: string[];   // Additional attributes beyond the shared set
  events?: Record<                 // Maps React callback props → DOM CustomEvents
    string,
    string | { eventName: string; buildDetail: (el, args) => unknown }
  >;
}
```

### Shared attributes

The factory always observes and handles these three:

| Attribute | Passed as prop | Description |
|---|---|---|
| `theme` | `theme` | `"dark"` \| `"light"`, default: `"dark"` |
| `size` | `size` | `"sm"` \| `"lg"`, default: `"lg"` |
| `data` | `data` (parsed JSON) | Widget-specific configuration object |

### Rendering lifecycle

1. `connectedCallback` — creates a `ReactDOM.Root` and calls `_render()`
2. `attributeChangedCallback` — calls `_render()` on any attribute change
3. `disconnectedCallback` — calls `root.unmount()`
4. `set data(value)` — accepts a JS object directly (bypasses JSON parsing), calls `_render()`

> `_render()` is a no-op until `data` is available. The component will not mount without valid data.

---

## Shadow DOM & Styles

Each widget creates a Shadow DOM on construction:

```ts
this._shadowRoot = this.attachShadow({ mode: "open" });
```

The full compiled CSS (`src/index.css`, which includes Tailwind output) is injected as a `<style>` element inside the Shadow DOM:

```ts
import styles from "@/index.css?inline";
// ...
const styleEl = document.createElement("style");
styleEl.textContent = styles;
this._shadowRoot.appendChild(styleEl);
```

This means:
- Host page styles **cannot** affect widgets.
- Widget styles **cannot** leak to the host page.
- No separate stylesheet link is needed — the JS bundle is self-contained.

---

## Writing a Web Component Wrapper

```tsx
// src/web-components/arkada-<name>-widget.tsx

import { createArkadaElement } from "./base/createArkadaElement";
import { MyWidget } from "@/widgets/<smart-widget>";
import type { WidgetTheme } from "@/shared/config";

export interface MyWidgetData {
  someParam: string;
  variant?: string;   // widget-specific config goes in data
}

const ArkadaMyWidget = createArkadaElement<MyWidgetData>({
  component: ({ data, theme }: { data: MyWidgetData; theme?: WidgetTheme }) => (
    <MyWidget someParam={data.someParam} theme={theme} variant={data.variant} />
  ),
});

if (!customElements.get("arkada-<name>-widget")) {
  customElements.define("arkada-<name>-widget", ArkadaMyWidget);
}

export { ArkadaMyWidget };
```

### Why `theme` is a top-level attribute but `variant` goes in `data`

`theme` is a **shared attribute** — every widget supports it, so the factory extracts it and passes it as a prop automatically. Widget-specific props like `variant` are not shared and should go in the `data` JSON to avoid bloating the factory's observed attribute list.

---

## Events

To expose React callback props as DOM events, use the `events` config option:

```ts
createArkadaElement({
  component: MyWidget,
  events: {
    // Simple form: detail = first argument passed to the callback
    onVerify: "verify",

    // Full form: custom detail shape
    onVerify: {
      eventName: "verify",
      buildDetail: (el, args) => ({
        address: el.getAttribute("data-address"),
        result: args[0],
      }),
    },
  },
})
```

The element dispatches a `CustomEvent` that bubbles and is composed (crosses Shadow DOM boundary):

```ts
this.dispatchEvent(new CustomEvent("verify", {
  detail: ...,
  bubbles: true,
  composed: true,
}));
```

Listen in the host page:

```js
document.querySelector("arkada-wvbs-widget")
  .addEventListener("verify", (e) => console.log(e.detail));
```

---

## Setting Data Programmatically

Beyond the `data` attribute (JSON string), you can set the `data` property directly:

```js
const el = document.querySelector("arkada-wvbs-widget");

// Via attribute (JSON string)
el.setAttribute("data", JSON.stringify({ walletAddress: "0xabc..." }));

// Via property (plain object — no JSON serialization needed)
el.data = { walletAddress: "0xabc..." };
```

The property setter triggers an immediate re-render.

---

## Registered Elements

| Custom element | File | Status |
|---|---|---|
| `arkada-wvbs-widget` | `arkada-wvbs-widget.tsx` | ✅ Production |
| `arkada-vwb-widget` | *(removed)* | ❌ Removed — was UI-only |
| `arkada-wv-widget` | `arkada-wv-widget.ts` | 🚧 In development, not exported |
