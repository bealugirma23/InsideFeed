#!/usr/bin/env python3
"""
Main entry point for the InsideFeed Scraper Platform
"""

import sys
import os
from rich.panel import Panel
from rich.text import Text
from utils.logger import logger, log_success, console
from scraper import scrape_all
# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def display_welcome():
    art = r"""
.___              .__    .___    ___________               .___
|   | ____   _____|__| __| _/____\_   _____/___   ____   __| _/
|   |/    \ /  ___/  |/ __ |/ __ \|    __)/ __ \_/ __ \ / __ | 
|   |   |  \\___ \|  / /_/ \  ___/|     \\  ___/\  ___// /_/ | 
|___|___|  /____  >__\____ |\___  >___  / \___  >\___  >____ | 
    """
    console.print(Panel(Text(art, style="bold cyan"), title="[bold white]InsideFeed Scraper[/bold white]", subtitle="[bold white]v1.0.0[/bold white]"))
    console.print("[bold yellow]Booting Up, boop, bip...[/bold yellow]\n")

def main():
    display_welcome()
    
    # Web Scraping
    logger.info("[bold blue]Step 1: Web Scraping[/bold blue]")
    try:
        scrape_all()
        log_success("Web scraping phase completed!")
    except Exception as e:
        logger.error(f"Failed during web scraping: {e}")

    # Telegram Scraping
    console.print("") # Spacer
    logger.info("[bold blue]Step 2: Telegram Scraping[/bold blue]")
    from telegram_scraper import scrape_telegram
    try:
        scrape_telegram()
        log_success("Telegram scraping phase completed!")
    except Exception as e:
        logger.error(f"Failed during telegram scraping: {e}")

    # AI Categorization
    console.print("") # Spacer
    logger.info("[bold blue]Step 3: AI Categorization[/bold blue]")
    from ai.categorizer import categorize_articles
    try:
        # Categorize articles in batches
        categorize_articles(batch_size=50)
        log_success("AI Categorization phase completed!")
    except Exception as e:
        logger.error(f"Failed during AI categorization: {e}")

    console.print("\n[bold green]All operations finished successfully![/bold green]")

if __name__ == "__main__":
    main()
