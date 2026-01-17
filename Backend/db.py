import mysql.connector
import os
from dotenv import load_dotenv

# 1. Load the .env file
load_dotenv()


class Database:
    def __init__(self):
        self.config={
            "host":os.getenv("DB_HOST"),
            "user":os.getenv("DB_USER"),
            "password":os.getenv("DB_PASSWORD"),
            "database":os.getenv("DB_NAME"),
            "port":int(os.getenv("DB_PORT", 4000))
        }

    def connect(self):
        try:
            return mysql.connector.connect(**self.config)
        except mysql.connector.Error as err:
            print(f"❌ Database connection error: {err}")
            return None
