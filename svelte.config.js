import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@apis': './src/apis',
			'@components': './src/components',
			'@images': './src/images',
			'@lib': './src/lib',
			'@buyScreens': './src/screens/buy',
			'@sellScreens': './src/screens/sell',
			'@enums': './src/utils/enums/index.ts',
			'@checkoutScreens': './src/screens/checkout',
			'@swapScreens': './src/screens/swap',
			'@payScreens': './src/screens/pay',
			'@voucherScreens': './src/screens/vouchers',
			'@cardScreens': './src/screens/card',
			'@store': './src/store',
			'@typings': './src/typings',
			'@utils': './src/utils',
			'@routes': './src/routes',
			'@buyRoutes': './src/routes/main/buy',
			'@sellRoutes': './src/routes/main/sell',
			'@checkoutRoutes': './src/routes/main/checkout',
			'@swapRoutes': './src/routes/main/swap',
			'@voucherRoutes': './src/routes/main/vouchers',
			'@i18n': './src/lib/i18n/i18n-svelte',
			'@resources': './resources',
		},
	}
};

export default config;
