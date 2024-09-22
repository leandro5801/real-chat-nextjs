import { useState, Dispatch, SetStateAction, useRef } from "react";
/* import { useClickOutside } from "@/shared/hooks/useClickAway"; */
import useConverterDate from "@/shared/hooks/useConverterDate";
import useCopyToClipboard from "@/shared/hooks/useCopyToClipboard";
import { MessageItem } from "@/components/chat/domain";
import { toast } from "react-toastify";
import { useClickOutside } from "@/shared/hooks/useClickAway";

interface MessageOwnProps {
  message: MessageItem;
  selectedMessage: MessageItem | null;
  setSelectedMessage: (message: MessageItem | null) => void;
  setIsModifyMode: Dispatch<SetStateAction<boolean>>;
}

export default function useMessageOwn({
  message,
  setSelectedMessage,
  selectedMessage,
}: MessageOwnProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { formatConversationDate } = useConverterDate();
  const { copied, handleCopy, setCopied } = useCopyToClipboard();
  const [showModifyModal, setShowModifyModal] = useState(false);
  const ref = useClickOutside<HTMLUListElement>(() => {
    setShowDropdown(false);
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const handleDropdownClick = () => {
    setSelectedMessage(message);
    setShowDropdown(!showDropdown);
  };

  const refModifyModal = useClickOutside<HTMLDivElement>(() => {
    setShowModifyModal(false);
  });

  function handleShowModifyModal() {
    setShowModifyModal(true);
    setShowDropdown(false);
  }

  const handleCopyMessage = () => {
    handleCopy(message.message);
    toast.success("Copied to Clipboard!", {
      theme: "dark",
      autoClose: 1000,
      hideProgressBar: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-green-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      style: {
        border: "1px solid #34C759",
      },
    });
  };

  return {
    showDropdown,
    setShowDropdown,
    ref,
    handleDropdownClick,
    handleCopyMessage,
    copied,
    formatConversationDate,
    handleShowModifyModal,
    refModifyModal,
    showModifyModal,
    setShowModifyModal,
    showTooltip,
    setShowTooltip,
  };
}
