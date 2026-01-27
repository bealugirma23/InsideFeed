import requests
from bs4 import BeautifulSoup

# Base URL of the Fanabc Amharic news page
base_url = "https://www.fanabc.com/%E1%8B%9C%E1%8A%93/"

# Output file name
output_file = "news_data.txt"

# Function to extract and print news content from a given news page URL
def extract_news_content(news_url):
    response = requests.get(news_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        # Adjust the HTML structure based on the actual structure of the website
        news_content = soup.find("div", class_="entry-content clearfix single-post-content")
        if news_content:
            return news_content.text.strip()
        else:
            return "News content not found"
    else:
        print(f"Failed to retrieve the news page. Status code: {response.status_code}")
        return None

# Send an HTTP request to the base URL
response = requests.get(base_url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract news headlines (adjust the HTML structure based on the actual structure of the website)
    headlines = soup.find_all("h2", class_="title")

    # Open the output file in write mode
    with open(output_file, "w", encoding="utf-8") as file:
        # Extract and write the headlines along with their links
        for index, headline in enumerate(headlines, start=1):
            anchor_tag = headline.find("a")
            link = anchor_tag.get("href") if anchor_tag else "Link not found"

            file.write(f"{index}. {headline.text.strip()} - Link: {link}\n")

            # Fetch news content and write to file
            news_content = extract_news_content(link)
            if news_content:
                file.write(f"News Content: {news_content}\n\n")

        # Check for pagination
        next_page = soup.find("a", class_="btn-bs-pagination next")

        while next_page:
            # Construct the URL for the next page
            next_page_url = base_url + next_page.get("href")

            # Send an HTTP request to the next page
            response = requests.get(next_page_url)

            # Parse the HTML content of the next page
            soup = BeautifulSoup(response.text, "html.parser")

            # Extract news headlines from the next page
            headlines = soup.find_all("h2", class_="title")

            # Extract and write the headlines along with their links
            for index, headline in enumerate(headlines, start=index + 1):
                anchor_tag = headline.find("a")
                link = anchor_tag.get("href") if anchor_tag else "Link not found"

                file.write(f"{index}. {headline.text.strip()} - Link: {link}\n")

                # Fetch news content and write to file
                news_content = extract_news_content(link)
                if news_content:
                    file.write(f"News Content: {news_content}\n\n")

            # Check for the next page again
            next_page = soup.find("a", class_="btn-bs-pagination next")

else:
    print(f"Failed to retrieve the page. Status code: {response.status_code}")
