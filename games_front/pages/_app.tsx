import '../styles/globals.css';
import Navbar from '../components/Navbar';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lightTheme, getDefaultConfig, Chain, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { useState, useEffect } from 'react';

const chiliz = {
  id: 88882, 
  name: 'Chiliz',
  iconUrl: 'https://seeklogo.com/images/C/chiliz-chz-logo-605C6C40F6-seeklogo.com.png',
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

const alfajores = {
  id: 44787, 
  name: 'Alfajores',
  iconUrl: 'https://cryptologos.cc/logos/celo-celo-logo.png?v=029',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Alfajores', symbol: 'CELO', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://alfajores-forno.celo-testnet.org	'] },
  },
  blockExplorers: {
    default: { name: 'CeloScan', url: 'https://alfajores.celoscan.io' },
  },
  contracts: {},
} as const satisfies Chain;


const config = getDefaultConfig({
  appName: 'Chipz',
  projectId: '80b20ac8262281b421d6684fc3857b5d',
  chains: [chiliz, alfajores],
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [isCelo, setIsCelo ] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMiniPay) {
      setIsCelo(true);
    }
  }, []);
  if (!isCelo) {
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
  else {
    return (
      <>
      <QueryClientProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </QueryClientProvider>
      </>
    )
  }
}

export default MyApp;

declare global {
    interface Window {
        ethereum?: any;
    }
}