from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

class BotService:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("CHATBOT_API_KEY"))
    
    def get_response(self, message: str) -> str:
        if not message.strip():
            return "Please enter a message."

        try:
            response = self.client.models.generate_content(
                model="gemini-2.5-flash",
                contents=message
            )
            return response.text if hasattr(response, "text") else str(response)
        except Exception as e:
            print(f"❌ CHATBOT error: {e}")
            return "Sorry, I couldn't process your request."
