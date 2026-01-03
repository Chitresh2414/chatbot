from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import ChatController

app = Flask(__name__)
CORS(app)

chat_controller = ChatController()

# 🔹 Home route
@app.route("/")
def home():
    return "<h1>Flask Chatbot API is running 🚀</h1>"


# 🔹 Chat API
@app.route("/api/chat", methods=["POST"])
def chat_api():
    data = request.get_json(silent=True)
    if not data or "message" not in data:
        return jsonify({"error": "Message is required"}), 400

    reply = chat_controller.chat(data["message"])
    return jsonify({"reply": reply}), 200


# 🔹 Chat history API
@app.route("/api/history", methods=["GET"])
def history_api():
    return jsonify(chat_controller.history()), 200


if __name__ == "__main__":
    app.run(debug=True)
