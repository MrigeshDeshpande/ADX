import { getUsers } from "@/actions/users";
import { UserManagementClient } from "./UserManagementClient";

export default async function UsersPage() {
  const initialUsers = await getUsers();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage staff access and roles for the AdhyayanX administration.</p>
        </div>
      </div>

      <UserManagementClient initialUsers={initialUsers} />
    </div>
  );
}
