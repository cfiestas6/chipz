import Link from 'next/link';
//import { abi, contractAddress } from '../constants';

export default function GameCard({ sport, date, a, b, x, teamA, teamB }: any) {
    function handleBet() {
        console.log('You clicked me');

        // execute tx

        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
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
        <input type="text" placeholder="Amount (ETH)" className="input input-bordered w-full max-w-xs" />
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