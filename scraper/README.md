# News Platform Scraper

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up your PostgreSQL database and configure environment variables:
```bash
export DB_HOST=localhost
export DB_NAME=news_platform
export DB_USER=postgres
export DB_PASSWORD=your_password
export DB_PORT=5432
```

## Seeding Data

### Run all seeders:
```bash
python main.py
```

### Run individual seeders:
```bash
# Seed only categories
python run_seeds.py categories

# Seed only sources
python run_seeds.py sources
```

## Database Models

The application uses the following models:
- Categories: Contains news categories (Politics, Business, Technology, etc.)
- Sources: Contains news sources (websites and Telegram channels)

## Environment Variables

- `DB_HOST`: Database host (default: localhost)
- `DB_NAME`: Database name (default: news_platform)
- `DB_USER`: Database user (default: postgres)
- `DB_PASSWORD`: Database password (default: password)
- `DB_PORT`: Database port (default: 5432)