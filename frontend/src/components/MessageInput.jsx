import React, { useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoMic } from "react-icons/io5";
import { toast } from "react-toastify";

const MessageInput = ({ onSend }) => {
  const [info, setInfo] = useState("");
  const [listening, setListening] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!info.trim()) {
      toast.warning("Please enter a message ✍️", { theme: "dark", autoClose: 2000 });
      return;
    }
    onSend(info);
    setInfo("");
  };

  const handleMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.error("Speech recognition works only in Chrome", { theme: "dark" });
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInfo((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.start();
  };

  return (
    <form className="flex gap-2 items-center w-full" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Type a message..."
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className="flex-1 p-2 sm:p-3 rounded-xl bg-[#8392a795] text-white outline-none text-sm sm:text-base"
      />

      <button
        type="button"
        onClick={handleMic}
        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-white cursor-pointer 
          ${listening ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        <IoMic className="text-lg sm:text-xl" />
      </button>

      <button
        type="submit"
        className="bg-blue-500 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-white hover:bg-blue-600 cursor-pointer"
      >
        <BsFillSendFill className="text-lg sm:text-xl" />
      </button>
    </form>
  );
};

export default MessageInput;
