"use client";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

interface SocketContextType {
  socket: Socket;
  connectedUsers: {};
}

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const [connectedUsers, setConnectedUsers] = useState({});
  const router = useRouter();
  const { get } = useLocalStorage();

  const socket = useMemo(() => {
    const token = get("token");
    // useLocalStorage().remove("token");
    if (!token) {
      router.push("/loginPage");
    }

    const socket = io("http://127.0.0.1:3001", {
      auth: {
        token: token,
      },
      autoConnect: false,
    });

    socket.on("ping", () => {
      socket.emit("pong");
    });

    return socket;
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("invalid", () => {
      router.push("/loginPage");
    });

    socket.on("users", (users) => {
      setConnectedUsers(users);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectedUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
