import { useState } from "react";
import { WalletVerificationWidget } from "@/widgets/wallet-verification/components/WalletVerificationWidget";
import { WalletBadges } from "@/widgets/wallet-verification/model/types";
import type { WalletVerificationData } from "@/widgets/wallet-verification/model/types";
import type { WidgetTheme, WidgetSize } from "@/shared/config";

const MOCK_DATA: WalletVerificationData = {
  title: "Verify Wallet",
  subtitle: "Global Rang",
  currentBadge: WalletBadges.VERIFIED,
  nextBadge: WalletBadges.TRUSTED,
  verifiedCount: 10,
  totalCount: 30,
  outdatedCount: 2,
  progress: 60,
  entries: Array.from({ length: 7 }, (_, i) => ({
    id: `entry-${i}`,
    network: {
      name: "Base",
      icon: "networks/base.png",
    },
    action: "Bridge",
    actionUrl: "#",
    status: "unverified" as const,
    statusLabel: "Unverified",
  })),
};

function App() {
  const [theme, setTheme] = useState<WidgetTheme>("dark");
  const [size, setSize] = useState<WidgetSize>("m");

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center gap-8 p-8">
      {/* Controls */}
      <div className="flex gap-4 items-center">
        <label className="text-white font-sans text-sm flex items-center gap-2">
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as WidgetTheme)}
            className="bg-neutral-800 text-white px-3 py-1 rounded-md border border-neutral-600"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>
        <label className="text-white font-sans text-sm flex items-center gap-2">
          Size:
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as WidgetSize)}
            className="bg-neutral-800 text-white px-3 py-1 rounded-md border border-neutral-600"
          >
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
          </select>
        </label>
      </div>

      {/* Widget */}
      <WalletVerificationWidget
        data={MOCK_DATA}
        theme={theme}
        size={size}
        variant="vertical"
        onVerify={(id) => console.log("Verify:", id)}
      />
    </div>
  );
}

export default App;
