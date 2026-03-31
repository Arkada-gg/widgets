# arkada-widgets

Production-ready widget library for the Arkada ecosystem. Widgets are available as standard React components and as self-contained Web Components for framework-agnostic embedding.

## Table of Contents

- [Installation](#installation)
- [Requirements](#requirements)
- [Configuration](#configuration)
- [Widgets](#widgets)
  - [WalletVerificationButton](#walletverificationbutton)
- [Web Components](#web-components)
- [TypeScript](#typescript)
- [Troubleshooting](#troubleshooting)

---

## Installation

```bash
npm install arkada-widgets
```

---

## Widgets

### WalletVerificationButton

Displays wallet verification status and redirects the user to complete verification on click.

**Behavior:**

- Fetches verification status from the Arkada API on mount
- Shows a loading state (reduced opacity, disabled) while fetching
- Displays "verified" or "unverified" state based on the API response
- On click — opens `https://app.arkada.gg/en/wallet/{walletAddress}` in a new tab
- If the API call fails — stays in "unverified" state silently (error logged in development)
- If `walletAddress` prop changes — clears previous result and re-fetches immediately

#### React

```tsx
import { WalletVerificationButton } from "arkada-widgets";

export function MyComponent() {
  return <WalletVerificationButton walletAddress="0xabc123..." />;
}
```

With all options:

```tsx
import { WalletVerificationButton, VerifyWalletVariants } from "arkada-widgets";

<WalletVerificationButton
  walletAddress="0xabc123..."
  theme="dark"
  variant={VerifyWalletVariants.BANNER}
/>;
```

#### Props

| Prop            | Type                  | Default     | Description                                                    |
| --------------- | --------------------- | ----------- | -------------------------------------------------------------- |
| `walletAddress` | `string`              | —           | **Required.** Wallet address to check verification status for. |
| `theme`         | `"dark" \| "light"`   | `"dark"`    | Color theme.                                                   |
| `variant`       | `VerifyWalletVariant` | `"compact"` | Visual layout variant. See [Variants](#variants) below.        |

#### Variants

| Value                 | Description                                        |
| --------------------- | -------------------------------------------------- |
| `"compact"`           | Chain icon group + gradient text, gradient border  |
| `"compact-minimal"`   | Toggle icon + gradient text, flat solid background |
| `"compact-gradient"`  | Full gradient background                           |
| `"banner"`            | Icon + full-width CTA gradient bar                 |
| `"floating"`          | Circle icon overlapping a solid-color bar          |
| `"floating-gradient"` | Circle icon overlapping a gradient bar             |
| `"pill"`              | Gradient icon zone left, label right               |
| `"pill-wide"`         | Full-width gradient with chevrons                  |
| `"outlined"`          | Pill layout with status-colored border             |
| `"outlined-wide"`     | Gradient bar inside status-colored border          |

---

## Web Components

Load the script once, then use the element anywhere — no framework required.

```html
<script
  type="module"
  src="node_modules/arkada-widgets/dist/arkada-wvbs-widget.js"
></script>
```

```html
<!-- Minimal -->
<arkada-wvbs-widget data='{"walletAddress":"0xabc123..."}'></arkada-wvbs-widget>

<!-- With theme and variant -->
<arkada-wvbs-widget
  theme="light"
  data='{"walletAddress":"0xabc123...", "variant":"banner"}'
></arkada-wvbs-widget>
```

#### Attributes

| Attribute | Type                | Default  | Description                                                       |
| --------- | ------------------- | -------- | ----------------------------------------------------------------- |
| `data`    | JSON string         | —        | **Required.** Must contain `walletAddress`. Optionally `variant`. |
| `theme`   | `"dark" \| "light"` | `"dark"` | Color theme.                                                      |

> Widgets are rendered inside **Shadow DOM** — external styles do not leak in or out.

---

## TypeScript

All types are included. No `@types/` package needed.

```ts
import type {
  WalletVerificationButtonProps,
  VerifyWalletVariant,
} from "arkada-widgets";

import { VerifyWalletVariants } from "arkada-widgets";
```

---

## Troubleshooting

**The button always shows "unverified"**

- Check the browser network tab — is `GET /public/wallet/status/{address}` being called?
- Verify `ARKADA_PUBLIC_API_URL` is set correctly and the API is reachable.
- Check the browser console for a `[WalletVerificationButton]` warning (visible in development builds).

**CORS error in the browser**

- The Arkada API must include your domain in its allowed origins.
- In local development, confirm the API is running and `ARKADA_PUBLIC_API_URL` points to `http://localhost:{port}`.

**Web component is not rendering**

- Confirm the script is loaded with `type="module"` before the custom element is used.
- Confirm `data` attribute is valid JSON with a `walletAddress` key.
- Custom elements require a browser that supports Web Components (all modern browsers).

**React version mismatch**

- The package requires React 18 or 19 as a peer dependency. Run `npm ls react` to confirm the installed version.
