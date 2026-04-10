import Link from "next/link";
import FeeForm from "@/components/fees/FeeForm";

export default function FeesRootPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-slate-50/50">
      <div className="w-full max-w-lg space-y-8">

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              New fee record
            </h1>
            <p className="text-[15px] text-slate-500 leading-relaxed font-medium">
              Initialize a student's financial ledger.
            </p>
          </div>
          <Link 
            href="/fees/dashboard"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-500 uppercase tracking-wider px-3 py-2 bg-indigo-50 rounded-lg transition-all border border-indigo-100/50"
          >
            Dashboard →
          </Link>
        </div>

        <div className="card p-8">
          <FeeForm />
        </div>

      </div>
    </div>
  );
}