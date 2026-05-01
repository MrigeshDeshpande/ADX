"use client";

import { Code2, GraduationCap, BarChart2, Megaphone, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const ProgramsShowcase = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [hovered, setHovered] = useState(-1);

    // Detect mobile
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);

        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const trainingPrograms = [
        {
            title: "Full-Stack Development",
            description: "Understand how real websites and applications are built, not just how they look. You work on live projects, learn frontend and backend logic, and build a portfolio recruiters care about.",
            link: "/programs/fullstack",
            icon: <Code2 className="w-6 h-6 md:w-8 md:h-8 text-teal-400" />,
            bg: "url('/images/programmes/full-stack.jpg')",
        },
        {
            title: "Digital Marketing",
            description: "Master SEO, Google Ads, Meta Ads & analytics. Get Google & Meta certified in just 3 months.",
            link: "/programs/digitalmarketing",
            icon: <Megaphone className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />,
            bg: "url('/images/programmes/uiux.jpg')",
        },
        {
            title: "BCA Program",
            description: "3-year university degree in Computer Applications with on-job training and 95% placement support.",
            link: "/programs/bca",
            icon: <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-orange-400" />,
            bg: "url('/images/programmes/bca.jpg')",
        },
        {
            title: "BBA Program",
            description: "3-year business degree with digital marketing specialisation, live projects and industry certifications.",
            link: "/programs/bba",
            icon: <BarChart2 className="w-6 h-6 md:w-8 md:h-8 text-red-400" />,
            bg: "url('/images/programmes/mca.jpg')",
        },
    ];

    return (
        <section className="relative bg-background">
            <div className="mx-auto py-16 px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row gap-20 justify-around items-center">
                    {/* Header */}
                    <div className="w-full md:w-[20%] xl:w-[10%] text-center md:text-left mb-8 md:mb-0 mr-2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary-background">
                            LEARN.
                            <br className="hidden md:block" />
                            GROW.
                            <br className="hidden md:block" />
                            ACHIEVE.
                        </h2>
                        <p className="text-lg md:text-xl text-primary">
                            Find your passion
                        </p>
                    </div>

                    {/* Programs */}
                    <div className="w-full md:overflow-x-auto">
                        <div
                            className={`
                flex 
                ${isMobile ? "flex-col" : "flex-row"} 
                gap-4 
                w-full 
                p-4
              `}
                        >
                            {trainingPrograms.map((program, index) => (
                                <div
                                    key={program.title}
                                    onMouseEnter={() => !isMobile && setHovered(index)}
                                    onMouseLeave={() => !isMobile && setHovered(-1)}
                                    onClick={() =>
                                        isMobile && setHovered(hovered === index ? -1 : index)
                                    }
                                    style={{
                                        backgroundImage: program.bg,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                    className={`
                    rounded-3xl
                    transition-all
                    duration-500
                    ease-in-out
                    cursor-pointer
                    relative
                    overflow-hidden
                    ${isMobile
                                            ? "w-full h-[220px] md:h-[350px]"
                                            : `h-[350px] ${hovered === index ? "w-[400px]" : "w-[250px]"}`
                                        }
                    ${isMobile && hovered === index ? "scale-105" : "scale-100"}
                  `}
                                >
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/40" />

                                    
                                    <div
                                        className={`
                      flex items-center justify-center w-full h-full
                      transition-all duration-500 relative
                      ${hovered === index
                                                ? "opacity-0 scale-0"
                                                : "opacity-100 scale-100"
                                            }
                    `}
                                    >
                                        <span
                                            className={`
                        text-gray-400 font-semibold text-lg whitespace-nowrap
                        ${!isMobile && "-rotate-90"}
                      `}
                                        >
                                            {program.title}
                                        </span>
                                    </div>

                                    {/* Hover / Active */}
                                    <div
                                        className={`
                      absolute inset-0
                      flex flex-col justify-between
                      p-4 md:p-6
                      transition-all duration-500
                      ${hovered === index
                                                ? "opacity-100 scale-100 translate-y-0"
                                                : "opacity-0 scale-95 translate-y-full"
                                            }
                    `}
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3">
                                                {program.icon}
                                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                                    {program.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-200 text-sm md:text-base">
                                                {program.description}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <Link
                                                href={program.link}
                                                aria-label={`Explore ${program.title}`}
                                                title={`Explore ${program.title}`}
                                                className="inline-flex items-center gap-2 bg-white text-[#030e5a] font-bold text-sm px-5 py-2.5 rounded-full hover:bg-white/90 hover:gap-3 transition-all duration-200 group"
                                            >
                                                Explore {program.title}
                                                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgramsShowcase;
