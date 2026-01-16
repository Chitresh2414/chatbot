from db import Database
from bot import BotService
from datetime import datetime

class ChatController:
    def __init__(self):
        self.db = Database()
        self.bot = BotService()

    # Create a new chat
    def create_chat(self):
        try:
            con = self.db.connect()
            cur = con.cursor()
            created_at = datetime.utcnow()
            cur.execute(
                "INSERT INTO chats (title, created_at) VALUES (%s, %s)",
                ("New Chat", created_at)
            )
            con.commit()
            chat_id = cur.lastrowid
            return chat_id
        except Exception as e:
            print(f"❌ Create chat error: {e}")
            return None
        finally:
            if cur: cur.close()
            if con: con.close()

    # Send message and get bot reply
    def chat(self, chat_id, user_message):
        if not user_message.strip():
            return "Please enter a message."

        con = None
        cur = None
        try:
            bot_reply = self.bot.get_response(user_message)

            con = self.db.connect()
            if not con:
                raise Exception("DB Connection Failed")
            cur = con.cursor()

            # Save user message
            cur.execute(
                "INSERT INTO messages (chat_id, role, text) VALUES (%s, 'user', %s)",
                (chat_id, user_message)
            )
            # Save bot reply
            cur.execute(
                "INSERT INTO messages (chat_id, role, text) VALUES (%s, 'bot', %s)",
                (chat_id, bot_reply)
            )
            con.commit()

            return bot_reply
        except Exception as e:
            print(f"❌ Chat error: {e}")
            return "Sorry, something went wrong."
        finally:
            if cur: cur.close()
            if con: con.close()

    # Get all chats for sidebar
    def get_chats(self):
        try:
            con = self.db.connect()
            cur = con.cursor(dictionary=True)
            cur.execute("""
                SELECT c.id, c.title, c.created_at,
                m.text AS last_message
                FROM chats c
                LEFT JOIN messages m ON m.id = (
                    SELECT id FROM messages
                    WHERE chat_id = c.id
                    ORDER BY id DESC LIMIT 1
                )
                ORDER BY c.id DESC
            """)
            data = cur.fetchall()
            return data
        except Exception as e:
            print(f"❌ Get chats error: {e}")
            return []
        finally:
            if cur: cur.close()
            if con: con.close()

    # Get all messages of a chat
    def get_messages(self, chat_id):
        try:
            con = self.db.connect()
            cur = con.cursor(dictionary=True)
            cur.execute(
                "SELECT role, text AS content FROM messages WHERE chat_id=%s ORDER BY id ASC",
                (chat_id,)
            )
            msgs = cur.fetchall()
            return msgs
        except Exception as e:
            print(f"❌ Get messages error: {e}")
            return []
        finally:
            if cur: cur.close()
            if con: con.close()
