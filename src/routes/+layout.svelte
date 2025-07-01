<script>
  import "../styles.css"
  import { onMount } from "svelte"
  import { settings, defaultSettings } from "$lib/localStorage"
  let { children } = $props()

  // Get settings to sync
  onMount(() => {
    $settings = JSON.parse(localStorage["settings"] ?? JSON.stringify(defaultSettings))
    settings.subscribe((val) => (localStorage["settings"] = JSON.stringify(val)))
  })
</script>

<svelte:window
  onstorage={(evt) => {
    if (evt.key === "settings") {
      $settings = JSON.parse(localStorage["settings"])
    }
  }}
/>

{@render children()}
