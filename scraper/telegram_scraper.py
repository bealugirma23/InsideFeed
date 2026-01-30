import asyncio
from telegram_scraping.telegram_scraper import OptimizedTelegramScraper
from utils.logger import logger, log_success, log_error

def scrape_telegram():
    """
    Runner for the OptimizedTelegramScraper.
    """
    logger.info("Starting Telegram scraping process...")
    scraper = OptimizedTelegramScraper()
    try:
        asyncio.run(scraper.run())
        log_success("Telegram scraping finished successfully.")
    except Exception as e:
        log_error(f"Error in telegram scraping: {e}")

if __name__ == "__main__":
    scrape_telegram()
