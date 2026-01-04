from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import ChatController

# Create Flask app instance
app = Flask(__name__)

# Enable CORS so React (frontend) can access Flask APIs
CORS(app)

# Create ChatController object (handles DB + Gemini logic)
chat_controller = ChatController()

# 🔹 Home route (API health check)
@app.route("/")
def home():
    return "<h1>Flask Chatbot API is running 🚀</h1>"


# 🔹 Create a NEW chat session
# This is called when user clicks "New Chat"
# It creates a new chat_id in the database
@app.route("/api/chat/new", methods=["POST"])
def new_chat():
    return jsonify({
        "chat_id": chat_controller.create_chat()
    })


# 🔹 Send message to Gemini for a specific chat
# chat_id ensures messages are saved in the correct conversation
@app.route("/api/chat/<int:chat_id>", methods=["POST"])
def chat_api(chat_id):
    # Get user message from request body
    msg = request.json["message"]

    # Process message using Gemini + save to DB
    reply = chat_controller.chat(chat_id, msg)

    # Return bot reply to frontend
    return jsonify({"reply": reply})


# 🔹 Get list of all chats (for left sidebar history)
# Shows chat end preview
@app.route("/api/chats")
def chats_api():
    return jsonify(chat_controller.get_chats())


# 🔹 Get all messages of a selected chat
# Used when clicking a chat from history
@app.route("/api/messages/<int:chat_id>")
def messages_api(chat_id):
    return jsonify(chat_controller.get_messages(chat_id))


# 🔹 Start Flask development server
if __name__ == "__main__":
    app.run(debug=True)
