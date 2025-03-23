"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PortfolioComposition() {
  // Mock data - would come from API in real app
  const data = [
    { name: "AAPL", value: 25, color: "#10B981" },
    { name: "MSFT", value: 20, color: "#3B82F6" },
    { name: "NVDA", value: 15, color: "#8B5CF6" },
    { name: "BTC", value: 25, color: "#F59E0B" },
    { name: "ETH", value: 15, color: "#EC4899" },
  ]

  return (
    <div className="h-[200px]">
      <ChartContainer
        config={{
          ...Object.fromEntries(
            data.map((item) => [
              item.name,
              {
                label: item.name,
                color: item.color,
              },
            ]),
          ),
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

