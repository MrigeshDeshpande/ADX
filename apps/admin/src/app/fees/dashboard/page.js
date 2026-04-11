"use client";
import Link from "next/link";
import { mockStudentsLedger } from "@/lib/mockData";

export default function FeesDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fees Management</h1>
          <p className="mt-2 text-sm text-slate-600">
            A comprehensive list of all students and their payment statuses.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/fees"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Fee Record
          </Link>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg border border-slate-200 bg-white">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500 sm:pl-6">
                      Student
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Course
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Total Fees
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Paid
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Balance
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white italic-none">
                  {mockStudentsLedger.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-slate-900 sm:pl-6">
                        {record.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-600">
                        {record.course}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-slate-900 tabular-nums">
                        ₹{record.total.toLocaleString("en-IN")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-emerald-600 tabular-nums">
                        ₹{record.paid.toLocaleString("en-IN")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-amber-600 tabular-nums">
                        ₹{record.balance.toLocaleString("en-IN")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/fees/${record.id}?name=${encodeURIComponent(record.name)}&course=${encodeURIComponent(record.course)}&base=${record.total}&scholarship=0`}
                          className="text-indigo-600 hover:text-indigo-900 font-bold"
                        >
                          View Ledger<span className="sr-only">, {record.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusStyles(status) {
  switch (status) {
    case "Full Paid":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";
    case "Partially Paid":
      return "bg-amber-100 text-amber-700 border border-amber-200";
    case "Pending":
      return "bg-slate-100 text-slate-700 border border-slate-200";
    default:
      return "bg-slate-100 text-slate-800";
  }
}
