import { Inter, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "@/app/styles/globals.css";

import { ThemeProvider } from "@/app/context/ThemeContext";
import BackToTop from "@/components/BackToTop";
import JsonLd from "@/components/JsonLd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema/global";
const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-playfair",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-inter",
    display: "swap",
});

const sourceSans = Source_Sans_3({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-source-sans",
    display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.add('light')}}catch(e){}})();`;

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sourceSans.variable} ${playfair.variable}`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />

                <JsonLd data={organizationSchema} id="organization-schema" />
                <JsonLd data={websiteSchema} id="website-schema" />
            </head>

            <body
                className={`antialiased
                bg-foreground
                text-primary-foreground
                transition-colors duration-500 ease-in-out`}
            >
                <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`}
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="min-h-screen bg-background transition-colors duration-500">
                        <Header />

                        <main className="relative z-10">{children}</main>

                        <Footer />
                        <BackToTop />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}