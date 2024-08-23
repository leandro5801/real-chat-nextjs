import { SocketProvider } from "@/contexts/authContext";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SocketProvider>{children}</SocketProvider>;
}
