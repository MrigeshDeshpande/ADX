"use client";

import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Laptop, Users, Clock, Award } from "lucide-react";
import features from "@/data/features.json";

const iconMap = {
    laptop: Laptop,
    users: Users,
    clock: Clock,
    award: Award,
};


import BounceCards from "@/components/BounceCards";

const images = [
    "https://picsum.photos/400/400?grayscale",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
    "https://picsum.photos/700/700?grayscale"
];

const transformStyles = [
    "rotate(5deg) translate(-120px)",
    "rotate(-5deg) translate(-40px)",
    "rotate(5deg) translate(40px)",
    "rotate(-5deg) translate(120px)"
];

export default function FeaturesSection() {
    const cardsData = features.map((feature, idx) => {
        const Icon = iconMap[feature.icon];
        return {
            title: feature.title,
            description: feature.description,
            icon: Icon ? <Icon className="w-8 h-8 text-primary drop-shadow-lg" /> : null,
            image: images[idx % images.length]
        };
    });

    return (
        <section className="py-24 sm:py-32 bg-background transition-colors duration-500 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center">

                    {/* Left: Text Content */}
                    <div className="flex flex-col justify-center space-y-8 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto md:mx-0">
                            <span className="text-sm font-semibold text-primary tracking-wide">Why Choose Us</span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                            The <span className="text-primary italic pr-2">SkillYards</span> Advantage
                        </h2>

                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
                            We focus on bridging the gap between education and industry by offering intensive programs that prepare you for real IT jobs. Stop learning theory and start building reality.
                        </p>

                      
                    </div>

                    {/* Right: BounceCards Visual */}
                    <div className="relative w-full flex justify-center md:justify-end items-center min-h-[400px]">
                        <div className="relative w-full max-w-[500px] h-[300px] sm:h-[400px] flex items-center justify-center perspective-1000">
                            <BounceCards
                                className="custom-bounceCards scale-90 sm:scale-100"
                                cards={cardsData}
                                containerWidth={500}
                                containerHeight={340}
                                animationDelay={0.5}
                                animationStagger={0.08}
                                easeType="elastic.out(1, 0.5)"
                                transformStyles={transformStyles}
                                enableHover={true}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}