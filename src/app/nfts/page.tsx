"use client";
import { useRef, useState } from "react";
import { useAccount } from "wagmi";
import AssetCard from "@/components/AssetCard";
import NftModal from "@/components/Modal/NftModal";
import { RxValueNone } from "react-icons/rx";
import { TbWalletOff } from "react-icons/tb";
import { INft } from "@/types";
import { useFetchNFTs } from "@/hooks/useFetchNFTs";

export default function Nfts() {
  const contractAddress = "0xAEbC39BC35aF95BF25C1254ea2200a1a5ebCc658" as const;

  const modal = useRef<HTMLDialogElement>(null);
  const [currentNft, setCurrentNft] = useState<INft>();
  const { isConnected } = useAccount();
  const { nfts, isLoading } = useFetchNFTs({ contractAddress });

  return (
    <>
      <div className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Loading state */}
        {/* {isConnected && isLoading && (
          <div className="flex flex-col text-black w-full items-center justify-center py-20">
            <span>Carregando...</span>
          </div>
        )} */}

        {/* Not connected */}
        {/* {!isConnected && (
          <div className="flex flex-col text-black w-full items-center justify-center py-20">
            <TbWalletOff size={80} />
            <span className="mt-2 text-center">Por favor, conecte sua wallet para continuar.</span>
          </div>
        )} */}

        {/* No NFTs */}
        {/* {!isLoading && isConnected && !nfts.length && (
          <div className="flex flex-col text-black w-full items-center justify-center py-20">
            <RxValueNone size={80} />
            <span className="mt-2 text-center">Você ainda não possui NFTs</span>
          </div>
        )} */}

        {/* NFT grid */}
        { nfts.length > 0 && (
          <div className="bg-light-gray rounded-lg p-4 sm:p-6 mt-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-davys-gray text-center sm:text-left">
              Conheça suas NFTs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {nfts.map((nft, idx) => (
                <AssetCard
                  key={idx}
                  nft={nft}
                  setCurrentNft={setCurrentNft}
                  modal={modal}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <NftModal currentNft={currentNft} modal={modal} />
    </>
  );
}
