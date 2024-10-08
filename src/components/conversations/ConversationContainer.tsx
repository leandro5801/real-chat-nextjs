"use client";

import ConversationItem from "./components/ConversationItem/ConversationItem";
import Header from "./components/Header/Header";
import useConversations from "./hooks/useConversations";
import Button from "./components/Button/Button";
import { Filter, Props } from "./domain";
import useUserConversation from "./hooks/useUserConversation";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function ConversationContainer({ selectConversation }: Props) {
  const {
    text,
    filterConversations,
    setFilter,
    handleChangeText,
    conversations,
    clickOutside,
    handleSelectedConversation,
    handleClickOutside,
    setConversations,
  } = useConversations(selectConversation);
  const { user } = useContext(AuthContext);

  return (
    <div className="h-full max-w-md w-full flex">
      <div className="border-solid rounded h-full w-full bg-opacity-2 bg-myColor-900">
        <Header
          setConversations={setConversations}
          conversations={conversations}
          setFilter={setFilter}
          userName={user}
        />

        <div
          className="bg-myColor-800 flex justify-around items-center shadow-md my-0.5"
          onBlur={handleClickOutside}
        >
          <Button
            text="All"
            handleClick={() => handleChangeText(Filter.NOT_FILTER)}
            selected={Filter.NOT_FILTER === text && clickOutside}
            clickOutside={clickOutside}
          />

          <Button
            text="Contacts"
            handleClick={() => handleChangeText(Filter.FILTER_BY_CONTACTS)}
            selected={Filter.FILTER_BY_CONTACTS === text && clickOutside}
            clickOutside={clickOutside}
          />

          <Button
            text="Groups"
            handleClick={() => handleChangeText(Filter.FILTER_BY_GROUPS)}
            selected={text === Filter.FILTER_BY_GROUPS && clickOutside}
            clickOutside={clickOutside}
          />
        </div>
        <ScrollArea className="rounded-md border border-gray-700 h-[84%] dark">
          {filterConversations.map((chat) => (
            <ConversationItem
              key={chat.id}
              conversation={chat}
              isSelected={false}
              onClick={() => handleSelectedConversation(chat)}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
