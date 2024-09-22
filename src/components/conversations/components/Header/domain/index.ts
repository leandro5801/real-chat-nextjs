import { Conversation, User } from "@/components/conversations/domain";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default interface HeaderProps {
  conversations: Conversation[];
  setFilter: Dispatch<SetStateAction<Conversation[]>>;
  userName: User | null;
}
