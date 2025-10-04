import Cookies from "universal-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

export function setAuthToken(token: string | null) {
  const cookies = new Cookies();
  if (token) {
    cookies.set("authToken", token, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  } else {
    cookies.remove("authToken", { path: "/" });
  }
}

export function clearAuthToken() {
  const cookies = new Cookies();
  cookies.remove("authToken", { path: "/" });
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
  req?: { cookies: Record<string, string> }
): Promise<T> {
  const cookies = req ? new Cookies(req.cookies) : new Cookies();
  const authToken = cookies.get("authToken") || null;

  const headers: Record<string, string> = {
    Accept: "*/*",
    ...(options.headers as Record<string, string> | undefined),
  };

  // Only set Content-Type for non-FormData bodies
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  console.log("authToken before fetch:", authToken);
  console.log("Request body:", options.body);

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await res.text().catch(() => "");
  let json: any = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON response from server");
    }
  }

  if (!res.ok) {
    const message = json?.message ?? res.statusText ?? "Request failed";
    const error = new Error(message);
    (error as any).response = json;
    (error as any).status = res.status;
    throw error;
  }

  return json as T;
}
