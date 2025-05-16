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
    <div className="bg-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Texto + ícones */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <p className="font-semibold text-davys-gray uppercase truncate text-sm sm:text-base">
            {name}
          </p>
          <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-davys-gray">
            <Image src="/marker.png" width={16} height={16} alt="localização" />
            <span>Iranduba - AM</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-davys-gray">
            <Image src="/hectare.png" width={16} height={16} alt="tipo" />
            <span>Tipo: {type}</span>
          </div>
        </div>

        {/* Avatar/NFT */}
        {image && (
          <div className="mt-3 sm:mt-0 flex-shrink-0">
            <Image
              src={image}
              width={48}
              height={48}
              alt="NFT"
              className="rounded-full object-cover w-12 h-12 sm:w-14 sm:h-14"
            />
          </div>
        )}
      </div>

      {/* Botão */}
      <button
        onClick={() => {
          if (modal.current) {
            setCurrentNft(nft);
            modal.current.showModal();
          }
        }}
        className="self-end sm:self-auto bg-green-base text-white px-3 py-1 rounded text-xs sm:text-sm"
      >
        Informações
      </button>
    </div>
  );
};

export default AssetCard;
