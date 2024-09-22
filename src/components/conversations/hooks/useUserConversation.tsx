import useLocalStorage from "@/shared/hooks/useLocalStorage";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../domain";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";

export default function useUserConversation() {
  const { user } = useContext(AuthContext);

  return { user };
}
