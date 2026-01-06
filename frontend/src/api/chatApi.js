import api from "./api"

// Get all Chats

export const fetchChats = () => api.get("/chats")

//Post new chat 

export const createChat=()=>api.post("/chat/new")


// GET messages of a chat
export const fetchMessages = (chatId) =>
  api.get(`/messages/${chatId}`);