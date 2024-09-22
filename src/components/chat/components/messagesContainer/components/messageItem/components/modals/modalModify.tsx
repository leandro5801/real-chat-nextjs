import { Dispatch, SetStateAction } from "react";
import useModify from "./hooks/useModify";

interface Props {
  isOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  handleModifyMessage(message: string): void;
}
export default function ModalModify({
  isOpen,
  message,
  handleModifyMessage,
}: Props) {
  const { messageModify, updateMessage, handleUpdateMessage } = useModify(
    message,
    handleModifyMessage
  );

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 `}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal={true}
    >
      <div
        className={`flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 `}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-my-gradient-modal rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
          <h3
            className="text-lg font-medium leading-6 text-zinc-50 capitalize dark:text-white"
            id="modal-title"
          >
            Fix your message
          </h3>
          <p className="mt-2 text-sm text-gray-300 dark:text-gray-400">
            if you want to modify your message, please write your message and
            click on the button below
          </p>

          <div className="mt-4">
            <label className="text-sm text-gray-700 dark:text-gray-200">
              Message
            </label>

            <label className="block mt-3">
              <input
                type="text"
                value={messageModify}
                onChange={(e) => updateMessage(e.target.value)}
                className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </label>

            <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
              <button
                type="button"
                onClick={() => isOpen(false)}
                className="w-full px-4 py-2 text-sm font-medium tracking-wide bg-gray-950 text-white capitalize transition-colors duration-300 transform hover:text-gray-900  border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform hover:text-black rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 bg-slate-950 hover:bg-my-gradient-modal-button focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                onClick={() => handleUpdateMessage(isOpen)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
