export const content = {
    brand: "kiln",
    nav: [
        { label: "Home", href: "#top" },
        { label: "About", href: "#about" },
        { label: "Features", href: "#features" },
    ],
    hero: {
        title: "kiln.",
        tagline: ["fired up.", "built by hand.", "ready to ship."],
    },
    about: [
        {
            title: "What is Kiln?",
            body: [
                "Kiln is a all-in-one platform for hosting your own databases and CDN, giving you control ovr your data and content.",
                "Built for flexible infrastructure that adapts to your needs.",
            ],
        },
        {
            title: "Open source - community driven",
            body: ["Kiln is open to pull requests by others to help get this done."],
            link: { label: "Learn more", href: "https://git.itsboshytime.com/ItsBr0dyy/kiln" },
        },
    ],
    soon: {
        lines: ["Kiln's", "Big Thing"],
        body: [
            "Kiln is built to make infrastructure easy for consumers.",
            "Host a full backend on our end and no worries for you.",
        ],
    },

    featuresTitle: "Features",
    features: [
        { title: "Databases", body: "You can host your own database that talks directly to your app." },
        { title: "Stability", body: "Connect to your database with no delay." },
        { title: "Docker Hosting", body: "Deploy your Docker containers and run them right next to your database." },
        { title: "CDN Hosting", body: "Serve your files and assets quickly, wherever your users are." },
        { title: "All in One Place", body: "Databases, containers and CDN under one account, so you're not juggling providers." },
        { title: "Simple Setup", body: "Spin up a database or container in a few clicks and get straight to building." },
        { title: "Fair Pricing", body: "Straightforward pricing with no surprise bills." },
        { title: "Room to Grow", body: "Start small and scale up without moving to a new provider." },
        { title: "Your Data", body: "Your data stays yours, and you can take it with you whenever you want." },
    ],
    compare: {
        title: "Why Kiln?",
        left: "Kiln",
        right: "Separate providers",
        rows: [
            ["Databases, Docker containers and CDN in one place", "A different provider for each"],
            ["One account and one bill", "Multiple dashboards and invoices"],
            ["Containers that run right next to your database", "Extra network hops between services"],
            ["Connect to your database with no delay", "Latency between your app and your data"],
        ],
    },
    cta: {
        title: "Ready to fire it up?",
        body: "Log in with GitHub to get started.",
    },
    footer: [
        {
            title: "Company",
            links: [
                { label: "About", href: "#about" },
                { label: "Features", href: "#features" },
            ],
        },
        {
            title: "Resources",
            links: [],
        },
        {
            title: "Follow",
            links: [{ label: "GitHub", href: "https://github.com/kilndb" }],
        },
    ],
} as const;