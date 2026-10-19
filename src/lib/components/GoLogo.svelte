<script lang="ts">
    let { size = 16 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <g stroke="#00add8" stroke-width="1.6" stroke-linecap="round">
        <line x1="1" y1="9" x2="5" y2="9" />
        <line x1="2.5" y1="12.5" x2="6" y2="12.5" />
        <line x1="1" y1="16" x2="5" y2="16" />
    </g>
    <text
        x="14.5"
        y="17"
        text-anchor="middle"
        font-family="system-ui, sans-serif"
        font-size="13"
        font-weight="800"
        font-style="italic"
        fill="#00add8">GO</text
    >
</svg>