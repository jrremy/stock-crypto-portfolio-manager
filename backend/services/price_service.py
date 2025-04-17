import os
import requests
from typing import Dict
from fastapi import HTTPException

class PriceService:
    def __init__(self):
        self.alpha_vantage_api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
        self.coingecko_api_key = os.getenv("COINGECKO_API_KEY")
        self.coingecko_api_url = f"https://pro-api.coingecko.com/api/v3"

    async def get_stock_price(self, symbol: str) -> float:
        """Fetch current stock price from Alpha Vantage"""
        if not self.alpha_vantage_api_key:
            raise HTTPException(status_code=500, detail="Alpha Vantage API key not configured")

        url = f"https://www.alphavantage.co/query"
        params = {
            "function": "GLOBAL_QUOTE",
            "symbol": symbol,
            "apikey": self.alpha_vantage_api_key
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            if "Global Quote" not in data:
                raise HTTPException(status_code=404, detail=f"Stock {symbol} not found")
                
            return float(data["Global Quote"]["05. price"])
        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error fetching stock price: {str(e)}")

    async def get_crypto_price(self, symbol: str) -> float:
        """Fetch current crypto price from CoinGecko"""
        if not self.coingecko_api_key:
            raise HTTPException(status_code=500, detail="CoinGecko API key not configured")
        
        # Convert symbol to lowercase for CoinGecko
        symbol = symbol.lower()
        
        try:
            # First get the coin ID
            url = f"{self.coingecko_api_url}/coins/list"
            headers = {
                "accept": "application/json",
                "x-cg-pro-api-key": self.coingecko_api_key
            }
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            coins = response.json()
            
            coin_id = next((coin["id"] for coin in coins if coin["symbol"] == symbol), None)
            if not coin_id:
                raise HTTPException(status_code=404, detail=f"Crypto {symbol} not found")
            
            # Then get the price
            url = f"{self.coingecko_api_url}/simple/price"
            headers = {
                "accept": "application/json",
                "x-cg-pro-api-key": self.coingecko_api_key
            }
            params = {
                "ids": coin_id,
                "vs_currencies": "usd"
            }
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            return float(data[coin_id]["usd"])
        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error fetching crypto price: {str(e)}")

    async def calculate_portfolio_value(self, stock_assets: Dict[str, float], crypto_assets: Dict[str, float]) -> float:
        """Calculate total portfolio value based on current prices"""
        total_value = 0.0
        
        # Calculate stock value
        for symbol, quantity in stock_assets.items():
            price = await self.get_stock_price(symbol)
            total_value += price * quantity
            
        # Calculate crypto value
        for symbol, quantity in crypto_assets.items():
            price = await self.get_crypto_price(symbol)
            total_value += price * quantity
            
        return total_value 