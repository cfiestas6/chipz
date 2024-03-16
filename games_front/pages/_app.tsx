import '../styles/globals.css';
import Navbar from '../components/Navbar';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme, getDefaultConfig, Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

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
  contracts: {},
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'Chipz',
  projectId: '80b20ac8262281b421d6684fc3857b5d',
  chains: [chiliz],
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={lightTheme({accentColor: '#a12034'})} >
          <Navbar />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;