from sqlalchemy import Column, ForeignKey, Integer, String, Float
from database import Base

class Portfolio(Base):
    __tablename__ = 'portfolios'
    
    id = Column(Integer, primary_key=True, index=True)

class Transaction(Base):
    __tablename__ = 'transactions'
    
    id = Column(Integer, primary_key=True, index=True)
    asset_type = Column(String)
    ticker = Column(String)
    transaction_type = Column(String)
    quantity = Column(Integer)
    price = Column(Float)