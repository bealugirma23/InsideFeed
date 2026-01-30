#!/usr/bin/env python3
"""
Script to run individual seeding operations
"""

import sys
import os
from utils.logger import logger, log_success

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def run_seed_categories():
    from seeds.seedCategories import seed_categories
    logger.info("Initializing Category Seeding...")
    seed_categories()
    log_success("Category Seeding Completed.")

def run_seed_sources():
    from seeds.seedSources import seed_sources
    logger.info("Initializing Source Seeding...")
    seed_sources()
    log_success("Source Seeding Completed.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        logger.error("Usage: python run_seeds.py [categories|sources]")
        sys.exit(1)
    
    option = sys.argv[1].lower()
    
    if option == "categories":
        run_seed_categories()
    elif option == "sources":
        run_seed_sources()
    else:
        logger.error("Invalid option. Use [bold cyan]'categories'[/bold cyan] or [bold cyan]'sources'[/bold cyan].")
        sys.exit(1)