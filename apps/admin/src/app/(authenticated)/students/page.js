import { API } from "@/lib/api";
import { StudentTable } from "@/components/students/StudentTable";

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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Students Directory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your student records and track financial ledger.
          </p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <StudentTable students={students} />
      </div>
    </div>
  );
}
