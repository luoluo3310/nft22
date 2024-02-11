import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Home from './index';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  Locale,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {bsc} from 'wagmi/chains';
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'


// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [bsc],
//   [publicProvider()],
  
// );
const { chains, publicClient } = configureChains(
  [bsc],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://bsc-dataseed1.binance.org/`,
      }),
    }),
  ],
)

const projectId = 'YOUR_PROJECT_ID';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,

});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  return (
    
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider  theme={darkTheme()} appInfo={demoAppInfo} chains={chains} locale={locale}>
      
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
