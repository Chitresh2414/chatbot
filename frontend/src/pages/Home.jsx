import React, { useState, useEffect, useRef } from "react";
import Chatbot from "../components/Chatbot";
import MessageInput from "../components/MessageInput";
import Ainmbg from "../components/Ainmbg";
import Header from "../components/Header";
import History from "../components/History";
import { createChat, sendMessage } from "../api/chatApi";
import { toast } from "react-toastify";

const Home = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [chatId, setChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // Track AI typing
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await createChat();
        setChatId(res.data.chat_id);
      } catch (error) {
        toast.error("Failed to initialize chat. Please try again.");
        console.error(error);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (newMessage) => {
    if (!chatId) {
      toast.warning("Chat is not ready yet...");
      return;
    }

    // Add user message immediately
    setMessages((prev) => [...prev, { role: "user", content: newMessage }]);

    try {
      setIsTyping(true); // AI started typing
      const res = await sendMessage(chatId, newMessage);
      const fullReply = res.data.reply;

      // Show initial typing indicator
      setMessages((prev) => [...prev, { role: "assistant", content: "Typing..." }]);

      setTimeout(() => {
        let index = 0;
        const interval = setInterval(() => {
          index++;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = fullReply.slice(0, index);
            return newMessages;
          });
          if (index >= fullReply.length) {
            clearInterval(interval);
            setIsTyping(false); // AI finished typing
          }
        }, 30);
      }, 800); // Simulate thinking delay
    } catch (error) {
      setIsTyping(false);
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#020617] text-white flex flex-col md:flex-row overflow-hidden relative">
      {/* AI Animated Background */}
      <div className="absolute inset-0 z-0">
        <Ainmbg isTyping={isTyping} />
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-none w-64 border-r border-gray-700 z-10">
        {/* Optional <History /> */}
        {/* <History/> */}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header />

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 bg-black/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          <Chatbot messages={messages} />
        </div>

        {/* Message Input */}
        <div className="relative z-10 p-2 sm:p-4">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-3 sm:px-4 py-2 sm:py-3">
            <MessageInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
