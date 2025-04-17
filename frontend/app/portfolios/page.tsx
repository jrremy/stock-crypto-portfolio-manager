"use client";

import { useEffect, useState } from "react";
import { Portfolio } from "@/types";
import { getPortfolios, createPortfolio, deletePortfolio } from "@/lib/api";

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const data = await getPortfolios();
        setPortfolios(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch portfolios"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleCreatePortfolio = async () => {
    try {
      const newPortfolio = await createPortfolio({
        name: "New Portfolio",
        stock_assets: {},
        crypto_assets: {},
      });
      setPortfolios([...portfolios, newPortfolio]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create portfolio"
      );
    }
  };

  const handleDeletePortfolio = async (id: number) => {
    try {
      await deletePortfolio(id);
      setPortfolios(portfolios.filter((p) => p.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete portfolio"
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolios</h1>
      <button
        onClick={handleCreatePortfolio}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Portfolio
      </button>
      <div className="grid gap-4">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{portfolio.name}</h2>
            <div className="mt-2">
              <h3 className="font-medium">Stock Assets:</h3>
              <ul>
                {Object.entries(portfolio.stock_assets).map(
                  ([ticker, quantity]) => (
                    <li key={ticker}>
                      {ticker}: {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="mt-2">
              <h3 className="font-medium">Crypto Assets:</h3>
              <ul>
                {Object.entries(portfolio.crypto_assets).map(
                  ([ticker, quantity]) => (
                    <li key={ticker}>
                      {ticker}: {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
            <button
              onClick={() => handleDeletePortfolio(portfolio.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
