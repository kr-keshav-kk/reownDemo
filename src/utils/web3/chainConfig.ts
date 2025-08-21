export const chainConfig = {
	0: {
		chainSymbol: 'erc20',
		chainName: 'Ethereum Network',
		networkId: 1,
		nativeToken: 6,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	1: {
		chainSymbol: 'bep20',
		chainName: 'Binance Smart Chain',
		networkId: 56,
		nativeToken: 72,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 15,
		},
		onramp: {
			avgTrxTime: 15,
		},
	},
	2: {
		chainSymbol: 'trc20',
		chainName: 'TRC20 Token Standard',
		networkId: -1,
		nativeToken: 16,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 15,
		},
		onramp: {
			avgTrxTime: 15,
		},
	},
	3: {
		chainSymbol: 'matic20',
		chainName: 'Polygon Mainnet',
		networkId: 137,
		nativeToken: 692,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	4: {
		chainSymbol: 'spl',
		chainName: 'Solana Program Library Network',
		networkId: -1,
		nativeToken: 138,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 15,
		},
		onramp: {
			avgTrxTime: 15,
		},
	},
	5: {
		chainSymbol: 'bep2',
		chainName: 'Binance Chain',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	7: {
		chainSymbol: 'nep5',
		chainName: 'NEO Enhancement Protocol',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	8: {
		chainSymbol: 'eos',
		chainName: 'EOS',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	9: {
		chainSymbol: 'klay',
		chainName: 'Klaytn Protocol',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10: {
		chainSymbol: 'matic20-test',
		chainName: 'Polygon Test',
		confirmations: 30,
		nativeToken: 83,
		networkId: 80001,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	11: {
		chainSymbol: 'okc',
		chainName: 'OKXChain Mainnet',
		networkId: -1,
		nativeToken: -1,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	12: {
		chainSymbol: 'wemix 3.0',
		chainName: 'WEMIX 3.0',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	13: {
		chainSymbol: 'arbitrum',
		chainName: 'Arbitrum',
		networkId: 42161,
		nativeToken: 6,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	14: {
		chainSymbol: 'yota',
		chainName: 'Playota',
		confirmations: 30,
		nativeToken: -1,
		networkId: 2222,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	15: {
		chainSymbol: 'ton',
		chainName: 'The Open Network',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	16: {
		chainSymbol: 'base',
		chainName: 'Base',
		nativeToken: 6,
		networkId: 8453,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	17: {
		chainSymbol: 'zkSync Era',
		chainName: 'zkSync Era',
		confirmations: 30,
		nativeToken: 6,
		networkId: -1,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	18: {
		chainSymbol: 'linea',
		chainName: 'linea',
		confirmations: 30,
		nativeToken: 6,
		networkId: -1,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	19: {
		chainSymbol: 'Polygon zkEVM',
		chainName: 'Polygon zkEVM',
		confirmations: 30,
		nativeToken: 6,
		networkId: -1,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10002: {
		chainSymbol: 'btc',
		chainName: 'Bitcoin',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10004: {
		chainSymbol: 'segwitbtc',
		chainName: 'BTC(SegWit)',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10007: {
		chainSymbol: 'xrp',
		chainName: 'XRP Ledger',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10008: {
		chainSymbol: 'neo',
		chainName: 'Neo Legacy',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10009: {
		chainSymbol: 'neo3',
		chainName: 'NEO N3',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10010: {
		chainSymbol: 'xlm',
		chainName: 'Stellar Network',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 15,
		},
		onramp: {
			avgTrxTime: 15,
		},
	},
	10013: {
		chainSymbol: 'optimism',
		chainName: 'Optimism',
		nativeToken: 6,
		networkId: 10,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10014: {
		chainSymbol: 'ltc',
		chainName: 'Litecoin',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10017: {
		chainSymbol: 'doge',
		chainName: 'dogecoin',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10025: {
		chainSymbol: 'ada',
		chainName: 'Cardano',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10037: {
		chainSymbol: 'dot',
		chainName: 'Polkadot',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10042: {
		chainSymbol: 'near',
		chainName: 'NEAR Protocol',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10075: {
		chainSymbol: 'avax',
		chainName: 'Avalanche',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10076: {
		chainSymbol: 'avaxc',
		chainName: 'AVAX C-Chain',
		nativeToken: 275,
		networkId: 43114,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10116: {
		chainSymbol: 'kcc',
		chainName: 'KCC',
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
	10166: {
		chainSymbol: 'NRK',
		chainName: 'NRK',
		nativeToken: 547,
		networkId: 81041,
		offramp: {
			offChainAvgTrxTime: 5,
			onChainAvgTrxTime: 30,
		},
		onramp: {
			avgTrxTime: 30,
		},
	},
};
