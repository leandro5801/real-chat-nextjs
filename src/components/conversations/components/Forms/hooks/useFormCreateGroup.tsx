import { Conversation, User } from "@/components/conversations/domain";
import { AuthContext } from "@/contexts/authContext";
import useLocalStorage from "@/shared/hooks/useLocalStorage";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export default function useFormCreateGroup(
  setConversations: Dispatch<SetStateAction<Conversation[]>>
) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { get } = useLocalStorage();
  const { socket, user } = useContext(AuthContext);

  useEffect(() => {
    const token = get("token");

    axios
      .get(`${process.env.URL_API}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);

        let clients = response.data as User[];
        setUsers(clients.filter((client) => client.id !== user?.id));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /* useEffect(() => {}, [open]); */

  const handleCreate = () => {
    if (groupName.trim().length === 0) setError("Must have a group name ");
    else if (selectedUsers.length < 2) setError("Must have at least 2 members");
    else {
      const conversation = {
        members: [...selectedUsers, user],
        name_conversation: groupName,
      } as Conversation;
      setConversations((prev) => [...prev]);
      socket.emit("addNewConversation", conversation);

      setOpen(false);
      setSelectedUsers([]);
      setGroupName("");
    }
  };

  const toggleUser = (userId: User) => {
    setSelectedUsers((current) =>
      current.includes(userId)
        ? current.filter((user) => user.id !== userId.id)
        : [...current, userId]
    );
  };

  const removeUser = (userId: User) => {
    setSelectedUsers((current) =>
      current.filter((user) => user.id !== userId.id)
    );
  };
  return {
    users,
    setUsers,
    open,
    setOpen,
    selectedUsers,
    groupName,
    setGroupName,
    toggleUser,
    removeUser,
    handleCreate,
  };
}
