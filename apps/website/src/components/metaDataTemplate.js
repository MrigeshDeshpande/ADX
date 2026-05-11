const facebookOpenGraph = '/images/opengraph/facebook-og.webp';
const twitterOpenGraph = '/images/opengraph/twitter-og.webp';

export const metadataBase = new URL('https://www.skillyards.in');

export const commonMetadata = {
    metadataBase,

    title: {
        template: '%s | SkillYards.in',
        default: 'SkillYards.in | IT Training Institute in Agra',
    },

    description:
        'SkillYards is an IT training institute in Agra offering project-based BCA, BBA, full-stack development, and digital marketing programs with practical training and career-focused learning.',

    other: {
        'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
        'yandex-verification': process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
        'algolia-site-verification': process.env.NEXT_PUBLIC_ALGOLIA_VERIFICATION,
    },

    alternates: {
        types: {
            'application/rss+xml': 'https://www.skillyards.in/feed.xml',
        },
        canonical: 'https://www.skillyards.in',
    },

    applicationName: 'SkillYards.in',

    keywords: [
        'SkillYards',
        'SkillYards.in',
        'IT training institute in Agra',
        'coding institute in Agra',
        'computer training institute in Agra',
        'full-stack development training in Agra',
        'digital marketing training in Agra',
        'BCA practical training in Agra',
        'BBA practical training in Agra',
        'project-based training institute',
        'career-focused training institute',
    ],

    archives: ['https://www.skillyards.in/courses'],
    category: 'education',

    openGraph: {
        url: 'https://www.skillyards.in',
        siteName: 'SkillYards.in',
        locale: 'en_US',
        type: 'website',
        fb: {
            app_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        },
        images: [
            {
                url: facebookOpenGraph,
                width: 1200,
                height: 630,
                alt: 'SkillYards.in Open Graph Image',
            },
        ],
    },

    twitter: {
        card: 'summary_large_image',
        site: '@SkillYards',
        creator: '@developervijay',
        images: [
            {
                url: twitterOpenGraph,
                width: 1200,
                height: 630,
                alt: 'SkillYards.in Twitter Preview',
            },
        ],
    },

    manifest: '/images/favicons/manifest.json',

    icons: {
        icon: [
            { url: '/images/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/images/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/images/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/images/favicons/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: [
            { url: '/images/favicons/apple-icon-57x57.png', sizes: '57x57' },
            { url: '/images/favicons/apple-icon-60x60.png', sizes: '60x60' },
            { url: '/images/favicons/apple-icon-72x72.png', sizes: '72x72' },
            { url: '/images/favicons/apple-icon-76x76.png', sizes: '76x76' },
            { url: '/images/favicons/apple-icon-114x114.png', sizes: '114x114' },
            { url: '/images/favicons/apple-icon-120x120.png', sizes: '120x120' },
            { url: '/images/favicons/apple-icon-144x144.png', sizes: '144x144' },
            { url: '/images/favicons/apple-icon-152x152.png', sizes: '152x152' },
            { url: '/images/favicons/apple-icon-180x180.png', sizes: '180x180' },
        ],
        other: [
            { rel: 'mask-icon', url: '/images/favicons/safari-pinned-tab.svg', color: '#2563EB' },
        ],
    },

    additionalMeta: [
        { name: 'robots', content: 'max-image-preview:large' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'msapplication-TileImage', content: '/images/favicons/ms-icon-144x144.png' },
        { name: 'msapplication-config', content: '/images/favicons/browserconfig.xml' },
        {
            httpEquiv: 'Content-Security-Policy',
            content:
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://cdn.jsdelivr.net https://pagead2.googlesyndication.com https://www.googletagmanager.com https://vercel.live https://play.google.com; connect-src 'self' https://api.skillyards.in https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://vercel.live https://play.google.com; frame-src 'self' https://www.googletagmanager.com; referrer origin-when-cross-origin;",
        },
        { name: 'referrer', content: 'origin-when-cross-origin' },
        { name: 'copyright', content: 'SkillYards.in' },
        { name: 'author', content: 'hello@skillyards.in' },
        { name: 'og:street-address', content: 'Agra, Uttar Pradesh, India' },
        { name: 'og:locality', content: 'Agra' },
        { name: 'og:region', content: 'Uttar Pradesh' },
        { name: 'og:postal-code', content: '282005' },
        { name: 'og:country-name', content: 'India' },
    ],
};
