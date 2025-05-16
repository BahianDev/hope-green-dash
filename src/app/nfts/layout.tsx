"use client";

import Image from "next/image";
import ConnectWallet from "@/components/ConnectWallet";
import Link from "next/link";

export default function NftsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 mb-6">
        {/* Logo */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Image
            src="/logo.png"
            alt="Hope Green"
            width={200}
            height={40}
            className="w-40 h-auto sm:w-56 sm:h-auto"
          />
        </div>

        {/* Ações */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <Link href="https://sb1-268fhw.vercel.app/" target="_blank">
            <button className="bg-green-base text-white font-bold rounded-lg text-base sm:text-xl px-4 py-2 sm:px-10 sm:py-2 w-full sm:w-auto">
              NFT Market
            </button>
          </Link>
          <div className="w-full sm:w-auto">
            <ConnectWallet />
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
