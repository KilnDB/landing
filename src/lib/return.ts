const KEY = "kiln_return";

export function setReturn(path: string) {
    try {
        sessionStorage.setItem(KEY, path);
    } catch {}
}

export function takeReturn(): string | null {
    try {
        const value = sessionStorage.getItem(KEY);
        sessionStorage.removeItem(KEY);
        return value && value.startsWith("/") && !value.startsWith("//") ? value : null;
    } catch {
        return null;
    }
}