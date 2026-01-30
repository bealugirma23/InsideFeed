from sqlalchemy.orm import sessionmaker
from .models import engine, Category, Source, Article

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def insert_category(db, name, slug):
    category = Category(name=name, slug=slug)
    db.add(category)
    try:
        db.commit()
        return category
    except Exception as e:
        db.rollback()
        # Handle duplicate key error if needed
        existing_category = db.query(Category).filter(Category.slug == slug).first()
        return existing_category

def insert_source(db, name, base_url, source_type):
    source = Source(name=name, base_url=base_url, type=source_type)
    db.add(source)
    try:
        db.commit()
        return source
    except Exception as e:
        db.rollback()
        # Handle duplicate key error if needed
        existing_source = db.query(Source).filter(Source.name == name).first()
        return existing_source

def insert_article(db, article: Article):
    db.add(article)
    try:
        db.commit()
        return article
    except Exception as e:
        db.rollback()
        # Handle duplicate key error if needed
        existing_article = db.query(Article).filter(Article.url == article.url).first()
        return existing_article
