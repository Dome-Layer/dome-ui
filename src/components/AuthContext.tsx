import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getToken, setToken, clearToken } from "../auth";

interface AuthState {
  isAuthenticated: boolean;
  signIn: (token: string, expiresAt?: string) => void;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthState>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
  onSignOut?: () => Promise<void>;
}

export function AuthProvider({ children, onSignOut }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const signIn = useCallback((newToken: string, expiresAt?: string) => {
    setToken(newToken, expiresAt);
    setIsAuthenticated(true);
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
  }, [onSignOut]);

  return (
    <AuthCtx.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth(): AuthState {
  return useContext(AuthCtx);
}
