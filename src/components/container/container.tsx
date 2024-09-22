import ConversationContainer from "@/components/conversations/ConversationContainer";
import ChatContainer from "../chat/chatContainer";
import useContainer from "./hooks/useContainer";

export default function Container() {
  const {
    conversationSelected,
    setConversationSelected,
    messages,
    setMessages,
  } = useContainer();
  return (
    <div className="flex h-full w-full relative">
      <ConversationContainer selectConversation={setConversationSelected} />
      <ChatContainer
        messages={messages}
        conversationSelected={conversationSelected}
        setMessages={setMessages}
      />
    </div>
  );
}
