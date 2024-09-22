import { KeyBoardProps } from "../domain";
import useKeyBoard from "./hooks/useKeyBoard";
import Picker, { Theme } from "emoji-picker-react";
import { MessageItem } from "../../../../domain/index";
export default function Keyboard({
  setMessages,
  selectedConversation,
  ref,
  setIsSend,
  handleModifyMessage,
  isModifyMode,
  selectedMessage,
}: KeyBoardProps) {
  const {
    handleInput,
    handleSendMessage,
    handleKeyPress,
    showPicker,
    onEmojiClick,
    handleShowPicker,
    keyboardRef,
  } = useKeyBoard({
    setMessages,
    selectedConversation,
    ref,
    setIsSend,
    selectedMessage,
    handleModifyMessage,
  });

  return (
    <>
      <div className="w-full relative">
        <div className="picker-container">
          {showPicker && (
            <Picker
              theme={Theme.DARK}
              //pickerStyle={{ width: "70%" }}
              onEmojiClick={onEmojiClick}
              reactionsDefaultOpen={true}
            />
          )}
        </div>
        <div className="flex justify-center items-center">
          <div className="w-full mb-9 flex items-center py-2 px-2 bg-myColor-800 rounded-full dark:bg-gray-800">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-green-700 hover:bg-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-full cursor-pointer hover:text-green-700 hover:bg-gray-900 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleShowPicker}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex-1 mx-4">
              <input
                type="text"
                id="chat"
                className="block w-full p-2.5 text-sm text-black bg-zinc-300 rounded-lg border border-y-cyan-950 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 text-center placeholder:text-gray-600"
                placeholder="Your message..."
                onChange={handleInput}
                onKeyUp={handleKeyPress}
                ref={keyboardRef}
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-green-500 rounded-full cursor-pointer hover:bg-blue-100 hover:text-black dark:text-blue-500 dark:hover:bg-gray-600"
              onClick={handleSendMessage}
            >
              <svg
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <div className="bg-slate-900  absolute bottom-0 w-full flex">
      <input type="text" name="" id="" onChange={handleInput} />

      <button
        className=" border-2 border-lime-400 text-lime-400"
        onClick={handleSendMessage}
      >
        send
      </button>
    </div> */}
      ;
    </>
  );
}
