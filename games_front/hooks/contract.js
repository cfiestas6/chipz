import { useContract, configureChains, useSigner } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import contractABI from '../path/to/your/contractABI.json';

const contractAddress = "0xA313135090bb7EA9f308ef08eeB7B61CD826115f";

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