"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Trash2, X } from "lucide-react";

export default function DeleteConversations() {
  const [isClosing, setIsClosing] = useState(false);

  return (
    <>
      <>
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-max max-w-[90%] bg-gray-900 text-white p-6 rounded-lg shadow-2xl animate-fadeIn border-l-4 border-red-500 ${
            isClosing ? "animate-fadeOut" : "animate-fadeIn"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold tracking-tight">
              Delete Conversations
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-gray-800"
              //  onClick={}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="text-sm font-medium leading-5 mb-2">
            Select the conversations you want to remove permanently.
          </p>
          <p className="text-xs text-gray-400 italic">
            This action is irreversible and will delete all associated messages.
          </p>
          <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-red-500 animate-pulse"></div>
          </div>
        </div>

        <div className=" fixed z-[1000] bottom-4 left-1/2 transform -translate-x-1/2 animate-fadeIn">
          <Button
            size="icon"
            variant="destructive"
            className="h-14 w-14 rounded-full shadow-lg transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 group"
          >
            <Trash2 className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            <span className="sr-only">
              Confirm delete selected conversations
            </span>
          </Button>
        </div>
      </>
    </>
  );
}
