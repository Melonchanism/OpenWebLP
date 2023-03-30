export const icon = document.querySelector<HTMLLinkElement>("link[rel='icon']").href;
export const browser = (() => {
 ///@ts-ignore
 if (typeof window.mozRTCSessionDescription !== "undefined") return "firefox";
 ///@ts-ignore
 else if (typeof window.chrome !== "undefined") return "chromium";
 else if (/Safari/.test(navigator.userAgent)) return "webkit";
 else return "unknown";
})()