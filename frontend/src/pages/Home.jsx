import React from "react";
import History from "../components/History";
import Chatbot from "../components/Chatbot";
import MessageInput from "../components/MessageInput";
import Ainmbg from "../components/Ainmbg";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-[#020617] text-white flex overflow-hidden relative">

     
        {/* AI Animated Background */}
        <div className="absolute inset-0 z-0">
          <Ainmbg />
        </div>

      {/* Sidebar (optional) */}
      
      <div className="flex-none relative z-10">
        <History />
      </div>
     

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">


        {/* Header */}
      <Header/>

        {/* Chat Messages */}
        <div className="
          relative z-10 flex-1 overflow-y-auto p-6 space-y-3
          scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800
          bg-black/20 backdrop-blur-sm
        ">
          <Chatbot />
        </div>

        {/* Message Input */}
        <div className="relative z-10 p-4">
          <div className="
            bg-black/40 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            px-4 py-3
          ">
            <MessageInput />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
