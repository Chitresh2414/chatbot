import React from 'react'
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

const chats = [
  { id: 1, title: "Flask + React Setup", time: "2 min ago" },
  { id: 2, title: "Gemini API Logic", time: "1 hour ago" },
  { id: 3, title: "Database Design", time: "Yesterday" },
];

const History = () => {
  return (
  <div className="relative w-90  border-r-4 border-[#42434222] p-4 text-white h-full  shadow-xl">
  {/* Header */}
  <div className="flex items-center gap-2 mb-4">
    <MdHistory className="text-xl text-blue-400" />
    <h2 className="text-lg font-semibold uppercase">History</h2>
  </div>

  {/* New Chat */}
  <button className="flex items-center gap-2 bg-[#334155] hover:bg-[#475569] text-white px-4 py-2 rounded-lg w-full mb-4 transition-colors">
    <FiPlus className="text-lg" />
    New Chat
  </button>

  {/* Chat List */}
  <div className="flex flex-col gap-3 overflow-y-auto h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
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

  {/* Floating Icon */}
  <button className="absolute bottom-6 left-6 bg-[#334155] hover:bg-[#475569] p-3 rounded-full shadow-lg transition-colors">
    <FiMessageSquare className="text-2xl text-white" />
  </button>
</div>

  )
}

export default History
