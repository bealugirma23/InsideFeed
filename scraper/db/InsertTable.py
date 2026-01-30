from dataclasses import dataclass
import psycopg2
from psycopg2.extras import RealDictCursor


@dataclass
class News:
    title: str
    author: str
    word_count: int
    content: str
    summary: str
    url: str
    imageUrl: str
    createdAt: str
    categoryId: str
    sourceId: str
    isBreaking: bool


def insert_data(article: News) -> bool:
    query = """
        INSERT INTO news (
            title,
            author,
            word_count,
            content,
            summary,
            url,
            image_url,
            created_at,
            category_id,
            source_id,
            is_breaking
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        article.title,
        article.author,
        article.word_count,
        article.content,
        article.summary,
        article.url,
        article.imageUrl,
        article.createdAt,
        article.categoryId,
        article.sourceId,
        article.isBreaking,
    )

    try:
        with conn.cursor() as cur:
                cur.execute(query, values)
        return True
    except Exception as e:
        print("Insert failed:", e)
        return False

