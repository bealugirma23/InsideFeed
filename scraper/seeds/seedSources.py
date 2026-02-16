"""Seed sources into the database."""

from db.models import create_tables, SessionLocal
from db.connection import insert_source
from config.sources import SOURCES
from utils.logger import logger

def seed_sources():
    """Seed sources into the database."""
    # Create tables if they don't exist
    create_tables()
    
    # Get database session
    db = SessionLocal()
    
    try:
        for source_data in SOURCES:
            source = insert_source(
                db, 
                source_data["name"], 
                source_data["base_url"], 
                source_data["type"]
            )
            if source:
                logger.info(f"Seeded source: {source.name}")
        
        logger.info(f"Successfully seeded {len(SOURCES)} sources.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_sources()
