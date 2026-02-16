import enum
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
try:
    from config.settings import DATABASE_URL
except ImportError:
    # Fallback for scripts running directly if needed during transition
    import os
    DATABASE_URL = f"postgresql://{os.getenv('DB_USER','postgres')}:{os.getenv('DB_PASSWORD','password')}@localhost:5432/news_platform"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class SourceType(enum.Enum):
    TELEGRAM = "TELEGRAM"
    WEB = "WEB"



class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    createdAt = Column(DateTime, default=datetime.utcnow)
    
    articles = relationship("Article", back_populates="category")

class Source(Base):
    __tablename__ = "source"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    baseUrl = Column(String, nullable=False)
    type = Column(String, nullable=False)  # WEB or TELEGRAM
    createdAt = Column(DateTime, default=datetime.utcnow)

    articles = relationship("Article", back_populates="source")

class Article(Base):
    __tablename__ = "articles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title = Column(String, index=True, nullable=False)
    content = Column(Text, nullable=True)
    summary = Column(String, nullable=True)
    
    # Canonical identity (Telegram → t.me link)
    url = Column(String, unique=True, index=True, nullable=False)
    
    # Media is OPTIONAL and NOT unique
    imageUrl = Column(String, nullable=True, index=True)
    
    publishedAt = Column(DateTime, nullable=True, index=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    
    view = Column(String, nullable=True)
    popularityScore = Column(Float, default=0.0)
    isBreaking = Column(Boolean, default=False)

    sourceId = Column(UUID(as_uuid=True), ForeignKey("source.id"), nullable=False)
    categoryId = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False, index=True)

    source = relationship("Source", back_populates="articles")
    category = relationship("Category", back_populates="articles")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)