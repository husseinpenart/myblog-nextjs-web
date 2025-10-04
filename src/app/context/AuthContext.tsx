"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { clearAuthToken, setAuthToken } from "../services/apiClient";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const [token, setToken] = useState<string | null>(
    cookies.get("authToken") || null
  );

  useEffect(() => {
    setAuthToken(token); // Update apiClient whenever token changes
    if (token) {
      cookies.set("authToken", token, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    } else {
      cookies.remove("authToken", { path: "/" });
    }
  }, [token]);

  const login = (newToken: string) => setToken(newToken);

  const logout = () => {
    setToken(null);
    cookies.remove("authToken", { path: "/" });
    clearAuthToken();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
