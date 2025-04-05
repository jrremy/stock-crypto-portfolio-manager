from sqlalchemy.orm import Session
from schemas import *
from models import *
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

def create_transaction(db: Session, transaction: TransactionCreate):
    # First get the portfolio to update its assets
    portfolio = db.query(Portfolio).filter(Portfolio.id == transaction.portfolio_id).first()
    if not portfolio:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    logger.debug(f"Before update - stock_assets: {portfolio.stock_assets}, crypto_assets: {portfolio.crypto_assets}")

    # Create the transaction
    db_transaction = Transaction(
        asset_type=transaction.asset_type,
        ticker=transaction.ticker,
        transaction_type=transaction.transaction_type,
        quantity=transaction.quantity,
        price=transaction.price,
        timestamp=transaction.timestamp,
        portfolio_id=transaction.portfolio_id
    )
    db.add(db_transaction)

    # Update portfolio assets based on transaction
    if transaction.asset_type == 'stock':
        current_quantity = portfolio.stock_assets.get(transaction.ticker, 0)
        if transaction.transaction_type == 'buy':
            portfolio.stock_assets[transaction.ticker] = current_quantity + transaction.quantity
        elif transaction.transaction_type == 'sell':
            if current_quantity < transaction.quantity:
                raise HTTPException(status_code=400, detail=f"Not enough {transaction.ticker} to sell")
            new_quantity = current_quantity - transaction.quantity
            if new_quantity == 0:
                del portfolio.stock_assets[transaction.ticker]
            else:
                portfolio.stock_assets[transaction.ticker] = new_quantity
    else:  # crypto
        current_quantity = portfolio.crypto_assets.get(transaction.ticker, 0)
        if transaction.transaction_type == 'buy':
            portfolio.crypto_assets[transaction.ticker] = current_quantity + transaction.quantity
        elif transaction.transaction_type == 'sell':
            if current_quantity < transaction.quantity:
                raise HTTPException(status_code=400, detail=f"Not enough {transaction.ticker} to sell")
            new_quantity = current_quantity - transaction.quantity
            if new_quantity == 0:
                del portfolio.crypto_assets[transaction.ticker]
            else:
                portfolio.crypto_assets[transaction.ticker] = new_quantity

    logger.debug(f"After update - stock_assets: {portfolio.stock_assets}, crypto_assets: {portfolio.crypto_assets}")

    try:
        db.commit()
        db.refresh(db_transaction)
        # Refresh the portfolio to ensure we have the latest data
        db.refresh(portfolio)
        logger.debug(f"After commit - stock_assets: {portfolio.stock_assets}, crypto_assets: {portfolio.crypto_assets}")
        return db_transaction
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create transaction: {str(e)}")

def get_transactions_by_portfolio(db: Session, portfolio_id: int):
    transactions = db.query(Transaction).filter(Transaction.portfolio_id == portfolio_id).all()
    if not transactions:
        raise HTTPException(status_code=404, detail="Transactions not found")
    return transactions

def update_transaction(db: Session, transaction_id: int, transaction: TransactionUpdate):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction:
        # Only update fields that are provided in the request body
        if transaction.asset_type:
            db_transaction.asset_type = transaction.asset_type
        if transaction.ticker:
            db_transaction.ticker = transaction.ticker
        if transaction.transaction_type:
            db_transaction.transaction_type = transaction.transaction_type
        if transaction.quantity is not None:
            db_transaction.quantity = transaction.quantity
        if transaction.price is not None:
            db_transaction.price = transaction.price
        if transaction.timestamp:
            db_transaction.timestamp = transaction.timestamp
        if transaction.portfolio_id is not None:
            db_transaction.portfolio_id = transaction.portfolio_id
        
        db.commit()
        db.refresh(db_transaction)
    return db_transaction

def delete_transaction(db: Session, transaction_id: int):
    db_transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
    return db_transaction
