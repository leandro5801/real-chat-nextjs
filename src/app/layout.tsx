import type { Metadata } from "next";
import "./globals.css";
import { RouterProvider } from "@/contexts/routerContext";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </head>

      <body className="h-screen w-full overflow-hidden">
        <RouterProvider>
          <ToastContainer />
          {children}
        </RouterProvider>
      </body>
    </html>
  );
}
