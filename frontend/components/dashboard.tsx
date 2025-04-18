"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/hooks/use-portfolio";
import { useQuery } from "@tanstack/react-query";
import { getPortfolioValue } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentTransactions } from "@/components/recent-transactions";
import { PortfolioComposition } from "@/components/portfolio-composition";
import { PortfolioPerformance } from "@/components/portfolio-performance";
import { NewsEvents } from "@/components/news-events";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export function Dashboard() {
  const { currentPortfolio } = usePortfolio();
  const portfolioId = currentPortfolio?.id;

  const { data: portfolioValue } = useQuery({
    queryKey: ["portfolioValue", portfolioId],
    queryFn: () => {
      if (!portfolioId) throw new Error("No portfolio selected");
      return getPortfolioValue(portfolioId);
    },
    enabled: !!portfolioId,
  });

  // Mock data - would come from API in real app
  const portfolioSummary = {
    totalValue: portfolioValue?.total_value ?? 0,
    dailyChange: 1250.45,
    dailyChangePercent: 1.02,
    weeklyChange: -2340.78,
    weeklyChangePercent: -1.85,
    bestAsset: {
      name: "NVDA",
      change: 5.67,
    },
    worstAsset: {
      name: "BTC",
      change: -3.21,
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Portfolio Summary</CardTitle>
          <CardDescription>
            Quick overview of your portfolio performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">
                ${portfolioSummary.totalValue.toLocaleString()}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">24h Change</p>
              <div className="flex items-center gap-1">
                <p
                  className={`text-2xl font-bold ${
                    portfolioSummary.dailyChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ${Math.abs(portfolioSummary.dailyChange).toLocaleString()}
                </p>
                <div
                  className={`flex items-center ${
                    portfolioSummary.dailyChange >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {portfolioSummary.dailyChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span className="text-sm">
                    {Math.abs(portfolioSummary.dailyChangePercent).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Best Performer</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">
                  {portfolioSummary.bestAsset.name}
                </p>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">
                    {portfolioSummary.bestAsset.change}%
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Worst Performer</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">
                  {portfolioSummary.worstAsset.name}
                </p>
                <div className="flex items-center text-red-500">
                  <TrendingDown className="h-4 w-4" />
                  <span className="text-sm">
                    {Math.abs(portfolioSummary.worstAsset.change)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:row-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest 5 transactions</CardDescription>
            </div>
            <Link href="/transactions">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentTransactions />
          </CardContent>
        </Card>

        <Card className="md:row-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Latest News</CardTitle>
              <CardDescription>News related to your assets</CardDescription>
            </div>
            <Link href="/events">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <NewsEvents limit={3} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Portfolio Composition</CardTitle>
              <CardDescription>Asset allocation breakdown</CardDescription>
            </div>
            <Link href="/statistics/composition">
              <Button variant="ghost" size="sm" className="gap-1">
                Details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <PortfolioComposition />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Portfolio performance overview</CardDescription>
            </div>
            <Link href="/statistics/performance">
              <Button variant="ghost" size="sm" className="gap-1">
                Details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <PortfolioPerformance />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Button({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: any) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "default" &&
          "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-9 rounded-md px-3",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
