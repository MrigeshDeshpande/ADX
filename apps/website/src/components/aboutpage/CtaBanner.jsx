import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CtaBanner() {
    return (
        <section className="relative overflow-hidden py-20 bg-linear-to-r from-primary to-secondary text-primary-foreground">
            <div/>

            <div className="relative max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold">
                    Ready to Build Your Career with SkillYards?
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-primary-foreground">
                    Join On Job Degree & Training programs designed to make you job-ready
                    from day one.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center ">
                    <Button asChild size="lg" variant="secondary" className="shadow-lg shadow-primary">
                        <Link href="/programs">
                            Explore Programs
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-foreground text-foreground bg-primary-foreground shadow-lg shadow-primary">
                        <Link href="/contact">
                            Talk to Counselor
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
