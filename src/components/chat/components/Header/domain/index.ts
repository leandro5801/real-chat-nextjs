import { Conversation, User } from "@/components/chat/domain";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default interface HeaderProps {
  conversations: Conversation[];
  setFilter: Dispatch<SetStateAction<Conversation[]>>;
  userName: string | null;
}
