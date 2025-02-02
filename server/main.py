from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Annotated

from server.models import Transaction

app = FastAPI()

class Transaction(BaseModel):
    id: int
    asset_type: str
    ticker: str
    transaction_type: str
    quantity: int
    price: float

class Portfolio(BaseModel):
    id: int
    transactions: List[Transaction]

@app.get("/")
async def root():
    return {"message": "Hello World"}

transactions = []

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