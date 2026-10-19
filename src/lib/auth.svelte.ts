export const API = "http://localhost:4000";

export type User = { login: string; avatar_url: string };

export const auth = $state<{ user: User | null; loading: boolean }>({
    user: null,
    loading: true,
});

function normalize(raw: any): User | null {
    const d = raw?.user ?? raw;
    if (!d) return null;
    const login = d.login ?? d.username ?? d.name;
    const avatar_url = d.avatar_url ?? d.avatarUrl ?? d.avatar ?? d.picture ?? "";
    return login ? { login, avatar_url } : null;
}

function saveLocal(user: User) {
    try {
        localStorage.setItem("kiln_user", JSON.stringify(user));
    } catch {}
}

function readLocal(): User | null {
    try {
        return normalize(JSON.parse(localStorage.getItem("kiln_user") ?? "null"));
    } catch {
        return null;
    }
}

function clearLocal() {
    try {
        localStorage.removeItem("kiln_user");
    } catch {}
}

export async function loadUser() {
    const params = new URLSearchParams(location.search);
    const login = params.get("login") ?? params.get("username");
    if (login) {
        const user = {
            login,
            avatar_url: params.get("avatar_url") ?? params.get("avatar") ?? "",
        };
        auth.user = user;
        saveLocal(user);
        history.replaceState({}, "", location.pathname);
        auth.loading = false;
        return;
    }

    try {
        const res = await fetch(`${API}/auth/me`, { credentials: "include" });
        if (res.ok) {
            const user = normalize(await res.json());
            auth.user = user;
            if (user) saveLocal(user);
        } else {
            auth.user = readLocal();
        }
    } catch (err) {
        console.error("[kiln] /auth/me failed:", err);
        auth.user = readLocal();
    } finally {
        auth.loading = false;
    }
}

export async function logout() {
    try {
        await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
    } catch (err) {
        console.error("[kiln] /auth/logout failed:", err);
    }
    clearLocal();
    auth.user = null;
}