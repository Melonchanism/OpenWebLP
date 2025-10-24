import adapter from "@sveltejs/adapter-vercel"
import { sveltePreprocess } from "svelte-preprocess"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
			prependData: `@use "src/styles.scss" as *;`,
		},
	}),
	kit: {
		adapter: adapter(),
	},
	onwarn: (warning, handler) => {
		const { code } = warning
		if (code === "css_unused_selector") {
			return
		}

		handler(warning)
	},
}

export default config
