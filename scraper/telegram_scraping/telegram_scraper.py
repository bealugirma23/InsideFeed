import os
import json
import asyncio
import time
import sys
import warnings
from typing import Dict, Any, Optional
from pathlib import Path
from telethon import TelegramClient
from telethon.tl.types import (
    MessageMediaPhoto,
    MessageMediaDocument,
    MessageMediaWebPage,
    User,
    PeerChannel,
    Channel,
    Chat,
)
from telethon.errors import FloodWaitError, SessionPasswordNeededError
import qrcode
from io import StringIO

from config.settings import (
    TELEGRAM_API_ID, 
    TELEGRAM_API_HASH, 
    TELEGRAM_SESSION_NAME,
    SCRAPE_MEDIA,
    TELEGRAM_PHONE,
    MAX_CONCURRENT_DOWNLOADS,
    BATCH_SIZE
)
from db.models import SessionLocal, TelegramMessage, Source
from sqlalchemy import or_

warnings.filterwarnings(
    "ignore", message="Using async sessions support is an experimental feature"
)

class OptimizedTelegramScraper:
    def __init__(self):
        self.state_file = "telegram_state.json"
        self.client = None
        self.continuous_scraping_active = False
        self.db = SessionLocal()
        
    def get_source_id(self, channel_name_or_url):
        # Allow flexible matching for sources
        source = self.db.query(Source).filter(
            or_(
                Source.name == channel_name_or_url, 
                Source.base_url == channel_name_or_url,
                Source.base_url == f"https://t.me/{channel_name_or_url}",
                Source.base_url == f"@{channel_name_or_url}"
            ),
            Source.type == "TELEGRAM"
        ).first()
        return source.id if source else None

    async def initialize_client(self):
        if not TELEGRAM_API_ID or not TELEGRAM_API_HASH:
            print("Error: TELEGRAM_API_ID and TELEGRAM_API_HASH must be set in config/settings.py or .env")
            return False

        self.client = TelegramClient(
            TELEGRAM_SESSION_NAME, 
            int(TELEGRAM_API_ID), 
            TELEGRAM_API_HASH
        )

        await self.client.connect()

        if not await self.client.is_user_authorized():
            print("\n=== Authentication Required ===")
            # Simple phone auth for now, can implement QR if needed
            phone = TELEGRAM_PHONE
            await self.client.send_code_request(str(phone))
            code = input("Enter the code you received: ")
            try:
                await self.client.sign_in(str(phone), code)
            except SessionPasswordNeededError:
                password = input("Two-factor authentication enabled. Enter your password: ")
                await self.client.sign_in(password=password)
        
        return True

    async def download_media(self, message, channel_name):
        if not message.media or not SCRAPE_MEDIA:
            return None
            
        if isinstance(message.media, MessageMediaWebPage):
            return None
            
        try:
            media_folder = Path("data") / "telegram_media" / channel_name
            media_folder.mkdir(parents=True, exist_ok=True)
            
            path = await message.download_media(file=str(media_folder))
            return str(path)
        except Exception as e:
            print(f"Error downloading media: {e}")
            return None

    async def scrape_channel(self, channel_identifier):
        try:
            print(f"Scraping channel: {channel_identifier}")
            entity = await self.client.get_entity(channel_identifier)
            channel_name = getattr(entity, 'username', getattr(entity, 'title', str(entity.id)))
            
            source_id = self.get_source_id(channel_identifier) or self.get_source_id(channel_name)
            
            if not source_id:
                print(f"Warning: Source ID for {channel_identifier} not found in DB. Skipping save.")
                # Optional: create source if not exists? For now, skip.
                return

            async for message in self.client.iter_messages(entity, limit=BATCH_SIZE):
                if not message.message and not message.media:
                    continue

                # Check if exists
                existing = self.db.query(TelegramMessage).filter(
                    TelegramMessage.message_id == message.id,
                    TelegramMessage.source_id == source_id
                ).first()
                
                if existing:
                    continue

                media_path = await self.download_media(message, channel_name)
                
                msg_obj = TelegramMessage(
                    message_id=message.id,
                    content=message.message,
                    date=message.date,
                    media_path=media_path,
                    views=getattr(message, 'views', 0),
                    forwards=getattr(message, 'forwards', 0),
                    source_id=source_id
                )
                
                self.db.add(msg_obj)
            
            self.db.commit()
            print(f"Finished scraping batch for {channel_identifier}")

        except Exception as e:
            print(f"Error scraping {channel_identifier}: {e}")
            self.db.rollback()

    async def run(self):
        if not await self.initialize_client():
            return

        # Get channels from DB
        sources = self.db.query(Source).filter(Source.type == "TELEGRAM").all()
        if not sources:
            print("No Telegram sources found in database. Run seeding first.")
            return

        for source in sources:
            # Clean up base_url to get channel username/link
            identifier = source.base_url.replace("https://t.me/", "").replace("@", "")
            await self.scrape_channel(identifier)

    def __del__(self):
        if hasattr(self, 'db'):
            self.db.close()

if __name__ == "__main__":
    scraper = OptimizedTelegramScraper()
    import asyncio
    asyncio.run(scraper.run())
