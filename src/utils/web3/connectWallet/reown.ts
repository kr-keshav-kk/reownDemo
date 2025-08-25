import { reownModal } from "@lib/reown";
// import { walletButtonDetails } from "@store";
import { get } from "svelte/store";
import { walletButton } from "@lib/reown";

const getReownChainName = (chainType: number) => {
  if (chainType === 4) {
    return "solana";
  } else if (chainType === 10002) {
    return "bip122";
  } else {
    return "eip155";
  }
};
export const getReownWeb = async (chainType: number) => {
  try {
    await reownModal?.disconnect();

    console.log("getReownChainName(chainType)", getReownChainName(chainType));
    await reownModal?.open({
      view: "Connect",
      namespace: getReownChainName(chainType),
    });
  } catch (e: any) {
    console.log("e", e);
  }
};

export const connectWalletButton = async (walletName: string) => {
  await walletButton.connect(walletName);
};

// export const connectEthButton = async () => {
//   await walletButton.connect("eip155");
// };
