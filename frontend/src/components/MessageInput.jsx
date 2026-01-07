import React from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { IoMic } from "react-icons/io5";

const MessageInput = () => {
  return (
     <div className="flex gap-2">
    <input
      type="text"
      placeholder="Type a message..."
      className="flex-1 p-3 rounded-xl bg-[#8392a795] text-white outline-none"
    />

     <button className="bg-blue-500 px-4 py-4 rounded-xl text-white hover:bg-blue-600 uppercase cursor-pointer">
      <IoMic className='text-xl font-bold'/>
    </button>

    <button className="bg-blue-500 px-4 py-4 rounded-xl text-white hover:bg-blue-600 uppercase cursor-pointer">
      <BsFillSendFill className='text-md font-bold'/>
    </button>
  </div>
  )
}

export default MessageInput
