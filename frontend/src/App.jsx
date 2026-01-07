import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Chatbot from "./components/Chatbot";
import History from "./components/History";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      {/* 🔔 Toast Container (GLOBAL) */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "bg-slate-900 text-white rounded-xl shadow-xl px-4 py-3 border border-slate-700"
        }
        bodyClassName="text-sm font-medium"
        progressClassName="bg-blue-500"
      />

      {/* 🚦 Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
};

export default App;
