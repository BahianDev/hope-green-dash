import { INft } from "@/types";
import Image from "next/image";
import { RefObject } from "react";
import GoogleMapComponent from "../GoogleMapComponent";
import { formatCoordinates } from "@/utils/formatCoordinates";
import Link from "next/link";

interface INftModal {
  currentNft: INft | undefined;
  modal: RefObject<HTMLDialogElement>;
}

const NftModal = ({ currentNft, modal }: INftModal) => {
  return (
    <dialog id="my_modal_2" className="modal mt-12" ref={modal}>
      {currentNft && (
        <div className="modal-box bg-custom-gray border-2 border-green-base w-full max-w-lg sm:max-w-3xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
          
          {/* Imagem */}
          <div className="flex-shrink-0 w-full sm:w-1/3">
            <Image
              src={currentNft.tree_image as string}
              alt="nft"
              width={384}
              height={300}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Header com título e ações */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-light text-black truncate">
                {currentNft.name}
              </h2>
              <Link
                href={`https://hope-green.s3.us-east-2.amazonaws.com/metadata/${currentNft.tokenId}.json`}
                target="_blank"
                className="self-start sm:self-auto"
              >
                {/* <FaExternalLinkAlt className="text-black text-xl hover:text-gray-700" /> */}
              </Link>
            </div>

            {/* Dados principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="block text-sm font-bold text-black">ID da Árvore</span>
                <span className="text-sm text-black">{currentNft.id}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-black">Plantio</span>
                <span className="text-sm text-black">{currentNft.date}</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-black">Localização</span>
                <span className="text-sm text-black">{currentNft.address}</span>
              </div>
              <div className="flex gap-2">
                <div>
                  <span className="block text-sm font-bold text-black">Latitude</span>
                  <span className="text-sm text-black">{currentNft.latitude}</span>
                </div>
                <div>
                  <span className="block text-sm font-bold text-black">Longitude</span>
                  <span className="text-sm text-black">{currentNft.longitude}</span>
                </div>
              </div>
            </div>

            {/* Mapa */}
            {currentNft.latitude && currentNft.longitude && (
              <div className="w-full h-48 sm:h-64 rounded-lg overflow-hidden">
                <GoogleMapComponent
                  height="100%"
                  zoom={15}
                  markers={[
                    {
                      lat: formatCoordinates(currentNft.latitude),
                      lng: formatCoordinates(currentNft.longitude),
                    },
                  ]}
                />
              </div>
            )}

            {/* Contrato */}
            <div>
              <span className="block text-sm font-bold text-black">Contrato</span>
              <span className="text-sm text-black break-all">
                0xAEbC39BC35aF95BF25C1254ea2200a1a5ebCc658
              </span>
            </div>
          </div>

          {/* Botão fechar (X) */}
          <form method="dialog" className="absolute top-2 right-2">
            <button className="text-gray-500 hover:text-gray-700 text-2xl leading-none">×</button>
          </form>
        </div>
      )}

      <div className="modal-action">
        <form method="dialog">
          <button className="btn w-full sm:w-auto">Fechar</button>
        </form>
      </div>
    </dialog>
  );
};

export default NftModal;
