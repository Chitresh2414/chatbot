import React from "react";
import History from "../components/History";
import Chatbot from "../components/Chatbot";
import MessageInput from "../components/MessageInput";


const Home = () => {
  return (
    <div className="w-screen h-screen bg-[#7e8c9b9b] text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="flex-none">
        <History />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center p-4 border-b border-gray-700 bg-[#1F2937] font-semibold text-lg">
          🤖 AI Chatbot
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 bg-[#374151]">
          <Chatbot />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-700 bg-[#1F2937] rounded-2xl m-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Home;
