import { apiClient } from "@/shared/api/client";
import { useEffect, useState } from "react";

interface WalletVerificationState {
  isVerified: boolean;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Fetches wallet verification status once on mount (re-fetches if address changes).
 *
 * someVerified === true:
 * some network in response has rank > 0
 *
 * someVerified === false:
 * global.rank > 0
 */
export function useWalletVerification(
  walletAddress: string,
  someVerified?: boolean,
): WalletVerificationState {
  const [state, setState] = useState<WalletVerificationState>({
    isVerified: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!walletAddress) {
      setState({ isVerified: false, isLoading: false, error: null });
      return;
    }

    // Reset to loading before every fetch — prevents stale state flash
    // when walletAddress prop changes between renders.
    setState({ isVerified: false, isLoading: true, error: null });

    const controller = new AbortController();

    apiClient.public
      .walletWidgetControllerStatus(walletAddress, {
        signal: controller.signal,
      })
      .then((res) => {
        const isVerified = someVerified
          ? res.data?.networks.some((network) => network.statusRank > 0)
          : res.data?.global?.rank > 0;
        setState({
          isVerified,
          isLoading: false,
          error: null,
        });
      })
      .catch((err: unknown) => {
        // Ignore abort — component unmounted or address changed mid-flight
        if (err instanceof Error && err.name === "AbortError") return;
        setState({
          isVerified: false,
          isLoading: false,
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });

    return () => controller.abort();
  }, [walletAddress]);

  return state;
}
