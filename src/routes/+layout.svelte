<script>
import { onMount } from 'svelte';
import './styles.css';
onMount(() => {
  !localStorage.getItem("settings") ? localStorage.setItem("settings", JSON.stringify(
    {
      crossfade: "normal",
      displayfontsize: "7vh",
    })
  ) : null;
})
</script>

<slot />