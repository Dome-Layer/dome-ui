import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getToken, setToken, clearToken, getUserClaims } from "../auth";

export interface AuthUser {
  email?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  /** Signed-in user identity, decoded from the session JWT (display-only). */
  user: AuthUser | null;
  signIn: (token: string, expiresAt?: string) => void;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthState>({
  isAuthenticated: false,
  user: null,
  signIn: () => {},
  signOut: async () => {},
});

function readUser(): AuthUser | null {
  const claims = getUserClaims();
  if (!claims) return null;
  return { email: typeof claims.email === "string" ? claims.email : undefined };
}

interface AuthProviderProps {
  children: ReactNode;
  onSignOut?: () => Promise<void>;
}

export function AuthProvider({ children, onSignOut }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const authed = !!getToken();
    setIsAuthenticated(authed);
    setUser(authed ? readUser() : null);
  }, []);

  const signIn = useCallback((newToken: string, expiresAt?: string) => {
    setToken(newToken, expiresAt);
    setIsAuthenticated(true);
    setUser(readUser());
  }, []);

  const signOut = useCallback(async () => {
    if (getToken() && onSignOut) {
      try {
        await onSignOut();
      } catch {
        // best-effort; local session always cleared
      }
    }
    clearToken();
    setIsAuthenticated(false);
    setUser(null);
  }, [onSignOut]);

  return (
    <AuthCtx.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth(): AuthState {
  return useContext(AuthCtx);
}
