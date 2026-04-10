"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix = "+" }) {
    const textRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                const duration = 1200;
                const startTime = performance.now();

                const updateCounter = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    if (elapsedTime < duration) {
                        const currentVal = Math.ceil((elapsedTime / duration) * value);
                        if (textRef.current) {
                            textRef.current.textContent = currentVal + suffix;
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (textRef.current) {
                            textRef.current.textContent = value + suffix;
                        }
                    }
                };

                requestAnimationFrame(updateCounter);
                observer.disconnect();
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [value, suffix]);

    return (
        <span ref={containerRef} className="text-4xl font-extrabold">
            <span ref={textRef}>0{suffix}</span>
        </span>
    );
}

export default function PlacementStats() {
    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div>
                        <Counter value={1200} />
                        <p className="mt-2 text-muted-foreground">
                            Students Trained
                        </p>
                    </div>
                    <div>
                        <Counter value={300} />
                        <p className="mt-2 text-muted-foreground">
                            Internships Offered
                        </p>
                    </div>
                    <div>
                        <Counter value={180} />
                        <p className="mt-2 text-muted-foreground">
                            Hiring Partners
                        </p>
                    </div>
                    <div>
                        <Counter value={95} suffix="%" />
                        <p className="mt-2 text-muted-foreground">
                            Placement Success
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
