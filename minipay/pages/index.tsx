import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "../components/Card";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import abi from "../constants/abi.json";
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";
import { celoAlfajores } from "viem/chains";

const publicClient = createPublicClient({
    chain: celoAlfajores,
    transport: http(),
});

export default function Home() {
  return (
    <>
    <Navbar />
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <div className="flex justify-center flex-wrap gap-4">
       <Card sport="Football" teamA="Real Madrid" date="13/05/24" teamB="FC Barcelona" a={1.8} b={5.2} x={2.6} />
<Card sport="Basketball" teamA="Los Angeles Lakers" date="21/12/24" teamB="Boston Celtics" a={2.1} b={4.5} x={3.8} />
<Card sport="Football" teamA="Bayern Munich" date="03/04/24" teamB="Borussia Dortmund" a={3.3} b={5.0} x={3.2} />
<Card sport="Football" teamA="Bayern Munich" date="02/12/24" teamB="Borussia Dortmund" a={1.7} b={5.1} x={3.5} />
<Card sport="Football" teamA="Real Madrid" date="22/09/24" teamB="FC Barcelona" a={1.8} b={5.1} x={2.7} />
<Card sport="Football" teamA="Manchester United" date="26/09/24" teamB="Liverpool" a={1.6} b={5.5} x={4.3} />
<Card sport="Football" teamA="Manchester United" date="07/02/24" teamB="Liverpool" a={1.8} b={4.8} x={3.5} />
<Card sport="Football" teamA="Bayern Munich" date="28/05/24" teamB="Borussia Dortmund" a={2.2} b={4.5} x={2.5} />
<Card sport="Football" teamA="Real Madrid" date="13/10/24" teamB="FC Barcelona" a={2.9} b={3.0} x={3.1} />
      </div>
    </main>
  </>
  );
}

declare global {
    interface Window {
        ethereum?: any;
    }
}