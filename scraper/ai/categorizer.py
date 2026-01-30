import ollama
from db.models import SessionLocal, Article, Category
from config.sources import CATEGORIES
from utils.logger import logger, log_success, log_error, console
from sqlalchemy import or_

def get_category_map():
    """Returns a dictionary mapping category names (lowercased) to their IDs."""
    db = SessionLocal()
    try:
        categories = db.query(Category).all()
        return {c.name.lower(): c.id for c in categories}
    finally:
        db.close()

def categorize_articles(batch_size: int = 10):
    """
    Fetches uncategorized articles and uses Ollama (qwen2.5) to categorize them.
    """
    db = SessionLocal()
    category_map = get_category_map()
    valid_categories = [c["name"] for c in CATEGORIES]
    
    # Fetch articles where category_id is NULL
    articles = db.query(Article).filter(Article.category_id == None).limit(batch_size).all()
    
    if not articles:
        logger.info("No uncategorized articles found.")
        return

    logger.info(f"Categorizing {len(articles)} articles using [bold magenta]qwen2.5[/bold magenta]...")

    for article in articles:
        try:
            # Prepare content for categorization (Title + snippet of content)
            text_to_analyze = f"Title: {article.title}\nContent: {article.content[:500] if article.content else ''}"
            
            prompt = f"""
            You are a news categorizer. Categorize the following news article into EXACTLY ONE of these categories:
            {', '.join(valid_categories)}

            Article:
            {text_to_analyze}

            Response: (Return only the category name, nothing else)
            """

            response = ollama.chat(model='qwen2.5', messages=[
                {
                    'role': 'user',
                    'content': prompt,
                },
            ])

            predicted_category = response['message']['content'].strip().strip('"').strip("'")
            
            # Match predicted category with database IDs
            matched_id = None
            for cat_name, cat_id in category_map.items():
                if cat_name == predicted_category.lower():
                    matched_id = cat_id
                    break
            
            if matched_id:
                article.category_id = matched_id
                db.commit()
                logger.info(f"Categorized: '[italic]{article.title[:50]}[/italic]...' -> [bold green]{predicted_category}[/bold green]")
            else:
                log_error(f"Ollama returned an invalid category: '{predicted_category}' for article '{article.title}'")
                
        except Exception as e:
            log_error(f"Error categorizing article '{article.title}': {e}")
            db.rollback()

    log_success(f"Categorization batch complete.")
    db.close()

if __name__ == "__main__":
    categorize_articles()
