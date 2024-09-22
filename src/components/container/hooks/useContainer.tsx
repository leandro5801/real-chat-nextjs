import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import { AuthContext } from "@/contexts/authContext";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function useContainer() {
  const [conversationSelected, setConversationSelected] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{
    [conversationId: string]: number;
  }>({});
  const [newMessage, setNewMessage] = useState(null);
  const { socket } = useContext(AuthContext);
  const { get } = useLocalStorage();
  const token = get("token");

  useEffect(() => {
    if (conversationSelected) {
      socket.emit("join-conversation", conversationSelected.id);
      try {
        axios
          .get(
            `${process.env.URL_API}/messages/${conversationSelected.id}/messages`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setMessages(response.data);
          });
      } catch (error) {
        console.error(error);
      }
    }
    return () => {
      socket.emit("leave-conversation", conversationSelected?.id);
    };
  }, [conversationSelected]);

  /*  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);

      setNewMessage(message);
      const conversationId = message.conversation_id;
      setUnreadMessages((prevUnreadMessages) => {
        const currentUnreadMessages = prevUnreadMessages[conversationId] || 0;
        return {
          ...prevUnreadMessages,
          [conversationId]: currentUnreadMessages + 1,
        };
      });
    });
  }, [socket]); 

   useEffect(() => {
    if (conversationSelected) {
      setUnreadMessages((prevUnreadMessages) => {
        const currentUnreadMessages =
          prevUnreadMessages[conversationSelected.id] || 0;
        return { ...prevUnreadMessages, [conversationSelected.id]: 0 };
      });
    }
  }, [conversationSelected]);
  useEffect(() => {
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  }, [newMessage]);
 */

  return {
    conversationSelected,
    setConversationSelected,
    messages,
    setMessages,
  };
}
