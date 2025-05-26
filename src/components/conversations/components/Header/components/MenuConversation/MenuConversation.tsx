import useMenuConversation from "./hooks/useMenuConversation";
import FormCreateGroup from "../../../Forms/FormCreateGroup/FormCreateGroup";
import { Dispatch, SetStateAction } from "react";
import { Conversation } from "@/components/conversations/domain";
import DeleteConversations from "../../../Forms/FormDeleteConversation/FormDeleteChat";
import { ChatContact } from "../../../Forms/FormChatContact/FormChatContact";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
  isDeleting: boolean;
}
export default function MenuConversation({
  setConversations,
  setIsDeleting,
  isDeleting,
}: Props) {
  const {
    handleChatContactSelect,

    handleDeleteChatSelect,
  } = useMenuConversation();
  return (
    <div className="absolute right-2 ">
      <ul className=" shadow-slate-600  m-0 min-w-max text-center list-none overflow-hidden  bg-slate-50 rounded-lg border-none  bg-clip-padding text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark">
        <li>
          <FormCreateGroup setConversations={setConversations} />
        </li>

        <li>
          <ChatContact setConversations={setConversations} />
        </li>

        <li>
          <Button
            variant="outline"
            onClick={(e) => {
              setIsDeleting(true);
            }}
            className="w-full mb-4 bg-red-700 hover:bg-red-800 text-gray-200 transition-colors duration-300 "
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Chat
          </Button>
        </li>
      </ul>
    </div>
  );
}
