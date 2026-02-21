import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "agent" | "farmer" | "provider" | null;

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole;
  name: string;
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(null);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (r: UserRole, n: string) => {
    setRole(r);
    setName(n);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setRole(null);
    setName("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
