from fastapi import FastAPI, Depends, Query
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

import crud.portfolio
import crud.transaction
from database import engine, SessionLocal
import models, crud, schemas

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("/portfolios/")
async def get_portfolios(db: Session = Depends(get_db)):
    return crud.portfolio.get_portfolios(db)

@app.delete("/portfolios/{portfolio_id}")
async def delete_portfolio(portfolio_id: int, db: Session = Depends(get_db)):
    return crud.portfolio.delete_portfolio(db, portfolio_id)

@app.put("/portfolios/{portfolio_id}", response_model=schemas.PortfolioBase)
async def update_portfolio(portfolio_id: int, portfolio: schemas.PortfolioUpdate, db: Session = Depends(get_db)):
    return crud.portfolio.update_portfolio(db, portfolio_id, portfolio)

# Transaction endpoints

@app.post("/transactions", response_model=schemas.TransactionBase)
async def create_transaction(transaction: schemas.TransactionCreate, db: Session = Depends(get_db)):
    return crud.transaction.create_transaction(db, transaction)

@app.get("/transactions/{portfolio_id}")
async def get_transactions(
    portfolio_id: int,
    limit: int = Query(default=10, gt=0),
    sort: str = Query(default="desc", pattern="^(asc|desc)$"),
    db: Session = Depends(get_db)
):
    return crud.transaction.get_transactions_by_portfolio(db, portfolio_id, limit, sort)

@app.put("/transactions/{transaction_id}", response_model=schemas.TransactionBase)
async def update_transaction(transaction_id: int, transaction: schemas.TransactionUpdate, db: Session = Depends(get_db)):
    return crud.transaction.update_transaction(db, transaction_id, transaction)

@app.delete("/transactions/{transaction_id}")
async def delete_transaction(transaction_id: int, db: Session = Depends(get_db)):
    return crud.transaction.delete_transaction(db, transaction_id)