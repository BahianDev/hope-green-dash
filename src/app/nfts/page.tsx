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
      <div className="min-h-screen bg-white p-6">
        {isConnected && isLoading && (
          <div className="flex flex-col text-black w-full items-center justify-center">
            <span>Carregando...</span>
          </div>
        )}

        {!isConnected && (
          <div className="flex flex-col text-black w-full items-center justify-center">
            <TbWalletOff size={100} />
            <span>Por favor, conecte sua wallet para continuar.</span>
          </div>
        )}

        {!isLoading && isConnected && !nfts.length && (
          <div className="flex flex-col text-black w-full items-center justify-center">
            <RxValueNone size={100} />
            <span>Você ainda não possui NFTs</span>
          </div>
        )}

        {isConnected && nfts.length && (
          <div className="gap-4 bg-light-gray rounded-lg p-4 h-full w-full mt-4 ">
            <h2 className="text-lg font-bold mb-4 text-davys-gray">
              Conheça suas nfts
            </h2>
            <div className="grid grid-cols-3 gap-5">
              {nfts.map((nft, key: number) => (
                <AssetCard
                  key={key}
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
