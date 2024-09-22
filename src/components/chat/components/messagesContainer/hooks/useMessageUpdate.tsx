import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import { AuthContext } from "@/contexts/authContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";

export default function useMessageUpdate(
  setMessages: Dispatch<SetStateAction<MessageItem[]>>,
  selectedMessage: MessageItem | null,
  selectedConversation: Conversation | null,
  messages: MessageItem[]
) {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const { socket } = useContext(AuthContext);

  function handleModifyMessage(messageInput: string) {
    if (selectedMessage) {
      setMessages(
        messages.map((message) =>
          message.id === selectedMessage.id
            ? ({ ...selectedMessage, message: messageInput } as MessageItem)
            : message
        )
      );

      socket.emit("update-message", {
        ...selectedMessage,
        message: messageInput,
      });
    }
  }

  return { handleModifyMessage, isModifyMode, setIsModifyMode };
}
