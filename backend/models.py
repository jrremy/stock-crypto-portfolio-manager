from sqlalchemy import Column, ForeignKey, Integer, String, Float, JSON, DateTime, func
from sqlalchemy.orm import relationship
from database import Base

class Portfolio(Base):
    __tablename__ = "portfolios"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    stock_assets = Column(JSON, default={})
    crypto_assets = Column(JSON, default={})
    transactions = relationship("Transaction", back_populates="portfolio")
    
class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    asset_type = Column(String, nullable=False)
    ticker = Column(String, nullable=False)
    transaction_type = Column(String, nullable=False)
    quantity = Column(Float, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    price = Column(Float, nullable=False)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"), nullable=False)
    
    portfolio = relationship("Portfolio", back_populates="transactions")   # Relationship