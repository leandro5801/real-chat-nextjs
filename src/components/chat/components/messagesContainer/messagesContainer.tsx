import Keyboard from "./components/keyboard/keyboard";
import MessageOther from "./components/messageItem/messageOther";
import MessageOwn from "./components/messageItem/messageOwn";
import { MessageProps } from "./domain";
import useMessage from "./hooks/useMessage";
import useMessageDelete from "./hooks/useMessageDelete";
import useMessageUpdate from "./hooks/useMessageUpdate";
import BlurFade from "../../../../shared/components/BlurFade";
export default function MessagesContainer({
  messages,
  setMessages,
  selectedConversation,
}: MessageProps) {
  const {
    isMyMessage,
    messageListRef,
    setSelectedMessage,
    selectedMessage,
    setIsSend /* newMessage */,
  } = useMessage(setMessages, messages, selectedConversation);
  const { handleDropMessage } = useMessageDelete(setMessages, messages);
  const { isModifyMode, handleModifyMessage, setIsModifyMode } =
    useMessageUpdate(
      setMessages,
      selectedMessage,
      selectedConversation,
      messages
    );
  return (
    <>
      <div className="h-full w-full bg-bg-chat bg-cover bg-no-repeat bg-center flex flex-col">
        <div className="flex-1  overflow-y-auto" ref={messageListRef}>
          {messages.length !== 0 &&
            messages.map((message, index) =>
              isMyMessage(message.sender.id) ? (
                <MessageOwn
                  key={message.id + `${index}`}
                  message={message}
                  setSelectedMessage={setSelectedMessage}
                  selectedMessage={selectedMessage}
                  OnDelete={handleDropMessage}
                  OnUpdated={handleModifyMessage}
                  setIsModifyMode={setIsModifyMode}
                />
              ) : (
                <MessageOther
                  OnUpdated={handleModifyMessage}
                  key={message.id + `${index}`}
                  message={message}
                  setSelectedMessage={setSelectedMessage}
                  selectedMessage={selectedMessage}
                  setIsModifyMode={setIsModifyMode}
                />
              )
            )}
        </div>
        {/* {newMessage && <MessageOwn key={newMessage.id} message={newMessage} />} */}
        <div>
          <Keyboard
            ref={messageListRef}
            setMessages={setMessages}
            selectedConversation={selectedConversation}
            setIsSend={setIsSend}
            isModifyMode={isModifyMode}
            handleModifyMessage={handleModifyMessage}
            selectedMessage={selectedMessage}
          />
        </div>
      </div>
    </>
  );
}
