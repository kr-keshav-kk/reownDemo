<script lang="ts">
	import { reownInit, unsubscribeReown } from '@lib/reown';
	import { getReownWeb,connectWalletButton } from '@utils/web3/connectWallet/reown';
	import { disconnectWallet } from '@utils/web3/params';
	import { walletStatus } from '@store/actions/walletStatus';

	let currChainType = 0;
		// let unsubscribeReown;
	const connectWalletInit = async (chainId,chainType) => {
		// const chainId = 56;
		// const { reownInit, unsubscribeReown: unsubReown } = await import(
		// 	'@lib/reown'
		// );
		currChainType = chainType;
		// unsubscribeReown = unsubReown;
		if (unsubscribeReown) {
			unsubscribeReown();
		}

		reownInit(chainId, chainType);		
	};

	const openReownModal = async()=>{
        console.log("openReownModal");
        console.log("currChainType", currChainType);
		await getReownWeb(currChainType);
	}


</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <div class="wallet-controls">
        <button class="init-btn" onclick={()=>{connectWalletInit(56,0)}}>
            Init reown wallet with evm
        </button>

        <button class="init-btn" onclick={()=>{connectWalletInit(-1,4)}}>
            Init reown wallet with solana
        </button>

        <button class="modal-btn" onclick={()=>{openReownModal()}}>
            Reown modal display
        </button>

        <button class="wallet-btn" onclick={()=>{connectWalletButton('metamask')}}>
            metamask Button
        </button>

        <button class="wallet-btn" onclick={()=>{connectWalletButton('phantom')}}>
            solana button
        </button>

        <button class="disconnect-btn" onclick={()=>{disconnectWallet(currChainType)}}>
            disconnect
        </button>
    </div>
	
	wallet address: {$walletStatus.signerAddress}<br>
    chain: {$walletStatus.chainData?.chain}<br>
    chain id: {$walletStatus.chainData?.chainId}<br>

</section>

<style>

	   .wallet-controls {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            padding: 20px;
            max-width: 600px;
        }

        button {
            padding: 10px 16px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #fff;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }

        button:hover {
            background: #f5f5f5;
            border-color: #999;
        }

        button:active {
            transform: translateY(1px);
        }

        .init-btn {
            background: #e3f2fd;
            border-color: #2196f3;
        }

        .wallet-btn {
            background: #e8f5e8;
            border-color: #4caf50;
        }

        .disconnect-btn {
            background: #ffebee;
            border-color: #f44336;
        }

        .modal-btn {
            background: #fff3e0;
            border-color: #ff9800;
        }

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
