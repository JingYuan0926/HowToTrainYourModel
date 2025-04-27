import { injected, walletConnect } from '@wagmi/connectors';
import { createConfig, http, reconnect } from '@wagmi/core';
import { nearTestnet, mainnet } from 'viem/chains';
import { createWeb3Modal } from '@web3modal/wagmi';

// Chains for EVM Wallets
export const evmWalletChains = {
  mainnet: {
    chainId: 397,
    name: 'Near Mainnet',
    explorer: 'https://eth-explorer.near.org',
    rpc: 'https://eth-rpc.mainnet.near.org',
  },
  testnet: {
    chainId: 398,
    name: 'Near Testnet',
    explorer: 'https://eth-explorer-testnet.near.org',
    rpc: 'https://eth-rpc.testnet.near.org',
  },
};

// Get your projectId at https://cloud.reown.com
const projectId = '5bb0fe33763b3bea40b8d69e4269b4ae';

// Create a custom NEAR testnet chain for wagmi
const nearEvmTestnet = {
  ...nearTestnet,
  id: 398,
  name: 'Near Testnet',
  rpcUrls: {
    default: { http: ['https://eth-rpc.testnet.near.org'] },
    public: { http: ['https://eth-rpc.testnet.near.org'] },
  },
  blockExplorers: {
    default: { name: 'Near Explorer', url: 'https://eth-explorer-testnet.near.org' },
  }
};

// Create a custom NEAR mainnet chain for wagmi
const nearEvmMainnet = {
  ...mainnet,
  id: 397,
  name: 'Near Mainnet',
  rpcUrls: {
    default: { http: ['https://eth-rpc.mainnet.near.org'] },
    public: { http: ['https://eth-rpc.mainnet.near.org'] },
  },
  blockExplorers: {
    default: { name: 'Near Explorer', url: 'https://eth-explorer.near.org' },
  }
};

// Select the appropriate chain based on the network ID
const currentChain = process.env.NEXT_PUBLIC_NETWORK_ID === 'mainnet' ? nearEvmMainnet : nearEvmTestnet;

export const wagmiConfig = createConfig({
  chains: [currentChain],
  transports: { [currentChain.id]: http() },
  connectors: [
    walletConnect({ projectId, showQrModal: false }),
    injected({ shimDisconnect: true })
  ],
});

// Preserve login state on page reload
reconnect(wagmiConfig);

// Modal for login
export const web3Modal = createWeb3Modal({ 
  wagmiConfig, 
  projectId,
  // Disable auto-connect which can trigger network switching
  autoConnect: false,
  // Don't check network initially
  enableNetworkView: false,
  // Don't auto-open the network switch modal
  enableNetworkSwitching: false,
  // Only enable when explicitly interacted with
  includeWalletIds: [],
  featuredWalletIds: []
}); 