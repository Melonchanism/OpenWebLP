<script>
  import "../styles.css"
  import { pwaInfo } from "virtual:pwa-info"
  import { pwaAssetsHead } from "virtual:pwa-assets/head"
  import { onMount } from "svelte"
  import { settings, defaultSettings } from "$lib/localStorage"
  let { children } = $props()

  // Get settings to sync
  onMount(() => {
    $settings = JSON.parse(localStorage["settings"] ?? JSON.stringify(defaultSettings))
    settings.subscribe((val) => (localStorage["settings"] = JSON.stringify(val)))
  })

  let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "")
</script>

<svelte:head>
  {#if pwaAssetsHead.themeColor}
    <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
  {/if}
  {#each pwaAssetsHead.links as link}
    <link {...link} />
  {/each}
  {@html webManifest}
</svelte:head>

<svelte:window
  onstorage={(evt) => {
    if (evt.key === "settings") {
      $settings = JSON.parse(localStorage["settings"])
    }
  }}
/>

{@render children()}
