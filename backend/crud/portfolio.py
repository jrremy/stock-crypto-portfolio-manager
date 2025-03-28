from sqlalchemy.orm import Session
from ..models import Portfolio, Transaction
from ..schemas import PortfolioCreate, PortfolioUpdate
from fastapi import HTTPException

def create_portfolio(db: Session):
    db_portfolio = Portfolio()
    db.add(db_portfolio)
    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio

def get_portfolio(db: Session, portfolio_id: int):
    portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return portfolio

def get_portfolios(db: Session):
    portfolios = db.query(Portfolio).all()
    if not portfolios:
        raise HTTPException(status_code=404, detail="Portfolios not found")
    return portfolios

def update_portfolio(db: Session, portfolio_id: int, portfolio_update: PortfolioUpdate):
    db_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not db_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    if portfolio_update.name is not None:
        db_portfolio.name = portfolio_update.name

    db.commit()
    db.refresh(db_portfolio)
    return db_portfolio

def delete_portfolio(db: Session, portfolio_id: int):
    db_portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    if not db_portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    # Delete all transactions linked to this portfolio
    db.query(Transaction).filter(Transaction.portfolio_id == portfolio_id).delete()
    
    db.delete(db_portfolio)
    db.commit()
    return db_portfolio
