# API Client

## Overview

The API client is auto-generated from an OpenAPI specification using `swagger-typescript-api`. The generated code lives in `src/shared/api/types.ts` and is never edited by hand. A singleton instance is created in `src/shared/api/client.ts` and shared across all widgets.

---

## Files

| File | Purpose |
|---|---|
| `src/shared/api/spec.json` | OpenAPI specification — the source of truth |
| `src/shared/api/types.ts` | Auto-generated: `HttpClient`, `Api` class, all request/response DTOs |
| `src/shared/api/client.ts` | Singleton `apiClient` instance, configured with `ARKADA_PUBLIC_API_URL` |

---

## Regenerating Types

When the API changes, update `spec.json` and regenerate:

```bash
npm run build-api
```

This runs:

```
swagger-typescript-api generate \
  -p ./src/shared/api/spec.json \
  -o ./src/shared/api \
  -n types.ts \
  --api-class-name Api
```

The output (`types.ts`) has `@ts-nocheck` at the top — this is intentional and expected for generated files. Commit the regenerated file alongside any widget changes that depend on new endpoints or types.

> Never manually edit `types.ts`. Any change will be overwritten on the next `build-api` run.

---

## The Singleton Client

```ts
// src/shared/api/client.ts
import { ARKADA_PUBLIC_API_URL } from "@/shared/config";
import { Api } from "./types";

export const apiClient = new Api({ baseUrl: ARKADA_PUBLIC_API_URL });
```

**Why a singleton?**
- One configuration point. Change `ARKADA_PUBLIC_API_URL` once, all widgets pick it up.
- Avoids creating a new `HttpClient` instance (with its own abort controller map) per widget instance on the page.
- Consistent fetch configuration (`credentials`, `headers`, `referrerPolicy`) across all requests.

---

## Available Endpoints

Defined in `apiClient.public.*`:

### `walletWidgetControllerStatus(address)`

```ts
GET /public/wallet/status/{address}
```

Returns `WalletStatusResponseDto`:

```ts
interface WalletStatusResponseDto {
  address: string;
  networks: WalletNetworkStatusDto[];
  global: WalletGlobalStatusDto;     // ← used for verification check
}

interface WalletGlobalStatusDto {
  score: number;
  rank: number;    // 0 = Unverified, >0 = verified tier (e.g. 5 = Gold)
  avgScore: number;
}
```

### `walletWidgetControllerVerify(data)`

```ts
POST /public/wallet/verify
Body: { address: string; chainId: number }
```

Returns signing data (`VerifyWalletResponseDto`) for on-chain verification. Not currently used by any widget directly — verification happens on the Arkada web app.

---

## Using the Client in a Hook

Always import the shared singleton. Never call `new Api()` inside a hook or component.

```ts
import { apiClient } from "@/shared/api/client";

useEffect(() => {
  const controller = new AbortController();

  apiClient.public
    .walletWidgetControllerStatus(address, { signal: controller.signal })
    .then((res) => {
      // res.data is typed as WalletStatusResponseDto
    })
    .catch((err) => {
      if (err instanceof Error && err.name === "AbortError") return;
      // handle error
    });

  return () => controller.abort();
}, [address]);
```

### AbortController pattern

Pass `{ signal: controller.signal }` as the second argument. The generated `HttpClient.request` uses `requestParams.signal` when no `cancelToken` is provided:

```ts
signal: (cancelToken
  ? this.createAbortSignal(cancelToken)
  : requestParams.signal) || null,
```

Calling `controller.abort()` in the cleanup function prevents state updates on unmounted components and cancels in-flight requests when dependencies change.

---

## Error Handling

The generated `HttpClient` throws on non-2xx responses:

```ts
if (!response.ok) throw data;  // data is HttpResponse<T, E>
```

The thrown value is the full `HttpResponse` object (which extends `Response`). In hooks, catch it as `unknown` and normalize:

```ts
.catch((err: unknown) => {
  if (err instanceof Error && err.name === "AbortError") return;
  setState({
    error: err instanceof Error ? err : new Error(String(err)),
    isLoading: false,
  });
});
```
