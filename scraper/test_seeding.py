#!/usr/bin/env python3
"""
Test script to validate the seeding functionality without connecting to a real database
"""

import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def test_seed_categories():
    print("Testing category seeding...")
    
    # Import the categories from the seed file
    from seeds.seedCategories import categories
    
    print(f"Found {len(categories)} categories to seed:")
    for i, category in enumerate(categories, 1):
        print(f"  {i}. {category['name']} ({category['slug']})")
    
    print("Category seeding test completed successfully!\n")

def test_seed_sources():
    print("Testing source seeding...")
    
    # Import the sources from the seed file
    from seeds.seedSources import sources
    
    print(f"Found {len(sources)} sources to seed:")
    for i, source in enumerate(sources, 1):
        print(f"  {i}. {source['name']} - {source['base_url']} ({source['type']})")
    
    print("Source seeding test completed successfully!\n")

if __name__ == "__main__":
    print("Testing seeding functionality...\n")
    
    test_seed_categories()
    test_seed_sources()
    
    print("All seeding tests passed!")