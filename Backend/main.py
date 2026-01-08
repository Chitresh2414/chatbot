from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import ChatController

app = Flask(__name__)
CORS(app)

chat_controller = ChatController()

@app.route("/")
def home():
    return jsonify({"status": "Flask Chatbot API running 🚀"})

@app.route("/api/chats", methods=["POST"])
def create_chat():
    chat_id = chat_controller.create_chat()
    return jsonify({"chat_id": chat_id}), 201

@app.route("/api/chats", methods=["GET"])
def get_chats():
    return jsonify(chat_controller.get_chats())

@app.route("/api/chats/<int:chat_id>/messages", methods=["GET"])
def get_messages(chat_id):
    return jsonify(chat_controller.get_messages(chat_id))

@app.route("/api/chats/<int:chat_id>/messages", methods=["POST"])
def send_message(chat_id):
    data = request.get_json()
    if not data or "content" not in data:
        return jsonify({"error": "Message content required"}), 400

    user_message = data["content"]
    reply = chat_controller.chat(chat_id, user_message)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
