import { Metadata } from "next";
import { AdminLayout } from "@/components/admin";
import { PostTable } from "@/components/admin/posts/PostTable";

export const metadata: Metadata = {
  title: "Quản lý bài viết - EDU Attendance",
  description: "Quản lý các bài viết, tin tức và thông báo",
};

export default function AdminPostsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quản lý bài viết</h2>
          <p className="text-muted-foreground">
            Danh sách và quản lý các bài viết
          </p>
        </div>

        <PostTable />
      </div>
    </AdminLayout>
  );
}