from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

DB_URL = ""

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(bind=engine, autoflush=False)

Base = declarative_base()
