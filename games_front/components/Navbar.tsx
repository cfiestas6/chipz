'use client'
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

export default function Navbar() {
    const { isConnected } = useAccount();
    const [address, setAddress] = useState<string | null>(null);

    const publicClient = createPublicClient({
        chain: celoAlfajores as Chain,
        transport: http(),
    });

    const getUserAddress = async () => {
        if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMiniPay) {
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
        <div className="px-20 pt-10 navbar">
        <div className="flex-1">
            <Link href="/">
                 <Image height={55} width={55} src={logo} alt="Chipz" />
            </Link>
            <h1 className='text-3xl'>Chipz</h1>
        </div>
        <div className="flex align-center justify-center">
            <Link href='/sports'  className="text-lg font-overpass mx-5 ">Open Bet Pools</Link>
            <Link href='/'  className="text-lg font-overpass mx-5">Events</Link>
        </div>
        <div className="flex-none ml-5">
            { isConnected && <Link className='mr-10 text-lg' href='/dashboard'>Dashboard</Link>}
            <ConnectButton label="Sign In" />
        </div>
        </div> 
    );
    }

declare global {
    interface Window {
        ethereum?: any;
    }
}