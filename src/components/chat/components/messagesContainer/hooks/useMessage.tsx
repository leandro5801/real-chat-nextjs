import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import { AuthContext } from "@/contexts/authContext";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useMessage(
  setMessages: Dispatch<SetStateAction<MessageItem[]>>,
  messages: MessageItem[],
  selectedConversation: Conversation | null
) {
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(
    null
  );
  const [isSend, setIsSend] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  function isMyMessage(idUser: string) {
    if (user) return user.id === idUser;
    /* return false; */
  }
  const messageListRef = useRef<HTMLDivElement>(null); // Crea una referencia al elemento que contiene la lista de mensajes

  useEffect(() => {}, [messages]);
  useEffect(() => {
    if ((messageListRef.current && isSend) || selectedConversation) {
      setTimeout(() => {
        if (messageListRef.current)
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
      }, 100); // Agrega una demora de 100ms antes de desplazar el scroll
    }
    return setIsSend(false);
  }, [isSend, messageListRef, selectedConversation]);

  /* useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);

      setNewMessage(message);
    });
  }, [socket]);

  useEffect(() => {
    if (newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    return () => {
      setNewMessage(null);
    };
  }, [newMessage]); */

  return {
    isMyMessage,
    messageListRef,
    selectedMessage,
    setSelectedMessage,
    setIsSend /* newMessage */,
  };
}
