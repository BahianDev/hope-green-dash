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

  const handleInfoClick = () => {
    if (modal.current) {
      setCurrentNft(nft);
      modal.current.showModal();
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row items-center gap-6">
      {/* NFT Image */}
      {image && (
        <div className="flex-shrink-0 flex justify-center lg:justify-start">
          <Image
            src={image}
            alt="NFT"
            width={96}
            height={96}
            className="rounded-full object-cover w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          />
        </div>
      )}

      {/* Texto + ícones */}
      <div className="flex-1 flex flex-col text-center lg:text-left">
        <p className="font-semibold text-davys-gray uppercase truncate text-base sm:text-lg md:text-xl">
          {name}
        </p>
        <div className="mt-2 flex justify-center lg:justify-start items-center gap-2 text-sm sm:text-base text-davys-gray">
          <Image src="/marker.png" width={20} height={20} alt="localização" />
          <span>Iranduba - AM</span>
        </div>
        <div className="mt-1 flex justify-center lg:justify-start items-center gap-2 text-sm sm:text-base text-davys-gray">
          <Image src="/hectare.png" width={20} height={20} alt="tipo" />
          <span>Tipo: {type}</span>
        </div>
      </div>

      {/* Botão */}
      <button
        onClick={handleInfoClick}
        className="self-center lg:self-auto bg-green-base text-white px-4 py-2 rounded-full text-sm sm:text-base hover:opacity-90 transition"
      >
        Informações
      </button>
    </div>
  );
};

export default AssetCard;
