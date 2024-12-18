import { INft } from "@/types";
import Image from "next/image";
import { RefObject } from "react";
import GoogleMapComponent from "../GoogleMapComponent";
import { formatCoordinates } from "@/utils/formatCoordinates";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

interface INftModal {
  currentNft: INft | undefined;
  modal: RefObject<HTMLDialogElement>;
}

const NftModal = ({ currentNft, modal }: INftModal) => {
  return (
    <dialog id="my_modal_2" className="modal mt-24" ref={modal}>
      {currentNft && (
        <div className="modal-box bg-custom-gray border-green-base border-2 max-w-5xl flex gap-5">
          <div>
            <Image
              src={currentNft.image as string}
              width={384}
              height={300}
              alt="nft"
              className="w-96 h-full rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <span className="text-black text-5xl font-light">
                {currentNft?.name}
              </span>
              <div className="flex flex-col">
                <span className="text-black text-sm font-bold">
                  ID da Ärvore
                </span>
                <span className="text-black text-sm">{currentNft?.id}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-black text-sm font-bold">Plantio</span>
                <span className="text-black text-sm">{currentNft?.date}</span>
              </div>

              <Link
                target="_blank"
                href={`https://hope-green.s3.us-east-2.amazonaws.com/metadata/${currentNft?.tokenId}.json`}
              >
                <Image
                  src={"/external-link-alt.png"}
                  width={20}
                  height={20}
                  alt="external"
                />
              </Link>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col max-w-48">
                <span className="text-black text-sm font-bold">
                  Localização
                </span>
                <span className="text-black text-sm">
                  {currentNft?.address}
                </span>
              </div>
              <div className="flex flex-col max-w-48">
                <span className="text-black text-sm font-bold">Latitude</span>
                <span className="text-black text-sm">
                  {currentNft?.latitude}
                </span>
              </div>
              <div className="flex flex-col max-w-48">
                <span className="text-black text-sm font-bold">Longitude</span>
                <span className="text-black text-sm">
                  {currentNft?.longitude}
                </span>
              </div>
            </div>
            <div>
              {currentNft && currentNft?.latitude && currentNft.latitude && (
                <GoogleMapComponent
                  height="300px"
                  zoom={15}
                  markers={[
                    {
                      lat: formatCoordinates(currentNft?.latitude as string),
                      lng: formatCoordinates(currentNft?.longitude as string),
                    },
                  ]}
                />
              )}
            </div>
            <div className="flex flex-col max-w-48">
              <span className="text-black text-sm font-bold">Contrato</span>
              <span className="text-black text-sm">
                0x750ab3842345a32d258379543665b73A53304479
              </span>
            </div>
          </div>

          <form method="dialog">
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              ✖
            </button>
          </form>
        </div>
      )}

      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    </dialog>
  );
};

export default NftModal;
