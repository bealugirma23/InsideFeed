import requests
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod
from db.models import SessionLocal, Article, Source
from utils.logger import logger, log_error

class BaseScraper(ABC):
    def __init__(self, source_name):
        self.source_name = source_name
        self.db = SessionLocal()
        self.source = self.db.query(Source).filter(Source.name == source_name).first()
        if not self.source:
             log_error(f"Source '{source_name}' not found in database. Please seed sources first.")
             raise ValueError(f"Source '{source_name}' not found in database.")

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

    def save_article(self, title, content, url, published_at=None, category_id=None):
        existing = self.db.query(Article).filter(Article.url == url).first()
        if existing:
            return existing

        article = Article(
            title=title,
            content=content,
            url=url,
            published_at=published_at,
            source_id=self.source.id,
            category_id=category_id
        )
        self.db.add(article)
        try:
            self.db.commit()
            return article
        except Exception as e:
            self.db.rollback()
            log_error(f"Error saving article {url}: {e}")
            return None

    def __del__(self):
        if hasattr(self, 'db'):
            self.db.close()
