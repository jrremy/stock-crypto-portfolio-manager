export type AssetType = "stock" | "crypto";
export type TransactionType = "buy" | "sell" | "swap";

export interface Portfolio {
  id: number;
  name: string;
  stock_assets: Record<string, number>;
  crypto_assets: Record<string, number>;
}

export interface Transaction {
  id: number;
  asset_type: AssetType;
  ticker: string;
  transaction_type: TransactionType;
  quantity: number;
  price: number;
  timestamp: string;
  portfolio_id: number;
}
