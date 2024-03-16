import { useEffect, useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import contractABI from '../constants/abi.json';
import { lightTheme, getDefaultConfig, Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import next from 'next';
import { useReadContract } from 'wagmi'

const contractAddress = "0x93C1bb0A43DCB409d87354959753b71b6Bf30B15";

const chiliz = {
  id: 88882, 
  name: 'Chiliz',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Chiliz', symbol: 'CHZ', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://chiliz-spicy.publicnode.com'] },
  },
  blockExplorers: {
    default: { name: 'ChilizScan', url: 'https://testnet.chiliscan.com/' },
  },
  contracts: {
    multicall3: {
      address: '0x93C1bb0A43DCB409d87354959753b71b6Bf30B15',
    },
  },
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'Chipz',
  projectId: '80b20ac8262281b421d6684fc3857b5d',
  chains: [chiliz],
});

export default function GameCard({ sport, date, a, b, x, teamA, teamB }: any) {
    const { address } = useAccount();
    const { data: hash, writeContract, error} = useWriteContract() 
    const { data: balance } = useReadContract({
        abi: contractABI,
        address: contractAddress,
        functionName: 'nextPoolId',
      })

      useEffect(() => {
        console.log({error})
      
      }, [error])
    
    async function handleBet(e: any) {
        e.preventDefault();

        const team = '1'
        const amount = (document.getElementById('amount') as HTMLInputElement).value

        let poolId = Number(balance) - 1;
        
        writeContract({ 
            address: contractAddress, 
            abi: contractABI, 
            functionName: 'placeBet', 
            args: [poolId, team, amount], 
        })
    }

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
        <input type="text" id='amount' name='amount' placeholder="Amount (ETH)" className="input input-bordered w-full max-w-xs" />
        <button onClick={handleBet} className="btn">Bet</button>
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