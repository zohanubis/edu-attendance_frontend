"use client";

import { Book, Users, CalendarCheck, Percent } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

function StatsCard({ title, value, description, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-2",
            trend.isPositive ? "text-green-500" : "text-red-500"
          )}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tổng số hoạt động"
        value="3"
        description="Các hoạt động đang diễn ra"
        icon={<Book className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
      />
      
      <StatsCard
        title="Tổng số đăng ký"
        value="200"
        description="Trên tổng số 300 chỗ"
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 8, isPositive: true }}
      />
      
      <StatsCard
        title="Số chỗ còn trống"
        value="100"
        description="Còn chỗ trống cho đăng ký"
        icon={<CalendarCheck className="h-4 w-4" />}
        trend={{ value: 5, isPositive: false }}
      />
      
      <StatsCard
        title="Tỉ lệ đăng ký"
        value="66.7%"
        description="Tỉ lệ đăng ký trên tổng số chỗ"
        icon={<Percent className="h-4 w-4" />}
        trend={{ value: 10, isPositive: true }}
      />
    </div>
  );
}