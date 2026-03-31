# Adding a New Widget

Follow these steps every time a new widget is added to the library. Each step is required — skipping one will result in a broken build or a missing export.

---

## Step 1 — Create the UI component (presentational layer)

Create a new directory under `src/widgets/<widget-name>/`.

```
src/widgets/<widget-name>/
  components/
    <WidgetName>.tsx       ← Pure presentational component, no side effects
  model/
    types.ts               ← Enums, types specific to this widget's UI
  styles/
    <widget-name>.css      ← Widget-specific CSS (if needed)
  index.ts                 ← Barrel export
```

Rules for this layer:
- **No `useEffect`**. No API calls. No data fetching of any kind.
- Accept only what it needs to render: state, variant, theme, callbacks.
- All variants live here as sub-components or a variant map.

---

## Step 2 — Create the data hook

```
src/widgets/<smart-widget-name>/
  hooks/
    use<WidgetName>.ts     ← Fetches data, returns { data, isLoading, error }
```

Hook rules:
- Call `apiClient` — never instantiate `new Api()` inside the hook.
- Always return an `isLoading` boolean and an `error` field.
- Always clean up with `AbortController` on unmount.
- Reset state to loading at the top of `useEffect`, before the fetch call.

```ts
useEffect(() => {
  setState({ data: null, isLoading: true, error: null });
  const controller = new AbortController();

  apiClient.public
    .someEndpoint(param, { signal: controller.signal })
    .then(...)
    .catch((err) => {
      if (err instanceof Error && err.name === "AbortError") return;
      setState({ data: null, isLoading: false, error: err });
    });

  return () => controller.abort();
}, [param]);
```

---

## Step 3 — Create the smart widget

```
src/widgets/<smart-widget-name>/
  components/
    <SmartWidgetName>.tsx  ← Composes hook + UI component
  hooks/
    use<WidgetName>.ts
  index.ts
```

Smart widget rules:
- Import the presentational component from `src/widgets/<ui-widget>/`.
- Derive state from the hook — never add local `useState` for data that the hook manages.
- Log errors in development: `if (process.env.NODE_ENV !== "production" && error) console.warn(...)`.
- Provide visual loading feedback via `disabled` + `style.opacity`.

---

## Step 4 — Create the Web Component wrapper

Create `src/web-components/arkada-<shortname>-widget.tsx`.

```tsx
import { createArkadaElement } from "./base/createArkadaElement";
import { MyWidget } from "@/widgets/<smart-widget-name>";
import type { WidgetTheme } from "@/shared/config";

export interface MyWidgetData {
  // Widget-specific data fields
  someParam: string;
}

const ArkadaMyWidget = createArkadaElement<MyWidgetData>({
  component: ({ data, theme }: { data: MyWidgetData; theme?: WidgetTheme }) => (
    <MyWidget someParam={data.someParam} theme={theme} />
  ),
});

if (!customElements.get("arkada-<shortname>-widget")) {
  customElements.define("arkada-<shortname>-widget", ArkadaMyWidget);
}

export { ArkadaMyWidget };
```

Naming convention: `arkada-<shortname>-widget`. Keep `shortname` short and descriptive.

> `theme` is a shared attribute handled by the factory — do **not** add it to `data`. Widget-specific config like `variant` goes inside `data`.

---

## Step 5 — Register the Web Component

**`src/web-components/index.ts`** — add import, export, and types:

```ts
import "./arkada-<shortname>-widget";
export { ArkadaMyWidget } from "./arkada-<shortname>-widget";
export type { MyWidgetData } from "./arkada-<shortname>-widget";
```

---

## Step 6 — Add Vite entry point

**`vite.config.ts`** — add to `build.lib.entry`:

```ts
"arkada-<shortname>-widget": resolve(
  __dirname,
  "src/web-components/arkada-<shortname>-widget.tsx",
),
```

This produces a standalone `dist/arkada-<shortname>-widget.js` that can be loaded independently.

---

## Step 7 — Export from the NPM package

**`src/index.ts`** — export only the smart widget component and its types:

```ts
export { MyWidget } from "./widgets/<smart-widget-name>";
export type { MyWidgetProps } from "./widgets/<smart-widget-name>";
```

Do **not** export:
- The presentational/UI component
- The hook
- The API client
- Web Component classes or data types (those belong to `src/web-components/index.ts`)

---

## Step 8 — Add package.json export

**`package.json`** — add a sub-path export for the standalone web component bundle:

```json
"./arkada-<shortname>-widget": {
  "import": "./dist/arkada-<shortname>-widget.js"
}
```

---

## Step 9 — Document the widget

Create `docs/widgets/<widget-name>.md`. See [wallet-verification-button.md](./widgets/wallet-verification-button.md) as a reference.

---

## Checklist

```
 UI component created (no side effects)
 Data hook created (AbortController, isLoading reset, error handled)
 Smart widget created (composes hook + UI)
 Web Component wrapper created
 Registered in src/web-components/index.ts
 Vite entry added
 Exported from src/index.ts (smart component only)
 Sub-path export added to package.json
 Widget documented in docs/widgets/
```
