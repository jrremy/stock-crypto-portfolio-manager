from pydantic import BaseModel
from typing import List, Literal, Optional
from datetime import datetime

# Transaction Schemas
class TransactionBase(BaseModel):
    asset_type: Literal['stock', 'crypto']
    ticker: str
    transaction_type: Literal['buy', 'sell', 'swap']
    quantity: int
    price: float
    timestamp: Optional[datetime] = None
    portfolio_id: int

class TransactionCreate(TransactionBase):
    pass

class TransactionUpdate(BaseModel):
    asset_type: Optional[Literal['stock', 'crypto']] = None
    ticker: Optional[str] = None
    transaction_type: Optional[Literal['buy', 'sell', 'swap']] = None
    quantity: Optional[int] = None
    price: Optional[float] = None
    timestamp: Optional[datetime] = None
    portfolio_id: Optional[int] = None

class TransactionDelete(BaseModel):
    id: int

# Portfolio Schemas
class PortfolioBase(BaseModel):
    name: str
    stock_assets: dict[str, int] = {}  # ticker -> quantity mapping for stocks
    crypto_assets: dict[str, int] = {}  # ticker -> quantity mapping for crypto

class PortfolioCreate(PortfolioBase):
    pass

class PortfolioUpdate(BaseModel):
    name: Optional[str] = None
    stock_assets: Optional[dict[str, int]] = None
    crypto_assets: Optional[dict[str, int]] = None

class PortfolioDelete(BaseModel):
    id: int
