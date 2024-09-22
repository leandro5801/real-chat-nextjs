interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={"z-10 flex -space-x-3 rtl:space-x-reverse" + className}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-white dark:border-gray-800"
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      <div className="items-end flex">
        <a
          className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      </div>
    </div>
  );
};

export default AvatarCircles;
