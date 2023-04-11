export async function example() {
 const exampleText: any = await fetch('https://raw.githubusercontent.com/Melonchanism/OpenWebLP/master/ex.txt', { mode: "cors" }).then(response => response.text());
 localStorage.setItem("songs", exampleText)
 location.href = location.href.split("?")[0];
};