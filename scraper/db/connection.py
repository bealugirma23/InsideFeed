import psycopg2

conn = psycopg2.connect(
    host=DB_HOST,
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)

def insert_news(article):
    with conn.cursor() as cur:
        cur.execute("""
            INSERT INTO news (
                title, content, source, category, published_at, url
            )
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (url) DO NOTHING
        """, (
            article["title"],
            article["content"],
            article["source"],
            article["category"],
            article["published_at"],
            article["url"],
        ))
    conn.commit()

def create_tables():
    """Create all database tables based on models."""
    # Enable pgvector extension if not already enabled
    # Note: This requires superuser privileges or the extension must be pre-installed
    with engine.begin() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    
    # Import models to ensure they're registered with Base
    from models import TranscriptSegment  # noqa: F401
    Base.metadata.create_all(bind=engine)
