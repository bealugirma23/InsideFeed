from sqlalchemy.orm import sessionmaker
from .models import engine, Category, Source, Article
import uuid

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def insert_category(db, name, slug):
    # Check if category already exists
    existing_category = db.query(Category).filter(Category.slug == slug).first()
    if existing_category:
        print(f"Category '{name}' already exists, skipping...")
        return existing_category
    
    category = Category(
        id=uuid.uuid4(),
        name=name, 
        slug=slug
    )
    db.add(category)
    try:
        db.commit()
        return category
    except Exception as e:
        db.rollback()
        print(f"Error inserting category '{name}': {e}")
        return None

def insert_source(db, name, base_url, source_type):
    # Check if source already exists
    existing_source = db.query(Source).filter(Source.name == name).first()
    if existing_source:
        print(f"Source '{name}' already exists, skipping...")
        return existing_source
    
    source = Source(
        id=uuid.uuid4(),
        name=name, 
        baseUrl=base_url, 
        type=source_type
    )
    db.add(source)
    try:
        db.commit()
        return source
    except Exception as e:
        db.rollback()
        print(f"Error inserting source '{name}': {e}")
        return None

def insert_article(db, article: Article):
    # Check if article already exists
    existing_article = db.query(Article).filter(Article.url == article.url).first()
    if existing_article:
        return existing_article
    
    db.add(article)
    try:
        db.commit()
        return article
    except Exception as e:
        db.rollback()
        print(f"Error inserting article: {e}")
        return None
