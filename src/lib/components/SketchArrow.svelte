<script lang="ts">
    import { onMount } from "svelte";

    let { label = "example code preview" }: { label?: string } = $props();

    let el: HTMLElement | undefined = $state();
    let drawn = $state(false);

    onMount(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            drawn = true;
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    drawn = true;
                    io.disconnect();
                }
            },
            { threshold: 0.6 },
        );
        if (el) io.observe(el);
        return () => io.disconnect();
    });
</script>

<div class="sketch" class:drawn bind:this={el}>
    <span class="label">{label}</span>
    <svg class="side" viewBox="0 0 300 130" fill="none" aria-hidden="true">
        <path
            class="line"
            pathLength="1"
            d="M14 20 C44 6 74 28 64 54 C56 78 22 66 38 46 C56 26 108 74 150 64 C190 54 206 30 238 44 C258 53 272 60 294 60"
        />
        <path class="head" d="M280 48 L296 60 L279 71" />
    </svg>

    <svg class="down" viewBox="0 0 120 150" fill="none" aria-hidden="true">
        <path
            class="line"
            pathLength="1"
            d="M30 6 C8 26 56 40 40 64 C26 84 4 70 14 56 C26 40 70 70 62 100 C58 118 50 126 52 140"
        />
        <path class="head" d="M41 128 L52 142 L63 129" />
    </svg>
</div>

<style>
    .sketch {
        margin-top: 1.75rem;
        color: var(--accent);
    }

    .label {
        display: inline-block;
        margin-left: 0.25rem;
        font-family: var(--font-display);
        font-size: 1.4rem;
        line-height: 1.1;
        white-space: nowrap;
        transform: rotate(-4deg);
        transform-origin: left center;
    }

    svg {
        display: block;
        overflow: visible;
        stroke: currentColor;
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
    }

    .side {
        width: calc(100% + 1.75rem);
        margin-top: -0.25rem;
    }

    .down {
        display: none;
        width: 84px;
        margin: 0.25rem 0 0 1.5rem;
    }

    .line {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        transition: stroke-dashoffset 1.1s ease-in-out;
    }

    .head {
        opacity: 0;
        transition: opacity 0.25s ease 1s;
    }

    .drawn .line { stroke-dashoffset: 0; }
    .drawn .head { opacity: 1; }

    @media (prefers-reduced-motion: reduce) {
        .line, .head { transition: none; }
    }

    @media (max-width: 860px) {
        .side { display: none; }
        .down { display: block; }
    }
</style>