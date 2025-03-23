"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { HelpCircle } from "lucide-react"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CompositionView() {
  const [activeTab, setActiveTab] = useState("all")

  // Mock data - would come from API in real app
  const allData = [
    { name: "AAPL", value: 25, color: "#10B981" },
    { name: "MSFT", value: 20, color: "#3B82F6" },
    { name: "NVDA", value: 15, color: "#8B5CF6" },
    { name: "BTC", value: 25, color: "#F59E0B" },
    { name: "ETH", value: 15, color: "#EC4899" },
  ]

  const stocksData = [
    { name: "AAPL", value: 42, color: "#10B981" },
    { name: "MSFT", value: 33, color: "#3B82F6" },
    { name: "NVDA", value: 25, color: "#8B5CF6" },
  ]

  const cryptoData = [
    { name: "BTC", value: 62, color: "#F59E0B" },
    { name: "ETH", value: 38, color: "#EC4899" },
  ]

  const valueData = [
    { date: "Jun 1", value: 120000 },
    { date: "Jun 5", value: 118000 },
    { date: "Jun 10", value: 122000 },
    { date: "Jun 15", value: 125000 },
    { date: "Jun 20", value: 123000 },
    { date: "Jun 25", value: 126000 },
    { date: "Jun 30", value: 125750 },
  ]

  const getActiveData = () => {
    switch (activeTab) {
      case "stocks":
        return stocksData
      case "crypto":
        return cryptoData
      default:
        return allData
    }
  }

  // Calculate diversity rating (example algorithm)
  const calculateDiversityRating = (data: any[]) => {
    // Simple diversity calculation: higher is better
    // In a real app, this would be more sophisticated
    const uniqueAssets = data.length
    const maxPercent = Math.max(...data.map((item) => item.value))

    // Score from 0-100
    const score = Math.round(100 - (maxPercent - 100 / uniqueAssets))

    // Rating from 1-5
    const rating = Math.max(1, Math.min(5, Math.round(score / 20)))

    return {
      score,
      rating,
      label: ["Very Poor", "Poor", "Average", "Good", "Excellent"][rating - 1],
    }
  }

  const diversity = calculateDiversityRating(getActiveData())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio Composition</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <CompositionContent data={allData} valueData={valueData} diversity={diversity} />
        </TabsContent>
        <TabsContent value="stocks" className="mt-6">
          <CompositionContent data={stocksData} valueData={valueData} diversity={diversity} />
        </TabsContent>
        <TabsContent value="crypto" className="mt-6">
          <CompositionContent data={cryptoData} valueData={valueData} diversity={diversity} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CompositionContentProps {
  data: any[]
  valueData: any[]
  diversity: {
    score: number
    rating: number
    label: string
  }
}

function CompositionContent({ data, valueData, diversity }: CompositionContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Breakdown of your portfolio by asset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
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
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
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

          <div className="mt-4 flex items-center">
            <div className="text-sm">
              <span className="text-muted-foreground">Diversity Rating: </span>
              <span className="font-medium">
                {diversity.label} ({diversity.rating}/5)
              </span>
            </div>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <button className="ml-1">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Diversity rating measures how well your portfolio is diversified across different assets. A higher
                    rating means better protection against market volatility.
                  </p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>

          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-medium">Asset Breakdown</h4>
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Value</CardTitle>
          <CardDescription>Historical value of your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={valueData}>
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

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-xl font-bold">$125,750</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">30-Day Change</p>
              <p className="text-xl font-bold text-green-500">+$5,750 (+4.8%)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

