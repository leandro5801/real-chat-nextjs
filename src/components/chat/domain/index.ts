import { Conversation, User } from "@/components/conversations/domain";
import { Dispatch, SetStateAction } from "react";

export interface MessageItem {
  id?: string;
  conversation: string;
  message: string;
  sender: User;
  createdAt?: Date;
  isModified?: boolean;
}
export interface Props {
  message: MessageItem;
  setSelectedMessage: Dispatch<SetStateAction<MessageItem | null>>;
  setIsModifyMode: Dispatch<SetStateAction<boolean>>;
  selectedMessage: MessageItem | null;
  OnDelete?(message: MessageItem): void;
  OnUpdated(message: string): void;
}
export interface chatContainerProps {
  messages: MessageItem[];
  conversationSelected: Conversation | null;
  setMessages: Dispatch<SetStateAction<MessageItem[]>>;
}
