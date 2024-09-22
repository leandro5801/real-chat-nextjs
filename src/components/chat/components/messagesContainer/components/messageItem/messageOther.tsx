import { MessageItem, Props } from "@/components/chat/domain";
import BlurFade from "@/shared/components/BlurFade";
import useConverterDate from "@/shared/hooks/useConverterDate";
import Image from "next/image";
import { useState } from "react";

export default function MessageOther({ message, setSelectedMessage }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { formatConversationDate } = useConverterDate();
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div className="flex items-start gap-2.5 flex-col ml-2">
      {/* <Image
        className="w-8 h-8 rounded-full"
        src="/"
        alt="Jese image"
        width={20}
        height={20}
      /> */}
      <BlurFade inView>
        <div
          className="flex flex-col gap-1 max-w-[320px] min-w-[100px] cursor-default "
          onClick={handleDropdownClick}
        >
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-slate-600 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-zinc-100 dark:text-white">
                {message.sender.fullName.split(" ")[0]}
              </span>
            </div>
            <p className="text-sm font-normal text-gray-900 dark:text-white">
              {message.message}
            </p>
          </div>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">
            {message.createdAt && formatConversationDate(message.createdAt)}
          </span>
        </div>
      </BlurFade>
      <div
        id="dropdownDots"
        className={`z-[1000] ${
          showDropdown ? "block" : "hidden"
        } bg-black opacity-70 border-green-500 border-2 rounded-lg shadow w-40 absolute transition duration-700 ease-in-out transform 
        } top-6 right-4`}
      >
        <ul
          className="py-2 text-sm text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <div className=" px-4 py-2 hover:bg-green-700 dark:hover:bg-green-800 hover:text-white dark:hover:text-gray-200 flex justify-between">
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
            <div className=" px-4 py-2 hover:bg-green-700 dark:hover:bg-green-800 hover:text-white dark:hover:text-gray-200 flex justify-between">
              Copy
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </div>
          </li>

          <li>
            <div className=" px-4 py-2 hover:bg-green-700 dark:hover:bg-green-800 hover:text-white dark:hover:text-gray-200 flex justify-between">
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
    </div>
  );
}
