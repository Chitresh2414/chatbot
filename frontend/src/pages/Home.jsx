import React, { useState, useEffect, useRef } from "react";
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
  }, []);

  // -------------------- Auto scroll to bottom --------------------
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // -------------------- Create new chat --------------------
  const handleNewChat = async () => {
    try {
      const res = await createChat();
      const newChat = {
        id: res.data.chat_id,
        title: "New Chat",
        last_message: "",
        created_at: new Date().toISOString(),
      };

      setChats((prev) => [newChat, ...prev]);
      setChatId(newChat.id);
      setActiveChatId(newChat.id);
      setMessages([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create chat");
    }
  };

  // -------------------- Select a chat --------------------
  const handleSelectChat = async (chat) => {
    try {
      setActiveChatId(chat.id);
      setChatId(chat.id);

      const res = await fetchMessages(chat.id);
      setMessages(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    }
  };

  // -------------------- Send message --------------------
  const handleSendMessage = async (rawText) => {
    const text = rawText?.trim();
    if (!text) return; // prevent empty messages
    if (!chatId || isTyping) return; // prevent sending if no chat or already typing

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsTyping(true);

    try {
      const res = await sendMessageAPI(chatId, text);
      const reply = res.data?.reply || "";

      // Add empty assistant message for typing animation
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Animate assistant typing
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: reply.slice(0, i),
          };
          return updated;
        });

        if (i >= reply.length) {
          clearInterval(interval);
          setIsTyping(false);

          // Update last_message in sidebar
          setChats((prev) =>
            prev.map((chat) =>
              chat.id === chatId
                ? { ...chat, last_message: reply || "No messages yet" }
                : chat
            )
          );
        }
      }, 12);
    } catch (err) {
      console.error("Send message error:", err);
      setIsTyping(false);
      toast.error("Message failed");
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="w-full h-screen bg-[#020617] text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* AI Animated Background */}
      <div className="absolute inset-0 z-0">
        <Ainmbg isTyping={isTyping} />
      </div>

      {/* Sidebar */}
      <History
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        className="z-20"
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />

        {/* Messages */}
        <div
          ref={chatContainerRef}
          className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 bg-black/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          <Chatbot messages={messages} />
        </div>

        {/* Input */}
        <div className="relative z-10 p-2 sm:p-4 backdrop-blur-sm border-t border-gray-700">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-2 sm:px-5 py-2 sm:py-3">
            <MessageInput onSend={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
