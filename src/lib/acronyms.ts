export const icon = document.querySelector<HTMLLinkElement>("link[rel='icon']").href;
export const browser = (() => {
 ///@ts-ignore
 if (typeof document.body.mozMatchesSelector === "function") return "firefox";
 ///@ts-ignore
 else if (typeof chrome === "object") return "chromium";
 ///@ts-ignore
 else if (typeof elem.webkitRequestFullscreen === "function") return "webkit";
 else return "unknown";
})()