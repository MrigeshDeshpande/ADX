"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Smartphone, Settings, Search, Share2, Target, Palette } from "lucide-react";
import { IconCloud } from "@/components/ui/icon-cloud";

const cloudImages = [
    "https://cdn.simpleicons.org/react/61DAFB",
    "https://cdn.simpleicons.org/nextdotjs/ffffff",
    "https://cdn.simpleicons.org/nodedotjs/339933",
    "https://cdn.simpleicons.org/typescript/3178C6",
    "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    "https://cdn.simpleicons.org/mongodb/47A248",
    "https://cdn.simpleicons.org/postgresql/4169E1",
    "https://cdn.simpleicons.org/docker/2496ED",
    "https://cdn.simpleicons.org/github/ffffff",
    "https://cdn.simpleicons.org/vercel/ffffff",
    "https://cdn.simpleicons.org/figma/F24E1E",
    "https://cdn.simpleicons.org/googleads/4285F4",
    "https://cdn.simpleicons.org/meta/0082FB",
    "https://cdn.simpleicons.org/instagram/E4405F",
    "https://cdn.simpleicons.org/linkedin/0A66C2",
    "https://cdn.simpleicons.org/youtube/FF0000",
    "https://cdn.simpleicons.org/googlesearchconsole/458CF5",
    "https://cdn.simpleicons.org/semrush/FF642D",
];

const services = [
    {
        icon: Code2,
        title: "Full-Stack Web Development",
        description: "End-to-end web products with React, Next.js, Node.js & cloud-native databases.",
        highlights: ["React & Next.js", "REST & GraphQL", "Cloud Deploy"],
        image: "/images/services/web-development.png",
        gradient: "from-indigo-500/90 to-violet-600/90",
        grid: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        description: "Polished, high-performance mobile apps for iOS and Android.",
        highlights: ["React Native", "iOS & Android", "Push Notifications"],
        image: "/images/services/mobile-app.png",
        gradient: "from-teal-500/90 to-cyan-600/90",
        grid: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
    },
    {
        icon: Settings,
        title: "Custom Software",
        description: "Bespoke dashboards, automation tools, and CRM systems.",
        highlights: ["Automation", "Dashboards", "Microservices"],
        image: "/images/services/custom-software.png",
        gradient: "from-amber-500/90 to-orange-600/90",
        grid: "lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2",
    },
    {
        icon: Search,
        title: "SEO & Content",
        description: "Data-driven SEO strategies that drive organic traffic.",
        highlights: ["Technical SEO", "Content Strategy", "Analytics"],
        image: "/images/services/seo-content.png",
        gradient: "from-emerald-500/90 to-green-600/90",
        grid: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
    },
    {
        icon: Share2,
        title: "Social Media Marketing",
        description: "Grow your brand across Instagram, LinkedIn & YouTube.",
        highlights: ["Instagram", "Reels & Shorts", "Community"],
        image: "/images/services/social-media.png",
        gradient: "from-pink-500/90 to-rose-600/90",
        grid: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
    },
    {
        icon: Target,
        title: "Performance Marketing",
        description: "ROI-focused Google Ads and Meta Ads campaigns that convert.",
        highlights: ["Google Ads", "Meta Ads", "Retargeting"],
        image: "/images/services/performance-marketing.png",
        gradient: "from-blue-500/90 to-sky-600/90",
        grid: "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-4",
    },
    {
        icon: Palette,
        title: "Brand Identity & Design",
        description: "Cohesive brand identities — logo, color systems & UI/UX kits.",
        highlights: ["Logo Design", "Style Guides", "UI/UX"],
        image: "/images/services/brand-design.png",
        gradient: "from-red-500/90 to-orange-500/90",
        grid: "lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

function BentoCard({ service, className = "" }) {
    const Icon = service.icon;

    return (
        <div className={`${service.grid} ${className}`}>
        <m.div
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl border border-white/10 dark:border-white/5 shadow-md w-full h-full"
        >
            {/* Gradient hover overlay */}
            <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/55 to-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-end h-full p-5">
                {/* Icon */}
                <div className="mb-2 w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Icon className="w-4 h-4 text-white" />
                </div>

                <h3 className="font-bold text-white text-base leading-snug mb-1"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                    {service.title}
                </h3>

                <p className="text-white/70 text-xs leading-relaxed mb-2 line-clamp-2"
                    style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                    {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {service.highlights.map((h) => (
                        <span key={h} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/15 text-white/85 border border-white/10">
                            {h}
                        </span>
                    ))}
                </div>
            </div>
        </m.div>
        </div>
    );
}

export default function ServicesSection() {
    const [showAllMobileCards, setShowAllMobileCards] = useState(false);

    return (
        <LazyMotion features={domAnimation}>
        <section className="py-16 lg:py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-[90%] max-w-[1400px] mx-auto">
                {/* Header + Icon Cloud */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                    {/* Left: Typography */}
                    <m.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">What We Do</p>
                        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                            Our <span className="text-primary italic">Services</span>
                        </h2>
                        <p className="mt-4 text-base text-muted-foreground max-w-xl md:max-w-2xl md:mx-auto lg:mx-0 leading-relaxed"
                            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>
                            End-to-end technology and digital marketing solutions designed to scale your business.
                        </p>
                        <div className="w-16 h-1 bg-linear-to-r from-primary/80 to-secondary/60 rounded-full mt-5 mx-auto lg:mx-0" />
                    </m.div>

                    {/* Right: Icon Cloud */}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[280px] lg:max-w-[340px] aspect-square flex items-center justify-center pointer-events-none">
                            <IconCloud images={cloudImages} />
                        </div>
                    </div>
                </div>

                <m.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-3"
                    style={{ gridTemplateRows: "repeat(3, clamp(160px, 20vh, 210px))" }}
                >
                    {services.map((service, index) => (
                        <BentoCard
                            key={service.title}
                            service={service}
                            className={index < 4 || showAllMobileCards ? "block" : "hidden lg:block"}
                        />
                    ))}
                </m.div>

                {!showAllMobileCards && (
                    <div className="mt-2 flex justify-center lg:hidden">
                        <button
                            type="button"
                            onClick={() => setShowAllMobileCards(true)}
                            className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:bg-accent"
                        >
                            Load More Services
                        </button>
                    </div>
                )}

                {/* CTA */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex justify-center w-full pt-3"
                >
                    <Link href="/services"
                        className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 font-bold text-base text-primary-foreground bg-primary rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
                    >
                        <span style={{ fontFamily: "var(--font-source-sans), sans-serif" }}>Explore All Services</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </m.div>
            </div>
        </section>
        </LazyMotion>
    );
}
