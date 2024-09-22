import Image from "next/image";
import React from "react";
import useHeader from "./hooks/useHeader";
import HeaderProps from "./domain";
import WordRotate from "@/shared/components/rotateText";
import MenuConversation from "./components/MenuConversation/MenuConversation";

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
    handleClickOutside,
    ref,
    handleInputFilter,
    clearFilter,
    handleSelectMenu,
    isSelectedMenu,
  } = useHeader(conversations, setFilter);

  return (
    <header className="relative flex justify-between bg-myColor-700 shadow-lg">
      <WordRotate
        className="text-gray-300 text-2xl m-3 font-normal  drop-shadow-[0_1px_1px_rgba(0,128,25,200.35)] font-serif shadow-sm"
        words={[
          (userName?.fullName.split(" ")[0] as string) || "User",
          "Welcome",
        ]}
        duration={5000}
      />

      <div className="flex justify-end ">
        <div
          className="flex gap-4 items-center justify-between"
          ref={ref}
          onBlur={handleClickOutside}
        >
          <div className={ClassContainerSearch} onBlur={clearFilter}>
            <div>
              <input
                type="text"
                placeholder=" Search..."
                className={ClassInputSearch}
                onInput={handleInputFilter}
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

          <div
            className="hover:bg-myColor-800 rounded-2xl flex-col relative transition"
            onClick={handleSelectMenu}
          >
            <Image
              src={"/images/icons8-menu-100.png"}
              width={34}
              height={34}
              alt=""
              className="p-1 hover:border-2 border-myColor-700"
            ></Image>
            {isSelectedMenu && <MenuConversation />}
          </div>
        </div>
      </div>
    </header>
  );
}
