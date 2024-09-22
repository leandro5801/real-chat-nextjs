import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import { AuthContext } from "@/contexts/authContext";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
interface UseKeyBoardProps {
  setMessages: Dispatch<SetStateAction<MessageItem[]>>;
  selectedConversation: Conversation | null;
  ref: RefObject<HTMLDivElement>;
  setIsSend: Dispatch<SetStateAction<boolean>>;

  selectedMessage: MessageItem | null;
  handleModifyMessage: (message: string) => void;
}

export default function useKeyBoard({
  setMessages,
  selectedConversation,
  ref,
  setIsSend,
}: UseKeyBoardProps) {
  const { get } = useLocalStorage();
  const [messageInput, setMessageInput] = useState<string | null>("");
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState("");
  const { user, socket } = useContext(AuthContext);
  const keyboardRef = useRef<HTMLInputElement>(null);

  function handleShowPicker() {
    setShowPicker(!showPicker);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setMessageInput(e.target.value);
  }

  const handleSendMessage = () => {
    const token = get("token");

    if (selectedConversation && user) {
      /* const newMessage = {
        conversation: selectedConversation.id,
        message: messageInput,
        sender: user,
        createdAt: new Date(),
        } as MessageItem;
        
      setMessages((prevMessages) => [...prevMessages, newMessage]);
 */
      socket.emit("send-message", {
        id_conversation: selectedConversation.id,
        message: messageInput,
        sender: user.id,
        createdAt: new Date(),
      });
      setIsSend(true);
    }
  };
  useEffect(() => {
    // Listen for the message event on the socket

    socket.on("message", (message) => {
      if (keyboardRef.current) keyboardRef.current.value = "";
      setMessages((prevMessages) => [...prevMessages, message]);
      if (ref)
        if (ref.current) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
    });

    socket.on("updated-message", (message) => {
      setMessages((prevMessages) =>
        prevMessages.map((oldMessage) =>
          oldMessage.id === message.id
            ? { ...(message as MessageItem) }
            : oldMessage
        )
      );
    });

    return () => {
      socket.off("message");
      socket.off("updated-message");
    };
  }, [socket, setMessages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.currentTarget.value = "";
      handleSendMessage();
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    setMessageInput((prevInput) => prevInput + emoji);
    if (keyboardRef.current) keyboardRef.current.value = messageInput + emoji;
    return () => {
      setEmoji("");
    };
  }, [emoji]);

  return {
    handleInput,
    socket,
    handleSendMessage,
    handleKeyPress,
    showPicker,
    onEmojiClick,
    handleShowPicker,
    keyboardRef,
  };
}
