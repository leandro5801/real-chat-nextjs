import { useEffect, useState } from "react";

export default function useMenuConversation() {
  const [isCreateGroupSelected, setIsCreateGroupSelected] = useState(true);
  const [isChatContactSelected, setIsChatContactSelected] = useState(false);
  const [isDeleteChatSelected, setIsDeleteChatSelected] = useState(false);

  function handleCreateGroupSelect() {
    setIsCreateGroupSelected(true);
    setIsChatContactSelected(false);
    setIsDeleteChatSelected(false);
  }

  const handleChatContactSelect = () => {
    setIsCreateGroupSelected(false);
    setIsChatContactSelected(true);
    setIsDeleteChatSelected(false);
  };

  const handleDeleteChatSelect = () => {
    setIsCreateGroupSelected(false);
    setIsChatContactSelected(false);
    setIsDeleteChatSelected(true);
  };

  return {
    isCreateGroupSelected,
    setIsCreateGroupSelected,
    isChatContactSelected,

    isDeleteChatSelected,

    handleCreateGroupSelect,
    handleChatContactSelect,
    handleDeleteChatSelect,
  };
}
