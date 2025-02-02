from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Literal, Annotated
from sqlalchemy.orm import Session
from datetime import datetime

from database import engine, SessionLocal
import models

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class TransactionBase(BaseModel):
    id: int
    asset_type: Literal['stock', 'crypto']
    ticker: str
    transaction_type: Literal['buy', 'sell', 'swap']
    quantity: int
    timestamp: datetime | None = None
    price: float

class PortfolioBase(BaseModel):
    id: int
    transactions: List[TransactionBase]

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/portfolios/{portfolio_id}")
async def read_portfolio(portfolio_id: int, db: db_dependency):
    result = db.query(models.Portfolio).filter(models.Portfolio.id == portfolio_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return result

@app.get("/transactions/{portfolio_id}")
async def read_transactions(portfolio_id: int, db: db_dependency):
    result = db.query(models.Transaction).filter(models.Transaction.id == portfolio_id).all()
    if not result:
        raise HTTPException(status_code=404, detail="Transactions not found")
    return result

@app.post("/transactions")
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(
        asset_type=transaction.asset_type,
        ticker=transaction.ticker,
        transaction_type=transaction.transaction_type,
        quantity=transaction.quantity,
        price=transaction.price
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.post("/portfolios")
async def create_portfolio(portfolio: PortfolioBase, db: db_dependency):
    db_portfolio = models.Portfolio()
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    
    for txn in portfolio.transactions:
        db_transaction = models.Transaction(
            asset_type=txn.asset_type,
            ticker=txn.ticker,
            transaction_type=txn.transaction_type,
            quantity=txn.quantity,
            price=txn.price,
            portfolio_id=db_portfolio.id  # Link transaction to the portfolio
        )
        db.add(db_transaction)

    db.commit()
    return db_portfolio