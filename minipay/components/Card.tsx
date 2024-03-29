import { useEffect, useState } from 'react';
import contractABI from '../constants/abi.json';
import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "../components/Card";
import Navbar from "@/components/Navbar";
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

const contractAddress = "0x905B1E2b4dEC9984aE9589Aa8E1BB87DaFe5Cd51";

export default function GameCard({ sport, date, a, b, x, teamA, teamB }: any) {
    
    const getPoolId = async () => {
         const contract = getContract({
            abi: abi,
            address: contractAddress,
            client: publicClient,
        }) as any;
        const poolId = await contract.poolId() as any;
        return poolId;
    }
    const handleBet = async () => {
        let walletClient = createWalletClient({
            transport: custom(window.ethereum),
            chain: celoAlfajores,
        });
        let [address] = await walletClient.getAddresses();
        const tx = await walletClient.writeContract({
            address: contractAddress,
            abi: abi,
            functionName: "createPool",
            account: address,
            args: ['1'],
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: tx,
        });

        alert(receipt.status)
        return receipt;
    };

    return (
        <div className="card border-2 bg-[#ffffff] shadow-md border-red card-compact w-96">
  <div className="card-body">
        <div className='flex justify-between'>
            <div>
                <h2 className="card-title text-red">{sport}</h2>
            </div>
            <div>
                <p className='text-lg'>{date}</p>
            </div>
        </div>


    <div className='mb-3'>
        <div className='flex border-b-2'>
            <p className='text-lg'>A: {teamA}</p>
        </div>
        <div className='flex border-b-2'>
            <p className='text-lg'>B: {teamB}</p>
        </div>
    </div>

    <div className="card-actions flex justify-center">
        <button onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()} className="btn w-[5rem]">A: {a}</button>

        <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{sport} | {teamA}  VS  {teamB}</h3>
    <p className="py-4">For every 1 ETH you could get: {a} ETH</p>
    <div className="modal-action">
        <form onSubmit={handleBet}>
            <input type="text" id='amount' name='amount' placeholder="Amount (ETH)" className="input input-bordered w-full max-w-xs" />
            <button type='submit' className="btn">Bet</button>
        </form>
    </div>
  </div>
    </dialog>

      <button className="btn w-[5rem]">X: {x}</button>
      <button className="btn w-[5rem]">B: {b}</button>
    </div>
  </div>
    </div>
    )
}
declare global {
    interface Window {
        ethereum?: any;
    }
}