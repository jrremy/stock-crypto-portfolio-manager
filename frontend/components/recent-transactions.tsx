"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

export function RecentTransactions() {
  // Mock data - would come from API in real app
  const transactions = [
    {
      id: "1",
      assetType: "stock",
      ticker: "AAPL",
      transactionType: "buy",
      quantity: 10,
      price: 175.23,
      timestamp: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      assetType: "crypto",
      ticker: "BTC",
      transactionType: "sell",
      quantity: 0.5,
      price: 30245.67,
      timestamp: "2023-06-14T14:45:00Z",
    },
    {
      id: "3",
      assetType: "stock",
      ticker: "MSFT",
      transactionType: "buy",
      quantity: 5,
      price: 325.12,
      timestamp: "2023-06-13T09:15:00Z",
    },
    {
      id: "4",
      assetType: "crypto",
      ticker: "ETH",
      transactionType: "swap",
      quantity: 2,
      price: 1845.34,
      timestamp: "2023-06-12T16:20:00Z",
    },
    {
      id: "5",
      assetType: "stock",
      ticker: "NVDA",
      transactionType: "buy",
      quantity: 3,
      price: 420.78,
      timestamp: "2023-06-11T11:05:00Z",
    },
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                transaction.transactionType === "buy"
                  ? "bg-green-100 text-green-600"
                  : transaction.transactionType === "sell"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {transaction.transactionType === "buy" ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : transaction.transactionType === "sell" ? (
                <ArrowDownRight className="h-5 w-5" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="font-medium">{transaction.ticker}</p>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs capitalize">
                  {transaction.assetType}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {transaction.transactionType === "buy"
                ? "+"
                : transaction.transactionType === "sell"
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
