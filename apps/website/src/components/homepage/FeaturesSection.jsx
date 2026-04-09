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

                    {/* Right: Visual Content */}
                    <div className="relative w-full mt-8 md:mt-0">
                        {/* Desktop/Tablet: BounceCards Visual */}
                        <div className="hidden md:flex justify-end items-center min-h-[400px]">
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

                        {/* Mobile: Feature Cards List */}
                        <div className="flex md:hidden flex-col gap-2 w-full">
                            {cardsData.map((card, idx) => (
                                <div key={idx} className="flex flex-col bg-card/50 backdrop-blur-lg border border-border/60 p-4 rounded-[2rem] shadow-md relative overflow-hidden group hover:border-primary/50 transition-colors">
                                    <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform scale-[2] pointer-events-none">
                                        {card.icon}
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary shrink-0 border border-primary/20 shadow-inner">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-xl font-extrabold text-foreground mb-2.5 tracking-tight">{card.title}</h3>
                                    <p className="text-[15px] text-muted-foreground leading-relaxed font-medium">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}