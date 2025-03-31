import { Metadata } from "next";
import { AdminLayout } from "@/components/admin";
import { ActivityTable } from "@/components/admin/activities/ActivityTable";

export const metadata: Metadata = {
  title: "Quản lý hoạt động - EDU Attendance",
  description: "Quản lý các hoạt động, sự kiện và điểm danh của sinh viên",
};

export default function AdminActivitiesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý hoạt động</h2>
          <p className="text-muted-foreground">
            Danh sách và quản lý các hoạt động
          </p>
        </div>

        <ActivityTable />
      </div>
    </AdminLayout>
  );
} 