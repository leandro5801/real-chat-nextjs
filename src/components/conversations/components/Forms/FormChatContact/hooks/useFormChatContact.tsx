import { Conversation, User } from "@/components/conversations/domain";
import { AuthContext } from "@/contexts/authContext";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import axios, { AxiosError } from "axios";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export default function useFormChatContact(
  setConversations: Dispatch<SetStateAction<Conversation[]>>
) {
  const [contacts, setContacts] = useState<User[]>([]);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { get } = useLocalStorage();
  const { user, socket } = useContext(AuthContext);
  useEffect(() => {
    const token = get("token");
    axios
      .get(`${process.env.URL_API}/conversation/not/username`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setContacts(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const countContactsOnline = () => {
    return filteredContacts.filter((contact) => contact.socketId !== "").length;
  };
  const handleCreateChat = () => {
    // if (user) selectedContact?.push(user);
    const conversation = {
      name_conversation: "",
      members: [user, selectedContact],
    } as Conversation;
    //setConversations((prev) => [...prev]);
    socket.emit("addNewConversation", conversation);

    setOpen(false);
    setSelectedContact(null);
  };

  return {
    filteredContacts,
    selectedContact,
    setSelectedContact,
    searchTerm,
    setSearchTerm,
    open,
    setOpen,
    countContactsOnline,
    handleCreateChat,
  };
}
