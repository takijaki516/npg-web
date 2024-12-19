import { fetch, ProxyAgent, RequestInfo } from "undici";

const proxyUrl = process.env.HTTP_PROXY!;

const dispatcher = new ProxyAgent({
  uri: proxyUrl,
  requestTls: {
    rejectUnauthorized: false,
  },
});

export function fetchWithProxy(
  input: string | URL | Request,
  init?: RequestInit,
) {
  return fetch(
    input as RequestInfo,
    {
      ...init,
      dispatcher,
    } as any,
  ) as unknown as Promise<Response>;
}
