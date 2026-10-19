<script lang="ts">
    import { onMount } from "svelte";
    import TypeScriptLogo from "./TypescriptLogo.svelte";
    import GoLogo from "./GoLogo.svelte";
    import RustLogo from "./RustLogo.svelte";
    import PythonLogo from "./PythonLogo.svelte";

    const files = [
        {
            id: "ts",
            name: "query.ts",
            lang: "TypeScript",
            logo: TypeScriptLogo,
            code: `const res = await fetch(\`https://api.kilndb.dev/db/\${dbId}/query\`, {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.KILN_TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sql: "select * from users where id = $1",
    params: [42],
  }),
});

if (!res.ok) throw new Error(\`Query failed: \${res.status}\`);

const { rows } = await res.json();
console.log(rows);`,
        },
        {
            id: "go",
            name: "main.go",
            lang: "Go",
            logo: GoLogo,
            code: `payload, _ := json.Marshal(map[string]any{
    "sql":    "select * from users where id = $1",
    "params": []any{42},
})

req, _ := http.NewRequest("POST",
    "https://api.kilndb.dev/db/"+dbID+"/query", bytes.NewReader(payload))
req.Header.Set("Authorization", "Bearer "+os.Getenv("KILN_TOKEN"))
req.Header.Set("Content-Type", "application/json")

res, err := http.DefaultClient.Do(req)
if err != nil {
    log.Fatal(err)
}
defer res.Body.Close()

if res.StatusCode != 200 {
    log.Fatalf("query failed: %s", res.Status)
}

var out struct{ Rows []map[string]any }
json.NewDecoder(res.Body).Decode(&out)
fmt.Println(out.Rows)`,
        },
        {
            id: "rs",
            name: "main.rs",
            lang: "Rust",
            logo: RustLogo,
            code: `let res = reqwest::Client::new()
    .post(format!("https://api.kilndb.dev/db/{db_id}/query"))
    .bearer_auth(env::var("KILN_TOKEN")?)
    .json(&json!({
        "sql": "select * from users where id = $1",
        "params": [42],
    }))
    .send()
    .await?
    .error_for_status()?;

let out: Value = res.json().await?;
println!("{}", out["rows"]);`,
        },
        {
            id: "py",
            name: "query.py",
            lang: "Python",
            logo: PythonLogo,
            code: `token = os.environ["KILN_TOKEN"]

res = httpx.post(
    f"https://api.kilndb.dev/db/{db_id}/query",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "sql": "select * from users where id = $1",
        "params": [42],
    },
)
res.raise_for_status()

print(res.json()["rows"])`,
        },
    ];

    const KEYWORDS = new Set(
        (
            "async await const let return if else try catch new typeof instanceof as " +
            "func var nil fn match use mut def not is in for from import except " +
            "null true false undefined None True False"
        ).split(" "),
    );

    const TOKEN =
        /(\/\/.*|#.*)|(\bf?"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(\b\d+\b)|([A-Za-z_]\w*)(?=(!?\())?|([\s\S])/g;

    type Tok = { t: string; c: string };

    function tokenize(line: string): Tok[] {
        const out: Tok[] = [];
        for (const m of line.matchAll(TOKEN)) {
            const [text, comment, str, num, ident, call] = m;
            let c = "plain";
            if (comment) c = "comment";
            else if (str) c = "string";
            else if (num) c = "number";
            else if (ident) {
                if (KEYWORDS.has(ident)) c = "keyword";
                else if (call && /^[A-Z]/.test(ident)) c = "type";
                else if (call) c = "fn";
                else if (/^[A-Z]/.test(ident)) c = "type";
                else c = "var";
            }
            out.push({ t: text, c });
        }
        return out;
    }

    const maxLines = Math.max(...files.map((f) => f.code.split("\n").length));

    let editorEl: HTMLElement | undefined = $state();
    let needle = $state("");

    onMount(() => {
        const onSelect = () => {
            const sel = getSelection();
            const text = sel?.toString().trim() ?? "";
            const inside = !!editorEl && !!sel?.anchorNode && editorEl.contains(sel.anchorNode);
            needle = inside && /^\w+$/.test(text) ? text : "";
        };
        document.addEventListener("selectionchange", onSelect);
        return () => document.removeEventListener("selectionchange", onSelect);
    });

    let active = $state(0);
    let userPicked = false;
    const file = $derived(files[active]);
    const lines = $derived(file.code.split("\n").map(tokenize));

    function pick(i: number) {
        userPicked = true;
        active = i;
    }

    function onKey(e: KeyboardEvent) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const dir = e.key === "ArrowRight" ? 1 : -1;
        pick((active + dir + files.length) % files.length);
        (document.getElementById(`tab-${files[active].id}`) as HTMLElement)?.focus();
    }

    onMount(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const timer = setInterval(() => {
            if (userPicked) return clearInterval(timer);
            active = (active + 1) % files.length;
        }, 5000);
        return () => clearInterval(timer);
    });
</script>

<div class="window">
    <div class="titlebar">
        <div class="lights" aria-hidden="true">
            <i></i><i></i><i></i>
        </div>
        <span class="title">kiln-db - {file.name}</span>
    </div>

    <div class="tabs" role="tablist" aria-label="Language" tabindex="-1" onkeydown={onKey}>
        {#each files as f, i}
            {@const Logo = f.logo}
            <button
                id="tab-{f.id}"
                class="tab"
                class:on={i === active}
                role="tab"
                aria-selected={i === active}
                aria-controls="panel"
                tabindex={i === active ? 0 : -1}
                onclick={() => pick(i)}
            >
                <Logo size={15} />
                {f.name}
            </button>
        {/each}
    </div>

    <div class="crumbs">src <span>›</span> {file.name}</div>

    <div class="editor" bind:this={editorEl} style="--lines:{maxLines}" id="panel" role="tabpanel" aria-labelledby="tab-{file.id}">
        {#each lines as toks, i}
            <div class="ln"><span class="num">{i + 1}</span><span class="code">{#each toks as t}<span class={t.c} class:hit={needle !== "" && t.t === needle}>{t.t}</span>{/each}</span></div>
        {/each}
    </div>

    <div class="status">
        <span>main</span>
        <span class="grow"></span>
        <span>{file.lang}</span>
        <span>UTF-8</span>
    </div>
</div>

<style>
    .window {
        --bg: #1e1e1e;
        --bar: #181818;
        --tab-off: #2a2a2a;
        --gutter: #6e7681;
        max-width: 820px;
        margin: 0 auto;
        overflow: hidden;
        text-align: left;
        border: 2px solid var(--line);
        border-radius: 22px;
        background: var(--bg);
        font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
        font-size: 0.85rem;
        -webkit-user-select: none;
        user-select: none;
    }

    .titlebar {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.7rem 1rem;
        background: var(--bar);
    }

    .lights {
        position: absolute;
        left: 1rem;
        display: flex;
        gap: 0.45rem;
    }

    .lights i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #3a3a3a;
    }

    .lights i:nth-child(1) { background: #ff5f57; }
    .lights i:nth-child(2) { background: #febc2e; }
    .lights i:nth-child(3) { background: #28c840; }

    .title {
        color: var(--gutter);
        font-size: 0.78rem;
    }

    .tabs {
        display: flex;
        overflow-x: auto;
        background: var(--bar);
        scrollbar-width: none;
    }

    .tab {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        flex: none;
        padding: 0.6rem 1.1rem;
        border: 0;
        border-top: 2px solid transparent;
        background: var(--tab-off);
        color: var(--gutter);
        font: inherit;
        cursor: pointer;
        transition: color 0.15s;
    }

    .tab:hover { color: #d4d4d4; }

    .tab.on {
        background: var(--bg);
        color: #e6e6e6;
        border-top-color: var(--accent);
    }

    .tab:focus-visible {
        outline: 2px solid var(--accent);
        outline-offset: -2px;
    }

    .crumbs {
        padding: 0.4rem 1rem;
        color: var(--gutter);
        font-size: 0.75rem;
    }

    .crumbs span { margin: 0 0.25rem; }

    .editor {
        --lh: 1.36rem;
        height: calc(var(--lines) * var(--lh) + 1.5rem);
        padding: 0.5rem 0 1rem;
        overflow: auto;
        color: #d4d4d4;
        line-height: var(--lh);
        tab-size: 4;
    }

    .ln { display: flex; min-width: max-content; }

    .num {
        flex: none;
        width: 3.2rem;
        padding-right: 1rem;
        text-align: right;
        color: var(--gutter);
        user-select: none;
    }

    .code {
        white-space: pre;
        padding-right: 1.5rem;
        cursor: text;
        -webkit-user-select: text;
        user-select: text;
    }

    .editor :global(*::selection) {
        background: #264f78;
    }

    .hit {
        background: rgba(173, 214, 255, 0.15);
        border-radius: 2px;
    }

    .keyword { color: #c586c0; }
    .string  { color: #ce9178; }
    .comment { color: #6a9955; font-style: italic; }
    .number  { color: #b5cea8; }
    .type    { color: #4ec9b0; }
    .fn      { color: #dcdcaa; }
    .var     { color: #9cdcfe; }

    .status {
        display: flex;
        gap: 1.1rem;
        padding: 0.3rem 1rem;
        background: #007acc;
        color: #fff;
        font-size: 0.74rem;
    }

    .grow { flex: 1; }

    @media (max-width: 560px) {
        .editor { --lh: 1.25rem; font-size: 0.78rem; }
        .num { width: 2.4rem; }
    }
</style>