"use client";
import FeeForm from "@/components/fees/FeeForm";

export default function FeesRootPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg space-y-10">

        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-900">
            New fee record
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            Set up a student's fee profile. You can record payments once the record is created.
          </p>
        </div>

        <div className="card p-8">
          <FeeForm />
        </div>

      </div>
    </div>
  );
}