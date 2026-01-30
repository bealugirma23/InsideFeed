from bs4 import BeautifulSoup
from scrapers.base_scraper import BaseScraper
from config.settings import DATABASE_URL

class FanaScraper(BaseScraper):
    def __init__(self):
        super().__init__("Fana")
        self.base_url = "https://www.fanabc.com/%E1%8B%9C%E1%8A%93/"

    def extract_news_content(self, news_url):
        html = self.fetch(news_url)
        if not html:
            return None
            
        soup = BeautifulSoup(html, "html.parser")
        news_content = soup.find("div", class_="entry-content clearfix single-post-content")
        if news_content:
            return news_content.get_text(separator="\n").strip()
        return "News content not found"

    def scrape(self):
        print(f"Starting scrape for {self.source_name}...")
        html = self.fetch(self.base_url)
        if not html:
            return

        soup = BeautifulSoup(html, "html.parser")
        headlines = soup.find_all("h2", class_="title")

        for headline in headlines:
            anchor_tag = headline.find("a")
            if not anchor_tag:
                continue
                
            title = headline.text.strip()
            link = anchor_tag.get("href")
            
            print(f"Scraping: {title}")
            content = self.extract_news_content(link)
            
            self.save_article(
                title=title,
                content=content,
                url=link
            )

        print(f"Finished scraping {self.source_name}.")

if __name__ == "__main__":
    scraper = FanaScraper()
    scraper.scrape()
