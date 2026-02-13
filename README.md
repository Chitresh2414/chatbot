# 🤖 AI Chatbot – Full Stack Application

A full-stack AI chatbot built with **React (Vite)** and **Flask (Python)**.  
Integrated with **Google Gemini API** for AI responses and **MySQL** for chat history storage.

---

## 🚀 Tech Stack
- Frontend: React (Vite), Axios
- Backend: Flask, Python
- Database: MySQL
- AI: Google Gemini API

---

## 🔌 API Endpoints

| Method | Endpoint        | Description |
|--------|----------------|------------|
| POST   | `/api/chat`    | Send message & get AI response |
| GET    | `/api/history` | Get chat history |

---

## ⚙️ Setup

### Clone Repo
```bash
git clone https://github.com/Chitresh2414/chatbot.git
cd chatbot

cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py

cd frontend
npm install
npm run dev

## 👨‍💻 Author
Chitresh  Sen
Full Stack Developer  
🔗 https://github.com/Chitresh2414


