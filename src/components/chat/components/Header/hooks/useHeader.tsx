import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function useHeader() {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const ClassContainerSearch = clsx(
    isSelected
      ? "flex rounded-2xl items-center bg-myColor-800 border-green-600 border-solid border-2 shadow-md shadow-emerald-700/50 hover:bg-myColor-800"
      : "flex rounded-2xl items-center hover:bg-myColor-800 focus:bg-myColor-00 "
  );

  const ClassInputSearch = clsx(
    isSelected
      ? "input-text border bg-myColor-800 rounded-2xl text-white px-2 border-none focus:outline-none text-transparent transition-all duration-300 ease-in-out transition-opacity duration-150 ease-in-out w-32 md:w-48 lg:w-64"
      : "hidden "
  );

  const ClassIconSearch = clsx(
    "rounded-3xl",
    isSelected ? "bg-black " : "hover:border-2 border-green-600"
  );
  const handleSelectHeader = () => {
    setIsSelected(!isSelected);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node | null)) {
      setIsSelected(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    isSelected,
    handleSelectHeader,
    ClassContainerSearch,
    ClassInputSearch,
    ClassIconSearch,
    ref,
  };
}
