// components/LayoutLogin.tsx
import React from "react";
import { Metadata } from "next";
import "./styles.css";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import background from "@/images/abstract-green-waves-1.png";
interface LayoutProps {
  children: React.ReactNode;
}

const LayoutLogin: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <div
        style={{
          backgroundImage: "url(/images/abstract-green-waves-1.png)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <h2 className="text-cyan-50 text-right p-7">
          @Dont give up, fight for your{" "}
          <span className="text-2xl text-cyan-700">Dreams</span>
        </h2>

        <div
          className="general-container"
          /* style={{
          backgroundImage: `url(/images/abstract-green-waves-1.png)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }} */
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutLogin;
