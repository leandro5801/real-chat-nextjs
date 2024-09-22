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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const { get, remove } = useLocalStorage();
  const router = useRouter();
  useEffect(() => {
    const token = get("token");
    const tokenExpirationTime = get("tokenExpirationTime");
    if (
      token &&
      tokenExpirationTime &&
      Number(tokenExpirationTime) > Date.now()
    ) {
      setIsLoggedIn(true);
      router.push("/home");
    } else {
      remove("token");
      remove("tokenExpirationTime");
      setIsLoggedIn(false);
      router.push("/loginPage");
    }
  }, [router, get, remove]);

  return (
    <RouterContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </RouterContext.Provider>
  );
};

export { RouterProvider, RouterContext };
