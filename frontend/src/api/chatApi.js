import api from "./api"

//chats
export const createChat = () => api.post("/chats");
export const fetchChats = () => api.get("/chats");

//Messages
export const fetchMessages = (id) => api.get(`/chats/${id}/messages`);
export const sendMessage = (id, msg) =>
  api.post(`/chats/${id}/messages`, { content: msg });
