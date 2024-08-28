import { SvelteKitPWA } from "@vite-pwa/sveltekit"
import { defineConfig } from "vite"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: "autoUpdate",
			injectRegister: "auto",

			pwaAssets: {
				disabled: false,
				config: true,
			},

			manifest: {
				name: "OpenWebLP v3.2",
				short_name: "OpenWebLP",
				theme_color: "#000000",
			},

			workbox: {
				globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,

				runtimeCaching: [
					{
						urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
						handler: "CacheFirst",
						options: {
							cacheName: "bootstrap-icons-cache",
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},

			devOptions: {
				enabled: false,
				suppressWarnings: true,
				type: "module",
			},
		}),
	],
	server: {
		open: true,
	},
})
