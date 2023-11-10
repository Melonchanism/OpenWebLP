<script>
import { onNavigate } from '$app/navigation';
import './styles.css';
onNavigate(nav => {
	//@ts-expect-error
	if (!document.startViewTransition) return;
	return new Promise(res => {
		//@ts-expect-error
		document.startViewTransition(async () => {
			res();
			await nav.complete;
		})		
	})
})
</script>

<slot />