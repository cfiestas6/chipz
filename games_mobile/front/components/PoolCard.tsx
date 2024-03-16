import contractABI from '../constants/abi.json';

export default function PoolCard({ sport, date, lA, lB, lX, teamA, teamB }: any) {

    async function handleBet(e: any) {
        e.preventDefault();
        // ex

        const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    }

    return (
        <div className="card border-2 bg-[#ffffff] shadow-md border-red card-compact min-w-96">
  <div className="card-body">
        <div className='flex justify-between'>
            <div>
                <h2 className="font-bold text-lg">{sport} | {teamA}  VS  {teamB}</h2>
            </div>
            <div>
                <p className='text-lg'>{date}</p>
            </div>
        </div>
    
    <div className="card-actions flex justify-center">
        <p className='text-lg'>Add Liquidity</p>
    </div>
    <div className="card-actions flex justify-center">
        <button onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()} className="btn bg-white min-w-[6rem]">Liquidity A: {lA}</button>

        <dialog id="my_modal_1" className="modal">
        <form onSubmit={handleBet}>
  <div className="modal-box">
    <h3 className="font-bold text-lg">{sport} | {teamA}  VS  {teamB}</h3>
    <p className="py-4">Add liquidity (ETH)</p>
    <div className="modal-action">
        <input type="text" placeholder="Amount (ETH)" className="input input-bordered w-full max-w-xs" />
        <button type='submit' className="btn">Add Liquidity</button>
    </div>
  </div>
</form>
    </dialog>

      <button className="btn bg-white min-w-[6rem]">Liquidity X: {lX}</button>
      <button className="btn  bg-white min-w-[6rem]">Liquidity B: {lB}</button>
    </div>
  </div>
    </div>
    )
}