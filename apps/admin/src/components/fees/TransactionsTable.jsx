export default function TransactionsTable({ transactions }) {
    return (
        <div className="glass overflow-hidden rounded-3xl border border-white/60 shadow-2xl">
            <div className="px-8 py-6 border-b border-white/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/20">
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Financial Ledger</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Immutable Transaction History</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none sm:w-64">
                        <input 
                            type="text" 
                            placeholder="Filter records..." 
                            className="w-full pl-9 pr-4 py-2 bg-white/40 border border-white/40 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <button className="p-2 bg-white/60 hover:bg-white text-slate-600 border border-white/60 rounded-xl transition-all shadow-sm group">
                        <svg className="group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.25em]">
                        <tr>
                            <th className="px-8 py-4 font-black">Amount</th>
                            <th className="px-8 py-4 font-black">Date</th>
                            <th className="px-8 py-4 font-black">Mode</th>
                            <th className="px-8 py-4 font-black text-right">Receipt</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {transactions.map((txn, index) => (
                            <tr key={txn.id} className={`group hover:bg-white/40 transition-all duration-300 ${index % 2 === 0 ? 'bg-white/10' : 'bg-transparent'}`}>
                                <td className="px-8 py-5">
                                    <span className="text-lg font-black text-slate-900 tracking-tighter">₹{txn.amount.toLocaleString("en-IN")}</span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(txn.paidAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm ${getMethodStyle(txn.paymentMode)}`}>
                                        {txn.paymentMode}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex flex-col items-end">
                                        <div className="font-black text-slate-800 text-sm tracking-tight">{txn.receiptNumber}</div>
                                        <div className="text-[9px] text-slate-400 font-mono mt-0.5">{txn.referenceId || "Internal"}</div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {transactions.length === 0 && (
                <div className="p-20 text-center bg-white/5">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100 group">
                        <svg className="text-slate-200 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    </div>
                    <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">No reality records found</p>
                </div>
            )}
        </div>
    );
}

function getMethodStyle(mode) {
    switch (mode?.toLowerCase()) {
        case "cash":
            return "bg-amber-50 text-amber-700 border-amber-200";
        case "upi":
            return "bg-purple-50 text-purple-700 border-purple-200";
        case "card":
            return "bg-blue-50 text-blue-700 border-blue-200";
        default:
            return "bg-slate-50 text-slate-700 border-slate-200";
    }
}
