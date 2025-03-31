import { Metadata } from "next";
import { AdminLayout } from "@/components/admin";
import { UnionWorkerTable } from "@/components/admin/union_workers/UnionWorkerTable";

export const metadata: Metadata = {
  title: "Quản lý công tác đoàn - EDU Attendance",
  description: "Quản lý thông tin và hoạt động của cộng tác viên đoàn",
};

export default function AdminUnionWorkersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý công tác viên</h2>
          <p className="text-muted-foreground">
            Danh sách và quản lý các cộng tác viên
          </p>
        </div>

        <UnionWorkerTable />
      </div>
    </AdminLayout>
  );
}