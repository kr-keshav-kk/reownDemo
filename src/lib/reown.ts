import { PUBLIC_WALLET_CONNECT_ID } from "$env/static/public";
import { AppKit, createAppKit } from "@reown/appkit";
import type { Provider } from "@reown/appkit-utils/solana";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { solana, bitcoin } from "@reown/appkit/networks";
import { BitcoinAdapter } from "@reown/appkit-adapter-bitcoin";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { createAppKitWalletButton } from "@reown/appkit-wallet-button";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { mainnet, arbitrum, bsc, polygon } from "@reown/appkit/networks";

import { setWalletStatus } from "@store/actions/walletStatus";

import { getChainDataByChainId, modifyRpcUrl } from "@utils/web3/evm";

import { type Chain } from "viem";

interface IProvider extends Provider {
  imageUrl?: string;
}

let modal: AppKit | undefined;
let walletProvider: IProvider | undefined;
let unsubActiveCaipNetwork: (() => void) | undefined;
let unsubProviderStore: (() => void) | undefined;
let unsubAccountStore: (() => void) | undefined;
let unsubscribeAll: (() => void) | null = null;
let currentChainId: number = 1; // Default to Ethereum mainnet
let sol: Chain | undefined;
let btc: Chain | undefined;

let prevChainType: number | null = null;
let walletButton = null;

const decideWalletType = (chainType: number): string | null => {
  if (chainType === 0) {
    return "evm";
  } else if (chainType === 4) {
    return "sol";
  } else if (chainType === 10002) {
    return "btc";
  }
  return null;
};

const projectId = PUBLIC_WALLET_CONNECT_ID;

// 2. Create a metadata object - optional
const metadata = {
  name: "Onramp Money",
  description: "",
  url: "https://onramp.money", // origin must match your domain & subdomain
  icons: ["https://onramp.money/assets/favicon.png"],
};

const targetNetworks = [bsc, polygon];

// const allChainsArray = Object.values(allChains);
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: targetNetworks,
});

// 3. Create modal
// Modal should never be re-initialized
modal = createAppKit({
  // adapters: [new EthersAdapter(), solanaWeb3JsAdapter, bitcoinAdapter],
  adapters: [wagmiAdapter],
  networks: [...targetNetworks],

  // networks: [mainnet],
  metadata: metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    email: false,
    onramp: false,
    swaps: false,
  },
  enableReconnect: false,
  enableWalletConnect: true, // disables QR code
});

const initModal = async (chainId: number, chainType: number): Promise<void> => {
  try {
    currentChainId = chainId;
    prevChainType = chainType;
    let targetNetworkData: Chain | undefined;

    const walletType = decideWalletType(prevChainType);
    if (walletType === "evm") {
      targetNetworkData = getChainDataByChainId(chainId);
      modifyRpcUrl(targetNetworkData);
    }

    if (walletType === "evm") {
      walletButton = createAppKitWalletButton({ namespace: "eip155" });
    } else if (walletType === "sol") {
      walletButton = createAppKitWalletButton({ namespace: "solana" });
    }

    if (targetNetworkData) {
      if (targetNetworkData.id === polygon.id) {
        modal?.removeNetwork("eip155", bsc.id);
        await modal?.switchNetwork(polygon);
      }
      if (targetNetworkData.id === bsc.id) {
        modal?.removeNetwork("eip155", polygon.id);
        await modal?.switchNetwork(bsc);
      }
    }

    // else if (walletType === 'btc') {
    // 	walletButton = createAppKitWalletButton({ namespace: 'bip122' });
    // }
  } catch (e) {
    console.log("e", e);
  }
};

// Initialize the network store
const initNetworkCoreStore = (): void => {
  unsubActiveCaipNetwork = modal?.subscribeNetwork((network) => {
    console.log("network", network);
    setWalletStatus({
      caipNetwork: network?.caipNetwork,
      caipNetworkId: network?.caipNetworkId,
      chainId: network?.chainId,
      chainData: {
        chain: network?.caipNetwork?.name,
        chainId: network?.chainId,
        name: network?.caipNetwork?.name,
        nativeCurrency: network?.caipNetwork?.nativeCurrency,
        networkId: network?.caipNetworkId,
        title: network?.caipNetwork?.name,
      },
    });
    const isSupportedNetwork =
      network?.chainId?.toString() === currentChainId.toString();
    if (isSupportedNetwork) {
      modal?.close();
    }

    // if (network?.caipNetwork?.name === "Unknown Network") {
    //   const targetNetworkData = returnNetworkByChainType(0, currentChainId);
    //   modal?.switchNetwork(targetNetworkData);
    // }
  });
};

const initAccountStore = (): void => {
  unsubAccountStore = modal?.subscribeAccount((account) => {
    setWalletStatus({
      signerAddress: account.address,
      connected: account.isConnected,
    });
  });
};

const initProviderStore = (): void => {
  unsubProviderStore = modal?.subscribeProviders((providers) => {
    const walletType = decideWalletType(prevChainType || 0);
    if (walletType === "evm") {
      walletProvider = providers["eip155"] as IProvider;
    } else if (walletType === "sol") {
      walletProvider = providers["solana"] as IProvider;
    } else if (walletType === "btc") {
      walletProvider = providers["bip122"] as IProvider;
    }

    const walletName = modal?.getWalletInfo()?.name;
    setWalletStatus({
      provider: walletProvider,
      walletName,
    });
  });
};

const removeOldChain = (prevChainType: number): void => {
  const walletType = decideWalletType(prevChainType);
  if (walletType === "evm") {
    modal?.removeNetwork("eip155", currentChainId);
  } else if (walletType === "sol") {
    modal?.removeNetwork("solana", "solana");
  } else if (walletType === "btc") {
    modal?.removeNetwork("bip122", "bip122");
  }
};

const addNewChain = (chainType: number, targetNetworkData: Chain): void => {
  const walletType = decideWalletType(chainType);
  if (walletType === "evm") {
    modal?.addNetwork("eip155", targetNetworkData);
  } else if (walletType === "sol") {
    modal?.addNetwork("solana", targetNetworkData);
  } else if (walletType === "btc") {
    modal?.addNetwork("bip122", targetNetworkData);
  }
};

const returnNetworkByChainType = (
  chainType: number,
  chainId: number
): Chain => {
  const walletType = decideWalletType(chainType);
  if (walletType === "evm") {
    const targetNetworkData = getChainDataByChainId(chainId);
    // modifyRpcUrl(targetNetworkData);
    return targetNetworkData;
  } else if (walletType === "sol") {
    return solana;
  } else {
    return bitcoin;
  }
};

const reownInit = async (chainId: number, chainType: number): void => {
  try {
    console.log("chainid", chainId, chainType);
    const isChainTypeChanged = chainType !== prevChainType;
    if (isChainTypeChanged) {
      modal?.disconnect();
    }
    await initModal(chainId, chainType);

    initNetworkCoreStore();
    initProviderStore();
    initAccountStore();

    unsubscribeAll = () => {
      unsubActiveCaipNetwork?.();
      unsubProviderStore?.();
      unsubAccountStore?.();
    };
  } catch (e) {}
};

export {
  reownInit,
  unsubscribeAll as unsubscribeReown,
  modal as reownModal,
  currentChainId,
  walletButton,
};
