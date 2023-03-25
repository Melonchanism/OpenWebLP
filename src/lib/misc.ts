export function parseHTML(input: string | string[]) {
 if (typeof input === "object") {
  input.forEach(item => {
   item.replace(">", "&gt;").replace("<", "&lt;").replace("&", "&amp;").replace('"', "&quot;").replace("'", "&apos;");
  });
 } else {
  input.replace(">", "&gt;").replace("<", "&lt;").replace("&", "&amp;").replace('"', "&quot;").replace("'", "&apos;");
 };
 return input;
};

function getBrowser(): "firefox" | "chromium" | "webkit" | "unknown" {
 ///@ts-ignore
 if (typeof window.InstallTrigger === "object") return "firefox";
 ///@ts-ignore
 else if (typeof window.chrome === "object") return "chromium";
 ///@ts-ignore
 else if (document.webkitExitFullscreen) return "webkit";
 else return "unknown";
};

export const browser = getBrowser();