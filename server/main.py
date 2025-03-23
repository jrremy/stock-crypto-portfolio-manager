from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Literal, Annotated
from sqlalchemy.orm import Session
from datetime import datetime

import crud.portfolio
import crud.transaction
from database import engine, SessionLocal
import models, crud, schemas

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

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

# Portfolio endpoints

@app.post("/portfolios", response_model=schemas.PortfolioBase)
async def create_portfolio(portfolio: schemas.PortfolioCreate, db: Session = Depends(get_db)):
    return crud.portfolio.create_portfolio(db, portfolio)

@app.get("/portfolios/{portfolio_id}")
async def get_portfolio(portfolio_id: int, db: Session = Depends(get_db)):
    return crud.portfolio.get_portfolio(db, portfolio_id)

@app.put("/portfolios/{portfolio_id}", response_model=schemas.PortfolioBase)
async def update_portfolio(portfolio_id: int, portfolio: schemas.PortfolioUpdate, db: Session = Depends(get_db)):
    updated_portfolio = crud.portfolio.update_portfolio(db, portfolio_id, portfolio)
    if not updated_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return updated_portfolio

@app.delete("/portfolios/{portfolio_id}")
async def delete_portfolio(portfolio_id: int, db: Session = Depends(get_db)):
    deleted_portfolio = crud.portfolio.delete_portfolio(db, portfolio_id)
    if not deleted_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return {"detail": "Portfolio deleted successfully"}

# Transaction endpoints

@app.post("/transactions", response_model=schemas.TransactionBase)
async def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    return crud.transaction.create_transaction(db, transaction)

@app.get("/transactions/{portfolio_id}")
async def get_transactions(portfolio_id: int, db: Session = Depends(get_db)):
    return crud.transaction.get_transactions_by_portfolio(db, portfolio_id)

@app.put("/transactions/{transaction_id}", response_model=schemas.TransactionBase)
async def update_transaction(transaction_id: int, transaction: schemas.TransactionUpdate, db: Session = Depends(get_db)):
    updated_transaction = crud.transaction.update_transaction(db, transaction_id, transaction)
    if not updated_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return updated_transaction

@app.delete("/transactions/{transaction_id}")
async def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    deleted_transaction = crud.transaction.delete_transaction(db, transaction_id)
    if not deleted_transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return {"detail": "Transaction deleted successfully"}