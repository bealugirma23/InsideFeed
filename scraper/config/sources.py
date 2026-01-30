# Defined categories
CATEGORIES = [
    {"name": "Politics", "slug": "politics"},
    {"name": "Business", "slug": "business"},
    {"name": "Technology", "slug": "technology"},
    {"name": "Science", "slug": "science"},
    {"name": "Health", "slug": "health"},
    {"name": "Entertainment", "slug": "entertainment"},
    {"name": "Sports", "slug": "sports"},
    {"name": "World", "slug": "world"},
    {"name": "Lifestyle", "slug": "lifestyle"},
    {"name": "Education", "slug": "education"},
    {"name": "Opinion", "slug": "opinion"},
    {"name": "Environment", "slug": "environment"},
    {"name": "Travel", "slug": "travel"},
    {"name": "Culture", "slug": "culture"},
    {"name": "Crypto", "slug": "crypto"},
    {"name": "AI", "slug": "ai"},
    {"name": "Finance", "slug": "finance"},
]

# Defined sources
SOURCES = [
    # WEB Sources
    {"name": "BBC News", "base_url": "https://www.bbc.com/news", "type": "WEB"},
    {"name": "Al Jazeera", "base_url": "https://www.aljazeera.com", "type": "WEB"},
    {"name": "CNN", "base_url": "https://www.cnn.com", "type": "WEB"},
    {
        "name": "The Guardian",
        "base_url": "https://www.theguardian.com/international",
        "type": "WEB",
    },
    {"name": "Reuters", "base_url": "https://www.reuters.com", "type": "WEB"},
    {"name": "TechCrunch", "base_url": "https://techcrunch.com", "type": "WEB"},
    {"name": "Hacker News", "base_url": "https://news.ycombinator.com", "type": "WEB"},
    {
        "name": "Ethiopian Herald",
        "base_url": "https://www.ethpress.gov.et/ethiopian-herald/",
        "type": "WEB",
    },
    {
        "name": "The Reporter Ethiopia",
        "base_url": "https://www.thereporterethiopia.com/",
        "type": "WEB",
    },
    {
        "name": "BBC Ethiopia",
        "base_url": "https://www.bbc.com/news/topics/cwlw3xz047jt",
        "type": "WEB",
    },
    {"name": "Fana", "base_url": "https://www.fanabc.com/", "type": "WEB"},
    {"name": "EBC news", "base_url": "https://www.ebc.et/", "type": "WEB"},
    {"name": "Addis fortune", "base_url": "https://addisfortune.news/", "type": "WEB"},
    # TELEGRAM Channels
    {
        "name": "TechTelegramChannel",
        "base_url": "https://t.me/technews",
        "type": "TELEGRAM",
    },
    {"name": "WorldNewsTG", "base_url": "https://t.me/worldnews", "type": "TELEGRAM"},
    {
        "name": "PoliticsTG",
        "base_url": "https://t.me/politicalupdates",
        "type": "TELEGRAM",
    },
    {
        "name": "EthiopiaNewsTG",
        "base_url": "https://t.me/ethiopianews",
        "type": "TELEGRAM",
    },
    {
        "name": "CryptoAlertsTG",
        "base_url": "https://t.me/cryptoalerts",
        "type": "TELEGRAM",
    },
    {
        "name": "SportsUpdatesTG",
        "base_url": "https://t.me/sportsupdates",
        "type": "TELEGRAM",
    },
    {
        "name": "TIKVAH-ETHIOPIA",
        "base_url": "https://t.me/tikvahethiopia",
        "type": "TELEGRAM",
    },
    {
        "name": "Discover • Tech News",
        "base_url": "https://t.me/perplexity",
        "type": "TELEGRAM",
    },
    {
        "name": "Watcher Guru",
        "base_url": "https://t.me/WatcherGuru",
        "type": "TELEGRAM",
    },
    {
        "name": "Hacker News",
        "base_url": "https://t.me/hacker_news_feed",
        "type": "TELEGRAM",
    },
    {
        "name": "Ethiopian Business Daily",
        "base_url": "https://t.me/Ethiopianbusinessdaily",
        "type": "TELEGRAM",
    },
]
