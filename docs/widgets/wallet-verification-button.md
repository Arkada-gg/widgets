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
walletAddress, referralCode, someVerified props
      │
      ▼
useWalletVerification(walletAddress, someVerified)
      │  GET /public/wallet/status/{address}
      │
      ├── isLoading: true  →  button disabled, opacity 0.6
      │
      ├── someVerified=false (default): global.rank > 0  →  state = "verified"
      ├── someVerified=true:  any network.statusRank > 0  →  state = "verified"
      ├── neither condition met  →  state = "unverified"
      │
      └── error  →  state = "unverified", console.warn in dev
                          │
                          ▼
                  VerifyWalletButton
                  state / theme / variant
                          │
                          ▼ onClick (state = "unverified")
                  window.open(VERIFICATION_URL/address[?ref=referralCode])
```

---

## Verification Logic

Two modes are supported, controlled by the `someVerified` prop:

**Default (`someVerified` omitted or `false`)** — global verification:

```ts
isVerified = res.data?.global?.rank > 0;
```

**`someVerified: true`** — any-network verification:

```ts
isVerified = res.data?.networks.some((network) => network.statusRank > 0);
```

Use `someVerified: true` when a wallet should be considered verified if it has rank on at least one network, regardless of the global rank.

---

## Visual Variants

All variants live in `src/widgets/verify-wallet-button/`. The smart widget passes `variant` through without transformation.

| Variant             | Approximate size | Notes                                   |
| ------------------- | ---------------- | --------------------------------------- |
| `compact`           | ~215×60px        | Default. Chain icons + gradient border. |
| `compact-minimal`   | ~215×60px        | Toggle icon, solid background.          |
| `compact-gradient`  | ~215×60px        | Full gradient background.               |
| `banner`            | 260×54px         | Icon left, CTA bar right. Fixed width.  |
| `floating`          | 224×60px         | Overlapping circle + solid bar.         |
| `floating-gradient` | 224×60px         | Overlapping circle + gradient bar.      |
| `pill`              | 220×54px         | Gradient icon zone left.                |
| `pill-wide`         | 220×54px         | Full-width gradient, chevrons.          |
| `outlined`          | 220×54px         | Status-colored border.                  |
| `outlined-wide`     | 220×54px         | Gradient bar inside status border.      |

Verified/unverified states change the icon, label text, and color scheme within each variant.

---

## Redirect URL

```ts
// WalletVerificationButton.tsx
const VERIFICATION_URL = "https://app.arkada.gg/en/wallet";
// Opens: https://app.arkada.gg/en/wallet/{walletAddress}
// With referral: https://app.arkada.gg/en/wallet/{walletAddress}?ref={referralCode}
```

To change the base URL, update the `VERIFICATION_URL` constant in `WalletVerificationButton.tsx`. This is intentionally a module-level constant — not a prop — because the destination is not consumer-configurable.

Pass `referralCode` to append `?ref=<code>` to the verification URL.

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

With referral code:

```html
<arkada-wvbs-widget
  theme="dark"
  data='{"walletAddress":"0xabc...", "referralCode":"MYREF", "variant":"banner"}'
></arkada-wvbs-widget>
```

With any-network verification mode:

```html
<arkada-wvbs-widget
  theme="dark"
  data='{"walletAddress":"0xabc...", "someVerified":true}'
></arkada-wvbs-widget>
```

`theme` is a top-level attribute (shared factory mechanism). All other props (`walletAddress`, `referralCode`, `someVerified`, `variant`) are inside `data` because the factory does not support per-widget individual attributes. See [web-components.md](../web-components.md) for details.

---

## Styling Model (WalletVerificationButton-only variables)

This section documents only variables used by `WalletVerificationButton` itself:
- button-specific tokens from `verify-wallet-button.css` (`--wvb-*`)
- and only the actually used shared theme token from `theme.css` (`--arkada-bg-accent`)

### Precedence and usage

- In Web Component mode, set variables on `arkada-wvbs-widget`; host-level values are consumed in Shadow DOM.
- In React mode, set variables on a wrapper `<div style={{ ... }}>` around `<WalletVerificationButton />`.
- If a variable is not provided, the component falls back to its default from `:host` / `var(--token, fallback)`.

---

## Complete Variable Reference

### Theme tokens used by WalletVerificationButton (`--arkada-*`)

| Variable | Dark default | Light default | Controls | Variants |
| --- | ---: | ---: | --- | --- |
| `--arkada-bg` | `#000000` | `#f7f7f7` | Outer background of the button | `compact`, `banner`, `pill`, `outlined` |
| `--arkada-bg-foreground` | `#1f1f1f` | `#ffffff` | Inner background of the inner content block | `compact-minimal` |
| `--arkada-bg-accent` | `#000000` | `#ffffff` | Background of the CTA bar | `floating` |
| `--arkada-text-primary` | `#ffffff` | `#000000` | Label text color in unverified state | `pill`, `outlined` |

### WalletVerificationButton tokens (`--wvb-*`)

| Variable                                      |   Default | Controls                               | Main CSS utility classes                                     |
| --------------------------------------------- | --------: | -------------------------------------- | ------------------------------------------------------------ |
| `--wvb-gradient-start`                        | `#ff6a59` | Start color of brand gradient          | `vwb-gradient-text`, `vwb-cta-gradient`, `vwb-full-gradient` |
| `--wvb-gradient-end`                          | `#5377ff` | End color of brand gradient            | `vwb-gradient-text`, `vwb-cta-gradient`, `vwb-full-gradient` |
| `--wvb-verified-start`                        | `#0e9035` | Start color of verified green gradient | `vwb-verified-gradient`                                      |
| `--wvb-verified-end`                          | `#14be47` | End color of verified green gradient   | `vwb-verified-gradient`                                      |
| `--wvb-container-gradient-dark-sides`         | `#000000` | Dark container gradient side color     | `vwb-border-dark`                                            |
| `--wvb-container-gradient-dark-middle`        | `#2d2d2d` | Dark container gradient center color   | `vwb-border-dark`                                            |
| `--wvb-container-gradient-light-sides`        | `#d2d2d2` | Light compact container side color     | `vwb-border-light-compact`                                   |
| `--wvb-container-gradient-light-middle`       | `#ffffff` | Light container center color           | `vwb-border-light-compact`, `vwb-border-light-banner`        |
| `--wvb-container-gradient-light-banner-sides` | `#efefef` | Light banner container side color      | `vwb-border-light-banner`                                    |
| `--wvb-glow`                                  | `#be66b3` | Glow color around CTA gradient bars    | `vwb-cta-gradient` box-shadow                                |
| `--wvb-focus`                                 | `#00b17e` | Keyboard focus outline color           | `vwb-interactive:focus-visible`                              |

---

## How to Override Tokens

### Web Component (recommended host-level API)

```css
arkada-wvbs-widget {
  --arkada-bg: #0a0a0a;
  --arkada-bg-foreground: #161616;
  --arkada-bg-accent: #0f172a;
  --arkada-text-primary: #f1f5f9;
  --wvb-gradient-start: #0d9488;
  --wvb-gradient-end: #0891b2;
  --wvb-verified-start: #047857;
  --wvb-verified-end: #059669;
  --wvb-glow: #0d9488;
  --wvb-focus: #14b8a6;
}
```

```html
<arkada-wvbs-widget
  theme="dark"
  data='{"walletAddress":"0xabc...", "variant":"banner"}'
></arkada-wvbs-widget>
```

### React usage (wrapper style object)

```tsx
<div
  style={
    {
      "--arkada-bg": "#0a0a0a",
      "--arkada-bg-foreground": "#161616",
      "--arkada-bg-accent": "#111827",
      "--arkada-text-primary": "#f1f5f9",
      "--wvb-gradient-start": "#ff8c00",
      "--wvb-gradient-end": "#9b30ff",
      "--wvb-verified-start": "#6aa93a",
      "--wvb-verified-end": "#2d8f2a",
      "--wvb-glow": "#7b1fa2",
      "--wvb-focus": "#b35cff",
    } as React.CSSProperties
  }
>
  <WalletVerificationButton
    walletAddress="0xabc..."
    variant="compact"
    theme="dark"
  />
</div>
```

### Practical presets

1. **Gradient-only branding**  
   Override `--wvb-gradient-start`, `--wvb-gradient-end`, and optionally `--wvb-glow`.
2. **Full brand dark theme**  
   Override all four `--arkada-*` tokens (`--arkada-bg`, `--arkada-bg-foreground`, `--arkada-bg-accent`, `--arkada-text-primary`) plus button gradients: `--wvb-gradient-*`, `--wvb-verified-*`, `--wvb-glow`, `--wvb-focus`.
3. **Light theme refinement**  
   Keep `theme="light"` and tune `--wvb-container-gradient-light-*` to improve container contrast.

---

## Customization Validation Checklist

- Check keyboard accessibility: focus ring must stay visible on all backgrounds (`--wvb-focus`).
- Validate both button states (`unverified` and `verified`) because each uses different gradients/tokens.
- Validate key button variants at minimum: `compact`, `banner`, `floating`, `pill`, `outlined`.
- Check dark and light themes separately if you override container gradients.
- Confirm hover/active affordances remain noticeable after color changes (`vwb-interactive` brightness behavior).
