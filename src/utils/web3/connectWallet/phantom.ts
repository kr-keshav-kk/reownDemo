import { get } from 'svelte/store';
import bs58 from 'bs58';
import type { BoxKeyPair } from 'tweetnacl';
import { page } from '$app/state';
import { base } from '$app/paths';
import { setWalletStatus } from '@store/actions/walletStatus';
import { userSessionData, appData, deepLinkUrl } from '@store';
import { setWalletSessionStatus as setPhantomSessionStatus } from '@store/actions/walletStatus';
import { setDeepLinkUrl } from '@store/actions/utility';
import { setUserSessionData } from '@store/actions/config';
import { getProperty, setProperty } from '@apis';
import { PollingHandler, getErrorMessage, setLS } from '@utils';
import { logEvent } from '@utils/analytics';
import { isAppLoadedInIframe } from '@utils/params';

let publicKey: Uint8Array | BoxKeyPair;
let secretKey: Uint8Array;
let unsubscribe: () => void;

let generateKeyPair: () => Promise<{
		publicKey: Uint8Array;
		secretKey: Uint8Array;
	}>,
	createSharedSecretKey: (
		publicKey: string | Uint8Array,
		secretKey: Uint8Array
	) => Uint8Array,
	decryptPayload: (
		data: string,
		nonce: string,
		sharedSecretKey: Uint8Array
	) => any;

const updatePhantomState = (provider: any) => {
	setWalletStatus({
		connected: true,
		signerAddress: provider.publicKey.toString(),
		provider: provider,
		chainId: 4,
		chainData: {
			chain: 'SPL Mainnet',
			chainId: 4,
			name: 'SPL Mainnet',
			nativeCurrency: { name: 'Solana', symbol: 'SPL', decimals: 9 },
			networkId: 4,
			title: 'SPL Mainnet',
		},
		walletName: 'phantom',
	});
};

export const getPhantomWeb = async () => {
	try {
		let currWindow: Window = window;
		if (isAppLoadedInIframe()) {
			currWindow = window.parent;
		}

		if ('phantom' in currWindow) {
			const provider = (
				currWindow.phantom as {
					solana: {
						isPhantom?: boolean;
						connect: () => Promise<void>;
					};
				}
			)?.solana;
			if (provider?.isPhantom) {
				await provider?.connect();
				updatePhantomState(provider);
			}
		} else {
			throw new Error('Please install Phantom Extension!');
		}
	} catch (e: any) {
		throw new Error(getErrorMessage(e, 'Please try again'));
	}
};

const setWalletSessionStatus = async (receivedObject) => {
	const { PublicKey } = await import('@solana/web3.js');

	const sharedSecretKey = createSharedSecretKey(
		receivedObject?.public_key,
		secretKey
	);

	const decryptedData = decryptPayload(
		receivedObject?.data,
		receivedObject?.nonce,
		sharedSecretKey
	);

	setPhantomSessionStatus({
		wallet_encryption_public_key: receivedObject?.public_key,
		nonce: receivedObject?.nonce,
		sharedSecret: sharedSecretKey,
		session: decryptedData?.session,
		secretKey,
	});

	setWalletStatus({
		connected: true,
		signerAddress: decryptedData.public_key,
		provider: {
			publicKey: new PublicKey(decryptedData.public_key),
		},
		chainId: 4,
		chainData: {
			chain: 'SPL Mainnet',
			chainId: 4,
			name: 'SPL Mainnet',
			nativeCurrency: {
				name: 'Solana',
				symbol: 'SPL',
				decimals: 9,
			},
			networkId: 4,
			title: 'SPL Mainnet',
		},
		walletType: 104,
	});
};

const getWalletStatus = async () => {
	try {
		const url = new URL(get(deepLinkUrl));

		const public_key = url.searchParams.get(
			`phantom_encryption_public_key`
		);
		const nonce = url.searchParams.get('nonce');
		const data = url.searchParams.get('data');

		if (!public_key || !nonce || !data) {
			throw new Error('Unable to connect to Phantom wallet');
		}

		const receivedObject = {
			public_key,
			nonce,
			data,
		};

		await setWalletSessionStatus(receivedObject);
	} catch (e) {
		console.log('e', e);
		throw e;
	} finally {
		unsubscribe?.();
		setDeepLinkUrl('');
	}
};

const pollPhantomAppState = async (
	resolvePolling: () => void,
	rejectPolling: (error: string) => void,
	poller: PollingHandler
) => {
	try {
		const params = new URLSearchParams();
		params.append('property', 'phantomData');
		const { status, data } = await getProperty(params);

		if (status === 1 && data?.phantomData) {
			poller.endPolling();

			const receivedObject = data?.phantomData;
			await setWalletSessionStatus(receivedObject);
			resolvePolling();
		} else {
			if (poller.getRetryLimit()) {
				poller.markFnCompletion();
			} else {
				throw new Error('Please try again');
			}
		}
	} catch (e: any) {
		rejectPolling(getErrorMessage(e, 'Reload & try again!'));
	}
};

export const connectPhantomAppWallet = async (pollerWrapper: {
	poller: PollingHandler | null;
}) => {
	try {
		let resolvePolling: (value?: unknown) => void;
		let rejectPolling: (reason?: any) => void;

		const pollerPromise = new Promise((resolve, reject) => {
			resolvePolling = resolve;
			rejectPolling = reject;
		});

		({ generateKeyPair, createSharedSecretKey, decryptPayload } =
			await import('@utils/web3/solana'));

		({ publicKey, secretKey } = await generateKeyPair());
		setPhantomSessionStatus({ dapp_encryption_public_key: publicKey });

		//deep link
		if (get(appData).appId === 360602) {
			unsubscribe = deepLinkUrl.subscribe(async (url) => {
				try {
					if (url && url.includes('wallet-connect')) {
						await getWalletStatus();
						resolvePolling();
					}
				} catch {
					rejectPolling();
				}
			});

			const redirect_link = `${page.url.origin}${base}/no-redirect/wallet-connect?hashBody=${get(userSessionData).hashBody}&payload=${get(userSessionData).payload}`;
			const connectionParams = new URLSearchParams({
				dapp_encryption_public_key: bs58.encode(publicKey),
				cluster:
					import.meta.env.MODE === 'development'
						? 'devnet'
						: 'mainnet-beta',
				app_url: 'https://onramp.money',
				redirect_link,
			});
			const appLink = `https://phantom.app/ul/v1/connect?${connectionParams.toString()}`;

			window.open(appLink, '_top');
			await pollerPromise;
			return;
		}

		pollerWrapper.poller = new PollingHandler({
			fn: () => {
				pollPhantomAppState(
					resolvePolling,
					rejectPolling,
					pollerWrapper.poller as PollingHandler
				);
			},
			interval: 2500,
			retryLimit: 120,
		});

		const params = new URLSearchParams();
		params.append(
			'property',
			JSON.stringify({
				phantomData: null,
			})
		);
		const { status, data, error } = await setProperty(params);

		logEvent('phantom_app_polling', {
			status: 'tried',
			page: 'wallet_connect',
		});

		if (status === 1) {
			setUserSessionData(data);
			const redirect_link = `${page.url.origin}${base}/walletConnect/phantom/?appId=1&hashBody=${get(userSessionData).hashBody}&payload=${get(userSessionData).payload}`;
			const connectionParams = new URLSearchParams({
				dapp_encryption_public_key: bs58.encode(publicKey),
				cluster:
					import.meta.env.MODE === 'development'
						? 'devnet'
						: 'mainnet-beta',
				app_url: 'https://onramp.money',
				redirect_link,
			});
			const appLink = `https://phantom.app/ul/v1/connect?${connectionParams.toString()}`;

			if (typeof localStorage !== 'undefined') {
				setLS('hashBody', get(userSessionData)?.hashBody);
			}

			window.open(appLink, '_top');

			pollerWrapper?.poller?.startPolling();
			await pollerPromise;

			logEvent('phantom_app_polling', {
				status: 'success',
				page: 'wallet_connect',
			});
		} else {
			throw new Error(error);
		}
	} catch (e: any) {
		logEvent('phantom_app_polling', {
			status: 'failed',
			page: 'wallet_connect',
			error: e?.message ?? JSON.stringify(e) ?? e,
		});
		throw new Error(getErrorMessage(e, 'Reload & try again!'));
	}
};
