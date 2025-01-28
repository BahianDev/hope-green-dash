import { INft } from "@/types";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";

interface IAssetCard {
  nft: INft;
  modal: RefObject<HTMLDialogElement>;
  setCurrentNft: Dispatch<SetStateAction<INft | undefined>>;
}

const AssetCard = ({ nft, modal, setCurrentNft }: IAssetCard) => {
  const { name, type, image } = nft;

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-center justify-between">
      <div className="flex w-full justify-between">
        <div>
          <p className="font-semibold text-davys-gray uppercase">{name}</p>
          <div className="text-base text-davys-gray font-normal flex gap-2 mt-2">
            <Image src="/marker.png" width={20} height={20} alt="profile" />
            <p>Iranduba - AM</p>
          </div>
          <div className="text-base text-davys-gray font-normal flex gap-2 mt-2">
            <Image src="/hectare.png" width={20} height={20} alt="profile" />
            <p>Tipo: {type}</p>
          </div>
        </div>
        {image && (
          <div className="flex flex-col items-center gap-3">
            <Image
              className="rounded-full w-14 h-14"
              src={image}
              width={50}
              height={50}
              alt="profile"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 mt-2 w-full justify-end">
        <button
          onClick={() => {
            if (modal.current) {
              setCurrentNft(nft);
              modal.current.showModal();
            }
          }}
          className="bg-green-base text-white px-2 py-1 rounded text-xs font-normal self-end"
        >
          Informações
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
