import React, { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

const History = ({ chats, activeChatId, onSelectChat, onNewChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 right-4 z-50 ">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 p-2 rounded-full text-white shadow-lg"
        >
          <MdHistory size={22} />
        </button>
      </div>

      {/* Overlay (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-67 bg-black/40 backdrop-blur-sm text-white z-50 shadow-2xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:relative md:flex md:flex-col border-r border-gray-700`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-start md:hidden p-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white p-2 hover:bg-gray-700 rounded"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <MdHistory className="text-xl text-blue-400" />
          <h2 className="font-semibold tracking-wide ">History</h2>
        </div>

        {/* New Chat */}
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 bg-[#334155] hover:bg-[#475569] text-white px-4 py-3 w-[95%] rounded-lg  mb-4 mt-1.5 ml-2 mr-2 transition-colors"
        >
          <FiPlus className="text-lg" />
          New Chat
        </button>

        {/* Chat List */}
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                onSelectChat(chat);
                setIsOpen(false); // close on mobile
              }}
              className={`flex flex-col p-3 rounded-lg cursor-pointer transition-colors
                ${activeChatId === chat.id ? "bg-blue-600" : "bg-[#334155] hover:bg-[#475569]"}`}
            >
              <div className="font-medium text-white">{chat.title || "New Chat"}</div>
              <div className="text-sm text-gray-400">
                {chat.last_message || "No messages yet"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
