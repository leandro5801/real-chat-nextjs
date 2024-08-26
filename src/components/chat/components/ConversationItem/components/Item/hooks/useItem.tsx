import { User } from "@/components/chat/domain";
import { SocketContext } from "@/contexts/authContext";
import clsx from "clsx";
import { useContext, useMemo } from "react";

export default function useItem(isGroup: boolean, name: string) {
  const { connectedUsers } = useContext(SocketContext);

  const isConnectedUser = useMemo(() => {
    if (!isGroup) {
      return (connectedUsers as User[]).some((user) => user.username === name);
    }
    return false;
  }, [connectedUsers, name]);
  const ClassConnectedUser = clsx(
    "sm:w-6 sm:h-6 w-5 h-5",
    isConnectedUser ? "bg-green-600 rounded-full" : ""
  );

  function handleImageWidth() {
    const screenWidth = window.innerWidth;
    return screenWidth <= 576 ? 40 : 50;
  }
  function handleImageHeight() {
    const screenWidth = window.innerWidth;
    return screenWidth <= 576 ? 40 : 50;
  }

  return { handleImageHeight, handleImageWidth, ClassConnectedUser };
}
