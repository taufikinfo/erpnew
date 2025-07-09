import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # Database settings
    database_url: str = "mysql+mysqlconnector://root:@localhost:3306/erpnew"
    database_host: str = "localhost"
    database_user: str = "root"
    database_password: str = ""
    database_port: int = 3306
    database_name: str = "erpnew"
    
    # API settings
    api_v1_str: str = "/api/v1"
    project_name: str = "ERP Backend"
    
    # Security settings
    secret_key: str = "your-secret-key-here-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()
