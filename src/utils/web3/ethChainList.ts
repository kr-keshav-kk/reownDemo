import { defineChain } from 'viem';
export * from 'viem/chains';

export const nfbc = defineChain({
	id: 632,
	name: 'NFBChain',
	nativeCurrency: {
		decimals: 18,
		name: 'NFB Token',
		symbol: 'NFBC',
	},
	rpcUrls: {
		default: { http: ['https://node.nfbchain.com'] },
	},
});

export const nrk = defineChain({
	id: 81041,
	name: 'NRK Mainnet',
	nativeCurrency: {
		decimals: 18,
		name: 'NRK',
		symbol: 'NRK',
	},
	rpcUrls: {
		default: { http: ['https://mainnet-rpc.nordekscan.com'] },
	},
	blockExplorers: {
		default: { name: 'NordekScan', url: 'https://nordekscan.com/' },
	},
});

export const vyvo = defineChain({
	id: 8889,
	name: 'Vyvo Smart Chain',
	nativeCurrency: {
		decimals: 18,
		name: 'Vyvo Coin',
		symbol: 'VSC',
	},
	rpcUrls: {
		default: { http: ['https://vsc-dataseed.vyvo.org:8889'] },
	},
	blockExplorers: {
		default: { name: 'Vyvo Explorer', url: 'https://www.vscscan.org' },
	},
});

export const smartEnergyChain = defineChain({
	id: 19516,
	name: 'Smart Energy Chain',
	nativeCurrency: {
		decimals: 18,
		name: 'Smart Energy Token',
		symbol: 'SEP',
	},
	rpcUrls: {
		default: { http: ['https://rpc.secexplorer.io/'] },
	},
	blockExplorers: {
		default: {
			name: 'Smart Energy Explorer',
			url: 'https://secexplorer.io',
		},
	},
});

export const lisk = defineChain({
	id: 1135,
	name: 'Lisk',
	nativeCurrency: {
		decimals: 18,
		name: 'Ethereum',
		symbol: 'ETH',
	},
	rpcUrls: {
		default: { http: ['https://rpc.api.lisk.com/'] },
	},
	blockExplorers: {
		default: {
			name: 'Lisk Explorer',
			url: 'https://blockscout.lisk.com',
		},
	},
});

export const bscTestnet = defineChain({
	id: 97,
	name: 'BNB Smart Chain Testnet',
	nativeCurrency: {
		decimals: 18,
		name: 'tBNB',
		symbol: 'tBNB',
	},
	rpcUrls: {
		default: {
			http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
		},
		public: {
			http: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
		},
	},
	blockExplorers: {
		default: {
			name: 'BscScan Testnet',
			url: 'https://testnet.bscscan.com',
			apiUrl: 'https://api-testnet.bscscan.com/api',
		},
	},
	testnet: true,
});
