<script lang="ts">
    let { size = 16 }: { size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="#f74c00"
        stroke-width="3"
        stroke-dasharray="2.6 5.2"
    />
    <circle cx="12" cy="12" r="8" fill="none" stroke="#f74c00" stroke-width="2" />
    <text
        x="12"
        y="16"
        text-anchor="middle"
        font-family="system-ui, sans-serif"
        font-size="11"
        font-weight="800"
        fill="#f74c00">R</text
    >
</svg>