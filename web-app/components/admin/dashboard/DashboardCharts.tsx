"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const registrationData = [
  { name: "Đã đăng ký", value: 200, color: "#4f46e5" },
  { name: "Còn trống", value: 100, color: "#f97316" }
];

const activityTypeData = [
  { name: "Hội thảo", totalCapacity: 300, registered: 200 },
  { name: "Workshop", totalCapacity: 150, registered: 120 },
  { name: "Tình nguyện", totalCapacity: 100, registered: 80 }
];

const monthlyRegistrationData = [
  { name: "T1", value: 40 },
  { name: "T2", value: 60 },
  { name: "T3", value: 200 },
  { name: "T4", value: 0 },
  { name: "T5", value: 0 },
  { name: "T6", value: 0 },
  { name: "T7", value: 0 },
  { name: "T8", value: 0 },
  { name: "T9", value: 0 },
  { name: "T10", value: 0 },
  { name: "T11", value: 0 },
  { name: "T12", value: 0 }
];

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f97316", "#ec4899"];

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Thống kê theo loại hoạt động</CardTitle>
          <CardDescription>
            Số lượng đăng ký theo từng loại hoạt động
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={activityTypeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                formatter={(value) => [`${value}`, ""]}
              />
              <Legend />
              <Bar dataKey="totalCapacity" name="Tổng số chỗ" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="registered" name="Số lượng đăng ký" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Tỉ lệ đăng ký</CardTitle>
          <CardDescription>
            Tỉ lệ giữa số lượng đã đăng ký và còn trống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={registrationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {registrationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                formatter={(value) => [`${value}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Thống kê đăng ký theo tháng</CardTitle>
          <CardDescription>
            Số lượng đăng ký hoạt động theo từng tháng
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyRegistrationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#fff", 
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                formatter={(value) => [`${value}`, ""]}
              />
              <Bar dataKey="value" name="Số lượng đăng ký" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}