import * as chains from './ethChainList';


// import { PUBLIC_ETH_RPC } from '$env/static/public';
import { type Chain } from 'viem';

const bscRpc = 'https://bsc-dataseed.binance.org/';

export const getChainDataByChainId = (
	targetNetwork: number
): Chain | undefined => {
	const targetNetworkData = Object.values(chains || {}).find(
		(chain) => chain.id === targetNetwork
	);
	return targetNetworkData;
};

export const modifyRpcUrl = (network: Chain) => {
	//for eth we are using INFURA's rpc
	// if (
	// 	network.id === 1 &&
	// 	network?.rpcUrls?.default?.http[0] !== PUBLIC_ETH_RPC
	// ) {
	// 	network.rpcUrls.default.http.unshift(PUBLIC_ETH_RPC);
	// }

	// if (network.id === 56 && network?.rpcUrls?.default?.http[0] !== bscRpc) {
	// 	network.rpcUrls.default.http.unshift(bscRpc);
	// }
};

// export const isMetamaskMobile = () => {
// 	const isMobile = isDeviceMobile();
// 	return isMobile && !!window.ethereum?.isMetaMask;
// };
