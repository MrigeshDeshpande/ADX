import FeeForm from "@/components/fees/FeeForm";

export default function NewFeePage() {
    return (
        <div className="min-h-screen bg-[#fcfcfd] selection:bg-brand-primary/10 selection:text-brand-primary pb-32">
            <div className="max-w-7xl mx-auto px-8 py-20 space-y-16">
                <header className="text-center space-y-4 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-[8px] font-black uppercase tracking-[0.2em]">
                        Finance Operations
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                        Student Onboarding
                    </h1>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Create a generalized financial profile to track commitment vs. reality. This action initializes an immutable ledger for the selected student.
                    </p>
                </header>

                <main className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
                    <FeeForm />
                </main>

                <footer className="text-center pt-8 border-t border-slate-100 max-w-xl mx-auto">
                    <div className="flex items-center justify-center gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                            V1 Compliant
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                            Encrypted Ledger
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                            Audit-Ready
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
