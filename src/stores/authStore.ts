import { mockUsers } from "./mockUsers";

const SESSION_KEY = "d3tech_admin_session";
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutos de inatividade

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
}

interface StoredSession {
  user: AuthUser;
  expiresAt: number;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  // trocar por chamada real à API quando o backend for linkado
  const found = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!found) {
    throw new Error("E-mail ou senha inválidos");
  }

  const user: AuthUser = {
    id: found.id,
    email: found.email,
    username: found.username,
    avatarUrl: found.avatarUrl,
  };

  const session: StoredSession = {
    user,
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return user;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): AuthUser | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const session: StoredSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    // renova a expiração a cada acesso (sessão de inatividade)
    refreshSession();
    return session.user;
  } catch {
    return null;
  }
}

function refreshSession(): void {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return;
  const session: StoredSession = JSON.parse(raw);
  session.expiresAt = Date.now() + SESSION_DURATION_MS;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function updateCurrentUser(data: Partial<AuthUser>): void {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return;
  const session: StoredSession = JSON.parse(raw);
  session.user = { ...session.user, ...data };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
