from sqlalchemy.orm import Session
from schemas import *
from models import *
from fastapi import HTTPException

def create_transaction(db: Session, transaction: TransactionCreate):
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
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

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
