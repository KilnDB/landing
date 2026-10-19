<script lang="ts">
    let { size = 16 }: { size?: number } = $props();

    const snake =
        "M12 2C7 2 7.3 4.2 7.3 4.2V6.5H12.2V7.2H5.3S2 6.8 2 12s2.9 5 2.9 5H6.6V14.6s-.1-2.9 2.9-2.9h4.8s2.8 0 2.8-2.7V4.8S17.5 2 12 2Z";
</script>

<svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d={snake} fill="#3776ab" />
    <circle cx="9" cy="4.6" r="0.9" fill="#fff" />
    <g transform="rotate(180 12 12)">
        <path d={snake} fill="#ffd43b" />
        <circle cx="9" cy="4.6" r="0.9" fill="#fff" />
    </g>
</svg>