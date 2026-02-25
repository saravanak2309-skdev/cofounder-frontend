import toml
from pydantic_settings import BaseSettings
from pathlib import Path
from typing import List

class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "Founder Matrimony"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"
    
    # Server
    SERVER_HOST: str = "0.0.0.0"
    SERVER_PORT: int = 8000
    
    # Database
    DATABASE_URL: str
    POOL_SIZE: int = 20
    MAX_OVERFLOW: int = 10
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["*"]

    @classmethod
    def load_from_toml(cls) -> "Settings":
        config_path = Path(__file__).parent.parent.parent / "config.toml"
        if not config_path.exists():
            # Support ENV fallbacks if TOML is missing
            raise FileNotFoundError(f"Config file not found at {config_path}")
        
        raw_config = toml.load(config_path)
        return cls(
            PROJECT_NAME=raw_config["app"]["title"],
            VERSION=raw_config["app"]["version"],
            ENVIRONMENT=raw_config["app"]["environment"],
            DEBUG=raw_config["app"]["debug"],
            API_V1_STR=raw_config["app"]["api_prefix"],
            
            SERVER_HOST=raw_config["server"]["host"],
            SERVER_PORT=raw_config["server"]["port"],
            
            DATABASE_URL=raw_config["database"]["url"],
            POOL_SIZE=raw_config["database"]["pool_size"],
            MAX_OVERFLOW=raw_config["database"]["max_overflow"],
            
            SECRET_KEY=raw_config["security"]["secret_key"],
            ALGORITHM=raw_config["security"]["algorithm"],
            ACCESS_TOKEN_EXPIRE_MINUTES=raw_config["security"]["access_token_expire_minutes"],
            
            ALLOWED_ORIGINS=raw_config["cors"]["allowed_origins"]
        )

# Global settings instance
try:
    settings = Settings.load_from_toml()
except Exception as e:
    print(f"CRITICAL: Could not load configuration: {e}")
    # In a real app we might raise or use a default instance for testing
    raise e
