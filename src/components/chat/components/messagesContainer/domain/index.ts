import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import { Dispatch, SetStateAction } from "react";

export interface MessageProps {
  messages: MessageItem[];
  setMessages: Dispatch<SetStateAction<MessageItem[]>>;
  selectedConversation: Conversation | null;
}
