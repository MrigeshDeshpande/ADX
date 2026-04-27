"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Search } from "lucide-react";

export function StudentTable({ students }) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? students.filter((s) => {
      const q = query.toLowerCase();
      return (
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.phone?.includes(q)
      );
    })
    : students;

  if (!students || students.length === 0) {
    return (
      <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="bg-muted w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-muted-foreground/60" />
        </div>
        <h3 className="text-lg font-bold text-foreground">No students found</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">
          Your student directory is currently empty. Active students will populate here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="p-4 border-b border-border">
        <div className="relative max-w-lg w-full">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="input pl-10 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[480px]">
          <thead className="bg-muted/50 text-muted-foreground border-b border-border text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 sm:px-6 py-4 font-semibold">Name</th>
              <th className="px-4 sm:px-6 py-4 font-semibold">Email</th>
              <th className="px-4 sm:px-6 py-4 font-semibold text-right">Net Payable</th>
              <th className="px-4 sm:px-6 py-4 font-semibold text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-sm text-muted-foreground">
                  No students match &quot;{query}&quot;
                </td>
              </tr>
            )}
            {Array.isArray(filtered) && filtered.map((student) => (
              <tr key={student.id} className="hover:bg-muted/30 transition-colors group relative cursor-pointer">
                <td className="px-4 sm:px-6 py-4 sm:py-5 font-semibold text-foreground group-hover:text-primary transition-colors">
                  <Link
                    href={`/students/${student.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${student.name}`}
                    prefetch={false}
                  />
                  {student.name}
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-muted-foreground font-medium">{student.email || student.phone || "-"}</td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-right font-medium text-foreground" suppressHydrationWarning>
                  ₹{(student.finalFee || 0).toLocaleString()}
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${Number(student.balance) > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}
                    suppressHydrationWarning
                  >
                    ₹{(Number(student.balance) || 0).toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
