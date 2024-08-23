"use client";
import { SocketContext } from "@/contexts/authContext";
import { useContext } from "react";
import ChatItem from "./components/Item/Item";
import { Conversation } from "../../domain";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
}

export default function ConversationItem({
  conversation,
  isSelected,
}: ConversationItemProps) {
  const { socket } = useContext(SocketContext);

  return (
    <>
      <div className="flex justify-start content-center dark:bg-myColor-900 hover:bg-zinc-900">
        {conversation.name_conversation !== " " ? (
          <ChatItem
            urlImage={"/images/green_business-meeting_icon-icons.com_59393.png"}
            isGroup={true}
            name={conversation.name_conversation}
            newMessages={0}
          />
        ) : (
          <ChatItem
            urlImage={"/images/1486564400-account_81513 (1).png"}
            isGroup={false}
            name={conversation.members && conversation.members[0]?.username}
            newMessages={1}
          />
        )}
      </div>
    </>
  );
}
