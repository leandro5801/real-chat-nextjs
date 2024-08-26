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
import { User } from "@/components/chat/domain";
import axios from "axios";

interface SocketContextType {
  socket: Socket;
  connectedUsers: {};
}

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const router = useRouter();
  const { get } = useLocalStorage();

  const token = useMemo(() => {
    return get("token");
  }, []);
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
      autoConnect: true,
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
      console.log(token);
      console.log("se desconecto");

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connectedUsers", (connectedUsers) => {
      console.log(connectedUsers);

      setConnectedUsers(connectedUsers);
    });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connectedUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
