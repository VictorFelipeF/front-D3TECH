export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getUserFromToken(): { name?: string; email?: string } | null {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  const decoded = decodeToken(token);
  if (!decoded) return null;
  return {
    name: (decoded.name as string) || undefined,
    email: (decoded.email as string) || undefined,
  };
}
