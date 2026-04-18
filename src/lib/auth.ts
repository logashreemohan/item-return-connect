// auth.ts — Real local authentication using localStorage + Web Crypto API

const USERS_KEY = 'campus_finder_users';
const SESSION_KEY = 'campus_finder_session';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

// --- Hashing ---

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// --- User Storage ---

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// --- Session ---

export function getSession(): SessionUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user: SessionUser): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

// --- Auth Operations ---

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.find(u => u.email === normalizedEmail)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const passwordHash = await hashPassword(password);
  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);
  saveSession({ id: newUser.id, name: newUser.name, email: newUser.email });

  return { success: true };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: SessionUser; error?: string }> {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user) {
    return { success: false, error: 'No account found with this email address.' };
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  const sessionUser: SessionUser = { id: user.id, name: user.name, email: user.email };
  saveSession(sessionUser);

  return { success: true, user: sessionUser };
}
