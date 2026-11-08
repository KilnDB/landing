<script lang="ts">
    import { content } from "../content";
    import CatPeek from "./CatPeek.svelte";

    const API_URL = "https://worker.kilndb.com/email";

    let email = $state("");
    let status = $state<"idle" | "loading" | "success" | "error">("idle");
    let message = $state("");

    async function submit(e: SubmitEvent) {
        e.preventDefault();
        if (status === "loading") return;

        status = "loading";
        message = "";

        try {
            const res = await fetch(`${API_URL}?email=${encodeURIComponent(email.trim())}`, {
                method: "POST",
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok && data.success) {
                status = "success";
                message = content.signup.success;
                email = "";
            } else {
                status = "error";
                message = data.error ?? content.signup.error;
            }
        } catch {
            status = "error";
            message = content.signup.error;
        }
    }
</script>

<section class="signup" id="signup">
    <div class="box">
        <div class="cat"><CatPeek /></div>
        <h2>{content.signup.title}</h2>
        <p>{content.signup.body}</p>

        <form onsubmit={submit}>
            <input
                type="email"
                name="email"
                placeholder={content.signup.placeholder}
                bind:value={email}
                required
                autocomplete="email"
                disabled={status === "loading"}
                aria-label="Email address"
            />
            <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : content.signup.button}
            </button>
        </form>

        <p class="note" class:ok={status === "success"} class:bad={status === "error"} aria-live="polite">
            {message}
        </p>
    </div>
</section>

<style>
    .signup {
        max-width: 1100px;
        margin: 0 auto;
        padding: 5rem 1.5rem;
        border-top: 1px solid var(--line);
    }

    .box {
        position: relative;
        max-width: 640px;
        margin: 3rem auto 0;
        padding: 3rem 1.75rem;
        text-align: center;
        border: 2px solid var(--line);
        border-radius: 28px;
        background: var(--card);
    }

    .cat {
        position: absolute;
        top: -64px;
        right: 12%;
        width: 110px;
        transform: rotate(5deg);
        pointer-events: none;
    }

    .cat :global(svg) {
        display: block;
        width: 100%;
        height: auto;
    }

    h2 {
        font-family: var(--font-display);
        font-weight: 400;
        font-size: clamp(2rem, 5vw, 3rem);
        margin: 0 0 0.5rem;
    }

    p {
        color: var(--muted);
        margin: 0 0 1.5rem;
    }

    form {
        display: flex;
        gap: 0.6rem;
    }

    input {
        flex: 1;
        min-width: 0;
        padding: 0.85rem 1.1rem;
        font: inherit;
        color: var(--fg);
        background: transparent;
        border: 2px solid var(--line);
        border-radius: 999px;
        outline: none;
        transition: border-color 0.15s;
    }

    input:focus-visible {
        border-color: #e9bf83;
        outline: 2px solid #e9bf83;
        outline-offset: 2px;
    }

    button {
        padding: 0.85rem 1.5rem;
        font-family: var(--font-display);
        font-size: 1.2rem;
        color: #201617;
        background: #e9bf83;
        border: none;
        border-radius: 999px;
        cursor: pointer;
        /* transition: transform 0.15s, opacity 0.15s; */
    }

    button:hover:not(:disabled) {
        background: #f0cc9a;
        /* transform: rotate(-2deg) scale(1.04); */
    }

    button:focus-visible {
        outline: 2px solid #e9bf83;
        outline-offset: 2px;
    }

    button:disabled {
        opacity: 0.6;
        cursor: wait;
    }

    .note {
        min-height: 1.5em;
        margin: 1rem 0 0;
        font-size: 0.95rem;
    }

    .note.ok {
        color: #e9bf83;
    }

    .note.bad {
        color: #ff7a7a;
    }

    @media (max-width: 560px) {
        form {
            flex-direction: column;
        }
    }
</style>
