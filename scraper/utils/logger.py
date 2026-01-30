import logging
from rich.logging import RichHandler
from rich.console import Console
from rich.theme import Theme

# Custom theme for the console
custom_theme = Theme({
    "info": "cyan",
    "warning": "yellow",
    "error": "red bold",
    "critical": "magenta bold",
    "success": "green bold",
})

# Create a shared console instance
console = Console(theme=custom_theme)

def setup_logger(name: str = "InsideFeed"):
    """
    Sets up a logger with RichHandler for beautiful terminal output.
    """
    logging.basicConfig(
        level="INFO",
        format="%(message)s",
        datefmt="[%X]",
        handlers=[RichHandler(rich_tracebacks=True, console=console, show_path=False)]
    )
    
    logger = logging.getLogger(name)
    return logger

# Default logger instance
logger = setup_logger()

def log_success(message: str):
    """Helper for success messages with a checkmark."""
    console.print(f"[success]✔[/success] {message}")

def log_info(message: str):
    """Helper for info messages."""
    console.print(f"[info]ℹ[/info] {message}")

def log_warn(message: str):
    """Helper for warning messages."""
    console.print(f"[warning]⚠[/warning] {message}")

def log_error(message: str):
    """Helper for error messages."""
    console.print(f"[error]✘[/error] {message}")
