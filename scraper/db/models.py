from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
try:
    from config.settings import DATABASE_URL
except ImportError:
    # Fallback for scripts running directly if needed during transition
    import os
    DATABASE_URL = f"postgresql://{os.getenv('DB_USER','postgres')}:{os.getenv('DB_PASSWORD','password')}@localhost:5432/news_platform"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    
    articles = relationship("Article", back_populates="category")

class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    base_url = Column(String, nullable=False)
    type = Column(String, nullable=False)  # WEB or TELEGRAM

    articles = relationship("Article", back_populates="source")
    telegram_messages = relationship("TelegramMessage", back_populates="source")

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(Text, nullable=True)
    url = Column(String, unique=True, index=True, nullable=False)
    published_at = Column(DateTime, default=datetime.utcnow)
    scraped_at = Column(DateTime, default=datetime.utcnow)
    
    source_id = Column(Integer, ForeignKey("sources.id"))
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    source = relationship("Source", back_populates="articles")
    category = relationship("Category", back_populates="articles")

class TelegramMessage(Base):
    __tablename__ = "telegram_messages"

    id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, index=True)
    content = Column(Text, nullable=True)
    date = Column(DateTime, index=True)
    media_path = Column(String, nullable=True)
    views = Column(Integer, nullable=True)
    forwards = Column(Integer, nullable=True)
    reactions = Column(String, nullable=True)
    
    source_id = Column(Integer, ForeignKey("sources.id"))
    source = relationship("Source", back_populates="telegram_messages")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)