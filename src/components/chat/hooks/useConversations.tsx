"use client";

import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Conversation, Filter, User } from "../domain";
import axios, { AxiosError } from "axios";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

export default function useConversations() {
  const { get } = useLocalStorage();

  const [filterConversations, setFilter] = useState<Conversation[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [text, setText] = useState<string>("");

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

            return { ...conversation, members: members };
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
          conversations.filter((chat) => chat.name_conversation !== "" && chat)
        );

        break;
      case Filter.FILTER_BY_CONTACTS:
        setFilter(
          conversations.filter((chat) => chat.name_conversation === "" && chat)
        );
        break;
      default:
        setFilter(conversations);
    }
  }, [text, conversations]);

  function handleChangeText(t: Filter) {
    setText(t);
  }

  function handleInputFilter(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value.toLowerCase();
    setFilter(
      conversations.filter((conversation) => {
        const conversationName = conversation.name_conversation.toLowerCase();

        if (conversation.name_conversation !== " ") {
          return conversationName.includes(searchTerm);
        } else {
          const username = conversation.members[0].username.toLowerCase();
          return username.includes(searchTerm);
        }
      })
    );
  }

  return {
    handleChangeText,
    text,
    setText,
    filterConversations,
    handleInputFilter,
  };
}
