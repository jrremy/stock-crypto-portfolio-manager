# Stock + Crypto Portfolio Manager

This project is a unified portfolio management tool that enables users to track and analyze their stock and cryptocurrency transactions in one place. Built with a Next.js frontend and a FastAPI backend, it provides users with real-time asset data, performance tracking, and financial news aggregation. By integrating various APIs and data sources, the platform offers a comprehensive view of an investor's holdings across different brokerages, exchanges, and wallets.

## Features

- **Unified Portfolio Management**: Supports tracking transactions from both stock brokerages and multiple cryptocurrency exchanges and wallets in one dashboard.

- **Dynamic Visualizations**: Uses Chart.js (or Recharts, still deciding) to generate real-time portfolio value graphs and pie charts, providing insights into asset allocation and performance.

- **Performance Analytics**: Evaluates investment performance against benchmarks, leveraging Pandas for statistical analysis and data insights.

- **Real-Time Asset Data**: Integrates Alpaca and CoinGecko APIs for accurate and up-to-date market prices, enabling users to search and select stock and crypto tickers.

- **Financial News Aggregation**: Implements a Scrapy web crawler to fetch asset-specific news from multiple sources, offering real-time updates on holdings.

## Endpoints (As of now)

### Portfolio Endpoints

- **`POST /portfolios`** – Create a new portfolio.
- **`GET /portfolios/{portfolio_id}`** – Retrieve a specific portfolio by its ID.
- **`GET /portfolios/`** – Retrieve all portfolios.
- **`DELETE /portfolios/{portfolio_id}`** – Delete a portfolio by its ID.

### Transaction Endpoints

- **`POST /transactions`** – Create a new transaction.
- **`GET /transactions/{portfolio_id}`** – Retrieve all transactions associated with a portfolio.
- **`PUT /transactions/{transaction_id}`** – Update a specific transaction by its ID.
- **`DELETE /transactions/{transaction_id}`** – Delete a transaction by its ID.

## Development Status

This project is in development - my hands are still dirty. Here's what I'm currently working on:

- **Finishing up** the business logic of the backend
- **Polishing** the frontend UI/UX
- **Setting up** the Scrapy news scraper
- **Deciding** between Chart.js and Recharts for data visualization

Still need to start:

- **Implementing** Pandas-based performance analytics
- **Implementing** asset data fetching and ticker search results with Alpaca and CoinGecko APIs

## Motivation

Managing investments across multiple platforms can be challenging. Stock brokerage accounts, cryptocurrency exchanges, and self-custody wallets are often siloed, making it difficult to track overall portfolio performance. I wanted a unified dashboard to consolidate my transactions and provide a clear picture of my investments. By centralizing this data, I could analyze trends, compare performance against benchmarks, and make more informed financial decisions. This project was built to solve that problem—bringing everything together into one seamless experience.
