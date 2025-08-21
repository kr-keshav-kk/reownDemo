import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const walletStatus = writable({
  connected: false,
  provider: null,
  providerType: null,
  signer: null,
  signerAddress: "",
  wallet: null,
  chainId: null,
  chainData: null,
  caipNetworkId: "",
  caipNetwork: null,
  isAuthenticated: false,
  walletType: null,
  walletName: null,
  chainType: null,
});

export const auxWalletStatus = writable({
  connected: false,
  provider: null,
  providerType: null,
  signer: null,
  signerAddress: "",
  wallet: null,
  chainId: null,
  chainData: null,
  caipNetworkId: "",
  caipNetwork: null,
  isAuthenticated: false,
  walletType: null,
  walletName: null,
  chainType: null,
});

export const setWalletStatus = (data: any, auxWallet: boolean = false) => {
  if (auxWallet) {
    auxWalletStatus.update((n) => ({ ...n, ...data }));
  } else {
    walletStatus.update((n) => ({ ...n, ...data }));
  }
};

export const resetWalletStatus = (auxWallet: boolean = false) => {
  if (auxWallet) {
    auxWalletStatus.update(() => ({
      connected: false,
      provider: null,
      providerType: null,
      signer: null,
      signerAddress: "",
      wallet: null,
      chainId: null,
      chainData: null,
      caipNetworkId: "",
      caipNetwork: null,
      isAuthenticated: false,
      walletType: null,
      walletName: null,
      chainType: null,
    }));
  } else {
    walletStatus.update(() => ({
      connected: false,
      provider: null,
      providerType: null,
      signer: null,
      signerAddress: "",
      wallet: null,
      chainId: null,
      chainData: null,
      caipNetworkId: "",
      caipNetwork: null,
      isAuthenticated: false,
      walletType: null,
      walletName: null,
      chainType: null,
    }));
  }
};
