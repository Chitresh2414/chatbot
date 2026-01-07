import React, { useState } from "react";
import { FiMessageSquare, FiPlus, FiX } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

const chats = [
  { id: 1, title: "Flask + React Setup", time: "2 min ago" },
  { id: 2, title: "Gemini API Logic", time: "1 hour ago" },
  { id: 3, title: "Database Design", time: "Yesterday" },
];

const History = () => {
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 p-2 rounded-full text-white shadow-lg"
        >
          <FiMessageSquare size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#070809] text-white z-30
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex md:flex-col
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden p-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white p-2 hover:bg-gray-700 rounded"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4 p-4 border-b border-gray-700">
          <MdHistory className="text-xl text-blue-400" />
          <h2 className="text-lg font-semibold uppercase">History</h2>
        </div>

        {/* New Chat */}
        <button className="flex items-center gap-2 bg-[#334155] hover:bg-[#475569] text-white px-4 py-2 rounded-lg w-full mb-4 transition-colors">
          <FiPlus className="text-lg" />
          New Chat
        </button>

        {/* Chat List */}
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 p-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="flex flex-col bg-[#334155] hover:bg-[#475569] p-3 rounded-lg cursor-pointer transition-colors"
            >
              <div className="font-medium">{chat.title}</div>
              <div className="text-sm text-gray-400">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default History;
