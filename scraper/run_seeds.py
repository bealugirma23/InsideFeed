#!/usr/bin/env python3
"""Script to run individual seeding operations."""

import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from utils.logger import logger, log_success
from seeds.seedCategories import seed_categories
from seeds.seedSources import seed_sources

def run_seed_categories():
    """Run category seeding."""
    logger.info("Initializing Category Seeding...")
    seed_categories()
    log_success("Category Seeding Completed.")

def run_seed_sources():
    """Run source seeding."""
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
        logger.error("Invalid option. Use 'categories' or 'sources'.")
        sys.exit(1)