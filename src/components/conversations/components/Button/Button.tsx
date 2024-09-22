import clsx from "clsx";
import React from "react";

interface Props {
  handleClick(): void;
  selected: boolean;
  clickOutside: boolean;
  text: string;
}

export default function Button({
  selected,
  handleClick,
  text,
  clickOutside,
}: Props) {
  const CLASS = clsx(
    "hover:text-green-400 border-2 p-2 cursor-pointer text-center  rounded-lg",
    clickOutside ? "" : "text-green-400",
    selected
      ? "border-green-400 text-green-400"
      : "border-myColor-800 text-neutral-300"
  );

  return (
    <button type="button" className={CLASS} onClick={handleClick}>
      {text}
    </button>
  );
}
