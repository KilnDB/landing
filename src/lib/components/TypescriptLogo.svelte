<script lang="ts">
    let { size = 16 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <rect width="24" height="24" rx="3.5" fill="#3178c6" />
    <text
        x="12.5"
        y="19"
        text-anchor="middle"
        font-family="system-ui, sans-serif"
        font-size="12.5"
        font-weight="700"
        fill="#fff">TS</text
    >
</svg>