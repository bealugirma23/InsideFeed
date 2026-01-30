from db.connection import get_db, insert_source
from db.models import create_tables
from config.sources import SOURCES

def seed_sources():
    # Create tables if they don't exist
    create_tables()
    
    # Get database session
    from db.connection import SessionLocal
    db = SessionLocal()
    
    try:
        for source_data in SOURCES:
            source = insert_source(db, source_data["name"], source_data["base_url"], source_data["type"])
            if source:
                print(f"Seeded source: {source.name}")
        
        print(f"Successfully seeded {len(SOURCES)} sources.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_sources()
