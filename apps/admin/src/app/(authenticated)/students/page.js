import Link from "next/link";
import { StudentTable } from "@/components/students/StudentTable";

import { API } from "@/lib/api";

async function getStudents(limit = 50, offset = 0) {
  const res = await fetch(`${API}/api/students?limit=${limit}&offset=${offset}`, { 
    next: { 
      revalidate: 300, 
      tags: ['students'] 
    } 
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function StudentsListPage({ searchParams }) {
  const { limit = 100, offset = 0 } = await searchParams;
  const students = await getStudents(limit, offset);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Students Directory</h1>
          <p className="text-muted-foreground mt-1 text-sm">Browse the full roster and access student ledgers.</p>
        </div>
        <Link 
          href="/students/enroll"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:opacity-90 rounded-lg transition-opacity shrink-0"
        >
          <span className="text-lg leading-none">+</span> Add Student
        </Link>
      </div>

      <div className="card overflow-hidden">
        <StudentTable students={students} />
      </div>
    </div>
  );
}
