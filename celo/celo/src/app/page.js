import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import stableTokenABI from '@celo/abis/lib/StableToken.json';

const STABLE_TOKEN_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";

const CheckBalance = () => {
    const [balance, setBalance] = useState('Loading...');
    const [address, setAddress] = useState(''); // User should input or set this address

    useEffect(() => {
        if (address) {
            const provider = new ethers.providers.JsonRpcProvider('https://forno.celo.org'); // Celo Mainnet RPC
            const stableTokenContract = new ethers.Contract(STABLE_TOKEN_ADDRESS, stableTokenABI, provider);
            
            const checkBalance = async () => {
                try {
                    const balanceInBigNumber = await stableTokenContract.balanceOf(address);
                    const balanceInEther = ethers.utils.formatEther(balanceInBigNumber);
                    setBalance(balanceInEther);
                } catch (error) {
                    console.error('Error fetching balance:', error);
                    setBalance('Error');
                }
            };

            checkBalance();
        }
    }, [address]); // Re-run when the address changes

    return (
        <div>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" />
            <p>Balance: {balance} cUSD</p>
        </div>
    );
};

export default CheckBalance;

