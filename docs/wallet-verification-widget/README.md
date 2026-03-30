# Wallet Verification Widget

## Overview

**Wallet Verification Widget** is a UI component that displays the verification status of a crypto wallet across multiple blockchain networks. The widget shows the current trust level (badge), progress toward the next level, and a list of networks with their verification statuses.

The widget is shipped as a **Web Component** (`<arkada-wv-widget>`) with React rendering inside Shadow DOM, ensuring complete style isolation and compatibility with any framework.

### Use Cases

- **Web3 Login** — visualize wallet trust level during authentication
- **Proof of Ownership** — display address ownership confirmation status across networks
- **KYC-lite** — lightweight verification without a full KYC process
- **Gamification** — progression system with badges from Unverified to Legendary

### Key Features

- 7 verification levels with unique visual styling
- Light and dark theme support
- Two sizes: `sm` and `lg`
- Network filtering by status (all / verified / not-verified)
- `verify` event for handling verification requests per network
- Full style isolation via Shadow DOM

---

## Verification Levels (Badges)

| Value | Name        | Description                        |
|-------|-------------|------------------------------------|
| `0`   | Unverified  | Wallet is not verified             |
| `1`   | Identified  | Initial identification             |
| `2`   | Basic       | Basic verification                 |
| `3`   | Verified    | Confirmed wallet                   |
| `4`   | Trusted     | Trusted status                     |
| `5`   | Elite       | Elite level                        |
| `6`   | Legendary   | Maximum level (final)              |

Each level has a unique gradient, icon, and glow effect.

---

## Quick Start

### Web Component (any framework)

```html
<!-- Include the script -->
<script type="module" src="arkada-widgets/wallet-verification"></script>

<!-- Usage -->
<arkada-wv-widget
  theme="dark"
  size="lg"
  address="0x1234...abcd"
></arkada-wv-widget>

<script>
  const widget = document.querySelector('arkada-wv-widget');

  // Pass data via JS property (recommended)
  widget.data = {
    title: 'Verify Wallet',
    subtitle: 'Global Rang',
    currentBadge: 3,
    nextBadge: 4,
    verifiedCount: 10,
    totalCount: 30,
    outdatedCount: 2,
    progress: 60,
    entries: [
      {
        id: 'eth-1',
        network: { name: 'Ethereum', icon: 'networks/ethereum.png' },
        status: 3,
        statusLabel: 'Verified',
      },
      {
        id: 'base-1',
        network: { name: 'Base', icon: 'tokens/base.svg' },
        status: 0,
        statusLabel: 'Unverified',
      },
    ],
  };

  // Listen for verification events
  widget.addEventListener('verify', (e) => {
    console.log('Verify requested:', e.detail);
    // { entryId: "base-1", address: "0x1234...abcd" }
  });
</script>
```

### React

```tsx
import { WalletVerificationWidget } from 'arkada-widgets/widgets/wallet-verification';
import type { WalletVerificationData } from 'arkada-widgets/widgets/wallet-verification';

function App() {
  const data: WalletVerificationData = {
    title: 'Verify Wallet',
    subtitle: 'Global Rang',
    currentBadge: 3,
    nextBadge: 4,
    verifiedCount: 10,
    totalCount: 30,
    outdatedCount: 2,
    progress: 60,
    entries: [
      {
        id: 'eth-1',
        network: { name: 'Ethereum', icon: 'networks/ethereum.png' },
        status: 3,
        statusLabel: 'Verified',
      },
    ],
  };

  const handleVerify = (entryId: string) => {
    console.log('Verify entry:', entryId);
  };

  return (
    <div style={{ width: 600, height: 600 }}>
      <WalletVerificationWidget
        data={data}
        theme="dark"
        size="lg"
        onVerify={handleVerify}
      />
    </div>
  );
}
```

---

## API

### Web Component: `<arkada-wv-widget>`

#### Attributes

| Attribute | Type     | Default  | Description                              |
|-----------|----------|----------|------------------------------------------|
| `theme`   | `string` | `"dark"` | Visual theme: `"dark"` or `"light"`      |
| `size`    | `string` | `"lg"`   | Widget size: `"sm"` or `"lg"`            |
| `data`    | `string` | —        | JSON string with widget data (alternative to property) |
| `address` | `string` | —        | Wallet address, included in `verify` event detail |

#### Properties (JavaScript)

| Property | Type                      | Description                                 |
|----------|---------------------------|---------------------------------------------|
| `data`   | `WalletVerificationData`  | Widget data object (recommended way to pass data) |

#### Events

| Event    | Detail                                        | Description                            |
|----------|-----------------------------------------------|----------------------------------------|
| `verify` | `{ entryId: string, address: string \| null }` | User requested verification for a network |

---

### React Component: `<WalletVerificationWidget>`

#### Props

```typescript
interface WalletVerificationWidgetProps {
  /** Widget display data */
  data: WalletVerificationData;
  /** Visual theme */
  theme?: 'light' | 'dark';       // default: "dark"
  /** Widget size */
  size?: 'sm' | 'lg';             // default: "lg"
  /** Callback when verification is requested */
  onVerify?: (entryId: string) => void;
  /** Additional CSS classes */
  className?: string;
}
```

---

### Data Types

```typescript
/** Main widget data object */
interface WalletVerificationData {
  title: string;              // Widget title
  subtitle: string;           // Subtitle
  currentBadge: WalletBadges; // Current level (0-6)
  nextBadge: WalletBadges;    // Next level (0-6)
  verifiedCount: number;      // Number of verified networks
  totalCount: number;         // Total number of networks
  outdatedCount: number;      // Number of outdated verifications
  progress: number;           // Progress to next badge (0-100)
  entries: WalletEntry[];     // List of networks
}

/** Individual network entry */
interface WalletEntry {
  id: string;                 // Unique identifier
  network: {
    name: string;             // Network name (e.g. "Ethereum")
    icon: string;             // Icon path (R2 asset)
  };
  status: WalletBadges;      // Verification status for this network
  isOutdated?: boolean;       // Whether verification is outdated
  statusLabel: string;        // Display status text
}

/** Verification levels */
const WalletBadges = {
  UNVERIFIED: 0,
  IDENTIFIED: 1,
  BASIC: 2,
  VERIFIED: 3,
  TRUSTED: 4,
  ELITE: 5,
  LEGENDARY: 6,
} as const;

type WalletBadges = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Filter types */
type FilterTab = 'all' | 'verified' | 'not-verified';
```

---

## Rendering and Architecture

### Component Hierarchy

```
<arkada-wv-widget>                    Web Component (Shadow DOM)
  └── WalletVerificationWidget        React root component
       ├── WidgetHeader               Header + badges + progress
       │    ├── RankDisplay            Current badge (with glow effect)
       │    ├── ProgressBar            Progress toward next level
       │    ├── WalletScores           Counters: verified / total / outdated
       │    └── RankDisplay            Next badge (blurred if LEGENDARY)
       └── WidgetChainsList            Scrollable network list
            ├── TabGroup               Filters: All / Verified / Not Verified
            └── ChainListEntry[]       Individual network entries
```

### Lifecycle

```
1. Initialization
   ├── Web Component creates Shadow DOM
   ├── Isolated styles are injected
   └── React root is created inside Shadow DOM

2. Data Loading
   ├── Data is passed via JS property (recommended)
   └── OR via data attribute (JSON string, parsed automatically)

3. Rendering
   ├── Theme is applied (data-theme attribute + CSS custom properties)
   ├── Header is rendered with badges and progress
   └── Network list is rendered with filtering

4. Interaction
   ├── User switches filters (all / verified / not-verified)
   ├── User clicks "Verify" on a specific network
   └── Widget dispatches CustomEvent "verify" (bubbles + composed)

5. Updates
   ├── Changing the data property → automatic re-render
   ├── Changing theme/size attributes → automatic re-render
   └── attributeChangedCallback triggers re-render

6. Teardown
   └── disconnectedCallback → React root unmount
```

### Data Passing: Property vs Attribute

Using the **JS property** `data` is the recommended way to pass data:

```javascript
widget.data = { ... };
```

Alternatively, you can pass a JSON string via attribute:

```html
<arkada-wv-widget data='{"title":"...","entries":[...]}'></arkada-wv-widget>
```

Priority: JS property > attribute. If the JS property is set, the attribute is ignored.

---

## Backend Integration

The widget is a **stateless UI component** and does not make any network requests on its own. All data fetching and updating logic is handled by the host application.

### Recommended Integration Flow

```
Backend API                Host Application              Widget
    │                            │                          │
    │◄── GET /wallet/status ────│                          │
    │── WalletVerificationData ─►│                          │
    │                            │── widget.data = {...} ──►│
    │                            │                          │── render
    │                            │                          │
    │                            │◄── event: "verify" ─────│  (user clicks)
    │◄── POST /wallet/verify ───│                          │
    │── updated data ───────────►│                          │
    │                            │── widget.data = {...} ──►│
    │                            │                          │── re-render
```

### Full Example

```javascript
const widget = document.querySelector('arkada-wv-widget');
const address = '0x1234...abcd';
widget.setAttribute('address', address);

// 1. Load initial data
async function loadWalletData() {
  const response = await fetch(`/api/wallet/${address}/verification`);
  const data = await response.json();
  widget.data = data;
}

// 2. Handle verification request
widget.addEventListener('verify', async (e) => {
  const { entryId, address } = e.detail;

  try {
    const response = await fetch(`/api/wallet/${address}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId }),
    });

    if (!response.ok) throw new Error('Verification failed');

    // 3. Refresh data after verification
    await loadWalletData();
  } catch (error) {
    console.error('Verification error:', error);
    // Show notification to user
  }
});

// Initialize
loadWalletData();
```

---

## Errors and Edge Cases

### Invalid JSON in data attribute

If the `data` attribute contains invalid JSON, the widget logs an error and does not render:

```
[arkada-wv-widget] Invalid JSON in data attribute
```

**Solution:** use the JS property `data` instead of the attribute to avoid serialization issues.

### No data provided

If neither the `data` property nor the attribute is set, the widget renders nothing. No error is thrown.

### User cancellation

The `verify` event has no cancellation mechanism at the widget level. If the user initiates verification and then wants to cancel, this should be handled by the host application (e.g., a confirmation modal before sending the request to the backend).

### Invalid signature / verification failure

The widget does not handle verification errors. Backend errors should be handled by the host application. After handling the error, update `widget.data` with the current data.

### Network errors

The widget does not make network requests. Network errors should be handled by the host application when fetching data or sending verification requests.

### Invalid badge level

Passing a value outside 0-6 for `currentBadge` / `nextBadge` will cause a rendering error, as badge configurations are only defined for values 0-6.

### Empty entries list

With an empty `entries: []` array, the widget will render the header with badges and progress, but the network list will be empty.

### LEGENDARY as nextBadge

When `currentBadge === LEGENDARY`, the next badge is displayed with a blur effect, indicating that the maximum level has been reached.

---

## Theming

The widget uses CSS Custom Properties prefixed with `--arkada-*`. The theme is applied via the `data-theme` attribute on the root element.

```html
<!-- Dark theme (default) -->
<arkada-wv-widget theme="dark"></arkada-wv-widget>

<!-- Light theme -->
<arkada-wv-widget theme="light"></arkada-wv-widget>
```

Styles are fully isolated inside Shadow DOM and do not conflict with the host page.

---

## Storybook

Use Storybook for visual development and testing:

```bash
npm run storybook
```

Available stories: Dark, Light, Small, Large, all badge levels (Unverified — Legendary), Mixed Statuses.
