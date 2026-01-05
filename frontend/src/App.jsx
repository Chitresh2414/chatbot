import { Routes, Route } from 'react-router-dom'
import Chatbot from './components/Chatbot'
import History from './components/History'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chatbot />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}

export default App
