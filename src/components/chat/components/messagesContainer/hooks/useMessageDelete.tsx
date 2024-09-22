import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export default function useMessageDelete(
  setMessages: Dispatch<SetStateAction<MessageItem[]>>,
  messages: MessageItem[]
) {
  function handleDropMessage(messageSelected: MessageItem) {
    if (messageSelected) {
      setMessages(
        messages.filter((message) => message.id !== messageSelected.id)
      );

      axios
        .delete(`${process.env.URL_API}/messages/${messageSelected.id}/`)
        .then((response) => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }
  return { handleDropMessage };
}
