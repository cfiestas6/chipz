import { useContract, useSigner } from 'wagmi';
import contractABI from '../path/to/your/contractABI.json';

const contractAddress = "YOUR_CONTRACT_ADDRESS";

export function useChipzContract() {
  const { data: signer } = useSigner();

  const contract = useContract({
    address: contractAddress,
    abi: contractABI,
    signerOrProvider: signer,
  });

  const bet = async (param1) => { // to do
    const transaction = await contract.bet(param1);
    await transaction.wait(); // wait for the transaction to be mined
    return transaction;
  };

  return { bet };
}