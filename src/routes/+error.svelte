<script lang="ts">
  import { page } from "$app/state"
  import ErrorPage from "#lib/components/ErrorPage.svelte";

  const variant = $derived(
    page.status === 401 || page.status === 403
      ? ("unauthorized" as const)
      : page.status === 404
        ? ("notfound" as const)
        : page.status >= 500
          ? ("server" as const)
          : ("error" as const),
  )

  const copy = $derived(
    {
      unauthorized: {
        title: "You don't have access to this",
        message:
          "Sign in with an account that has permission, or ask the owner to give you access.",
      },
      notfound: {
        title: "Page not found",
        message: "We couldn't find that page. It may have moved, or the link may be wrong.",
      },
      server: {
        title: "Something broke on our end",
        message:
          "The server hit an error. Try again in a moment, and report it if it keeps happening.",
      },
      error: {
        title: "Something went wrong",
        message: page.error?.message ?? "An unexpected error occurred. Try again.",
      },
    }[variant],
  )
</script>

<ErrorPage {variant} title={copy.title} message={copy.message} />