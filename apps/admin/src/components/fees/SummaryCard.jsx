export default function SummaryCard({ summary }) {
    const { total, paid, pending, status } = summary;
    const progress = total > 0 ? (paid / total) * 100 : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SumCard 
                label="Total Commitment" 
                value={total} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>}
                color="indigo"
                subtext="Source of Truth"
            />
            <SumCard 
                label="Total Paid" 
                value={paid} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                color="emerald"
                subtext="Reality Layer"
                progress={progress}
            />
            <SumCard 
                label="Pending Balance" 
                value={pending} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>}
                color={pending > 0 ? "amber" : "emerald"}
                subtext="Derived Logic"
                pulse={pending > 0}
            />
            <SumCard 
                label="Financial Status" 
                value={status} 
                isStatus
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
                color={getStatusColor(status)}
                subtext="Commitment vs Reality"
            />
        </div>
    );
}

function SumCard({ label, value, icon, color, subtext, isStatus, progress, pulse }) {
    const colorMap = {
        indigo: "bg-slate-900 border-slate-800",
        emerald: "bg-emerald-500 border-emerald-200",
        amber: "bg-amber-500 border-amber-200",
        blue: "bg-blue-500 border-blue-200",
    };

    return (
        <div className="glass p-6 rounded-3xl border border-white/60 shadow-xl relative overflow-hidden group hover:translate-y-[-2px] transition-all duration-300">
            {progress !== undefined && (
                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/10 w-full">
                    <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                </div>
            )}
            
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl text-white shadow-lg ${colorMap[color]}`}>
                    {icon}
                </div>
                {pulse && (
                    <span className="flex h-3 w-3 mt-1 mr-1">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                )}
            </div>

            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
            <h3 className={`text-2xl font-black tracking-tighter ${isStatus ? 'uppercase text-xs tracking-widest text-slate-800' : 'text-slate-900'}`}>
                {isStatus ? <span className={`px-2 py-0.5 rounded-lg border ${getStatusStyles(value)}`}>{value}</span> : `₹${value.toLocaleString("en-IN")}`}
            </h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                {subtext}
            </p>
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case "active": return "amber";
        case "completed": return "emerald";
        case "overpaid": return "blue";
        default: return "indigo";
    }
}

function getStatusStyles(status) {
    switch (status) {
        case "active": return "bg-amber-50 text-amber-600 border-amber-100";
        case "completed": return "bg-emerald-50 text-emerald-600 border-emerald-100";
        case "overpaid": return "bg-blue-50 text-blue-600 border-blue-100";
        default: return "bg-slate-50 text-slate-600 border-slate-100";
    }
}
