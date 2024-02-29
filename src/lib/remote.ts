import { writable } from "svelte/store";

export let remote = writable({
  enabled: false,
  code: "",
});
