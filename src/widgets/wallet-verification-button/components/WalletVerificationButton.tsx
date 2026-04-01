import type { WidgetTheme } from "@/shared/config";
import {
  VerifyWalletButton,
  type VerifyWalletVariant,
} from "@/widgets/verify-wallet-button";
import { useWalletVerification } from "../hooks/useWalletVerification";

const VERIFICATION_URL = "https://app.arkada.gg/en/wallet";

export interface WalletVerificationButtonProps {
  walletAddress: string;
  referralCode?: string;
  someVerified?: boolean;
  theme?: WidgetTheme;
  variant?: VerifyWalletVariant;
}

/**
 * Smart wallet verification button.
 *
 * Fetches verification status for the given address on mount,
 * then delegates all visual rendering to VerifyWalletButton.
 */
export function WalletVerificationButton({
  walletAddress,
  referralCode,
  someVerified = true,
  theme,
  variant,
}: WalletVerificationButtonProps) {
  const { isVerified, isLoading, error } = useWalletVerification(
    walletAddress,
    someVerified,
  );

  if (process.env.NODE_ENV !== "production" && error) {
    console.warn("[WalletVerificationButton] Failed to fetch status:", error);
  }

  const handleVerify = () => {
    window.open(
      `${VERIFICATION_URL}${referralCode ? `?ref=${referralCode}` : ""}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <VerifyWalletButton
      state={isVerified ? "verified" : "unverified"}
      theme={theme}
      variant={variant}
      onVerify={handleVerify}
      disabled={isLoading}
      aria-busy={isLoading}
      style={{
        opacity: isLoading ? 0.6 : 1,
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    />
  );
}
