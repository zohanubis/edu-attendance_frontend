import { Metadata } from "next";
import { AdminLayout } from "@/components/admin";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { DashboardCharts } from "@/components/admin/dashboard/DashboardCharts";

export const metadata: Metadata = {
  title: "Dashboard Admin - EDU Attendance",
  description: "Admin dashboard for managing educational activities and attendance",
};

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Admin</h2>
          <p className="text-muted-foreground">
            Thống kê và quản lý các hoạt động tháng 3 năm 2025
          </p>
        </div>

        <DashboardStats />
        <DashboardCharts />
      </div>
    </AdminLayout>
  );
} 