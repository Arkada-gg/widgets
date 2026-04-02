# arkada-widgets

Production-ready widget library for the Arkada ecosystem. Widgets are available as standard React components and as self-contained Web Components for framework-agnostic embedding.

**[Live Demo →](https://Arkada-gg.github.io/widgets/)**  
**[GitHub](https://github.com/Arkada-gg/widgets)**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [React](#react)
  - [Web Component](#web-component-vue-angular-svelte-etc)
  - [Plain HTML](#plain-html)
- [Widgets (Start Here)](#widgets-start-here)
  - [WalletVerificationButton](./docs/widgets/wallet-verification-button.md)
- [Documentation](./docs/)
  - [Architecture](./docs/architecture.md)
  - [Web Components](./docs/web-components.md)
- [TypeScript](#typescript)
- [Troubleshooting](#troubleshooting)

---

## Installation

```bash
npm install arkada-widgets
```

---

## Usage

### React

```tsx
import { WalletVerificationButton, VerifyWalletVariants } from "arkada-widgets";

export function App() {
  return (
    <WalletVerificationButton
      walletAddress="0xYourWalletAddress"
      theme="dark"
      variant={VerifyWalletVariants.COMPACT}
    />
  );
}
```

**Props:**

| Prop            | Type                  | Default     | Description                                       |
| --------------- | --------------------- | ----------- | ------------------------------------------------- |
| `walletAddress` | `string`              | —           | Wallet address to check                           |
| `theme`         | `"dark" \| "light"`   | `"dark"`    | Color theme                                       |
| `variant`       | `VerifyWalletVariant` | `"compact"` | Visual layout                                     |
| `referralCode`  | `string`              | —           | Appended as `?ref=<code>` to the verification URL |
| `someVerified`  | `boolean`             | —           | Verified if any network has rank > 0              |

---

### Web Component (Vue, Angular, Svelte, etc.)

Import once to register the custom element — no React needed in your project:

```ts
import "arkada-widgets/arkada-wvbs-widget";
```

**Vue:**

```vue
<template>
  <arkada-wvbs-widget
    :data="JSON.stringify({ walletAddress: '0xYourWalletAddress' })"
    theme="dark"
  />
</template>
```

**Angular** — add `CUSTOM_ELEMENTS_SCHEMA` to the module, then import in the component:

```ts
import "arkada-widgets/arkada-wvbs-widget";
```

```html
<arkada-wvbs-widget [attr.data]="props" theme="dark"></arkada-wvbs-widget>
```

**Svelte:**

```svelte
<script>
  import 'arkada-widgets/arkada-wvbs-widget'
  const props = JSON.stringify({ walletAddress: '0xYourWalletAddress' })
</script>

<arkada-wvbs-widget data={props} theme="dark" />
```

**Attributes:**

| Attribute | Type                | Default  | Description                     |
| --------- | ------------------- | -------- | ------------------------------- |
| `data`    | JSON string         | —        | Widget config (see shape below) |
| `theme`   | `"dark" \| "light"` | `"dark"` | Color theme                     |
| `size`    | `"sm" \| "lg"`      | `"lg"`   | Widget size                     |

`data` JSON shape:

```jsonc
{
  "walletAddress": "0x...", // required
  "variant": "compact", // optional — visual layout
  "referralCode": "MYREF", // optional
  "someVerified": false, // optional
}
```

You can also set data as a JS object to skip JSON serialization:

```js
document.querySelector("arkada-wvbs-widget").data = { walletAddress: "0x..." };
```

---

### Plain HTML

No build step — load the script from a CDN:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <arkada-wvbs-widget
      data='{"walletAddress":"0xYourWalletAddress","variant":"compact"}'
      theme="dark"
    ></arkada-wvbs-widget>

    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/arkada-widgets/dist/arkada-wvbs-widget.js"
    ></script>
  </body>
</html>
```

---

## Widgets (Start Here)

Widget docs are prioritized for integrators:

- `WalletVerificationButton` docs: `./docs/widgets/wallet-verification-button.md`

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

**Web component is not rendering**

- Confirm the script is loaded with `type="module"` before the custom element is used.
- Confirm `data` attribute is valid JSON with a `walletAddress` key.
- Custom elements require a browser that supports Web Components (all modern browsers).

**React version mismatch**

- The package requires React 18 or 19 as a peer dependency. Run `npm ls react` to confirm the installed version.
