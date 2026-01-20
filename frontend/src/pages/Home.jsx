import React, { useState, useEffect, useRef, useCallback } from "react";
import Chatbot from "../components/Chatbot";
import MessageInput from "../components/MessageInput";
import Ainmbg from "../components/Ainmbg";
import Header from "../components/Header";
import History from "../components/History";
import {
  createChat,
  fetchChats,
  fetchMessages,
  sendMessage as sendMessageAPI,
} from "../api/chatApi";
import { toast } from "react-toastify";

const Home = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const typingIntervalRef = useRef(null);

  // -------------------- Create new chat (Optimistic) --------------------
  const handleNewChat = useCallback(async () => {
    if (isTyping) return;

    const tempId = Date.now();
    const newChat = {
      id: tempId,
      title: "New Chat",
      last_message: "No messages yet",
      created_at: new Date().toISOString(),
    };

    setChats((prev) => [newChat, ...prev]);
    setChatId(tempId);
    setActiveChatId(tempId);
    setMessages([]);

    try {
      const res = await createChat();
      const serverId = res.data.chat_id || res.data.id;

      setChatId(serverId);
      setActiveChatId(serverId);
      setChats((prev) =>
        prev.map((c) => (c.id === tempId ? { ...c, id: serverId } : c))
      );
    } catch (err) {
      console.error("New chat failed:", err);
      toast.error("Connection error");
      setChats((prev) => prev.filter((c) => c.id !== tempId));
    }
  }, [isTyping]);

  // -------------------- Load chats on mount --------------------
  useEffect(() => {
    const loadChats = async () => {
      try {
        const res = await fetchChats();
        const data = res.data || [];

        if (data.length > 0) {
          setChats(data);
          setChatId(data[0].id);
          setActiveChatId(data[0].id);
          const msgRes = await fetchMessages(data[0].id);
          setMessages(msgRes.data || []);
        } else {
          handleNewChat();
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load chats");
      }
    };
    loadChats();
  }, [handleNewChat]);

  // -------------------- Cleanup and Auto-scroll --------------------
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // -------------------- Select Chat --------------------
  const handleSelectChat = async (chat) => {
    if (isTyping) {
      toast.info("Please wait for the response to finish");
      return;
    }
    try {
      setActiveChatId(chat.id);
      setChatId(chat.id);
      const res = await fetchMessages(chat.id);
      setMessages(res.data || []);
    } catch (err) {
      toast.error("Failed to load messages");
    }
  };

  // -------------------- Send message --------------------
  const handleSendMessage = async (rawText) => {
    const text = rawText?.trim();
    if (!text || !chatId || isTyping) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsTyping(true);

    try {
      const res = await sendMessageAPI(chatId, text);
      const reply = res.data?.reply || "";
      
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        i++;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: reply.slice(0, i) };
          return updated;
        });

        if (i >= reply.length) {
          clearInterval(typingIntervalRef.current);
          setIsTyping(false);
          setChats((prev) =>
            prev.map((c) => (c.id === chatId ? { ...c, last_message: reply } : c))
          );
        }
      }, 10);
    } catch (err) {
      setIsTyping(false);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="w-full h-screen bg-[#020617] text-white flex flex-col md:flex-row overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <Ainmbg isTyping={isTyping} />
      </div>
      <History
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />
        <div ref={chatContainerRef} className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 bg-black/20 backdrop-blur-sm">
          <Chatbot messages={messages} />
        </div>
        <div className="relative z-10 p-2 sm:p-4 backdrop-blur-sm border-t border-gray-700">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-2">
            <MessageInput onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;