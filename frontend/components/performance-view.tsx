"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PerformanceView() {
  const [activeTab, setActiveTab] = useState("all")
  const [timeWindow, setTimeWindow] = useState("1m")
  const [selectedBenchmark, setSelectedBenchmark] = useState("sp500")

  // Mock benchmarks data
  const benchmarks = [
    { id: "sp500", name: "S&P 500" },
    { id: "nasdaq", name: "NASDAQ Composite" },
    { id: "djia", name: "Dow Jones Industrial Average" },
    { id: "btc", name: "Bitcoin (BTC)" },
    { id: "eth", name: "Ethereum (ETH)" },
  ]

  // Mock data - would come from API in real app
  const performanceData = {
    "1d": [
      { date: "9:30", portfolio: 125000, sp500: 124000, nasdaq: 123500, djia: 124200, btc: 123000, eth: 122800 },
      { date: "10:30", portfolio: 125200, sp500: 124100, nasdaq: 123600, djia: 124300, btc: 123100, eth: 122900 },
      { date: "11:30", portfolio: 125100, sp500: 124050, nasdaq: 123550, djia: 124250, btc: 123050, eth: 122850 },
      { date: "12:30", portfolio: 125300, sp500: 124200, nasdaq: 123700, djia: 124400, btc: 123200, eth: 123000 },
      { date: "13:30", portfolio: 125400, sp500: 124300, nasdaq: 123800, djia: 124500, btc: 123300, eth: 123100 },
      { date: "14:30", portfolio: 125600, sp500: 124400, nasdaq: 123900, djia: 124600, btc: 123400, eth: 123200 },
      { date: "15:30", portfolio: 125750, sp500: 124500, nasdaq: 124000, djia: 124700, btc: 123500, eth: 123300 },
    ],
    "1w": [
      { date: "Mon", portfolio: 124000, sp500: 123000, nasdaq: 122500, djia: 123200, btc: 122000, eth: 121800 },
      { date: "Tue", portfolio: 124500, sp500: 123200, nasdaq: 122700, djia: 123400, btc: 122200, eth: 122000 },
      { date: "Wed", portfolio: 125000, sp500: 123500, nasdaq: 123000, djia: 123700, btc: 122500, eth: 122300 },
      { date: "Thu", portfolio: 124800, sp500: 123400, nasdaq: 122900, djia: 123600, btc: 122400, eth: 122200 },
      { date: "Fri", portfolio: 125200, sp500: 123800, nasdaq: 123300, djia: 124000, btc: 122800, eth: 122600 },
      { date: "Sat", portfolio: 125500, sp500: 124200, nasdaq: 123700, djia: 124400, btc: 123200, eth: 123000 },
      { date: "Sun", portfolio: 125750, sp500: 124500, nasdaq: 124000, djia: 124700, btc: 123500, eth: 123300 },
    ],
    "1m": [
      { date: "Jun 1", portfolio: 120000, sp500: 119000, nasdaq: 118500, djia: 119200, btc: 118000, eth: 117800 },
      { date: "Jun 5", portfolio: 118000, sp500: 118500, nasdaq: 118000, djia: 118700, btc: 117500, eth: 117300 },
      { date: "Jun 10", portfolio: 122000, sp500: 120000, nasdaq: 119500, djia: 120200, btc: 119000, eth: 118800 },
      { date: "Jun 15", portfolio: 125000, sp500: 121000, nasdaq: 120500, djia: 121200, btc: 120000, eth: 119800 },
      { date: "Jun 20", portfolio: 123000, sp500: 121500, nasdaq: 121000, djia: 121700, btc: 120500, eth: 120300 },
      { date: "Jun 25", portfolio: 126000, sp500: 122000, nasdaq: 121500, djia: 122200, btc: 121000, eth: 120800 },
      { date: "Jun 30", portfolio: 125750, sp500: 122500, nasdaq: 122000, djia: 122700, btc: 121500, eth: 121300 },
    ],
    "3m": [
      { date: "Apr", portfolio: 115000, sp500: 114000, nasdaq: 113500, djia: 114200, btc: 113000, eth: 112800 },
      { date: "May", portfolio: 118000, sp500: 116000, nasdaq: 115500, djia: 116200, btc: 115000, eth: 114800 },
      { date: "Jun", portfolio: 125750, sp500: 122500, nasdaq: 122000, djia: 122700, btc: 121500, eth: 121300 },
    ],
    "6m": [
      { date: "Jan", portfolio: 110000, sp500: 109000, nasdaq: 108500, djia: 109200, btc: 108000, eth: 107800 },
      { date: "Feb", portfolio: 112000, sp500: 110000, nasdaq: 109500, djia: 110200, btc: 109000, eth: 108800 },
      { date: "Mar", portfolio: 114000, sp500: 112000, nasdaq: 111500, djia: 112200, btc: 111000, eth: 110800 },
      { date: "Apr", portfolio: 115000, sp500: 114000, nasdaq: 113500, djia: 114200, btc: 113000, eth: 112800 },
      { date: "May", portfolio: 118000, sp500: 116000, nasdaq: 115500, djia: 116200, btc: 115000, eth: 114800 },
      { date: "Jun", portfolio: 125750, sp500: 122500, nasdaq: 122000, djia: 122700, btc: 121500, eth: 121300 },
    ],
    "1y": [
      { date: "Jul '22", portfolio: 100000, sp500: 99000, nasdaq: 98500, djia: 99200, btc: 98000, eth: 97800 },
      { date: "Sep '22", portfolio: 102000, sp500: 100000, nasdaq: 99500, djia: 100200, btc: 99000, eth: 98800 },
      { date: "Nov '22", portfolio: 105000, sp500: 103000, nasdaq: 102500, djia: 103200, btc: 102000, eth: 101800 },
      { date: "Jan '23", portfolio: 110000, sp500: 109000, nasdaq: 108500, djia: 109200, btc: 108000, eth: 107800 },
      { date: "Mar '23", portfolio: 114000, sp500: 112000, nasdaq: 111500, djia: 112200, btc: 111000, eth: 110800 },
      { date: "May '23", portfolio: 118000, sp500: 116000, nasdaq: 115500, djia: 116200, btc: 115000, eth: 114800 },
      { date: "Jun '23", portfolio: 125750, sp500: 122500, nasdaq: 122000, djia: 122700, btc: 121500, eth: 121300 },
    ],
  }

  // Get the current data for the selected time window
  const currentData = performanceData[timeWindow as keyof typeof performanceData].map((item) => ({
    ...item,
    benchmark: item[selectedBenchmark as keyof typeof item] as number,
  }))

  // Calculate performance metrics
  const calculatePerformance = (data: any[]) => {
    const firstValue = data[0]
    const lastValue = data[data.length - 1]

    const portfolioChange = lastValue.portfolio - firstValue.portfolio
    const portfolioChangePercent = (portfolioChange / firstValue.portfolio) * 100

    const benchmarkChange = lastValue.benchmark - firstValue.benchmark
    const benchmarkChangePercent = (benchmarkChange / firstValue.benchmark) * 100

    const outperformance = portfolioChangePercent - benchmarkChangePercent

    return {
      portfolioChange,
      portfolioChangePercent,
      benchmarkChange,
      benchmarkChangePercent,
      outperformance,
    }
  }

  const performance = calculatePerformance(currentData)

  // Get the current benchmark name
  const currentBenchmarkName = benchmarks.find((b) => b.id === selectedBenchmark)?.name || "S&P 500"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Performance</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Compare to:</span>
            <Select value={selectedBenchmark} onValueChange={setSelectedBenchmark}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select benchmark" />
              </SelectTrigger>
              <SelectContent>
                {benchmarks.map((benchmark) => (
                  <SelectItem key={benchmark.id} value={benchmark.id}>
                    {benchmark.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-1">
            <Button variant={timeWindow === "1d" ? "default" : "outline"} size="sm" onClick={() => setTimeWindow("1d")}>
              1D
            </Button>
            <Button variant={timeWindow === "1w" ? "default" : "outline"} size="sm" onClick={() => setTimeWindow("1w")}>
              1W
            </Button>
            <Button variant={timeWindow === "1m" ? "default" : "outline"} size="sm" onClick={() => setTimeWindow("1m")}>
              1M
            </Button>
            <Button variant={timeWindow === "3m" ? "default" : "outline"} size="sm" onClick={() => setTimeWindow("3m")}>
              3M
            </Button>
            <Button variant={timeWindow === "6m" ? "default" : "outline"} size="sm" onClick={() => setTimeWindow("6m")}>
              6M
            </Button>
            <Button variant={timeWindow === "1y" ? "default" : "outline"} size="sm" onClick={() => setTimeWindow("1y")}>
              1Y
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-4">
          <PerformanceContent
            data={currentData}
            performance={performance}
            timeWindow={timeWindow}
            benchmarkName={currentBenchmarkName}
          />
        </TabsContent>
        <TabsContent value="stocks" className="mt-4">
          <PerformanceContent
            data={currentData}
            performance={performance}
            timeWindow={timeWindow}
            benchmarkName={currentBenchmarkName}
          />
        </TabsContent>
        <TabsContent value="crypto" className="mt-4">
          <PerformanceContent
            data={currentData}
            performance={performance}
            timeWindow={timeWindow}
            benchmarkName={currentBenchmarkName}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PerformanceContentProps {
  data: any[]
  performance: {
    portfolioChange: number
    portfolioChangePercent: number
    benchmarkChange: number
    benchmarkChangePercent: number
    outperformance: number
  }
  timeWindow: string
  benchmarkName: string
}

function PerformanceContent({ data, performance, timeWindow, benchmarkName }: PerformanceContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio vs {benchmarkName}</CardTitle>
          <CardDescription>Comparing your portfolio performance against {benchmarkName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ChartContainer
              config={{
                portfolio: {
                  label: "Your Portfolio",
                  color: "hsl(var(--chart-1))",
                },
                benchmark: {
                  label: benchmarkName,
                  color: "hsl(var(--chart-2))",
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="var(--color-portfolio)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="var(--color-benchmark)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Portfolio</CardTitle>
            <CardDescription>Performance over {timeWindow} period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Change</p>
                <p
                  className={`text-2xl font-bold ${performance.portfolioChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {performance.portfolioChange >= 0 ? "+" : ""}${performance.portfolioChange.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Percent Change</p>
                <p
                  className={`text-2xl font-bold ${performance.portfolioChangePercent >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {performance.portfolioChangePercent >= 0 ? "+" : ""}
                  {performance.portfolioChangePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Benchmark ({benchmarkName})</CardTitle>
            <CardDescription>Performance over {timeWindow} period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Change</p>
                <p
                  className={`text-2xl font-bold ${performance.benchmarkChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {performance.benchmarkChange >= 0 ? "+" : ""}${performance.benchmarkChange.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Percent Change</p>
                <p
                  className={`text-2xl font-bold ${performance.benchmarkChangePercent >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {performance.benchmarkChangePercent >= 0 ? "+" : ""}
                  {performance.benchmarkChangePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comparison</CardTitle>
            <CardDescription>Your performance vs benchmark</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Outperformance</p>
                <p
                  className={`text-2xl font-bold ${performance.outperformance >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {performance.outperformance >= 0 ? "+" : ""}
                  {performance.outperformance.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-xl font-medium">
                  {performance.outperformance >= 0 ? "Outperforming benchmark" : "Underperforming benchmark"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

