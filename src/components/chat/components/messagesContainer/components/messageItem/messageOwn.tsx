import { Props } from "@/components/chat/domain";
import Image from "next/image";
import useMessageOwn from "./hooks/useMessageOwn";
import "react-toastify/dist/ReactToastify.css";
import ModalModify from "./components/modals/modalModify";
import BlurFade from "@/shared/components/BlurFade";
import Tooltip from "./components/ToolTip/ToolTipMessage";
export default function MessageOwn({
  message,
  setSelectedMessage,
  OnDelete,
  selectedMessage,
  setIsModifyMode,
  OnUpdated,
}: Props) {
  const {
    showDropdown,
    ref,
    handleDropdownClick,
    handleCopyMessage,
    copied,
    handleShowModifyModal,
    refModifyModal,
    setShowModifyModal,
    showModifyModal,
    setShowTooltip,
    showTooltip,
    formatConversationDate,
  } = useMessageOwn({
    setIsModifyMode,
    message,
    setSelectedMessage,
    selectedMessage,
  });
  return (
    <div className="flex flex-row-reverse items-start object-contain gap-2.5 mb-4  mr-3 relative">
      <div className="relative flex-row">
        {showTooltip && <Tooltip />}

        <BlurFade inView>
          <div
            onMouseOver={() => setShowTooltip(true)}
            onMouseOut={() => setShowTooltip(false)}
            className="flex flex-col gap-1 min-w-[100px] max-w-[320px] relative"
            onClick={handleDropdownClick}
          >
            <div
              className={`flex flex-col p-3 cursor-pointer border-gray-200 bg-green-400 rounded-l-xl rounded-b-xl  dark:bg-gray-700 ${
                showDropdown ? "bg-green-500" : ""
              } `}
            >
              <div className="flex items-center">
                <span className="text-sm font-semibold text-black dark:text-white">
                  YO
                </span>
              </div>
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {message.message}
              </p>
              <div className="absolute top-0 right-0 hidden group-hover:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
                {message.isModified && <h6>Edited</h6>}
              </div>
            </div>
            <span className="text-sm font-normal text-myColor-200 dark:text-gray-400 text-right">
              {message.createdAt && formatConversationDate(message.createdAt)}
            </span>
          </div>
        </BlurFade>
      </div>
      <div
        id="dropdownDots"
        className={`z-10 } ${
          showDropdown ? "block" : "hidden"
        } bg-black opacity-70 border-green-500 border-2 rounded-lg shadow w-40  transition duration-700 ease-in-out transform ${
          showDropdown ? "translate-x-0" : "translate-y-10"
        } top-6 right-4 absolute`}
      >
        <ul
          className="py-2 text-sm text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
          ref={ref}
        >
          <li>
            <div
              onClick={handleShowModifyModal}
              className=" px-4 py-2 hover:bg-green-700 dark:hover:bg-green-800 hover:text-white dark:hover:text-gray-200 flex justify-between"
            >
              Modify
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
          </li>

          <li>
            <div
              onClick={handleCopyMessage}
              className=" px-4 py-2 hover:bg-green-700 dark:hover:bg-green-800 hover:text-white dark:hover:text-gray-200 flex justify-between"
            >
              Copy
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="h-5 w-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </div>
          </li>

          <li>
            <div
              className=" px-4 py-2 hover:bg-green-700 dark:hover:bg-green-800 hover:text-white dark:hover:text-gray-200 flex justify-between"
              onClick={() => {
                if (OnDelete && selectedMessage) OnDelete(selectedMessage);
              }}
            >
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
      {/*  <Image
        className="w-8 h-8 rounded-full"
        src="/"
        alt="Jese image"
        width={20}
        height={20}
      /> */}
      {showModifyModal && (
        <ModalModify
          isOpen={setShowModifyModal}
          message={message.message}
          handleModifyMessage={OnUpdated}
        />
      )}
    </div>
  );
}
