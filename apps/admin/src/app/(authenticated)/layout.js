import { SidebarProvider } from "@/components/providers/SidebarProvider";
import { LayoutContent } from "@/components/layout/LayoutContent";
import { getSession } from "@/lib/auth";

export default async function AuthenticatedLayout({ children }) {
  const session = await getSession();
  const user = session ? { name: session.name, role: session.role } : null;

  return (
    <SidebarProvider>
      <LayoutContent user={user}>{children}</LayoutContent>
    </SidebarProvider>
  );
}
