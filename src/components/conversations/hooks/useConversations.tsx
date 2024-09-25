import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Conversation, Filter, User } from "../domain";
import axios, { AxiosError } from "axios";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import { AuthContext } from "@/contexts/authContext";

export default function useConversations(
  setSelectedConversation: Dispatch<SetStateAction<Conversation | null>>
) {
  const { get } = useLocalStorage();
  const { socket } = useContext(AuthContext);

  const [filterConversations, setFilter] = useState<Conversation[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const [text, setText] = useState<string>("");
  const [clickOutside, setClickOutside] = useState(true);

  useEffect(() => {
    const token = get("token");

    axios
      .get(`${process.env.URL_API}/conversation/username`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const conversationWithMembers: Conversation[] = response.data.map(
          (conversation: Conversation) => {
            const members = conversation.members
              ? conversation.members.map((member: User) => ({
                  fullName: member.fullName,
                  username: member.username,
                  socketId: member.socketId,
                  roles: member.roles,
                }))
              : [];

            return {
              ...conversation,
              members: members,
            };
          }
        );

        setConversations(conversationWithMembers);
      })
      .catch((error: AxiosError) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    switch (text) {
      case Filter.FILTER_BY_GROUPS:
        setFilter(
          conversations.filter((chat) => chat.name_conversation && chat)
        );

        break;
      case Filter.FILTER_BY_CONTACTS:
        setFilter(
          conversations.filter((chat) => !chat.name_conversation && chat)
        );
        break;
      default:
        setFilter(conversations);
    }
  }, [text, conversations]);

  function handleChangeText(t: Filter) {
    setText(t);
    setClickOutside(true);
  }
  function handleClickOutside() {
    setText("");
    setClickOutside(false);
  }
  function handleSelectedConversation(conversation: Conversation) {
    setSelectedConversation(conversation);
  }

  useEffect(() => {
    socket.on("addNewGroup", (newGroup: Conversation) => {
      try {
        /*  setConversations((prev) => [...prev, newGroup]); */
        setFilter((prev) => [...prev, newGroup]);
      } catch (error) {
        console.error("Error receiving new conversation:", error);
      }
    });

    return () => {
      socket.off("addNewGroup");
    };
  }, [socket, setFilter, setConversations]);

  return {
    handleChangeText,
    text,
    handleSelectedConversation,
    setText,
    filterConversations,
    setFilter,
    clickOutside,
    conversations,
    handleClickOutside,
    setConversations,
  };
}
