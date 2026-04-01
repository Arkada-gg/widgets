# arkada-widgets

Production-ready widget library for the Arkada ecosystem. Widgets are available as standard React components and as self-contained Web Components for framework-agnostic embedding.

## Table of Contents

- [Widgets (Start Here)](#widgets-start-here)
  - [WalletVerificationButton](./docs/widgets/wallet-verification-button.md)
- [Installation](#installation)
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
