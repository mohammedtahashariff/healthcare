"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    total: 12,
  },
  {
    name: "Tue",
    total: 15,
  },
  {
    name: "Wed",
    total: 18,
  },
  {
    name: "Thu",
    total: 14,
  },
  {
    name: "Fri",
    total: 16,
  },
  {
    name: "Sat",
    total: 8,
  },
  {
    name: "Sun",
    total: 6,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 