import { VerifyWalletButton } from "@/widgets/verify-wallet-button";
import { useWalletVerification } from "../hooks/useWalletVerification";

const VERIFICATION_URL = "https://app.arkada.gg/en/wallet";

export interface WalletVerificationButtonProps {
  walletAddress: string;
}

/**
 * Smart wallet verification button.
 *
 * Fetches verification status for the given address on mount,
 * then delegates all visual rendering to VerifyWalletButton.
 * Theme/variant are handled by the consumer externally.
 */
export function WalletVerificationButton({
  walletAddress,
}: WalletVerificationButtonProps) {
  const { isVerified, isLoading } = useWalletVerification(walletAddress);

  const handleVerify = () => {
    window.open(
      `${VERIFICATION_URL}/${walletAddress}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <VerifyWalletButton
      state={isVerified ? "verified" : "unverified"}
      onVerify={handleVerify}
      // Disable interaction while the status is being fetched
      disabled={isLoading}
      aria-busy={isLoading}
    />
  );
}
