import { get } from "svelte/store";

import {
  resetWalletStatus,
  setWalletStatus,
} from "@store/actions/walletStatus";
import { reownModal } from "@lib/reown";

import { disconnectReown } from "@utils/web3/reown";

export const disconnectWallet = (currentWalletType: number) => {
  try {
    if (reownModal) {
      disconnectReown();
    }

    resetWalletStatus();
  } catch (e: any) {
    console.log("unable to disconnect");
  }
};

export const walletType: { [key: number]: string } = {
  1001: "cede",
  1002: "mesh",
  100: "evm",
  101: "centralized",
  102: "tron",
  104: "phantom",
  105: "solflare",
  106: "reown Evm",
  107: "coinbase Solana",
  108: "reown solana",
  109: "stellar",
  110: "bitcoin",
  112: "ton",
  1: "binance",
  2: "kucoin",
  5: "mexc",
  6: "bitget",
  14: "bybit",
  16: "onramper",
};
