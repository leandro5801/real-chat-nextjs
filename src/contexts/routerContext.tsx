"use client";
// contexts/RouterContext.tsx
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

interface RouterContextProps {
  children: React.ReactNode;
}

interface RouterContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

const RouterProvider = ({ children }: RouterContextProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { get } = useLocalStorage();
  const router = useRouter();
  useEffect(() => {
    const token = get("token");
    if (token) {
      setIsLoggedIn(true);
      router.push("/home");
    }
  }, [router, get]);

  return (
    <RouterContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </RouterContext.Provider>
  );
};

export { RouterProvider, RouterContext };
