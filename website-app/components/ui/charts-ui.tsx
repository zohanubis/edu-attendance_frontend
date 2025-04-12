"use client"
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
} from "recharts"
import { cn } from "@/lib/utils"

interface BarChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  className?: string
}

export function BarChart({
  data,
  categories,
  index,
  colors = ["hsl(var(--primary))", "hsl(var(--primary) / 0.7)"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 40,
  className,
}: BarChartProps) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis dataKey={index} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            width={yAxisWidth}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={(value: number) => [valueFormatter(value), ""]}
            cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
            contentStyle={{
              borderRadius: "8px",
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
          />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface PieChartProps {
  data: {
    name: string
    value: number
    color?: string
  }[]
  className?: string
}

export function PieChart({ data, className }: PieChartProps) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || `hsl(${index * 45}, 70%, 60%)`} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value}`, ""]}
            contentStyle={{
              borderRadius: "8px",
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}

interface LineChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  className?: string
}

export function LineChart({
  data,
  categories,
  index,
  colors = ["hsl(var(--primary))", "hsl(var(--primary) / 0.7)"],
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 40,
  className,
}: LineChartProps) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey={index} stroke="#888888" fontSize={12} tickLine={false} axis="false" />
          <YAxis
            width={yAxisWidth}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={valueFormatter}
          />
          <Tooltip
            formatter={(value: number) => [valueFormatter(value), ""]}
            contentStyle={{
              borderRadius: "8px",
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
          />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}
