from sqlalchemy import Column, ForeignKey, Integer, String, Float, JSON
from sqlalchemy.orm import relationship
from database import Base

class Portfolio(Base):
    __tablename__ = 'portfolios'
    
    id = Column(Integer, primary_key=True, index=True)
    stock_assets = Column(JSON)
    crypto_assets = Column(JSON)
    transactions = relationship("Transaction", back_populates="portfolio")  # Relationship
    
class Transaction(Base):
    __tablename__ = 'transactions'
    
    id = Column(Integer, primary_key=True, index=True)
    asset_type = Column(String)
    ticker = Column(String)
    transaction_type = Column(String)
    quantity = Column(Integer)
    price = Column(Float)
    portfolio_id = Column(Integer, ForeignKey("portfolios.id"))
    portfolio = relationship("Portfolio", back_populates="transactions")   # Relationship