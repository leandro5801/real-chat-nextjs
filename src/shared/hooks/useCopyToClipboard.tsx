import { useEffect, useState } from "react";

export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // reset copied state after 1.5 seconds
    });
  };

  return { copied, handleCopy, setCopied };
}
