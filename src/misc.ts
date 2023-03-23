type Browser = "node"|"firefox"|"chromium"|"webkit"|"uknown";
export type Songs = {
 name: string;
 lyrics: string[];
};
export function browser():Browser {
 if (typeof window === 'undefined') return "node";
 ///@ts-ignore
 else if (typeof window.InstallTrigger === "object") return "firefox";
 ///@ts-ignore
 else if (typeof window.chrome === "object") return "chromium";
 ///@ts-ignore
 else if (/Safari/.test(navigator.userAgent)) return "webkit";
 else return "uknown";
};