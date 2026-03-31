# WalletVerificationButton

## Purpose

Displays the verification status of a wallet address on the Arkada network and redirects the user to the verification flow on click. It is the first production widget in the library and the reference implementation for the two-layer (UI + smart) widget pattern.

---

## Files

```
src/widgets/verify-wallet-button/          ← UI layer (internal, not exported)
  components/
    VerifyWalletButton.tsx                 Presentational component, all variants
    icons.tsx                              SVG icon components
  model/
    types.ts                               VerifyWalletVariants enum, state/variant types
  styles/
    verify-wallet-button.css               Gradient and animation utilities
  index.ts

src/widgets/wallet-verification-button/    ← Smart layer (exported)
  components/
    WalletVerificationButton.tsx           Composes hook + VerifyWalletButton
  hooks/
    useWalletVerification.ts               Fetches status, manages state
  index.ts

src/web-components/
  arkada-wvbs-widget.tsx                   Web Component wrapper
```

---

## Data Flow

```
walletAddress prop
      │
      ▼
useWalletVerification(walletAddress)
      │  GET /public/wallet/status/{address}
      │
      ├── isLoading: true  →  button disabled, opacity 0.6
      │
      ├── success: global.rank > 0  →  state = "verified"
      ├── success: global.rank = 0  →  state = "unverified"
      │
      └── error  →  state = "unverified", console.warn in dev
                          │
                          ▼
                  VerifyWalletButton
                  state / theme / variant
                          │
                          ▼ onClick (state = "unverified")
                  window.open(VERIFICATION_URL/address)
```

---

## Verification Logic

The API returns `WalletGlobalStatusDto.rank` as a number:

| `rank` | Meaning |
|---|---|
| `0` | Unverified |
| `1–4` | Verified (lower tiers) |
| `5` | Verified — Gold |

The widget considers a wallet **verified** if `rank > 0`. There is no string "Unverified" in the API response — the numeric rank is the authoritative value.

```ts
// useWalletVerification.ts
const rank = res.data?.global?.rank ?? 0;
setState({ isVerified: rank > 0, ... });
```

---

## Visual Variants

All variants live in `src/widgets/verify-wallet-button/`. The smart widget passes `variant` through without transformation.

| Variant | Approximate size | Notes |
|---|---|---|
| `compact` | ~215×60px | Default. Chain icons + gradient border. |
| `compact-minimal` | ~215×60px | Toggle icon, solid background. |
| `compact-gradient` | ~215×60px | Full gradient background. |
| `banner` | 260×54px | Icon left, CTA bar right. Fixed width. |
| `floating` | 224×60px | Overlapping circle + solid bar. |
| `floating-gradient` | 224×60px | Overlapping circle + gradient bar. |
| `pill` | 220×54px | Gradient icon zone left. |
| `pill-wide` | 220×54px | Full-width gradient, chevrons. |
| `outlined` | 220×54px | Status-colored border. |
| `outlined-wide` | 220×54px | Gradient bar inside status border. |

Verified/unverified states change the icon, label text, and color scheme within each variant.

---

## Redirect URL

```ts
// WalletVerificationButton.tsx
const VERIFICATION_URL = "https://app.arkada.gg/en/wallet";
// Opens: https://app.arkada.gg/en/wallet/{walletAddress}
```

To change the URL, update the `VERIFICATION_URL` constant in `WalletVerificationButton.tsx`. This is intentionally a module-level constant — not a prop — because the destination is not consumer-configurable.

---

## Loading State

While the API call is in flight, the button renders with:

```tsx
disabled={isLoading}
aria-busy={isLoading}
style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
```

`VerifyWalletButton` does not have a dedicated loading variant. The opacity + disabled combination is the intentional minimal approach — it avoids a layout shift (no text change, no skeleton) while clearly signaling inactivity.

---

## Address Change Behavior

When `walletAddress` prop changes, the hook's `useEffect` dependency fires:

1. Cleanup runs — `controller.abort()` cancels the previous in-flight request
2. State is reset to `{ isVerified: false, isLoading: true, error: null }` **before** the new fetch
3. New request is issued

This ensures no stale result from a previous address is shown during the fetch.

---

## Error Handling

On fetch failure, the widget:
- Stays in "unverified" state (safe default — never false-positively shows "verified")
- Logs a warning in development: `[WalletVerificationButton] Failed to fetch status: ...`
- Does not throw or crash

There is no visible error UI — the button remains functional and the user can still click to visit the verification page.

---

## Web Component Usage

```html
<arkada-wvbs-widget
  theme="dark"
  data='{"walletAddress":"0xabc...", "variant":"banner"}'
></arkada-wvbs-widget>
```

`theme` is a top-level attribute (shared factory mechanism). `variant` is inside `data` because the factory does not support per-widget individual attributes. See [web-components.md](../web-components.md) for details.
