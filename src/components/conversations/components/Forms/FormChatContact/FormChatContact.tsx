import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Search,
  Users,
  ChevronRight,
  UserRoundPlus,
} from "lucide-react";
import useFormChatContact from "./hooks/useFormChatContact";
import { Conversation } from "@/components/conversations/domain";

interface Props {
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
}

export function ChatContact({ setConversations }: Props) {
  const {
    filteredContacts,
    open,
    searchTerm,
    selectedContact,
    setOpen,
    setSearchTerm,
    setSelectedContact,
    countContactsOnline,
    handleCreateChat,
  } = useFormChatContact(setConversations);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors duration-200"
        >
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Chat Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-gray-200 border-gray-700 transition-all duration-200 ease-in-out">
        <DialogHeader className="text-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2"></div>
          <DialogTitle className="text-2xl font-bold mb-4 font-serif tracking-wide">
            Select a Contact
          </DialogTitle>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <Badge variant="secondary" className="bg-gray-700 text-gray-200">
              {filteredContacts.length}
            </Badge>
            <Badge variant="secondary" className="bg-green-700 text-gray-200">
              {countContactsOnline()} online
            </Badge>
          </div>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Contact..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px] rounded-md border border-gray-700 p-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedContact?.id === contact.id
                  ? "bg-green-900 bg-opacity-50"
                  : "hover:bg-gray-800"
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <Avatar className="h-10 w-10 mr-3 relative">
                <AvatarImage src={""} alt={contact.id} />
                <AvatarFallback>{contact.fullName.charAt(0)}</AvatarFallback>
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    contact.socketId !== "" ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
              </Avatar>
              <div className="flex-grow">
                <div className="font-medium">{contact.fullName}</div>
                <div className="text-sm text-gray-400">{contact.username}</div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          ))}
        </ScrollArea>
        <div className="flex justify-end space-x-4 mt-4">
          <Button
            variant="outline"
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            <X className="mr-2 h-4 w-4 animate-pulse" />
            Close
          </Button>
          <Button
            onClick={() => {
              handleCreateChat();
              setOpen(false);
            }}
            disabled={!selectedContact}
            className="bg-green-700 hover:bg-green-600 text-white transition-colors duration-200"
          >
            <MessageCircle className="mr-2 h-4 w-4 animate-pulse" />
            Go Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
