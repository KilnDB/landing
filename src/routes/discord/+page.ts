import { redirect } from "@sveltejs/kit";

export function load() {
    redirect(302, "https://discord.gg/882YdGA8mT", { external: true });
}