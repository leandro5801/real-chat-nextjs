"use client";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import ChatItem from "./components/Item/Item";
import { Conversation } from "../../domain";
import useConverterDate from "@/shared/hooks/useConverterDate";
import useConversationItem from "./hooks/useConversationItem";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick(): void;
}

export default function ConversationItem({
  conversation,
  isSelected,
  onClick,
}: ConversationItemProps) {
  const {
    handleConversationDate,
    handleConversationMessage,
    handleConversationIcon,
    handleConversationName,
    isGroup,
  } = useConversationItem(conversation);
  return (
    <>
      <div
        className="flex justify-start content-center dark:bg-myColor-900 hover:bg-zinc-900"
        onClick={onClick}
      >
        <ChatItem
          lastMessageDate={handleConversationDate()}
          lastMessageText={handleConversationMessage()}
          urlImage={handleConversationIcon()}
          name={handleConversationName()}
          isGroup={isGroup}
          newMessages={1}
        />
      </div>
    </>
  );
}
