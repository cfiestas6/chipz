import { useAccount } from 'wagmi';
import PoolCard from './PoolCard';
import { useState } from 'react';

export default function PoolDashboard() {
    const [earnings, setEarnings] = useState(0)

    const handleClick = () => {
        setEarnings(earnings + 1)
    }

    function handleCreatePool() {
        console.log('You clicked me');
        // execute tx
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    }

    return (
        <div className="flex">
            <div className="grid shadow-md p-7 w-[50%] card bg-white rounded-box">
                <h2 className='text-2xl pb-5'>Open Pools</h2>
                <PoolCard sport="Soccer" teamA="Real Madrid" teamB="FC Barcelona" lA={2.3} lB={0.1} lX={0.1} date="00/00/00" />
        <div className="card bg-blue shadow-md card-compact mt-10 min-w-96">
  <div className="card-body">
        <div>
            <h2 className="card-title  text-3xl text-white">Create your own bet pool</h2>
            <p className='text-white'>Gain rewards by creating and promoting your own pools</p>
        </div>
    <div className="card-actions h-[100%] flex items-end">
        <button onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()} className="btn bg-white w-[100%]">Create Bet Pool</button>
    <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <div className="modal-action min-h-[100%] flex flex-col justify-center items-center">

        <h3 className="font-bold text-4xl">Create Bet Pool</h3>
        <p className="py-4">Select an event and set the amount of ETH</p>

    <select className="select my-3 select-bordered ">
  <option disabled selected>Select Event</option>
  <option>Real Madrid VS FC Barcelona | 00/00/00 </option>
  <option>[...]</option>
</select>
        <p className='my-2'>Team A inital amount</p>
        <input type="text" placeholder="Team A amount (ETH)" className="input input-bordered w-full max-w-xs" />
        <p className='my-2'>Team B inital amount</p>
        <input type="text" placeholder="Team B amount (ETH)" className="input input-bordered w-full max-w-xs" />
        <button onClick={handleCreatePool} className="btn mt-5 text-white bg-red">Create Bet Pool</button>
    </div>
  </div>
    </dialog>
    </div>
  </div>
    </div>
 
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="grid shadow-md p-7  w-[50%] card bg-white rounded-box">
                <h2 onClick={handleClick} className='text-2xl pb-5'>Earnings</h2>
                <p className='text-3xl'>{earnings} ETH</p>
                <button className="btn btn-outline">Withdraw</button>
            </div>
        </div>
    );
}