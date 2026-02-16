import os
import json
import asyncio
import warnings
from pathlib import Path
from typing import Optional
from datetime import datetime

from telethon import TelegramClient
from telethon.tl.types import (
    MessageMediaPhoto,
    MessageMediaDocument,
    MessageMediaWebPage,
)
from telethon.errors import SessionPasswordNeededError

from sqlalchemy import or_

from config.settings import (
    TELEGRAM_API_ID,
    TELEGRAM_API_HASH,
    TELEGRAM_SESSION_NAME,
    TELEGRAM_PHONE,
    SCRAPE_MEDIA,
    BATCH_SIZE,
)

from db.models import SessionLocal, Article, Source, Category

warnings.filterwarnings(
    "ignore", message="Using async sessions support is an experimental feature"
)


class OptimizedTelegramScraper:
    def __init__(self):
        self.client: Optional[TelegramClient] = None
        self.db = SessionLocal()
        
        # Get default category (Uncategorized)
        self.default_category = self.db.query(Category).filter(Category.slug == "uncategorized").first()
        if not self.default_category:
            print("Default 'Uncategorized' category not found. Please seed categories first.")
            raise ValueError("Default 'Uncategorized' category not found.")

    # -----------------------------
    # Source resolution
    # -----------------------------
    def get_source_id(self, channel_name_or_url: str) -> Optional[int]:
        source = self.db.query(Source).filter(
            or_(
                Source.name == channel_name_or_url,
                Source.baseUrl == channel_name_or_url,
                Source.baseUrl == f"https://t.me/{channel_name_or_url}",
                Source.baseUrl == f"@{channel_name_or_url}",
            ),
            Source.type == "TELEGRAM",
        ).first()

        return source.id if source else None

    # -----------------------------
    # Telegram client auth
    # -----------------------------
    async def initialize_client(self) -> bool:
        if not TELEGRAM_API_ID or not TELEGRAM_API_HASH:
            print("TELEGRAM_API_ID / TELEGRAM_API_HASH missing")
            return False

        self.client = TelegramClient(
            TELEGRAM_SESSION_NAME,
            int(TELEGRAM_API_ID),
            TELEGRAM_API_HASH,
        )

        await self.client.connect()

        if not await self.client.is_user_authorized():
            print("Authentication required")
            await self.client.send_code_request(str(TELEGRAM_PHONE))
            code = input("Enter Telegram code: ")

            try:
                await self.client.sign_in(str(TELEGRAM_PHONE), code)
            except SessionPasswordNeededError:
                password = input("2FA enabled. Enter password: ")
                await self.client.sign_in(password=password)

        return True

    # -----------------------------
    # Media download
    # -----------------------------
    async def download_media(self, message, channel_name: str) -> Optional[str]:
        if not SCRAPE_MEDIA or not message.media:
            return None

        if isinstance(message.media, MessageMediaWebPage):
            return None

        try:
            media_dir = Path("data/telegram_media") / channel_name
            media_dir.mkdir(parents=True, exist_ok=True)

            path = await message.download_media(file=str(media_dir))
            return str(path)
        except Exception as e:
            print(f"Media download failed: {e}")
            return None

    # -----------------------------
    # Channel scraping
    # -----------------------------
    async def scrape_channel(self, channel_identifier: str):
        try:
            print(f"Scraping: {channel_identifier}")
            entity = await self.client.get_entity(channel_identifier)
            channel_name = getattr(entity, "username", getattr(entity, "title", str(entity.id)))

            source_id = (
                self.get_source_id(channel_identifier)
                or self.get_source_id(channel_name)
            )

            if not source_id:
                print(f"Source not found for {channel_identifier}, skipping")
                return

            articles_scraped = 0
            max_articles = 5
            
            async for message in self.client.iter_messages(entity, limit=50):  # Get more messages to filter from
                if articles_scraped >= max_articles:
                    break
                    
                if not message.message and not message.media:
                    continue

                telegram_url = (
                    f"https://t.me/{channel_name}/{message.id}"
                    if channel_name
                    else f"https://t.me/c/{entity.id}/{message.id}"
                )

                # Deduplication by URL
                exists = self.db.query(Article).filter(
                    Article.url == telegram_url
                ).first()

                if exists:
                    continue

                content = message.message or ""
                title = content[:50] if content else "Telegram Post"
                media_path = await self.download_media(message, channel_name)
              
                article = Article(
                    title=title,
                    content=content,
                    url=telegram_url,
                    publishedAt=message.date,
                    createdAt=datetime.utcnow(),
                    view=str(getattr(message, "views", 0)), 
                    sourceId=source_id,
                    categoryId=self.default_category.id,
                    imageUrl=media_path,
                )

                self.db.add(article)
                articles_scraped += 1
                print(f"Saved article {articles_scraped}/{max_articles}: {title[:30]}...")

            self.db.commit()
            print(f"Finished batch: {channel_identifier}")

        except Exception as e:
            self.db.rollback()
            print(f"Error scraping {channel_identifier}: {e}")

    # -----------------------------
    # Runner
    # -----------------------------
    async def run(self):
        if not await self.initialize_client():
            return

        sources = self.db.query(Source).filter(Source.type == "TELEGRAM").all()

        if not sources:
            print("No Telegram sources found")
            return

        for source in sources:
            identifier = (
                source.baseUrl
                .replace("https://t.me/", "")
                .replace("@", "")
            )
            await self.scrape_channel(identifier)

    def __del__(self):
        try:
            self.db.close()
        except Exception:
            pass


if __name__ == "__main__":
    asyncio.run(OptimizedTelegramScraper().run())

