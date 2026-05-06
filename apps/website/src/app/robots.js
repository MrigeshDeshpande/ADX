export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/_next/",
                    "/api/",
                    "/admin/",
                    "/_error/",
                    "/unsubscribe",
                    "/feedback",
                ],
            },
        ],
        sitemap: "https://www.skillyards.in/sitemap.xml",
    };
}