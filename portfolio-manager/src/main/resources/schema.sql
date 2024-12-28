CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    asset_type VARCHAR(10) NOT NULL,      -- "crypto" or "stock"
    ticker VARCHAR(10) NOT NULL,         -- e.g., BTC, AAPL
    transaction_type VARCHAR(10) NOT NULL, -- "buy", "sell", "swap"
    quantity NUMERIC(10, 2) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    timestamp TIMESTAMP NOT NULL
);