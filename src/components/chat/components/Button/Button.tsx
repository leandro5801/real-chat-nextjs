import clsx from "clsx";
import React from "react";

interface Props {
  handleClick(): void;
  selected: boolean;
  text: string;
}

export default function Button({ selected, handleClick, text }: Props) {
  const CLASS = clsx(
    "hover:text-green-400 border-2 p-2 cursor-pointer text-center  rounded-lg",
    selected
      ? "border-green-400 text-green-400"
      : "border-myColor-800 text-neutral-300"
  );

  return (
    <a type="button" className={CLASS} onClick={handleClick}>
      {text}
    </a>
  );
}
