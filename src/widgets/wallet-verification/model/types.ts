export const WalletBadges = {
  UNVERIFIED: 0,
  IDENTIFIED: 1,
  BASIC: 2,
  VERIFIED: 3,
  TRUSTED: 4,
  ELITE: 5,
  LEGENDARY: 6,
} as const;

export type WalletBadges = (typeof WalletBadges)[keyof typeof WalletBadges];

export interface BadgeConfig {
  label: string;
  gradient: string;
  textGradient: string;
  glowColor: string;
  icon: string; // R2 asset path
  blurIntensity: number;
}

export interface WalletEntry {
  id: string;
  network: {
    name: string;
    icon: string; // R2 asset path
  };
  action: string;
  actionUrl?: string;
  status: "verified" | "unverified" | "outdated";
  statusLabel: string;
}

export interface WalletVerificationData {
  title: string;
  subtitle: string;
  currentBadge: WalletBadges;
  nextBadge: WalletBadges;
  verifiedCount: number;
  totalCount: number;
  outdatedCount: number;
  progress: number; // 0-100
  entries: WalletEntry[];
}

export type FilterTab = "all" | "verified" | "not-verified";
