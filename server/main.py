from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Literal, Annotated
from sqlalchemy.orm import Session

from database import engine, SessionLocal
import models

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class Transaction(BaseModel):
    id: int
    asset_type: Literal['stock', 'crypto']
    ticker: str
    transaction_type: Literal['buy', 'sell', 'swap']
    quantity: int
    price: float

class Portfolio(BaseModel):
    id: int
    transactions: List[Transaction]

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

@app.get("/transactions", response_model=list[Transaction])
async def get_transactions():
    return transactions

@app.get("/transactions/{id}")
async def get_transaction():
    return transactions[id]

@app.post("/transactions")
async def create_transaction(transaction: Transaction):
    transactions.append(transaction)
    return transaction