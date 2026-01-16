from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

class BotService:
    def __init__(self):
        self.client = genai.Client(
            api_key=os.getenv("CHATBOT_API_KEY")
        )

    def get_response(self, message: str) -> str:
        if not message or not message.strip():
            return "Please enter a message."

        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=message
            )
            return response.text
        except Exception as e:
            print("CHATBOT ERROR:", e)
            return "Something went wrong."
