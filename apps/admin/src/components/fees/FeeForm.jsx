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
    router.push(`/fees/${mockFeeId}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <Field label="Student name">
        <input
          required
          type="text"
          placeholder="Rahul Sharma"
          className="input"
          value={formData.studentName}
          onChange={(e) =>
            setFormData({ ...formData, studentName: e.target.value })
          }
        />
      </Field>

      <Field label="Course / program">
        <input
          required
          type="text"
          placeholder="Full Stack Development"
          className="input"
          value={formData.courseName}
          onChange={(e) =>
            setFormData({ ...formData, courseName: e.target.value })
          }
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Base fee">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">
              ₹
            </span>
            <input
              required
              type="number"
              min="0"
              placeholder="0"
              className="input pl-8"
              value={formData.baseFee}
              onChange={(e) =>
                setFormData({ ...formData, baseFee: e.target.value })
              }
            />
          </div>
        </Field>

        <Field
          label="Scholarship"
          error={scholarshipExceedsBase ? "Exceeds base fee" : null}
        >
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">
              ₹
            </span>
            <input
              type="number"
              min="0"
              placeholder="0"
              className={`input pl-8 ${
                scholarshipExceedsBase
                  ? "border-amber-400 focus:border-amber-400 focus:ring-amber-500/20"
                  : ""
              }`}
              value={formData.scholarship}
              onChange={(e) =>
                setFormData({ ...formData, scholarship: e.target.value })
              }
            />
          </div>
        </Field>
      </div>

      {/* Net payable */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">Net payable</span>
        <span className="text-2xl font-semibold text-slate-900 tabular-nums">
          ₹{netAmount.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        type="submit"
        disabled={
          !formData.studentName ||
          !formData.baseFee ||
          scholarshipExceedsBase
        }
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
      >
        Create record
      </button>

    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-amber-600">{error}</p>
      )}
    </div>
  );
}