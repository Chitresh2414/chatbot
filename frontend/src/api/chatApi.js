import api from "./api";

export const createChat = () => api.post("/chats");

export const fetchChats = () => api.get("/chats");

export const fetchMessages = (id) =>
  api.get(`/chats/${id}/messages`);

export const sendMessage = (id, msg) => {
  return api.post(`/chats/${id}/messages`, { content: msg });
};

