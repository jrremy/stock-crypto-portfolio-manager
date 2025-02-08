from sqlalchemy.orm import Session
from models import Portfolio, Transaction
from schemas import PortfolioCreate
from fastapi import HTTPException

def create_portfolio(db: Session, portfolio: PortfolioCreate):
    db_portfolio = Portfolio()
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    
    for txn in portfolio.transactions:
        db_transaction = Transaction(
            asset_type=txn.asset_type,
            ticker=txn.ticker,
            transaction_type=txn.transaction_type,
            quantity=txn.quantity,
            price=txn.price,
            timestamp=txn.timestamp,
            portfolio_id=db_portfolio.id
        )
        db.add(db_transaction)

    db.commit()
    return db_portfolio

def get_portfolio(db: Session, portfolio_id: int):
    portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio

def update_portfolio(db: Session, portfolio_id: int, portfolio: PortfolioCreate):
    db_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if db_portfolio:
        db_portfolio.transactions = portfolio.transactions
        db.commit()
        db.refresh(db_portfolio)
    return db_portfolio

def delete_portfolio(db: Session, portfolio_id: int):
    db_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if db_portfolio:
        db.delete(db_portfolio)
        db.commit()
    return db_portfolio
