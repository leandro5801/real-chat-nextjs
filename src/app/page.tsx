"use client";
import { useRouter } from "next/navigation";


export default function Domain() {
  const router = useRouter();
  router.push("/loginPage");

  return ;
}
