"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PROGRAMS = [
  "Full Stack Development",
  "Digital Marketing",
  "BCA",
  "BBA",
  "Data Science",
];

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
  const scholarshipExceedsBase = scholarshipAmount > baseAmount && baseAmount > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scholarshipExceedsBase) return;

    const params = new URLSearchParams({
      name: formData.studentName,
      course: formData.courseName,
      base: formData.baseFee,
      scholarship: formData.scholarship,
    });

    const mockFeeId = Math.floor(Math.random() * 1000) + 1;

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: "Creating fee record...",
        success: () => {
          router.push(`/fees/${mockFeeId}?${params.toString()}`);
          return `Ledger initialized for ${formData.studentName}`;
        },
        error: "Failed to create record",
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Student name">
        <input
          required
          type="text"
          placeholder="e.g. Rahul Sharma"
          className="input"
          value={formData.studentName}
          onChange={(e) =>
            setFormData({ ...formData, studentName: e.target.value })
          }
        />
      </Field>

      <Field label="Course / program">
        <select
          required
          className="input appearance-none bg-white cursor-pointer"
          value={formData.courseName}
          onChange={(e) =>
            setFormData({ ...formData, courseName: e.target.value })
          }
        >
          <option value="" disabled>Select a program</option>
          {PROGRAMS.map((program) => (
            <option key={program} value={program}>
              {program}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Base fee (₹)">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">₹</span>
            <input
              required
              type="number"
              min="0"
              placeholder="0"
              className="input pl-8 font-medium"
              value={formData.baseFee}
              onChange={(e) =>
                setFormData({ ...formData, baseFee: e.target.value })
              }
            />
          </div>
        </Field>

        <Field
          label="Scholarship (₹)"
          error={scholarshipExceedsBase ? "Exceeds base fee" : null}
        >
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">₹</span>
            <input
              type="number"
              min="0"
              placeholder="0"
              className={`input pl-8 font-medium ${
                scholarshipExceedsBase ? "border-amber-400 ring-amber-500/20" : ""
              }`}
              value={formData.scholarship}
              onChange={(e) =>
                setFormData({ ...formData, scholarship: e.target.value })
              }
            />
          </div>
        </Field>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-3.5 flex items-center justify-between">
        <span className="text-sm text-slate-500 font-medium">Net payable</span>
        <span className="text-xl font-bold text-slate-900 tabular-nums">
          ₹{netAmount.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        type="submit"
        disabled={!formData.studentName || !formData.courseName || !formData.baseFee || scholarshipExceedsBase}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-[0.98]"
      >
        Create record
      </button>

    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="text-[13px] font-semibold text-slate-600 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-amber-600 font-medium italic">{error}</p>}
    </div>
  );
}