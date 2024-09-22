"use client";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { createContext } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import { User } from "@/components/conversations/domain";
import axios from "axios";

interface SocketContextType {
  socket: Socket;
  connectedUsers: {};
  user: User | null;
}

const AuthContext = createContext<SocketContextType>({} as SocketContextType);

const SocketProvider = ({ children }: PropsWithChildren) => {
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);

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
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connectedUsers", (connectedUsers) => {
      setConnectedUsers(connectedUsers);
    });
  }, [socket]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.URL_API}/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userProfile = response.data;
        setUser(userProfile);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [token]);

  return (
    <AuthContext.Provider value={{ socket, connectedUsers, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { SocketProvider, AuthContext };
