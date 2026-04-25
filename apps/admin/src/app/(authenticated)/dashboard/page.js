import { Users, CreditCard, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactionsTable } from "@/components/dashboard/RecentTransactionsTable";

export const dynamic = "force-dynamic";

import { API } from "@/lib/api";

async function getDashboardData() {
  const [statsRes, outstandingRes] = await Promise.all([
    fetch(`${API}/api/students/stats`, { next: { revalidate: 600, tags: ['students'] } }),
    fetch(`${API}/api/students?limit=5`, { next: { revalidate: 600, tags: ['students'] } })
  ]);
  
  const stats = statsRes.ok ? await statsRes.json() : { totalStudents: 0, totalCollected: 0, totalPending: 0 };
  const outstanding = outstandingRes.ok ? await outstandingRes.json() : [];

  return { stats, outstanding };
}

export default async function DashboardPage() {
  const { stats: dashStats, outstanding } = await getDashboardData();

  const stats = [
    { title: "Total Students", value: dashStats.totalStudents, icon: Users },
    { title: "Total Collected", value: `₹${dashStats.totalCollected.toLocaleString()}`, icon: CreditCard },
    { title: "Total Pending", value: `₹${dashStats.totalPending.toLocaleString()}`, icon: Activity },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">System metrics and fee collection overview.</p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <RecentTransactionsTable students={outstanding} />
    </div>
  );
}
