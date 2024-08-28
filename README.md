# OpenWebLp:

- An open source web-based Worship Presentation Software.<br>
- Was meant to be a clone of OpenLp but, its a bit different.<br>
- Uses the same license as OpenLP.<br>
- Created with Svelte & TypeScript & Supabase

## Controls:

- `D`: launch display (On firefox, it will spawn on the left monitor using left=5000)<br>
- `F`: If focused on display, fullscreens it, else, fullscreens the preview<br>
- `Left/Right arrow keys`: next/previous song<br>
- `Up/Down arrow keys`: nex/previous lyric<br>

## Other:

- Still not complete yet, but it's usable.<br>
- ~Remote avaliable at /remote & remote under the menu~<br>
- Format:

```ts
type song = {
	name: string
	artist: string
	lyrics: {
		type: "Intro" | "Verse" | "Pre-Chorus" | "Chorus" | "Bridge" | "Tag" | "Ending"
		number: number
		text: string
	}
}
```

## To Do:

- ~Use cloud storage~ Done with supabase <br>
- Use a service worker for offline support <br>
