import os
import json
import requests
from typing import Dict, Optional
from fastapi import HTTPException

try:
    from .coingecko_mapping import COINGECKO_MAPPING
    MAPPING_AVAILABLE = True
except ImportError:
    MAPPING_AVAILABLE = False

class PriceService:
    def __init__(self):
        self.alpha_vantage_api_key = os.getenv("ALPHA_VANTAGE_API_KEY")
        self.coingecko_api_url = "https://api.coingecko.com/api/v3"

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
        # Convert symbol to lowercase for CoinGecko
        symbol = symbol.lower()
        
        try:
            # Try to use mapping file if available
            if MAPPING_AVAILABLE:
                coin_id = COINGECKO_MAPPING.get(symbol)
                if coin_id:
                    return await self._get_crypto_price_by_id(coin_id)
            
            # If mapping not available or symbol not found, fetch from API
            url = f"{self.coingecko_api_url}/coins/list"
            response = requests.get(url)
            response.raise_for_status()
            coins = response.json()
            
            coin_id = next((coin["id"] for coin in coins if coin["symbol"] == symbol), None)
            if not coin_id:
                raise HTTPException(status_code=404, detail=f"Crypto {symbol} not found")
            
            return await self._get_crypto_price_by_id(coin_id)
            
        except requests.RequestException as e:
            raise HTTPException(status_code=500, detail=f"Error fetching crypto price: {str(e)}")

    async def _get_crypto_price_by_id(self, coin_id: str) -> float:
        """Helper method to get price by coin ID"""
        url = f"{self.coingecko_api_url}/simple/price"
        params = {
            "ids": coin_id,
            "vs_currencies": "usd"
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return float(data[coin_id]["usd"])

    async def calculate_portfolio_value(self, stock_assets: Dict[str, float], crypto_assets: Dict[str, float]) -> float:
        """Calculate total portfolio value based on current prices"""
        total_value = 0.0
        print(f"price_service calculate_portfolio_value: \nstock_assets = {stock_assets}\ncrypto_assets = {crypto_assets}")
        # Calculate stock value
        # for symbol, quantity in stock_assets.items():
        #     price = await self.get_stock_price(symbol)
        #     total_value += price * quantity
            
        # Calculate crypto value
        for symbol, quantity in crypto_assets.items():
            price = await self.get_crypto_price(symbol)
            total_value += price * quantity
        print(f"price_service calculate_portfolio_value returning {total_value}")
        return total_value