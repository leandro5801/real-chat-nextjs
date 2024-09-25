import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import { Conversation, User } from "../../domain";
import useLocalStorage from "@/shared/hooks/useLocalStorage";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import useFormCreateGroup from "./hooks/useFormCreateGroup";

interface Props {
  setConversations: Dispatch<SetStateAction<Conversation[]>>;
}
const FormCreateGroup = ({ setConversations }: Props) => {
  const {
    groupName,
    handleCreate,
    open,
    removeUser,
    setOpen,
    users,
    selectedUsers,
    toggleUser,
    setGroupName,
  } = useFormCreateGroup(setConversations);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="faded"
            className="w-full justify-start text-left font-normal bg-gray-800 text-gray-100 hover:bg-gray-900 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-gray-400 focus:outline-none active:scale-95 rounded-none"
          >
            <span>Create Group</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-950 text-gray-100 border-gray-800 shadow-2xl backdrop-blur-lg backdrop-filter z-[1000]">
          <DialogHeader className="flex flex-row justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-gray-200">
              Create a Chat Group
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="groupName"
              placeholder="Group Name"
              className="bg-gray-900 border-gray-700 text-gray-100 focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedUsers.map((userId) => {
                return (
                  <Badge
                    key={userId.id}
                    variant="default"
                    className="bg-gray-700 text-gray-100 px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {userId?.fullName.split(" ")[0]}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-3 h-3 p-0 hover:bg-gray-600"
                      onClick={() => removeUser(userId)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </Button>
                  </Badge>
                );
              })}
            </div>
            <ScrollArea className="h-[200px] rounded-md border border-gray-700">
              <div className="p-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className={cn(
                      "flex items-center space-x-4 rounded-lg p-2 transition-colors duration-200 ease-in-out cursor-pointer",
                      selectedUsers.includes(user)
                        ? "bg-gray-700"
                        : "hover:bg-gray-800"
                    )}
                    onClick={() => toggleUser(user)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={""} alt={user.fullName} />
                      <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-100 truncate">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {user.username}
                      </p>
                    </div>
                    {selectedUsers.includes(user) && (
                      <div className="flex-shrink-0 text-green-500">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="faded"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out bg-gray-950"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="faded"
              className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out bg-gray-950"
              onClick={handleCreate}
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
    </>
  );
};

export default FormCreateGroup;
