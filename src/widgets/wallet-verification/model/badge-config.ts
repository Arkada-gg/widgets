import { WalletBadges, type BadgeConfig } from "./types";

export const BADGE_CONFIGS: Record<WalletBadges, BadgeConfig> = {
  [WalletBadges.UNVERIFIED]: {
    label: "Unverified",
    gradient: "linear-gradient(180deg, #4a4a4a 0%, #2a2a2a 100%)",
    textGradient:
      "linear-gradient(90deg, #9A9A9A -0%, #FFFFFF 50%, #9A9A9A 100%)",
    glowColor: "#9E9E9E",
    icon: "images/wallet/unverified.webp",
    blurIntensity: 0,
  },
  [WalletBadges.IDENTIFIED]: {
    label: "Identified",
    gradient: "linear-gradient(180deg, #5b8def 0%, #3a6bc5 100%)",
    textGradient:
      "linear-gradient(90deg, #86DADE -0%, #FFFFFF 50%, #86DADE 100%)",
    glowColor: "#478A8D",
    icon: "images/wallet/identified.webp",
    blurIntensity: 8,
  },
  [WalletBadges.BASIC]: {
    label: "Basic",
    gradient: "linear-gradient(180deg, #43b88c 0%, #2d8a66 100%)",
    textGradient:
      "linear-gradient(90deg, #828DFC -0%, #FFFFFF 50%, #828DFC 100%)",
    glowColor: "#828DFC",
    icon: "images/wallet/basic.webp",
    blurIntensity: 10,
  },
  [WalletBadges.VERIFIED]: {
    label: "Verified",
    gradient: "linear-gradient(180deg, #00b17e 0%, #008f65 100%)",
    textGradient:
      "linear-gradient(90deg, #41BD6A -0%, #FFFFFF 50%, #41BD6A 100%)",
    glowColor: "#41BD6A",
    icon: "images/wallet/verified.webp",
    blurIntensity: 12,
  },
  [WalletBadges.TRUSTED]: {
    label: "Trusted",
    gradient: "linear-gradient(180deg, #7b61ff 0%, #5a3fd4 100%)",
    textGradient:
      "linear-gradient(90deg, #FF6DEE -0%, #FFFFFF 50%, #36EAE1 100%)",
    glowColor: "linear-gradient(45deg, #36EAE1 -0%, #FF6DEE 100%)",
    icon: "images/wallet/trusted.webp",
    blurIntensity: 14,
  },
  [WalletBadges.ELITE]: {
    label: "Elite",
    gradient: "linear-gradient(180deg, #ff6b6b 0%, #d44545 100%)",
    textGradient:
      "linear-gradient(90deg, #FFC257 -0%, #FFFFFF 50%, #EA36DE 100%)",
    glowColor: "linear-gradient(45deg, #EA36DE -0%, #FFC257 100%)",
    icon: "images/wallet/elite.webp",
    blurIntensity: 16,
  },
  [WalletBadges.LEGENDARY]: {
    label: "Legendary",
    gradient: "linear-gradient(180deg, #ffd700 0%, #daa520 100%)",
    textGradient:
      "linear-gradient(90deg, #9F7DFE -0%, #FFFFFF 50%, #EA36DE 100%)",
    glowColor: "linear-gradient(45deg, #FF94D9 -0%, #7B4EFF 100%)",
    icon: "images/wallet/legendary.webp",
    blurIntensity: 20,
  },
};

export function getBadgeConfig(badge: WalletBadges): BadgeConfig {
  return BADGE_CONFIGS[badge];
}
