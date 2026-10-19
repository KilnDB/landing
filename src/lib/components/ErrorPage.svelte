<script lang="ts">
  import type { Snippet } from "svelte"
  import ErrorCat from "./ErrorCat.svelte"

  let {
    variant = "error",
    title,
    message = "",
    homeHref = "/",
    homeLabel = "Go home",
    showBack = true,
    children,
  }: {
    variant?: "unauthorized" | "notfound" | "server" | "error"
    title: string
    message?: string
    homeHref?: string
    homeLabel?: string
    showBack?: boolean
    children?: Snippet
  } = $props()
</script>

<div class="error-page">
  <div class="cat">
    <ErrorCat {variant} />
  </div>

  <h1>{title}</h1>

  {#if message}
    <p class="message">{message}</p>
  {/if}

  <div class="actions">
    <a href={homeHref} class="btn primary">{homeLabel}</a>
    {#if showBack}
      <button class="btn secondary" onclick={() => history.back()}>Go back</button>
    {/if}
    {@render children?.()}
  </div>
</div>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 1.5rem 3rem;
  }
  .cat {
    width: 160px;
    max-width: 60vw;
  }
  .cat :global(svg) {
    display: block;
    width: 100%;
    height: auto;
  }
  h1 {
    margin-top: 1rem;
    font-size: 1.875rem;
    line-height: 1.2;
    font-weight: 700;
  }
  .message {
    margin-top: 0.75rem;
    max-width: 32rem;
    font-size: 1.125rem;
    line-height: 1.5;
    opacity: 0.7;
  }
  .actions {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1.4rem;
    border-radius: 0.5rem;
    border: 1.5px solid transparent;
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    text-decoration: none;
    cursor: pointer;
    transition:
      background-color 0.15s,
      border-color 0.15s;
  }
  .btn:focus-visible {
    outline: 2px solid #e9bf83;
    outline-offset: 2px;
  }
  .primary {
    background: #e9bf83;
    color: #201617;
  }
  .primary:hover {
    background: #f0cc9a;
  }
  .secondary {
    background: transparent;
    color: inherit;
    border-color: currentColor;
    opacity: 0.85;
  }
  .secondary:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.08);
  }
</style>