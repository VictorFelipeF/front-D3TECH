import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api/v1";
const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

export const http = axios.create({ baseURL: API_BASE_URL });

export function fileUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return API_ORIGIN + path;
  return API_ORIGIN + "/" + path;
}

export function getToken(): string | null {
  return localStorage.getItem("access_token");
}

export function setToken(token: string): void {
  localStorage.setItem("access_token", token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem("refresh_token");
}

export function setTokens(access: string, refresh: string): void {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

export function clearTokens(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) return Promise.reject(error);
    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingRequests.push((token: string) => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(http(original));
        });
      });
    }
    original._retry = true;
    isRefreshing = true;
    try {
      const refresh = getRefreshToken();
      if (!refresh) throw new Error("No refresh token");
      const { data } = await axios.post(`${API_BASE_URL}/refresh`, { refreshToken: refresh });
      setTokens(data.acessToken ?? data.accessToken, data.refreshToken);
      original.headers.Authorization = `Bearer ${data.acessToken ?? data.accessToken}`;
      pendingRequests.forEach((cb) => cb(data.acessToken ?? data.accessToken));
      pendingRequests = [];
      return http(original);
    } catch {
      clearTokens();
      window.location.href = "/admin";
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  }
);
