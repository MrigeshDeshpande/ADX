"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Particles from "@/components/Particles";

import slides from "@/data/home-slides.json";
import { useTheme } from "@/app/context/ThemeContext";
import { LazyMotion, domAnimation, m } from "framer-motion";

const AUTOPLAY_DELAY = 6000;

export default function HeroCarousel() {
    const [api, setApi] = React.useState(null);
    const [current, setCurrent] = React.useState(0);
    const [progressKey, setProgressKey] = React.useState(0);
    const { theme } = useTheme();


    const particleColor = theme === "light" ? "#14248a" : "#d4c2fc";
    const bgColor = "bg-background text-foreground";

    const autoplay = React.useRef(null);
    if (!autoplay.current) {
        autoplay.current = Autoplay({
            delay: AUTOPLAY_DELAY,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        });
    }

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
            setProgressKey((k) => k + 1);
        };

        api.on("select", onSelect);
        return () => api.off("select", onSelect);
    }, [api]);

    return (
        <LazyMotion features={domAnimation}>
        <section className={`relative w-full h-80vh overflow-hidden ${bgColor} transition-colors duration-500`}>
            {/* Background Particles layer */}
            <div className="absolute inset-0 z-2">
                <Particles
                    particleColors={[particleColor]}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover
                    alphaParticles={false}
                    disableRotation={false}
                    pixelRatio={1}
                />
            </div>


            <div className={`absolute inset-0 z-0 bg-linear-to-r from-background/50 to-transparent pointer-events-none`} />

            <Carousel
                setApi={setApi}
                plugins={[autoplay.current]}
                opts={{ loop: true }}
                className="relative z-10 h-full w-full pointer-events-none"
            >
                <CarouselContent className="h-full ml-0 pt-8">
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="pl-0 h-[70vh] min-h-[520px]">
                            <div className="relative h-full w-full">
                                {/* Content */}
                                <div className="relative z-10 flex h-full items-center justify-center text-center">
                                    <div className="mx-auto w-full max-w-7xl px-6 sm:px-12 md:px-24">
                                        <div className="max-w-3xl mx-auto flex flex-col items-center">
                                                <m.p
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2, duration: 0.5 }}
                                                    className={`mb-4 inline-block rounded-full ${theme === "light" ? "bg-primary/10 text-primary border border-primary/20" : "bg-primary/20 text-primary border border-primary/30"} px-5 py-1.5 text-sm font-semibold tracking-wide backdrop-blur pointer-events-auto`}
                                                >
                                                    {slide.subtitle}
                                                </m.p>

                                                <m.h1
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3, duration: 0.5 }}
                                                    className={`text-3xl font-extrabold tracking-tight sm:text-5xl md:text-5xl text-foreground pointer-events-auto leading-tight`}
                                                >
                                                    {slide.title}
                                                </m.h1>

                                                <m.p
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4, duration: 0.5 }}
                                                    className={`mt-4 sm:mt-6 text-lg sm:text-md md:text-lg text-muted-foreground pointer-events-auto font-medium max-w-2xl leading-relaxed px-2 sm:px-0`}
                                                >
                                                    {slide.description}
                                                </m.p>

                                                <m.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5, duration: 0.5 }}
                                                    className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto px-4 sm:px-0"
                                                >
                                                    <div className="relative p-0.5 rounded-full bg-linear-to-r from-violet-500 via-primary to-blue-500 transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
                                                        <Link
                                                            href={slide.ctaHref}
                                                            className="flex items-center justify-center rounded-full bg-background px-8 sm:px-10 py-2.5 sm:py-3 text-base sm:text-lg font-semibold text-foreground"
                                                        >
                                                            {slide.cta}
                                                        </Link>
                                                    </div>

                                                    <Button
                                                        asChild
                                                        size="lg"
                                                        variant="outline"
                                                        className={`rounded-full backdrop-blur border-border/50 bg-background/50 px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold text-foreground hover:bg-muted transition-transform hover:scale-105 w-full sm:w-auto`}
                                                    >
                                                        <Link href="/contact">Book Free Career Counselling</Link>
                                                    </Button>
                                                </m.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="hidden md:flex left-6 bg-background/80 hover:bg-background text-foreground border-border shadow-md pointer-events-auto" />
                <CarouselNext className="hidden md:flex right-6 bg-background/80 hover:bg-background text-foreground border-border shadow-md pointer-events-auto" />
            </Carousel>

            <div className={`absolute bottom-0 left-0 z-30 h-[3px] w-full bg-muted overflow-hidden`}>
                <m.div
                    key={progressKey}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: AUTOPLAY_DELAY / 1000, ease: "linear" }}
                    className="h-full bg-primary"
                />
            </div>



            {/* Bullets */}
            <div
                className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 pointer-events-auto"
                aria-label="Slide navigation"
            >
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={current === index ? "true" : undefined}
                        className={`h-2.5 rounded-full transition-all duration-300 ${current === index
                            ? "w-8 bg-primary"
                            : `w-2.5 bg-muted hover:bg-muted-foreground/50`
                            }`}
                    />
                ))}
            </div>
        </section>
        </LazyMotion>
    );
}
