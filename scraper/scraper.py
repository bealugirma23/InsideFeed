import os
import importlib
import inspect
from scrapers.base_scraper import BaseScraper
from utils.logger import logger, log_success, log_error

def scrape_all():
    """
    Dynamically discover and run all scraper classes in the sources/ directory.
    """
    sources_dir = os.path.join(os.path.dirname(__file__), 'sources')
    
    logger.info("Starting global scraping process...")
    
    for filename in os.listdir(sources_dir):
        if filename.endswith('.py') and filename != '__init__.py':
            module_name = f"sources.{filename[:-3]}"
            try:
                module = importlib.import_module(module_name)
                
                # Look for classes that inherit from BaseScraper
                for name, obj in inspect.getmembers(module):
                    if (inspect.isclass(obj) and 
                        issubclass(obj, BaseScraper) and 
                        obj is not BaseScraper):
                        
                        logger.info(f"Found scraper: [bold cyan]{name}[/bold cyan] in {module_name}")
                        try:
                            scraper_instance = obj()
                            scraper_instance.scrape()
                            log_success(f"Successfully finished scraper: {name}")
                        except Exception as e:
                            log_error(f"Error running scraper {name}: {e}")
                            
            except Exception as e:
                log_error(f"Error importing module {module_name}: {e}")
    
    log_success("All scrapers finished execution.")

if __name__ == "__main__":
    scrape_all()
