import { Metadata } from "next";
import { AdminLayout } from "@/components/admin";
import { StudentTable } from "@/components/admin/students/StudentTable";

export const metadata: Metadata = {
  title: "Quản lý sinh viên - EDU Attendance",
  description: "Quản lý thông tin và hoạt động của sinh viên",
};

export default function AdminStudentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý sinh viên</h2>
          <p className="text-muted-foreground">
            Danh sách và quản lý thông tin sinh viên
          </p>
        </div>

        <StudentTable />
      </div>
    </AdminLayout>
  );
}