import requests
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod
from db.models import SessionLocal, Article, Source, Category
from utils.logger import logger, log_error

class BaseScraper(ABC):
    def __init__(self, source_name, max_articles=5):
        self.source_name = source_name
        self.max_articles = max_articles
        self.articles_scraped = 0
        self.db = SessionLocal()
        self.source = self.db.query(Source).filter(Source.name == source_name).first()
        if not self.source:
             log_error(f"Source '{source_name}' not found in database. Please seed sources first.")
             raise ValueError(f"Source '{source_name}' not found in database.")
        
        # Get default category (Uncategorized)
        self.default_category = self.db.query(Category).filter(Category.slug == "uncategorized").first()
        if not self.default_category:
            log_error("Default 'Uncategorized' category not found. Please seed categories first.")
            raise ValueError("Default 'Uncategorized' category not found.")

    def fetch(self, url):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            log_error(f"Error fetching {url}: {e}")
            return None

    @abstractmethod
    def scrape(self):
        """Main method to be implemented by child classes"""
        pass

    def should_continue_scraping(self):
        """Check if we should continue scraping based on article limit"""
        return self.articles_scraped < self.max_articles

    def save_article(self, title, content, url, published_at=None, category_id=None):
        if not self.should_continue_scraping():
            logger.info(f"Reached maximum articles limit ({self.max_articles}) for {self.source_name}")
            return None
            
        existing = self.db.query(Article).filter(Article.url == url).first()
        if existing:
            return existing

        # Use default category if none provided
        if category_id is None:
            category_id = self.default_category.id

        article = Article(
            title=title,
            content=content,
            url=url,
            publishedAt=published_at,
            sourceId=self.source.id,
            categoryId=category_id
        )
        self.db.add(article)
        try:
            self.db.commit()
            self.articles_scraped += 1
            logger.info(f"Saved article {self.articles_scraped}/{self.max_articles}: {title[:50]}...")
            return article
        except Exception as e:
            self.db.rollback()
            log_error(f"Error saving article {url}: {e}")
            return None

    def __del__(self):
        if hasattr(self, 'db'):
            self.db.close()
