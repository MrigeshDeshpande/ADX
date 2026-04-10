"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FeeForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        studentName: "",
        courseName: "",
        baseFee: "",
        scholarship: "0",
    });

    const baseAmount = Number(formData.baseFee) || 0;
    const scholarshipAmount = Number(formData.scholarship) || 0;
    const netAmount = Math.max(0, baseAmount - scholarshipAmount);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Final logical validation before redirect
        if (netAmount < 0) return; 

        const params = new URLSearchParams({
            name: formData.studentName,
            course: formData.courseName,
            base: formData.baseFee,
            scholarship: formData.scholarship
        });

        // In a real app, we would POST to /api/fees/create
        const mockFeeId = Math.floor(Math.random() * 1000) + 1;
        router.push(`/fees/${mockFeeId}?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSubmit} className="glass p-10 rounded-[2.5rem] border border-white/60 shadow-2xl space-y-8 max-w-2xl mx-auto">
            <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Initialize Fee Profile</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Step 1: Define Commitment (Source of Truth)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Student Full Name</label>
                    <input 
                        required
                        type="text" 
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-5 py-4 bg-white/60 border border-white/60 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-slate-900 text-sm"
                        value={formData.studentName}
                        onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course / Program</label>
                    <input 
                        required
                        type="text" 
                        placeholder="e.g. Full Stack Development"
                        className="w-full px-5 py-4 bg-white/60 border border-white/60 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-slate-900 text-sm"
                        value={formData.courseName}
                        onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Base Course Fee</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">₹</span>
                        <input 
                            required
                            type="number" 
                            min="0"
                            placeholder="0"
                            className="w-full pl-8 pr-4 py-4 bg-white/60 border border-white/60 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-black text-slate-900"
                            value={formData.baseFee}
                            onChange={(e) => setFormData({...formData, baseFee: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Scholarship / Discount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-xs">−₹</span>
                        <input 
                            type="number" 
                            min="0"
                            max={formData.baseFee}
                            placeholder="0"
                            className="w-full pl-10 pr-4 py-4 bg-white/60 border border-white/60 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-black text-amber-600"
                            value={formData.scholarship}
                            onChange={(e) => setFormData({...formData, scholarship: e.target.value})}
                        />
                    </div>
                    {Number(formData.scholarship) > Number(formData.baseFee) && (
                        <div className="text-[10px] text-amber-600 font-black uppercase tracking-tight animate-pulse ml-1 mt-1">
                            ⚠ Warning: Exceeds base fee
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center text-white/50 text-[10px] font-black uppercase tracking-widest">
                    <span>Net Commitment</span>
                    <span className="px-2 py-0.5 bg-brand-primary/20 text-brand-primary rounded-lg border border-brand-primary/30">Verified Ledger</span>
                </div>
                <div className="flex justify-between items-baseline">
                    <span className="text-white/40 text-xs font-bold uppercase">Source of Truth</span>
                    <span className="text-3xl font-black text-white tracking-tighter">₹{netAmount.toLocaleString("en-IN")}</span>
                </div>
            </div>

            <button 
                type="submit"
                className="w-full py-5 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl shadow-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
                Initialize Records Page
                <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </button>
        </form>
    );
}
