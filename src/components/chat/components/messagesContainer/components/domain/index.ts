import { MessageItem } from "@/components/chat/domain";
import { Conversation } from "@/components/conversations/domain";
import { Dispatch, RefObject, SetStateAction } from "react";

export interface KeyBoardProps {
  setMessages: Dispatch<SetStateAction<MessageItem[]>>;
  selectedConversation: Conversation | null;
  ref: RefObject<HTMLDivElement>;
  setIsSend: Dispatch<SetStateAction<boolean>>;
  selectedMessage: MessageItem | null;
  isModifyMode: boolean;
  handleModifyMessage(messageInput: string): void;
}
