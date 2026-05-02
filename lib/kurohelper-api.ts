/** Server-only BFF helper: proxies to kurohelper-api with Bearer token from env. */

export const KUROHELPER_MAX_BODY_BYTES = 16 * 1024;

export type KurohelperApiConfig = {
  baseUrl: string;
  token: string;
};

export function getKurohelperApiConfig(): KurohelperApiConfig | null {
  const baseUrl = (process.env.KUROHELPER_API_BASE_URL ?? '').trim().replace(/\/$/, '');
  const token = (process.env.KUROHELPER_API_BEARER_TOKEN ?? '').trim();
  if (!baseUrl || !token) {
    if (process.env.NODE_ENV === 'development') {
      globalThis.console?.error?.(
        '[kurohelper BFF] Missing KUROHELPER_API_BASE_URL or KUROHELPER_API_BEARER_TOKEN',
      );
    }
    return null;
  }
  return { baseUrl, token };
}

export function bffConfigurationErrorResponse(): Response {
  return Response.json(
    {
      message: 'BFF 未設定：請設定 KUROHELPER_API_BASE_URL 與 KUROHELPER_API_BEARER_TOKEN',
      data: null,
    },
    { status: 503 },
  );
}

/**
 * Forwards to kurohelper-api. Always sets Authorization from env (never from client).
 */
export async function proxyToKurohelperApi(
  pathWithQuery: string,
  init?: RequestInit,
): Promise<Response> {
  const cfg = getKurohelperApiConfig();
  if (!cfg) {
    return bffConfigurationErrorResponse();
  }

  const path = pathWithQuery.startsWith('/') ? pathWithQuery : `/${pathWithQuery}`;
  const url = `${cfg.baseUrl}${path}`;

  const headers = new Headers();
  if (init?.headers) {
    const incoming = new Headers(init.headers);
    const contentType = incoming.get('Content-Type');
    if (contentType) {
      headers.set('Content-Type', contentType);
    }
  }
  headers.set('Authorization', `Bearer ${cfg.token}`);

  return fetch(url, {
    ...init,
    headers,
  });
}
