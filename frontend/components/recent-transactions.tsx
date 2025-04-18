"use client";

import { usePortfolio } from "@/hooks/use-portfolio";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { getTransactions } from "@/lib/api";
import { Transaction } from "@/types";

export function RecentTransactions() {
  const { currentPortfolio } = usePortfolio();
  const portfolioId = currentPortfolio?.id;

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", portfolioId],
    queryFn: () => {
      if (!portfolioId) throw new Error("No portfolio selected");
      return getTransactions(portfolioId, 5);
    },
    enabled: !!portfolioId, // only fetch if we have an ID
  });

  if (!portfolioId) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a portfolio to view transactions
      </p>
    );
  }

  if (isLoading) {
    return <p className="text-sm">Loading transactions...</p>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                transaction.transaction_type === "buy"
                  ? "bg-green-100 text-green-600"
                  : transaction.transaction_type === "sell"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {transaction.transaction_type === "buy" ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : transaction.transaction_type === "sell" ? (
                <ArrowDownRight className="h-5 w-5" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-medium">{transaction.ticker}</p>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs capitalize">
                  {transaction.asset_type}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {transaction.transaction_type === "buy"
                ? "+"
                : transaction.transaction_type === "sell"
                ? "-"
                : ""}
              {transaction.quantity} {transaction.ticker}
            </p>
            <p className="text-sm text-muted-foreground">
              ${transaction.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
