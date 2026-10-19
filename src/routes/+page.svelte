<script lang="ts">
    import { onMount } from "svelte";
    import { content } from "../lib/content";
    import { goto } from "$app/navigation";
    import { takeReturn } from "../lib/return";
    import { loadUser, auth } from "../lib/auth.svelte";
    import CatPeek from "../lib/components/CatPeek.svelte";
    import Doodles from "../lib/components/Doodles.svelte";
    import Cat from "../lib/components/Cat.svelte";
    import CatLoaf from "../lib/components/CatLoaf.svelte";
    import CatSleep from "../lib/components/CatSleep.svelte";
    import HeroCat from "../lib/components/HeroCat.svelte";
    import DiscordButton from "../lib/components/DiscordButton.svelte";
    import CodePreview from "../lib/components/CodePreview.svelte";
    import SketchArrow from "../lib/components/SketchArrow.svelte";

    onMount(async () => {
        await loadUser();
        if (!auth.user) return;
        const back = takeReturn();
        if (back) await goto(back);
    });
</script>

<svelte:head>
    <title>kiln</title>
    <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div id="top"></div>

<header class="nav">
    <a class="brand" href="#top">{content.brand}</a>
    <nav>
        {#each content.nav as link}
            <a href={link.href}>{link.label}</a>
        {/each}
        {#if auth.user}
            <a href="/dashboard">Dashboard</a>
        {/if}
    </nav>
</header>

<main>
    <section class="hero">
        <h1>{content.hero.title}</h1>
        <p class="tagline">
            {#each content.hero.tagline as word}
                <span>{word}</span>
            {/each}
        </p>
        <div class="hero-art"><HeroCat /></div>
    </section>

    <section class="about" id="about">
        {#each content.about.slice(0, 1) as block}
            <article>
                <h2>{block.title}</h2>
                {#each block.body as p}
                    <p>{p}</p>
                {/each}
                <SketchArrow label="example code preview" />
            </article>
        {/each}

        <div class="about-code"><CodePreview /></div>

        <div class="about-art"><CatLoaf /></div>
    </section>

    <section class="soon">
        <h2>
            {#each content.soon.lines as line}
                <span>{line}</span>
            {/each}
        </h2>
        <div class="soon-grid">
            <div class="copy">
                {#each content.soon.body as p}
                    <p>{p}</p>
                {/each}
            </div>
            <div class="panel">
                <div class="a"><Cat /></div>
                <div class="b"><CatPeek /></div>
                <div class="c"><CatSleep /></div>
            </div>
        </div>
    </section>

    <section class="features" id="features">
        <h2>{content.featuresTitle}</h2>
        <div class="grid">
            {#each content.features as f}
                <article class="card">
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                </article>
            {/each}
        </div>
    </section>

    <section class="compare">
        <h2>{content.compare.title}</h2>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>{content.compare.left}</th>
                        <th>{content.compare.right}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each content.compare.rows as [a, b]}
                        <tr>
                            <td>{a}</td>
                            <td>{b}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section class="cta">
        <div class="doodles"><Doodles /></div>
        <h2>{content.cta.title}</h2>
        <p>{content.cta.body}</p>
        <div class="actions center">
            <DiscordButton label="Join Discord" />
        </div>
    </section>
</main>

<footer>
    <div class="cols">
        <div class="foot-brand">{content.brand}</div>
        {#each content.footer as col}
            <div>
                <h4>{col.title}</h4>
                {#each col.links as l}
                    <a href={l.href}>{l.label}</a>
                {/each}
            </div>
        {/each}
    </div>
</footer>

<style>
    :global(h1, h2, h3, h4) {
        font-family: var(--font-display);
        font-weight: 400;
        margin: 0;
    }

    section {
        max-width: 1100px;
        margin: 0 auto;
        padding: 5rem 1.5rem;
    }

    .nav {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.9rem 1.5rem;
        background: rgba(26, 26, 26, 0.85);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--line);
    }

    .brand {
        font-family: var(--font-display);
        font-size: 2rem;
        text-decoration: none;
        line-height: 1;
    }

    nav {
        display: flex;
        gap: 1.75rem;
    }

    nav a {
        text-decoration: none;
        color: var(--muted);
        font-weight: 500;
        transition: color 0.15s;
    }

    nav a:hover {
        color: var(--fg);
    }

    .hero {
        text-align: center;
        padding-top: 4rem;
    }

    .hero h1 {
        font-size: clamp(5rem, 22vw, 16rem);
        letter-spacing: 0.02em;
        line-height: 1;
        transform: rotate(-3deg);
        user-select: none;
    }

    .tagline {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem 1.75rem;
        margin: 1.5rem 0 0;
        font-family: var(--font-display);
        font-size: clamp(1.4rem, 4vw, 2.4rem);
        color: var(--accent);
    }

    .hero-art {
        width: min(480px, 90%);
        margin: 3rem auto 0;
    }

    .about {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr) 120px;
        gap: 2.5rem;
        align-items: start;
        border-top: 1px solid var(--line);
    }

    .about-code {
        min-width: 0; 
    }

    .about-art {
        width: 110px;
        justify-self: end;
        transform: rotate(6deg);
    }

    .about h2 {
        font-size: 2rem;
        margin-bottom: 0.75rem;
    }

    .about p,
    .soon p,
    .card p,
    .cta p {
        color: var(--muted);
        margin: 0 0 0.75rem;
    }

    .about-art {
        width: 140px;
        justify-self: end;
        transform: rotate(6deg);
    }

    .soon {
        border-top: 1px solid var(--line);
    }

    .soon h2 {
        display: flex;
        flex-direction: column;
        margin: 1.25rem 0 2rem;
        font-size: clamp(3rem, 9vw, 6rem);
        line-height: 1;
    }

    .soon h2 span:last-child {
        color: var(--accent);
        transform: rotate(-2deg);
        transform-origin: left;
    }

    .soon-grid {
        display: grid;
        grid-template-columns: 1fr 1.2fr;
        gap: 2.5rem;
        align-items: center;
    }

    .panel {
        position: relative;
        min-height: 300px;
        border: 2px solid var(--line);
        border-radius: 28px;
        background: var(--card);
    }

    .panel > div {
        position: absolute;
    }

    .panel .a {
        width: 130px;
        left: 12%;
        bottom: 14%;
        transform: rotate(-6deg);
    }

    .panel .b {
        width: 130px;
        left: 40%;
        top: 12%;
        transform: rotate(5deg);
    }

    .panel .c {
        width: 150px;
        right: 8%;
        bottom: 12%;
        transform: rotate(8deg);
    }

    .features {
        border-top: 1px solid var(--line);
    }

    .features > h2,
    .compare > h2 {
        font-size: clamp(2.4rem, 6vw, 4rem);
        margin-bottom: 2rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.25rem;
    }

    .card {
        padding: 1.5rem;
        border: 2px solid var(--line);
        border-radius: 22px;
        background: var(--card);
        transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .card h3 {
        font-size: 1.7rem;
        margin-bottom: 0.4rem;
    }

    .compare {
        border-top: 1px solid var(--line);
    }

    .table-wrap {
        overflow-x: auto;
        border: 2px solid var(--line);
        border-radius: 22px;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .actions.center {
        justify-content: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        min-width: 480px;
    }

    th,
    td {
        padding: 1rem 1.5rem;
        text-align: left;
    }

    th {
        font-family: var(--font-display);
        font-weight: 400;
        font-size: 1.6rem;
        background: var(--card);
    }

    th:first-child {
        color: var(--accent);
    }

    td {
        border-top: 1px solid var(--line);
    }

    td:first-child {
        font-weight: 600;
    }

    td:last-child {
        color: var(--muted);
    }

    .cta {
        position: relative;
        max-width: 1100px;
        margin: 2rem auto 5rem;
        padding: 4rem 1.5rem;
        text-align: center;
        border: 2px solid var(--line);
        border-radius: 32px;
        background: var(--card);
    }

    .cta h2 {
        font-size: clamp(2.4rem, 6vw, 4rem);
        margin-bottom: 0.5rem;
    }

    .cta p {
        margin-bottom: 1.75rem;
    }

    .doodles {
        width: 200px;
        margin: 0 auto 1rem;
    }

    footer {
        border-top: 1px solid var(--line);
        padding: 3rem 1.5rem;
    }

    .cols {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1.5fr repeat(3, 1fr);
        gap: 2rem;
    }

    .foot-brand {
        font-family: var(--font-display);
        font-size: 2.4rem;
        line-height: 1;
    }

    footer h4 {
        font-size: 1.3rem;
        margin-bottom: 0.6rem;
    }

    footer a {
        display: block;
        color: var(--muted);
        text-decoration: none;
        margin-bottom: 0.35rem;
    }

    footer a:hover {
        color: var(--fg);
    }

    @media (max-width: 860px) {
        nav {
            display: none;
        }

        .about,
        .soon-grid {
            grid-template-columns: 1fr;
        }

        .about-art {
            justify-self: start;
        }

        .grid {
            grid-template-columns: 1fr 1fr;
        }

        .cols {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 560px) {
        .grid {
            grid-template-columns: 1fr;
        }

        section {
            padding: 3.5rem 1.25rem;
        }
    }
</style>

