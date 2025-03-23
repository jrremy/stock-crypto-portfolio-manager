"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PortfolioPerformance() {
  // Mock data - would come from API in real app
  const data = [
    { date: "Jun 1", value: 120000 },
    { date: "Jun 5", value: 118000 },
    { date: "Jun 10", value: 122000 },
    { date: "Jun 15", value: 125000 },
    { date: "Jun 20", value: 123000 },
    { date: "Jun 25", value: 126000 },
    { date: "Jun 30", value: 125750 },
  ]

  return (
    <div className="h-[200px]">
      <ChartContainer
        config={{
          value: {
            label: "Portfolio Value",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

