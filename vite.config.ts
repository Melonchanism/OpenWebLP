import { SvelteKitPWA } from "@vite-pwa/sveltekit"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA()],
	logLevel: "error",
	server: {
		open: true,
	},
})
