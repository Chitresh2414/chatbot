import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import ChatController

app = Flask(__name__)
# Allow all origins (for React frontend)
CORS(app, resources={r"/*": {"origins": "*"}})

chat_controller = ChatController()

@app.route("/")
def home():
    return jsonify({"status": "Flask Chatbot API running 🚀"})

# -------------------- Create a chat --------------------
@app.route("/api/chats", methods=["POST"])
def create_chat():
    chat_id = chat_controller.create_chat()
    if chat_id is None:
        return jsonify({"error": "Failed to create chat"}), 500
    return jsonify({"chat_id": chat_id}), 201

# -------------------- Get all chats --------------------
@app.route("/api/chats", methods=["GET"])
def get_chats():
    data = chat_controller.get_chats()
    return jsonify(data), 200

# -------------------- Get messages of a chat --------------------
@app.route("/api/chats/<int:chat_id>/messages", methods=["GET"])
def get_messages(chat_id):
    msgs = chat_controller.get_messages(chat_id)
    return jsonify(msgs), 200

# -------------------- Send message to a chat --------------------
@app.route("/api/chats/<int:chat_id>/messages", methods=["POST"])
def send_message(chat_id):
    # JSON data ko safely read karein
    data = request.get_json(force=True)
    
    # Check karein ki data mein 'content' hai ya 'message'
    # .get() use karne se error nahi aata agar key missing ho
    user_message = data.get("content") or data.get("message")

    # Agar dono hi nahi mile, tabhi error dein
    if not user_message:
        return jsonify({
            "error": "Message content required", 
            "received": data 
        }), 400

    try:
        # Chatbot ko message bhejein
        reply = chat_controller.chat(chat_id, user_message.strip())
        return jsonify({"reply": reply}), 200
    except Exception as e:
        print(f"❌ Send message error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port=int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
