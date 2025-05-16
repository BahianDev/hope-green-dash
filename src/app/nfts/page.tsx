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
    <main className="min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">


        {/* NFT Grid */}
        {!isLoading && isConnected && nfts.length > 0 && (
          <section className="bg-light-gray rounded-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-davys-gray mb-6 text-center sm:text-left">
              Conheça suas NFTs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
              {nfts.map((nft, idx) => (
                <AssetCard
                  key={idx}
                  nft={nft}
                  setCurrentNft={setCurrentNft}
                  modal={modal}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <NftModal currentNft={currentNft} modal={modal} />
    </main>
  );
}
