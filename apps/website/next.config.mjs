/** @type {import('next').NextConfig} */

console.log("NODE_ENV:", process.env.NODE_ENV);

const nextConfig = {
    reactCompiler: false,

    async headers() {
        const isDev = process.env.NODE_ENV !== "production";

        const staticCacheHeaders = {
            source: "/_next/static/(.*)",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                },
            ],
        };

        const swHeaders = {
            source: "/sw.js",
            headers: [
                {
                    key: "Content-Type",
                    value: "application/javascript; charset=utf-8",
                },
                {
                    key: "Service-Worker-Allowed",
                    value: "/",
                },
            ],
        };

        const cspHeaders = {
            source: "/(.*)",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value:
                        "default-src 'self'; " +

                        // Scripts
                        "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://utteranc.es https://www.google.com https://www.gstatic.com https://www.googletagmanager.com; " +

                        // Frames
                        "frame-src https://utteranc.es https://www.google.com https://www.gstatic.com https://www.youtube.com https://www.googletagmanager.com; " +

                        // API calls 
                        "connect-src 'self' https://api.github.com https://www.google.com https://www.gstatic.com https://skillyards-backend.vercel.app https://www.googletagmanager.com; " +

                        // Images
                        "img-src 'self' data: blob: https://picsum.photos https://images.unsplash.com https://cdn.sanity.io https://cdn.simpleicons.org https://img.youtube.com; " +

                        // Styles
                        "style-src 'self' 'unsafe-inline'; " +

                        // Fonts
                        "font-src 'self' data:; " +

                        // Workers
                        "worker-src 'self' blob:;",
                },
            ],
        };

        return isDev
            ? [swHeaders]
            : [swHeaders, staticCacheHeaders, cspHeaders];
    },

    images: {
        remotePatterns: [
            { protocol: "https", hostname: "picsum.photos" },
            { protocol: "https", hostname: "randomuser.me" },
            { protocol: "https", hostname: "img.youtube.com" },
            { protocol: "https", hostname: "i.ytimg.com" },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "admin.skillyards.in",
                pathname: "/storage/**",
            },
            {
                protocol: "https",
                hostname: "admin.skillyards.in",
                pathname: "/images/**",
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                pathname: "/images/**",
            },
        ],
    },

    async redirects() {
        return [
            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "skillyards.in",
                    },
                ],
                destination: "https://www.skillyards.in/:path*",
                permanent: true,
            },

            { source: "/about-us", destination: "/about", permanent: true },
            { source: "/contact-us", destination: "/contact", permanent: true },
            { source: "/courses", destination: "/programs", permanent: true },
            { source: "/blogs", destination: "/blog", permanent: true },
            { source: "/reviews", destination: "/testimonials", permanent: true },
            { source: "/terms-and-conditions", destination: "/terms-of-service", permanent: true },
            { source: "/gallery/photos", destination: "/gallery/images", permanent: true },
        ];
    },
};

export default nextConfig;