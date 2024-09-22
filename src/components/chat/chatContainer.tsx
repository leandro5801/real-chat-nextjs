import HeadChat from "./components/head/headChat";
import { chatContainerProps } from "./domain/index";
import MessagesContainer from "./components/messagesContainer/messagesContainer";
export default function ChatContainer({
  messages,
  conversationSelected,
  setMessages,
}: chatContainerProps) {
  return (
    <>
      <div className="h-full w-full">
        <HeadChat conversationSelected={conversationSelected} />
        <MessagesContainer
          messages={messages}
          setMessages={setMessages}
          selectedConversation={conversationSelected}
        />
      </div>
    </>
  );
}
