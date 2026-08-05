import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({ script: true }),
	kit: {
		adapter: adapter(),
	},
	onwarn: (warning, handler) => {
		const { code } = warning
		if (code === "css_unused_selector" || code === "a11y_missing_content") {
			return
		}

		handler(warning)
	},
}

export default config
