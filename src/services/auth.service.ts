import { http, setTokens, clearTokens } from "./api";

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { email: string; password: string };

export type LoginResponse = {
  token: string;
  refreshToken: string;
  authenticated: boolean;
  mfaRequired: boolean;
  emailVerificationRequired: boolean;
  mfaToken?: string;
  expiresInSeconds: number;
};

export async function login(data: LoginRequest) {
  const res = await http.post<LoginResponse>("/auth/login", data);
  setTokens(res.data.token, res.data.refreshToken);
  return res.data;
}

export async function register(data: RegisterRequest) {
  const res = await http.post("/auth/register", data);
  return res.data;
}

export async function verifyEmail(token: string) {
  const res = await http.get("/auth/verify-email", { params: { token } });
  return res.data;
}

export async function resendVerification(email: string) {
  const res = await http.post("/auth/resend-verification", { email });
  return res.data;
}

export async function forgotPassword(email: string) {
  const res = await http.post("/auth/forgot-password", { email });
  return res.data;
}

export async function logout() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    try {
      await http.post("/auth/logout", { refreshToken });
    } catch { /* ignore */ }
  }
  clearTokens();
}
