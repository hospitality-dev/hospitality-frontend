import { createContext, ReactNode } from "react";

import { useAuth } from "../hooks";
import { AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType>({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={{ user: auth.user?.[0] || null }}>{children}</AuthContext.Provider>;
}
