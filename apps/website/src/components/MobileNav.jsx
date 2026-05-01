"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Sun, Moon, Laptop } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

export default function MobileNav({ onClose, theme, toggleTheme }) {
    return (
        <LazyMotion features={domAnimation}>
        <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 lg:hidden w-[calc(100%-2rem)] mx-auto max-w-[1100px]"
        >
            <Card className="rounded-2xl p-4 shadow-lg border border-border/60 bg-background/95 backdrop-blur-md">
                <div className="flex flex-col gap-1">
                    <MobileLink href="/" onClick={onClose}>Home</MobileLink>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="programs" className="border-none">
                            <AccordionTrigger className="py-2.5 px-4 rounded-xl hover:no-underline text-sm font-medium text-foreground hover:bg-accent/80 transition">
                                Programs
                            </AccordionTrigger>
                            <AccordionContent className="pl-4 pb-0 pt-1 border-l border-border/60 ml-2">
                                <div className="grid grid-cols-1 gap-1">
                                    <MobileLink href="/programs/bca" onClick={onClose}>
                                        BCA Programs
                                    </MobileLink>

                                    <MobileLink href="/programs/bba" onClick={onClose}>
                                        BBA Programs
                                    </MobileLink>
                                    <MobileLink href="/programs/fullstack" onClick={onClose}>
                                        Full-Stack Development
                                    </MobileLink>
                                    <MobileLink href="/programs/digitalmarketing" onClick={onClose}>
                                        Digital Marketing
                                    </MobileLink>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <MobileLink href="/blog" onClick={onClose}>Blog</MobileLink>
                    <MobileLink href="/about" onClick={onClose}>About</MobileLink>
                    <MobileLink href="/contact" onClick={onClose}>Contact</MobileLink>

                    <div className="border-t border-border/60 mt-2 pt-3">
                        <Link
                            href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                            onClick={onClose}
                            className="flex items-center justify-center w-[200px] text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition py-2.5 px-4 mx-auto rounded-xl mb-2"
                        >
                            Claim Free Counselling
                        </Link>
                    </div>

                    <div className="border-t border-border/60 mt-2 pt-3">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:bg-accent/80 transition py-2.5 px-4 rounded-xl"
                        >
                            <span>Toggle Theme</span>
                            <div className="rounded-full p-1.5 bg-accent border border-border/60 shadow-sm text-muted-foreground">
                                {theme === "light" ? <Moon className="w-4 h-4" /> : theme === "dark" ? <Sun className="w-4 h-4 text-yellow-500" /> : <Laptop className="w-4 h-4 text-blue-500" />}
                            </div>
                        </button>
                    </div>
                </div>
            </Card>
        </m.div>
        </LazyMotion>
    );
}

function MobileLink({ href, children, onClick }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={`text-sm font-medium transition py-2.5 px-4 rounded-xl block
                ${isActive
                    ? "text-foreground bg-accent/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/80"
                }
            `}
        >
            {children}
        </Link>
    );
}
