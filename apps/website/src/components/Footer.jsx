"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    Github,
} from "lucide-react";
import Logo from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import SocialLinks from "@/components/SocialLinks";


export default function Footer() {
    const year = useMemo(() => new Date().getFullYear(), []);

    const footerSections = [
        {
            title: "All Programs",
            links: [
                { label: "Programs", href: "/programs" },
                { label: "Full-Stack Development", href: "/programs/fullstack" },
                { label: "Digital Marketing", href: "/programs/digitalmarketing" },
                { label: "BCA Programs", href: "/programs/bca" },
                { label: "BBA Programs", href: "/programs/bba" },
            ],
        },
        {
            title: "Legal Stuff",
            links: [
                { label: "Privacy Policy", href: "/legal/privacy-policy" },
                { label: "Refund Policy", href: "/legal/refund-policy" },
                { label: "Terms of Service", href: "/legal/terms-of-service" },
                { label: "Sitemap", href: "/sitemap" },
            ],
        },
        {
            title: "Resources",
            links: [
                { label: "Blog", href: "/blog" },
                { label: "FAQs", href: "/faqs" },
                { label: "Support", href: "/support" },
                { label: "10-Minute Skill Test", href: "/10-minutes-test" },
                { label: "Careers", href: "/careers" },
            ],
        },
    ];

    const socialLinks = [
        { name: "Facebook", Icon: Facebook, url: process.env.NEXT_PUBLIC_FACEBOOK_URL },
        { name: "Twitter", Icon: Twitter, url: process.env.NEXT_PUBLIC_TWITTER_URL },
        { name: "LinkedIn", Icon: Linkedin, url: process.env.NEXT_PUBLIC_LINKEDIN_URL },
        { name: "Instagram", Icon: Instagram, url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
        { name: "YouTube", Icon: Youtube, url: process.env.NEXT_PUBLIC_YOUTUBE_URL },
        { name: "GitHub", Icon: Github, url: process.env.NEXT_PUBLIC_GITHUB_URL },
    ].filter(link => Boolean(link.url));

    return (
        <footer className="border-t border-border bg-background/90 backdrop-blur-md pt-8">
            {/* Top */}
            <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-12 desk:gap-6 lg:gap-8 px-6 desk:px-8 lg:px-12 py-20 sm:grid-cols-2 desk:grid-cols-8 lg:grid-cols-7">
                {/* Brand & Address */}
                <div className="flex flex-col sm:col-span-2 desk:col-span-3 lg:col-span-2 relative z-20 pr-0 desk:pr-8">
                    <Link href="/" className="mb-6 flex items-center gap-2">
                        <Logo />
                    </Link>

                    <address className="not-italic text-sm text-muted-foreground mb-6 leading-relaxed max-w-xs flex items-start gap-2">
                        <span className="shrink-0 mt-0.5 pointer-events-none">📍</span>
                        <span>A-3, behind Manoj Dhaba, Bhagwan Talkies crossing, Indra Puri, New Agra Colony, Agra, Uttar Pradesh 282005</span>
                    </address>

                    {/* Social */}
                    <SocialLinks showLabel={false} className="-ml-1.5 gap-3 md:gap-4" />
                </div>

                {/* Desktop columns */}
                {footerSections.map(section => (
                    <div key={section.title} className="hidden md:block">
                        <h3 className="mb-4 text-lg font-semibold text-muted-foreground">
                            {section.title}
                        </h3>

                        <ul className="space-y-2 text-sm">
                            {section.links.map(link => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground transition-colors  hover:text-primary "
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Mobile accordion */}
                <div className="md:hidden">
                    <Accordion type="single" collapsible>
                        {footerSections.map(section => (
                            <AccordionItem key={section.title} value={section.title}>
                                <AccordionTrigger className="text-muted-foreground font-semibold">
                                    {section.title}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2 text-sm text-background">
                                        {section.links.map(link => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="transition-colors text-accent-foreground"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Map column (Visible on all devices) */}
                <div className="block sm:col-span-2 desk:col-span-2 desk:pl-4">
                    <h3 className="mb-4 text-lg font-semibold text-muted-foreground">
                        Our Location
                    </h3>
                    <div className="w-full h-56 desk:h-full min-h-[16rem] relative rounded-[1.5rem] overflow-hidden shadow-lg border border-border group">
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-[1.5rem] z-10" />
                        <iframe
                            title="SkillYards Location"
                            className="absolute inset-0 w-full h-full border-0 filter dark:brightness-90 dark:contrast-125 dark:saturate-50" 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.2462724676166!2d78.00276847614923!3d27.211416747188895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974776a3f3b61d9%3A0xc26cc82e5a39a7fc!2sSkillyards%20Versatility%20Pvt.!5e0!3m2!1sen!2sin!4v1774862128520!5m2!1sen!2sin"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-border py-4">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
                    {/* Left Content */}
                    <div className="text-center sm:text-left">
                        © {year} SkillYards Versatilitty

                    </div>
                </div>
            </div>
        </footer>
    );
}
