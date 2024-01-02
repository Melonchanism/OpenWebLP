# OpenWebLp:
- An open source web-based Worship Presentation Software.<br>
- Was meant to be a clone of OpenLp but, its a bit different.<br>
- Uses the same license as OpenLP.<br>
- Demo at [openweblp.web.app/?production](https://openweblp.web.app?example)<br>
- Production demo at [openweblp.web.app/](https://openweblp.web.app)<br>
- If you used the demo, you have to clear it using the editor to use production, as it is saved in localStorage.<br>

## Controls:
- `D`: launch display (On firefox, it will spawn on the left monitor using left=5000)<br>
- `E` Launch editor<br>
- `S` Launch settings<br>
- `F`: If focused on display, fullscreens it<br>
- `L/R arrow keys`: next/previous song<br>
- `U/D arrow keys`: nex/previous lyric<br>
- `1-9-Backspace keys`: select lyric for those of you who don't like having duplicates<br>
- `F1 - F10`: select song<br>
- `CTRL + Enter`: if in editor, update and rerender<br>

## Other:
- Made with SvelteKit, TS, and Faith<br>
- Still not complete yet, but it's usable.<br>
- Editor Format: 
```
Song Name
Lyrics 1 line 1
Lyrics 1 line 2

Lyrics 2 line 1
Lyrics 2 line 2


Song Name 2
Lyrics 1 line 1
Lyrics 1 line 2

Lyrics 2 line 1
Lyrics 2 line 2
```
- LocalStorage JSON Format:
```
[{"name":"Song Name","lyrics":["Lyrics 1 line 1|Lyrics 1 line 2","Lyrics 2 line 1|Lyrics 2 line 2"]},{"name":"Song Name 2","lyrics":["Lyrics 1 line 1|Lyrics 1 line 2","Lyrics 2 line 1|Lyrics 2 line 2"]}]
```
you get the idea
## Bugs:
- ~~on chromium, opening the editor will cause the display to exit fullscreen~~<br>
*Temporary Solution: use F11*<br>
only with new tabs, using popups for now<br>
- ~~have editor always open in new tab and not in new window~~<br>
*Depends on browser settings*<br>
removed tabs, using popups instead<br>
- Window doesnt spawn on the left monitor on non-firefox<br>
- LMK if you find any<br>
## To-Do:
- ~~Add auto preview sizing~~ Mostly Done<br>
- Get more people to actually use it<br>
- ~~Add a configurer~~ Changed to settings<br>
- LMK if you have any ideas<br>
