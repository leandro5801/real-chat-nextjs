import useMessageUpdate from "@/components/chat/components/messagesContainer/hooks/useMessageUpdate";
import { MessageItem } from "@/components/chat/domain";
import { Dispatch, SetStateAction, useState } from "react";

export default function useModify(
  message: string,
  handleModifyMessage: (message: string) => void
) {
  const [messageModify, setMessage] = useState(message);

  const updateMessage = (newMessage: string) => {
    setMessage(newMessage);
  };

  function handleUpdateMessage(
    isOpen: Dispatch<SetStateAction<boolean>>
  ): void {
    handleModifyMessage(messageModify);
    isOpen(false);
  }

  return { messageModify, updateMessage, handleUpdateMessage };
}
