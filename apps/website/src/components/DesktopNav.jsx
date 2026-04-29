"use client";

import Link from "next/link";
import { Moon, Sun, Laptop, ChevronDown, Phone } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export default function DesktopNav({ theme, toggleTheme }) {
    return (
        <div className="w-full flex items-center justify-between">
            {/* Nav Links */}
            <div className="flex items-center gap-5 sm:gap-6">
                <NavLink href="/">Home</NavLink>

                {/* Programs */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 text-[13px] font-medium text-foreground hover:text-muted-foreground hover:bg-accent transition px-3 py-1.5 rounded-full outline-none data-[state=open]:bg-accent data-[state=open]:text-foreground">
                        Programs <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/programs/bca" className="text-foreground">BCA Programs</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/programs/bba" className="text-foreground">BBA Programs</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/programs/fullstack" className="text-foreground">Full-Stack Development</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/programs/digitalmarketing" className="text-foreground">Digital Marketing</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <NavLink href="/blog">Blog</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/contact">Contact</NavLink>
            </div>

            {/* Separator, CTA, Icons */}
            <div className="flex items-center gap-3">
                <span className="text-border select-none hidden lg:block">·</span>

                <Link href="/contact" className="hidden lg:flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-[13px] font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-1 transition-all duration-150">
                    <Phone className="w-4 h-4" />
                    Claim Free Counselling                </Link>

                {/* Icons */}
                <div className="flex items-center gap-1.5 ml-1 ">

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground bg-background hover:bg-accent transition border border-border/60 shadow-sm "
                    >
                        {theme === "light" ? (
                            <Moon className="h-4 w-4" />
                        ) : theme === "dark" ? (
                            <Sun className="h-4 w-4 text-yellow-500" />
                        ) : (
                            <Laptop className="h-4 w-4 text-blue-500" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

function NavLink({ href, children }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`text-[13px] font-medium transition px-3 py-1.5 rounded-full block
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

function SocialButton({ href, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full p-2 text-muted-foreground hover:text-foreground bg-background hover:bg-accent transition border border-border/60 shadow-sm"
        >
            {children}
        </a>
    );
}
