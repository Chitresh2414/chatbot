import mysql.connector
import os
from dotenv import load_dotenv

# 1. Load the .env file
load_dotenv()

try:
    con=mysql.connector.connect(
        host=os.getenv("Database_host"),
        user=os.getenv("Database_user"),
        password=os.getenv("Database_pass"),
        database=os.getenv("Database_db")
    )

    if con.is_connected():
          print("Connected successfully to MySQL!")
          
except mysql.connector.Error as err:
    print(f"Error: {err}")