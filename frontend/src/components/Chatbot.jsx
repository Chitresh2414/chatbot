import React from 'react'

const Chatbot = () => {
  return (
    <div className="flex-1 overflow-y-auto space-y-3 mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
    <div className="flex gap-2 items-start">
      <span className="text-xl">🤖</span>
      <div className="bg-[#1F2937] p-3 rounded-xl max-w-[70%]">
        Hello! How can I help you?
      </div>
    </div>
    <div className="flex justify-end gap-2 items-start">
      <div className="bg-blue-500 p-3 rounded-xl max-w-[70%] text-white">
        Hi !
      </div>
    </div>
  </div>
  )
}

export default Chatbot
