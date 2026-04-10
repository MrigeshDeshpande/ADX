export default function FeeStructure({ fee }) {
    const breakdown = [
        { label: "Course Base Price", value: fee.basePrice, type: "base" },
        { label: "Scholarship / Discount", value: -fee.discount, type: "discount" },
        { label: "Net Payable Amount", value: fee.finalAmount, type: "total" },
    ];

    return (
        <div className="glass p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-white/60 to-slate-50/40 border border-white/60 shadow-inner">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center md:text-left">
                {breakdown.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center gap-8 md:gap-12 flex-1 last:flex-none">
                        <div className="space-y-1">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                item.type === 'discount' ? 'text-brand-accent' : 
                                item.type === 'total' ? 'text-brand-primary' : 'text-slate-400'
                            }`}>
                                {item.label}
                            </span>
                            <div className={`text-3xl font-black tracking-tighter ${
                                item.type === 'discount' ? 'text-brand-accent/80' : 
                                item.type === 'total' ? 'text-slate-900 border-b-4 border-brand-primary/20 pb-1' : 'text-slate-600'
                            }`}>
                                {formatCurrency(Math.abs(item.value))}
                                {item.type === 'discount' && <span className="text-sm ml-1">(-)</span>}
                            </div>
                        </div>

                        {index < breakdown.length - 1 && (
                            <div className="hidden md:block">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200">
                                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                                </svg>
                            </div>
                        )}
                        
                        {index < breakdown.length - 1 && (
                            <div className="md:hidden">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200 rotate-90">
                                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function formatCurrency(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}
