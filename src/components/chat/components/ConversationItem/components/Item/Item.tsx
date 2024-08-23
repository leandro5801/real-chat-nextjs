import Image from "next/image";

interface Props {
  urlImage: string;
  name: string ;
  isGroup: boolean;
  newMessages: number;
}

export default function Item  ({ urlImage, name, isGroup, newMessages }: Props)  {
  return (
    <>
      <Image className="m-2" alt="" src={urlImage} width={50} height={50} />
      <div className="text-center flex items-center justify-between w-full">
        <div className="justify-center flex items-center w-full">
          <div className="">
            <h2 className="text-gray-300 mr-2 cursor-default">{name}</h2>
          </div>
        </div>
        
          <div className={`${newMessages !== 0 && "bg-green-600 "} flex items-center justify-center rounded-full w-8 p-1 mr-3`}>
           {newMessages > 0 && <h2 className="text-gray-950">{newMessages}</h2>} 
          </div>
        
      </div>
      <hr className="border-lime-50" />
    </>
  );
};
