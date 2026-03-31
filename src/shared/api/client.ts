import { ARKADA_PUBLIC_API_URL } from "@/shared/config";
import { Api } from "./types";

// Single shared instance — all widgets share one underlying fetch client.
// Instantiated here (not inside hooks/components) so base URL config
// lives in one place and no duplicate instances are created.
export const apiClient = new Api({ baseUrl: ARKADA_PUBLIC_API_URL });
