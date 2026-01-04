#Chat Controller

from db import Database
from bot import BotService

class ChatController:
    def __init__(self):
        self.db=Database()
        self.bot=BotService()

    def create_chat(self):
        con=self.db.connect()
        cur=con.cursor()
        cur.execute("INSERT INTO chats () VALUES ()")
        con.commit()
        chat_id=cur.lastrowid
        cur.close()
        con.close()
        return chat_id
    
    def chat(self,chat_id,user_message):

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
                "INSERT INTO messages (chat_id, role, text) VALUES (%s,'user',%s)",
                (chat_id, user_message)
            )

            cur.execute(
                "INSERT INTO messages (chat_id, role, text) VALUES (%s,'bot',%s)",
                (chat_id, bot_reply)
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

    def get_chats(self):
        con=self.db.connect()
        cur=con.cursor(dictionary=True)

        cur.execute("""
          SELECT c.id, m.text AS last_message
          FROM chats c
          LEFT JOIN messages m ON m.id = (
            SELECT id FROM messages
            WHERE chat_id = c.id
            ORDER BY id DESC LIMIT 1
          )
          ORDER BY c.id DESC
        """)

        data=cur.fetchall()
        cur.close()
        con.close()
        return data
    
    def get_messages(self,chat_id):
        con=self.db.connect()
        cur=con.cursor(dictionary=True)

        cur.execute(
            "SELECT role, text FROM messages WHERE chat_id=%s ORDER BY id",(chat_id)
        )

        msgs=cur.fetchall()
        cur.close()
        con.close()
        return msgs