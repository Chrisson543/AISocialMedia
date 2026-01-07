import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { baseUrl } from "./api-config";
import { UserT } from "@/app/types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiFetchOptions<TBody = unknown> {
  method: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  redirectOn401?: boolean;
  signal?: AbortSignal; 
}

type ApiErrorBody = { code?: string; message?: string };

export async function apiFetch<TResponse, TBody = unknown>(
  url: string,
  options: ApiFetchOptions<TBody>
): Promise<TResponse> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const res = await fetch(baseUrl + url, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
      ...(options.headers ?? {}),
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
    signal: options.signal,
  });

  // Handle 404 as a Next.js notFound()
  if (res.status === 404) notFound();

  // Handle 401 conditionally based on backend error code/message
  if (res.status === 401) {
    let errBody: ApiErrorBody = {};
    try {
      errBody = (await res.json()) as ApiErrorBody;
    } catch {}

    const code = errBody.code;
    const message = errBody.message ?? "Unauthorized";

    // Redirect only if this 401 means "not authenticated" (session missing/expired)
    // Prefer code, fallback to message if you haven't added codes yet.
    const isNotAuthenticated =
      code === "NOT_AUTHENTICATED" || message === "Not authenticated";

    if (options.redirectOn401 && isNotAuthenticated) {
      redirect("/login");
    }

    // For other 401s (e.g., invalid credentials), throw so forms can show the error
    throw new Error(message);
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const err = (await res.json()) as ApiErrorBody;
      message = err?.message ?? message;
    } catch {}
    throw new Error(message);
  }

  if (res.status === 204) return undefined as TResponse;

  const ct = res.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) return undefined as TResponse;

  return (await res.json()) as TResponse;
}

export async function getUser(){
  const user = await apiFetch<UserT>('/users/me', {
      method: "GET",
      redirectOn401: true
  })

  return user
}

function isNotAuthenticatedMessage(msg: string) {
  return msg === "Not authenticated" || msg === "Unauthorized";
}

// 1) Optional: never redirects
export async function getUserOptional(): Promise<UserT | null> {
  try {
    return await apiFetch<UserT>("/users/me", {
      method: "GET",
      redirectOn401: false,
    });
  } catch (e: any) {
    const msg = e?.message ?? "";
    if (isNotAuthenticatedMessage(msg)) return null;
    throw e;
  }
}