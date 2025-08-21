import { reownModal } from "@lib/reown";

export const disconnectReown = async () => {
  try {
    await reownModal?.disconnect();
  } catch (error) {
    // sentryLogEvent(error as Error);
    console.log("disconnectWallet", error);
  }
};
