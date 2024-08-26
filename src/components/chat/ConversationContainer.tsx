"use client";

import ConversationItem from "./components/ConversationItem/ConversationItem";
import Header from "./components/Header/Header";
import useConversations from "./hooks/useConversations";
import Button from "./components/Button/Button";
import { Filter } from "./domain";
import useUserConversation from "./hooks/useUserConversation";

export default function ConversationContainer() {
  const {
    text,
    filterConversations,
    setFilter,
    handleChangeText,
    conversations,
  } = useConversations();
  const { userName } = useUserConversation();

  return (
    <div className="h-screen w-full flex">
      <div className="border-solid rounded h-full w-full bg-opacity-2 bg-myColor-800">
        <Header
          conversations={conversations}
          setFilter={setFilter}
          userName={userName}
        />

        <div className="bg-myColor-800 flex justify-around items-center shadow-md my-0.5">
          <Button
            text="All"
            handleClick={() => handleChangeText(Filter.NOT_FILTER)}
            selected={Filter.NOT_FILTER === text}
          />

          <Button
            text="Contacts"
            handleClick={() => handleChangeText(Filter.FILTER_BY_CONTACTS)}
            selected={Filter.FILTER_BY_CONTACTS === text}
          />

          <Button
            text="Groups"
            handleClick={() => handleChangeText(Filter.FILTER_BY_GROUPS)}
            selected={text === Filter.FILTER_BY_GROUPS}
          />
        </div>

        {filterConversations.map((chat) => (
          <ConversationItem
            key={chat.id}
            conversation={chat}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
}
