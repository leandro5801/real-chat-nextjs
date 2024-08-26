import Image from "next/image";
import React from "react";
import useHeader from "./hooks/useHeader";
import HeaderProps from "./domain";

export default function Header({
  conversations,
  userName,
  setFilter,
}: HeaderProps) {
  const {
    ClassInputSearch,
    ClassIconSearch,
    ClassContainerSearch,
    handleSelectHeader,
    ref,
    handleInputFilter,
    clearFilter,
  } = useHeader(conversations, setFilter);

  return (
    <header className="flex justify-between bg-myColor-700 shadow-lg">
      <h1 className="text-myColor-300  m-3 font-mono ">
        Hi{" "}
        <span className="text-myColor-50 text-justify text-xl">{userName}</span>
      </h1>
      <div className="flex justify-end ">
        <div className="flex gap-4 items-center justify-between" ref={ref}>
          <div className={ClassContainerSearch}>
            <div>
              <input
                type="text"
                placeholder="Search..."
                className={ClassInputSearch}
                onInput={handleInputFilter}
                onBlur={clearFilter}
              />
            </div>
            <div className={ClassIconSearch}>
              <Image
                src={"/images/icons8-search-128.png"}
                width={34}
                height={34}
                alt=""
                className="p-1 "
                onClick={handleSelectHeader}
              ></Image>
            </div>
          </div>

          <div className="hover:bg-myColor-800 rounded-2xl">
            <Image
              src={"/images/icons8-menu-100.png"}
              width={34}
              height={34}
              alt=""
              className="p-1 hover:border-2 border-myColor-700"
            ></Image>
          </div>
        </div>
      </div>
    </header>
  );
}
