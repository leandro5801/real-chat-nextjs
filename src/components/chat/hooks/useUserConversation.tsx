import useLocalStorage from "@/shared/hooks/useLocalStorage";
import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../domain";
import { useRouter } from "next/navigation";

export default function useUserConversation() {
  const [userName, setUserName] = useState<string | null>(null);
  const { get } = useLocalStorage();

  useEffect(() => {
    const token = get("token");
    console.log(token);

    axios
      .get(`${process.env.URL_API}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        setUserName(response.data);
      })
      .catch((error) => {
        console.log("Error Server", error);
      });
  }, []);

  return { userName };
}
