import useMenuConversation from "./hooks/useMenuConversation";
import FormCreateGroup from "../../../Forms/FormCreateGroup";
import { Button, useDisclosure } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { Conversation } from "@/components/conversations/domain";

interface Props {
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
}
export default function MenuConversation({ setConversations }: Props) {
  const {
    handleChatContactSelect,

    handleDeleteChatSelect,
  } = useMenuConversation();
  return (
    <div className=" absolute right-2 ">
      <ul className="shadow-slate-600   m-0 border-2 min-w-max text-center list-none overflow-hidden  bg-slate-50 rounded-lg border-none  bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark">
        <li>
          <FormCreateGroup setConversations={setConversations} />
        </li>

        <li onClick={handleChatContactSelect}>
          <div className="block w-full whitespace-nowrap  px-4 py-2 text-sm font-normal hover:border-2 text-black hover:border-green-500 hover:bg-my-gradient-modal focus:bg-zinc-200/60 hover:text-white focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25">
            Chat Somebody
          </div>
        </li>

        <li onClick={handleDeleteChatSelect}>
          <div className=" block w-full whitespace-nowrap  px-4 py-2 text-sm font-normal hover:border-2 text-black hover:border-green-600 hover:text-white hover:bg-my-gradient-modal focus:bg-zinc-200/60 focus:outline-none active:bg-zinc-200/60 active:no-underline dark:bg-surface-dark dark:text-white dark:hover:bg-neutral-800/25 dark:focus:bg-neutral-800/25 dark:active:bg-neutral-800/25">
            Delete Chat
          </div>
        </li>
      </ul>
    </div>
  );
}
