import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { Buffer } from 'buffer';
import { isLocal, isTesting } from '@utils';
import { PUBLIC_SOLANA_RPC_KEY } from '$env/static/public';

export const getTokenBalance = async (
	isSolanaNativeToken: any,
	connection: any,
	userTokenAddress: any
) => {
	try {
		if (isSolanaNativeToken) {
			return await connection.getBalance(userTokenAddress);
		} else {
			return (await connection.getTokenAccountBalance(userTokenAddress))
				?.value?.amount;
		}
	} catch (e: any) {
		if (e?.message && e.message.includes('could not find account')) {
			return '0';
		}
		throw new Error('Unable to fetch balance. Please try again.');
	}
};

export const getTokenDecimals = async (
	PublicKey,
	connection,
	tokenMintAddress
) => {
	try {
		const tokenInfo = await connection.getParsedAccountInfo(
			new PublicKey(tokenMintAddress)
		);

		const decimals = tokenInfo?.value?.data?.parsed.info.decimals as number;
		return decimals;
	} catch (e) {
		if (isTesting) {
			throw new Error('Unable to get token Decimals. Please try again.');
		}
		console.log('getTokenDecimals failed:', e);
		throw new Error('Unable to get token Decimals. Please try again.');
	}
};

export const generateKeyPair = async () => {
	const keyPair = nacl.box.keyPair();
	const publicKey = keyPair.publicKey;
	const secretKey = keyPair.secretKey;
	return { keyPair, publicKey, secretKey };
};

export const createSharedSecretKey = (
	public_key: string,
	secretKey: Uint8Array
) => {
	try {
		const sharedSecretKey = nacl.box.before(
			bs58.decode(public_key.toString()),
			secretKey
		);
		return sharedSecretKey;
	} catch (e) {
		console.log('createSharedSecretKey failed', e);
		throw new Error('Unable to establish connection. Please try again.');
	}
};

export const decryptPayload = (
	data: string,
	nonce: string,
	sharedSecret: Uint8Array
) => {
	try {
		if (!sharedSecret) {
			throw new Error('missing shared secret');
		}

		const decryptedData = nacl.box.open.after(
			bs58.decode(data),
			bs58.decode(nonce),
			sharedSecret
		);
		if (!decryptedData) {
			throw new Error('Unable to decrypt data');
		}
		return JSON.parse(Buffer.from(decryptedData).toString('utf8'));
	} catch (e) {
		console.log('createSharedSecretKey failed', e);
		throw new Error('Unable to decrypt data. Please try again.');
	}
};

export const encryptPayload = (payload: any, sharedSecret: Uint8Array) => {
	try {
		const nonce = nacl.randomBytes(24);
		const encryptedPayload = nacl.box.after(
			Buffer.from(JSON.stringify(payload)),
			nonce,
			sharedSecret
		);
		return { nonce, encryptedPayload };
	} catch (e) {
		console.log('encryptPayload failed', e);
		throw new Error('Unable to encrypt data. Please try again.');
	}
};

const convertToCorrectDataType = (PublicKey: any, instructions: any) => {
	instructions.programId = new PublicKey(instructions.programId);
	instructions.data = new Uint8Array(instructions.data);

	for (let i = 0; i < instructions.keys.length; i++) {
		instructions.keys[i].pubkey = new PublicKey(
			instructions.keys[i].pubkey
		);
	}

	return instructions;
};

export const createSolanaTxObj = async (
	PublicKey: any,
	Transaction: any,
	SystemProgram: any,
	userSolanaWalletAddress: any,
	connection: any,
	tokenAmount: any,
	transferInstruction: any,
	isSolanaNativeToken: any,
	depositTokenAddress: any,
	depositPubAddress: any
) => {
	let transaction;
	if (isSolanaNativeToken) {
		transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: userSolanaWalletAddress,
				toPubkey: new PublicKey(depositPubAddress),
				lamports: tokenAmount,
			})
		);
	} else {
		if (await connection.getAccountInfo(depositTokenAddress)) {
			transaction = new Transaction().add(
				convertToCorrectDataType(PublicKey, transferInstruction[1])
			);
		} else {
			transaction = new Transaction().add(
				convertToCorrectDataType(PublicKey, transferInstruction[0]),
				convertToCorrectDataType(PublicKey, transferInstruction[1])
			);
		}
	}

	transaction.feePayer = userSolanaWalletAddress;
	transaction.recentBlockhash = (
		await connection.getLatestBlockhash()
	)?.blockhash;
	return transaction;
};

export const checkDevMode = (coinCode: string, tokenAddress: string) => {
	let tokenMintAddress, network;
	if (isLocal) {
		if (!['SOL', 'USDC'].includes(coinCode?.toUpperCase())) {
			throw new Error('token not suported for development');
		}

		//usdc dev token address
		tokenMintAddress = '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU';

		network = 'https://api.devnet.solana.com';
	} else {
		tokenMintAddress = tokenAddress;

		// read about solana rpc here: https://solana.com/rpc
		network = PUBLIC_SOLANA_RPC_KEY;
	}
	return { tokenMintAddress, network };
};
