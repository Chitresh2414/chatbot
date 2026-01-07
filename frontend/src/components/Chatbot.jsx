import React from "react";

const Chatbot = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] sm:max-w-[70%] p-2 sm:p-3 rounded-xl text-sm sm:text-base
              ${msg.role === "user" ? "bg-[#303132] text-white" : "bg-[#1b1c1f]"}`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chatbot;
