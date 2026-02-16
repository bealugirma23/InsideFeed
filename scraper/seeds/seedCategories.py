"""Seed categories into the database."""

from db.models import create_tables, SessionLocal
from db.connection import insert_category
from config.sources import CATEGORIES
from utils.logger import logger

def seed_categories():
    """Seed categories into the database."""
    # Create tables if they don't exist
    create_tables()

    # Get database session
    db = SessionLocal()

    try:
        for category_data in CATEGORIES:
            category = insert_category(db, category_data["name"], category_data["slug"])
            if category:
                logger.info(f"Seeded category: {category.name}")
        
        logger.info(f"Successfully seeded {len(CATEGORIES)} categories.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_categories()