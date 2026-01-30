from db.connection import get_db, insert_category
from db.models import create_tables
from config.sources import CATEGORIES

def seed_categories():
    # Create tables if they don't exist
    create_tables()

    # Get database session
    from db.connection import SessionLocal
    db = SessionLocal()

    try:
        for category_data in CATEGORIES:
            category = insert_category(db, category_data["name"], category_data["slug"])
            if category:
                print(f"Seeded category: {category.name}")
        
        print(f"Successfully seeded {len(CATEGORIES)} categories.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_categories()