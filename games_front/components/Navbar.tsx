import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import Link from 'next/link';
import logo from '/static/logo.svg'
import { celoAlfajores } from "viem/chains";
import { useState, useEffect } from 'react';
import { Chain } from '@rainbow-me/rainbowkit';
import {
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    parseEther,
    stringToHex,
} from "viem";

const cUSDTokenAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"; // Testnet

export default function Navbar() {
    const { isConnected } = useAccount();
    const [address, setAddress] = useState<string | null>(null);

    const publicClient = createPublicClient({
        chain: celoAlfajores as Chain,
        transport: http(),
    });

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            let walletClient = createWalletClient({
                transport: custom(window.ethereum),
                chain: celoAlfajores as Chain,
            });

            let [address] = await walletClient.getAddresses();
            setAddress(address);
        }
    };

    useEffect(() => {
        getUserAddress();
    }, []);

    return (
        <div className="navbar">
        <div className="flex-1">
            <Link href="/" className="font-heading text-xl">
                 <Image height={45} width={45} src={logo} alt="Chipz" />
            </Link>
            <h1 className='text-2xl'>Chipz</h1>
        </div>
        <div className="flex align-center justify-center">
            <Link href='/' className="font-overpass mx-5">ZK Games</Link>
            <Link href='/'  className="font-overpass mx-5 ">Sports</Link>
            <Link href='/'  className="font-overpass mx-5">Slots</Link>
        </div>
        <div className="flex-none ml-5">
            { isConnected && <Link className='mr-10' href='/dashboard'>Dashboard</Link>}
            {!window.ethereum.isMiniPay && <ConnectButton label="Sign In" />}
        </div>
        </div> 
    );
  }

declare global {
    interface Window {
        ethereum?: any;
    }
}