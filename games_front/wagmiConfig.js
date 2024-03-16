// wagmiConfig.ts
import { configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import '@rainbow-me/rainbowkit/styles.css';

const chiliz = {
  id: 88888,
  name: 'Chiliz',
  network: 'chiliz',
  nativeCurrency: {
    name: 'Chiliz',
    symbol: 'CHZ',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://rpc.ankr.com/chiliz',
  },
  blockExplorers: {
    default: { name: 'ChilizScan', url: 'https://scan.chiliz.com' },
  },
  testnet: false,
};
// Define the Chiliz network configuration
const { chains, provider } = configureChains([chilizChain], [alchemyProvider({ apiKey: '_your_alchemy_api_key_' }), publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'My DApp',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { wagmiClient, RainbowKitProvider, chains };