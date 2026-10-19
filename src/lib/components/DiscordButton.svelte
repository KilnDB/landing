<script lang="ts">
    import Discord from "./Discord.svelte";

    let { label = "" }: { label?: string } = $props();
</script>

<a
    class="discord"
    class:labeled={label}
    href="/discord"
    data-sveltekit-reload
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label || "Join our Discord"}
>
    <Discord />
    {#if label}
        <span>{label}</span>
    {/if}
</a>

<style>
    .discord {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        border: 2px solid var(--line);
        border-radius: 999px;
        color: var(--fg);
        font-weight: 600;
        font-size: 0.95rem;
        text-decoration: none;
        transition: background 0.15s ease, border-color 0.15s ease;
    }

    .discord.labeled {
        width: auto;
        padding: 0 1.1rem;
    }

    .discord:hover,
    .discord:focus-visible {
        background: #5865f2;
        border-color: #5865f2;
        outline: none;
    }
</style>