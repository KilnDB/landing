<script lang="ts">
  let {
    variant = "error",
  }: { variant?: "unauthorized" | "notfound" | "server" | "error" } = $props()

  const signs = {
    unauthorized: {
      fill: "#C93C3C",
      ink: "#FFFFFF",
      text: "STOP",
      size: 24,
      label: "A cat holding up a stop sign",
    },
    notfound: {
      fill: "#E9A23B",
      ink: "#201617",
      text: "404",
      size: 26,
      label: "A cat holding a 404 sign, a ball of yarn rolled away behind it",
    },
    server: {
      fill: "#E2672B",
      ink: "#FFFFFF",
      text: "500",
      size: 26,
      label: "A startled cat holding a 500 sign",
    },
    error: {
      fill: "#6B6B75",
      ink: "#FFFFFF",
      text: "!",
      size: 52,
      label: "A puzzled cat holding a warning sign",
    },
  }

  const sign = $derived(signs[variant])
</script>

<svg
  viewBox="0 0 400 400"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label={sign.label}
>
  <path
    d="M16 392 C90 384 180 396 262 390 S366 388 388 392"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />

  <g transform="translate(420 0) scale(-1 1)">
    <path
      d="M262 340 C330 350 372 310 360 250 C356 226 332 210 318 220 C336 232 340 256 334 280 C328 304 300 318 262 316 Z"
      fill="white"
    />
    <path
      d="M345 238 L356 246 M348 262 L362 268 M342 288 L354 296"
      stroke="#D1D1D3"
      stroke-width="3"
      stroke-linecap="round"
    />
  </g>

  <path
    d="M130 350 C108 310 112 252 140 220 C158 200 190 192 210 192 C240 192 268 206 282 236 C300 274 298 322 276 352 C240 360 170 362 130 350 Z"
    fill="white"
  />
  <path
    d="M196 214 L200 226 M210 212 L212 226 M224 214 L222 226"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />

  <ellipse cx="170" cy="352" rx="26" ry="14" fill="white" />
  <path
    d="M160 348 V356 M170 347 V356 M180 348 V356"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />

  <path d="M342 186 V300" stroke="#D1D1D3" stroke-width="6" stroke-linecap="round" />

  <polygon
    points="322,92 362,92 390,120 390,160 362,188 322,188 294,160 294,120"
    fill={sign.fill}
    stroke={sign.fill}
    stroke-width="4"
    stroke-linejoin="round"
  />
  <polygon
    points="325,99 359,99 383,123 383,157 359,181 325,181 301,157 301,123"
    stroke={sign.ink}
    stroke-width="2.5"
    stroke-linejoin="round"
    opacity="0.9"
  />
  <text
    x="342"
    y="140"
    dy="0.35em"
    text-anchor="middle"
    font-family="inherit"
    font-weight="800"
    font-size={sign.size}
    fill={sign.ink}>{sign.text}</text
  >

  <path d="M274 240 C296 236 318 246 328 258 L330 276 C312 284 290 282 274 274 Z" fill="white" />
  <ellipse cx="342" cy="268" rx="18" ry="14" fill="white" />
  <path
    d="M334 262 V270 M342 261 V270 M350 262 V270"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />

  <g transform="translate(0 18)">
  <path
    d="M120 100 C116 74 118 46 124 22 C140 22 160 34 172 52 C190 48 230 48 248 52 C260 34 280 22 296 22 C302 46 304 74 300 100 C306 142 262 178 210 178 C158 178 114 142 120 100 Z"
    fill="white"
  />
  <path
    d="M150 168 C180 188 240 188 270 168"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />
  <path d="M134 38 C146 40 156 48 162 58 C152 62 142 62 134 70 Z" fill="#D1D1D3" />
  <path d="M286 38 C274 40 264 48 258 58 C268 62 278 62 286 70 Z" fill="#D1D1D3" />
  <path
    d="M196 62 V82 M210 60 V82 M224 62 V82"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />

  {#if variant === "server"}
    <ellipse cx="170" cy="112" rx="15" ry="19" fill="#201617" />
    <ellipse cx="250" cy="112" rx="15" ry="19" fill="#201617" />
    <circle cx="176" cy="104" r="5" fill="#D1D1D3" />
    <circle cx="256" cy="104" r="5" fill="#D1D1D3" />
  {:else}
    <ellipse cx="170" cy="112" rx="13" ry="15" fill="#201617" />
    <ellipse cx="250" cy="112" rx="13" ry="15" fill="#201617" />
    <circle cx="175" cy="106" r="4" fill="#D1D1D3" />
    <circle cx="255" cy="106" r="4" fill="#D1D1D3" />
    <circle cx="166" cy="118" r="2" fill="#D1D1D3" />
    <circle cx="246" cy="118" r="2" fill="#D1D1D3" />
  {/if}

  <path d="M200 128 H220 L210 140 Z" fill="#201617" />

  {#if variant === "unauthorized"}
    <path d="M196 148 H224" stroke="#201617" stroke-width="3" stroke-linecap="round" />
    <path
      d="M148 88 L190 98 M272 88 L230 98"
      stroke="#201617"
      stroke-width="4"
      stroke-linecap="round"
    />
  {:else if variant === "server"}
    <path d="M198 144 H222 C222 160 198 160 198 144 Z" fill="#201617" />
  {:else if variant === "error"}
    <path
      d="M194 148 C200 141 206 153 212 146 C218 140 222 148 226 146"
      stroke="#201617"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  {:else}
    <path
      d="M210 140 C204 150 194 150 190 143 M210 140 C216 150 226 150 230 143"
      stroke="#201617"
      stroke-width="3"
      stroke-linecap="round"
    />
  {/if}

  <path
    d="M150 132 L108 128 M152 142 L112 154 M270 132 L312 128 M268 142 L308 154"
    stroke="#D1D1D3"
    stroke-width="3"
    stroke-linecap="round"
  />

  </g>

  {#if variant === "notfound"}
    <circle cx="352" cy="360" r="26" fill="#E9BF83" />
    <path
      d="M332 354 C342 340 364 340 374 354 M330 366 C344 352 366 354 376 368 M338 380 C348 372 362 374 368 380 M346 336 C358 354 358 372 348 384"
      stroke="#BD976E"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      d="M326 372 C306 382 288 366 262 376 C246 382 236 374 222 378"
      stroke="#E9BF83"
      stroke-width="3"
      stroke-linecap="round"
    />
    <text
      x="62"
      y="86"
      font-family="inherit"
      font-weight="700"
      font-size="44"
      fill="#AA8665"
      transform="rotate(-14 62 86)">?</text
    >
    <text
      x="92"
      y="38"
      font-family="inherit"
      font-weight="700"
      font-size="26"
      fill="#AA8665"
      transform="rotate(10 92 38)">?</text
    >
  {:else if variant === "server"}
    <path d="M98 66 C90 80 88 90 98 92 C108 90 106 80 98 66 Z" fill="#BFD9EA" />
    <path
      d="M338 60 L344 82 L366 88 L346 98 L350 122 L336 104 L318 114 L324 94 L306 78 L328 76 Z"
      stroke="#F0C685"
      stroke-width="3"
      stroke-linejoin="round"
      transform="translate(-270 -14)"
    />
    <path
      d="M30 190 L44 170 L58 190 L72 170"
      stroke="#AA8665"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  {:else if variant === "error"}
    <path
      d="M52 150 L66 130 L80 150 L94 130"
      stroke="#AA8665"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M98 66 C90 80 88 90 98 92 C108 90 106 80 98 66 Z" fill="#BFD9EA" />
  {:else}
  {/if}
</svg>