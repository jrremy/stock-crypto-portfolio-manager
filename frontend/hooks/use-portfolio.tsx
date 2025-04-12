"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Portfolio } from "@/types";

interface PortfolioContextType {
  currentPortfolio: Portfolio | null;
  setCurrentPortfolio: (portfolio: Portfolio | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(
    null
  );

  return (
    <PortfolioContext.Provider
      value={{ currentPortfolio, setCurrentPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
