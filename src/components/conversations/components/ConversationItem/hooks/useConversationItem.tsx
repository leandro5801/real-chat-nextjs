import { Conversation, LastMessage } from "@/components/conversations/domain";
import useConverterDate from "@/shared/hooks/useConverterDate";
import { useCallback, useMemo, useState, useEffect } from "react";

export default function useConversationItem(conversation: Conversation) {
  const [messages, setMessages] = useState<LastMessage[]>(
    conversation.messages
  );
  const [name_conversation, setNameConversation] = useState<string>(
    conversation.name_conversation
  );

  const {} = conversation;
  const { formatConversationDate } = useConverterDate();
  const isGroup = useMemo(() => {
    return conversation.name_conversation !== "";
  }, [conversation.name_conversation]);
  const hasMessage = useMemo(() => {
    return messages && messages.length > 0;
  }, [messages]);

  function handleConversationIcon(): string {
    return isGroup
      ? "/images/green_business-meeting_icon-icons.com_59393.png"
      : "/images/1486564400-account_81513 (1).png";
  }
  function handleConversationDate() {
    const mes = hasMessage
      ? formatConversationDate(messages[0]?.createdAt)
      : "";

    return mes;
  }
  const handleConversationMessage = () => {
    return hasMessage ? messages[0]?.message : "";
  };
  const handleConversationName = () => {
    return isGroup ? name_conversation : conversation.members[0].username;
  };

  return {
    handleConversationIcon,
    handleConversationDate,
    handleConversationMessage,
    handleConversationName,
    isGroup,
  };
}
