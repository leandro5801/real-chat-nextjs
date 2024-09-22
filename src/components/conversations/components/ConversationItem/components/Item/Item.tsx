import Image from "next/image";
import AvatarCircles from "./components/Avatar";
import { ItemProps } from "./domain";
import useItem from "./hooks/useItem";

export default function Item({
  urlImage,
  name,
  isGroup,
  lastMessageDate,
  lastMessageText,
  newMessages,
}: ItemProps) {
  const { handleImageHeight, handleImageWidth, ClassConnectedUser } = useItem(
    isGroup,
    name
  );

  return (
    <>
      <div className="flex -space-x-5">
        <div>
          <Image
            className="m-2"
            alt=""
            src={urlImage}
            width={handleImageWidth()}
            height={handleImageHeight()}
          />
        </div>
        <div className="flex items-end justify-center mb-2">
          <div className={ClassConnectedUser}></div>
        </div>
      </div>
      <div className="text-center flex items-center justify-between w-full ml-2">
        {
          <AvatarCircles
            avatarUrls={[
              "/images/green_business-meeting_icon-icons.com_59393.png",
              "/images/1486564400-account_81513 (1).png",
            ]}
            className=""
          />
        }
        <div className="justify-center flex items-center w-full">
          <div className="relative">
            <h2 className="text-gray-300 mr-2 font-mono text-lg cursor-default sm:text-xl">
              {name}
            </h2>
            {
              <h2 className="text-gray-300 mr-2 font-mono text-xs sm:text-base cursor-default">
                {lastMessageText}
              </h2>
            }
          </div>
        </div>

        <div className="  ">
          <div className="flex ">
            <h6
              className={`font-mono text-sm mt-1 ${
                newMessages !== 0 ? "text-green-300 " : "text-gray-300"
              }`}
            >
              {lastMessageDate}
            </h6>
          </div>
          <div className="flex justify-end">
            <div
              className={`${
                newMessages !== 0 && "bg-green-500 "
              } flex items-center justify-center rounded-full w-5 h-5 m-1 `}
            >
              {newMessages > 0 && (
                <h2 className="text-gray-950 text-xs ">{newMessages}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <hr className="border-lime-50" />
    </>
  );
}
