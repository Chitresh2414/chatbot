#Chat Controller

from db import Database
from bot import BotService

class ChatController:
    def __init__(self):
        self.db=Database()
        self.bot=BotService()
    
    def chat(self,user_message):

        if not user_message or not user_message.strip():
            return "Please enter a message."
         
        con=None
        cur=None

        try:
            #Get AI reply
            bot_reply=self.bot.get_response(user_message)

            #DB Connection
            con=self.db.connect()

            if not con:
                raise Exception("DB Connection Failed")
            
            #Save Chat
            cur=con.cursor()
            cur.execute(
                "INSERT INTO chat_history (user_message, bot_reply) VALUES (%s, %s)",
                (user_message, bot_reply)
            )

            con.commit()

            return bot_reply
        except Exception as e:
            print(f"❌ Chat error: {e}")
            return "Sorry, something went wrong."
        
        finally:
            # Always close DB
            if cur:
                cur.close()
            if con:
                con.close()
    def history(self):
        con = None
        cur = None

        try:
            con = self.db.connect()
            if not con:
                raise Exception("DB connection failed")

            cur = con.cursor(dictionary=True)
            cur.execute(
                "SELECT user_message, bot_reply, created_at "
                "FROM chat_history ORDER BY id DESC LIMIT 20"
            )
            return cur.fetchall()

        except Exception as e:
            print(f"❌ History error: {e}")
            return []

        finally:
            if cur:
                cur.close()
            if con:
                con.close()