from sqlalchemy.orm import Session
import schemas, models
from fastapi import HTTPException

def create_transaction(db: Session, transaction: schemas.TransactionCreate):
    db_transaction = models.Transaction(
        asset_type=transaction.asset_type,
        ticker=transaction.ticker,
        transaction_type=transaction.transaction_type,
        quantity=transaction.quantity,
        price=transaction.price,
        timestamp=transaction.timestamp
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def get_transactions_by_portfolio(db: Session, portfolio_id: int):
    transactions = db.query(models.Transaction).filter(models.Transaction.portfolio_id == portfolio_id).all()
    if not transactions:
        raise HTTPException(status_code=404, detail="Transactions not found")
    return transactions

def update_transaction(db: Session, transaction_id: int, transaction: schemas.TransactionUpdate):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if db_transaction:
        db_transaction.asset_type = transaction.asset_type
        db_transaction.ticker = transaction.ticker
        db_transaction.transaction_type =transaction.transaction_type
        db_transaction.quantity = transaction.quantity
        db_transaction.price = transaction.price
        db.commit()
        db.refresh(db_transaction)
    return db_transaction

def delete_transaction(db: Session, transaction_id: int):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
    return db_transaction
