import { cubicInOut } from "svelte/easing";
import { crossfade } from "svelte/transition";

const [send, recieve] = crossfade({
  duration: 400,
  easing: cubicInOut,
});
export { send, recieve }