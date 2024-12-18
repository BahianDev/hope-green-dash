import { useEffect, useState } from "react";
import HopeGreenAbi from "@/abi/HopeGreen.json";
import { useAccount, useReadContract } from "wagmi";
import { readContract } from "wagmi/actions";
import { config } from "@/services/wagmi";
import { INft } from "@/types";
import { metadata } from "@/utils/metadata";

interface UseFetchNFTsProps {
  contractAddress: `0x${string}`;
}

export const useFetchNFTs = ({ contractAddress }: UseFetchNFTsProps) => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<INft[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: balance, isLoading: balanceLoading } = useReadContract({
    address: contractAddress,
    abi: HopeGreenAbi,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  const fetchTokenByIndex = async (owner: `0x${string}`, index: number) => {
    const result = await readContract(config, {
      address: contractAddress,
      abi: HopeGreenAbi,
      functionName: "tokenOfOwnerByIndex",
      args: [owner, BigInt(index)],
    });
    return result;
  };

  useEffect(() => {
    const fetchTokenIds = async () => {
      if (!balance || balance === 0 || !address) return;

      setIsLoading(true);
      const promises = [];
      for (let i = 0; i < Number(balance); i++) {
        promises.push(fetchTokenByIndex(address, i));
      }

      try {
        const results = await Promise.all(promises);
        setNfts(
          results.map((res) => {
            return {
              ...metadata[Number(res)],
              tokenId: Number(res),
            };
          })
        );
      } catch (error) {
        console.error("Error fetching token IDs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenIds();
  }, [balance, address, contractAddress]);

  console.log(nfts);

  return {
    nfts,
    isLoading: isLoading || balanceLoading,
  };
};
