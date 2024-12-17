"use client"

import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";
import Link from "next/link";

export default function NftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white p-6">
      <header className="flex justify-between items-start p-2 rounded-lg mb-6">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Hope Green" width={250} height={50} />
        </div>
        <div className="flex gap-2">
          <Link href="https://sb1-268fhw.vercel.app/" target="_blank">
            <button className="bg-green-base text-xl text-white px-10 py-2 rounded-lg font-bold">
              NFT Market
            </button>
          </Link>
          <ConnectWallet />
        </div>
      </header>
      {children}
    </div>
  );
}
