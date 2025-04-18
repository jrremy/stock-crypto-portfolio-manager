import { Portfolio, Transaction } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Portfolio API calls
export const getPortfolios = async (): Promise<Portfolio[]> => {
  try {
    console.log("Fetching portfolios from:", `${API_BASE_URL}/portfolios/`);
    const response = await fetch(`${API_BASE_URL}/portfolios/`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Failed to fetch portfolios: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Successfully fetched portfolios:", data);
    return data;
  } catch (error) {
    console.error("Error in getPortfolios:", error);
    throw error;
  }
};

export const getPortfolio = async (id: number): Promise<Portfolio> => {
  const response = await fetch(`${API_BASE_URL}/portfolios/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  console.log(`getPortfolio, id = ${id}: ${response.json()}`);
  return response.json();
};

export const createPortfolio = async (
  portfolio: Omit<Portfolio, "id">
): Promise<Portfolio> => {
  const response = await fetch(`${API_BASE_URL}/portfolios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolio),
  });
  if (!response.ok) {
    throw new Error("Failed to create portfolio");
  }
  return response.json();
};

export const updatePortfolio = async (
  id: number,
  portfolio: Partial<Portfolio>
): Promise<Portfolio> => {
  const response = await fetch(`${API_BASE_URL}/portfolios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(portfolio),
  });
  if (!response.ok) {
    throw new Error("Failed to update portfolio");
  }
  return response.json();
};

export const deletePortfolio = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/portfolios/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete portfolio");
  }
};

export const getTransactions = async (
  portfolioId: number,
  limit: number = 10,
  sort: "asc" | "desc" = "desc"
): Promise<Transaction[]> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort,
  });

  const response = await fetch(
    `${API_BASE_URL}/transactions/${portfolioId}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
};

export const createTransaction = async (
  transaction: Omit<Transaction, "id">
): Promise<Transaction> => {
  const response = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }
  return response.json();
};

export const updateTransaction = async (
  id: number,
  transaction: Partial<Transaction>
): Promise<Transaction> => {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });
  if (!response.ok) {
    throw new Error("Failed to update transaction");
  }
  return response.json();
};

export const deleteTransaction = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete transaction");
  }
};

export const getPortfolioValue = async (
  portfolioId: number
): Promise<{ total_value: number }> => {
  const response = await fetch(
    `${API_BASE_URL}/portfolios/${portfolioId}/value`
  );
  console.log("response fetched");
  if (!response.ok) {
    console.log("response not ok");
    throw new Error("Failed to fetch portfolio value");
  }
  console.log("portfolio value fetched:", response.json());
  return response.json();
};
